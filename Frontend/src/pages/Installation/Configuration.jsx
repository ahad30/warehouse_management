import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePostStepFourMutation } from "../../features/Installation/installationApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Step from "./Step";

const Configuration = () => {
  const location = useLocation();
  const path = location?.pathname;

  const [
    postStepFourData,
    { data: stepFourData, isLoading, isSuccess, isError, error },
  ] = usePostStepFourMutation();
  const [configuration, setConfiguration] = useState({});
  const navigate = useNavigate();

  const submitData = (e) => {
    const { name, value } = e.target;
    setConfiguration((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    postStepFourData({
      ...configuration,
      requirementForStep1: 1,
      requirementForStep2: 1,
    });
  };

  const disabledNext =
    !configuration?.appName ||
    !configuration?.hostName ||
    !configuration?.databaseUserName ||
    !configuration?.databaseName;

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(stepFourData?.message, { id: 1 });
      navigate("/final-step");
    }
  }, [navigate, isError, error, isSuccess]);

  return (
    <div className=" lg:p-12 p-2">
      <Step path={path}></Step>

      <form
        className="w-full p-2 flex bg-gray-100 flex-col lg:p-12 gap-y-6"
        action=""
      >
        {/* field div start */}
        <div className="flex flex-col my-5  gap-4">
          {/* field one */}
          <p className="font-semibold">
            1. Please enter your application details
          </p>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                App Name <span className="text-red-500 p-0">*</span>
              </span>
            </label>
            <input
              type="text"
              onChange={submitData}
              placeholder="Please use single name or use like app_name"
              name="appName"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        {/* field div end */}

        {/* field div start */}
        <div>
          <p className="font-semibold">
            2. Please enter your database connection details (Please create a
            new Database)
          </p>
          {/* input field */}
          <div className="grid lg:grid-cols-2 grid-cols-1 my-4 gap-4 ">
            <div className="form-control  w-full">
              <label className="label">
                <span className="label-text">
                  Database Host <span className="text-red-500 p-0">*</span>
                </span>
              </label>
              <input
                type="text"
                onChange={submitData}
                placeholder="Database Host name"
                name="hostName"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control  w-full">
              <label className="label">
                <span className="label-text">
                  Database User <span className="text-red-500 p-0">*</span>
                </span>
              </label>
              <input
                type="text"
                onChange={submitData}
                placeholder="Database User"
                name="databaseUserName"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control  w-full">
              <label className="label">
                <span className="label-text">
                  Database Name <span className="text-red-500 p-0">*</span>
                </span>
              </label>
              <input
                type="text"
                onChange={submitData}
                placeholder="Database Name"
                name="databaseName"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                onChange={submitData}
                placeholder="app Password"
                name="dbPassword"
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>
        {/* field div end */}

        {/* field div start */}

        <div>
          <p className="font-semibold">
            3. Please enter SMTP Credentials (If have)
          </p>
          {/* input field */}
          <div className="grid grid-cols-1 lg:grid-cols-2 my-4 gap-4 ">
            <div className="form-control  w-full">
              <label className="label">
                <span className="label-text">Mail Host</span>
              </label>
              <input
                type="text"
                placeholder="mail host"
                onChange={submitData}
                name="mailHost"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control  w-full">
              <label className="label">
                <span className="label-text">Mail Port </span>
              </label>
              <input
                type="text"
                placeholder="mail prot"
                onChange={submitData}
                name="portNo"
                className="input input-bordered w-full"
              />
            </div>

            <div className="lg:col-span-2 flex flex-col lg:flex-row gap-4">
              <div className="form-control  w-full">
                <label className="label">
                  <span className="label-text">Mail Address</span>
                </label>
                <input
                  type="text"
                  onChange={submitData}
                  placeholder="Mail Address"
                  name="mailAddress"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control  w-full">
                <label className="label">
                  <span className="label-text">Mail Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Mail username"
                  name="mailUsername"
                  onChange={submitData}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control  w-full">
                <label className="label">
                  <span className="label-text">Mail Password</span>
                </label>
                <input
                  type="password"
                  onChange={submitData}
                  placeholder="mail password"
                  name="mail_password"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* field div end  */}
      </form>

      <div className="flex justify-between my-12 items-center">
        <button className="btn bg-black text-white hover:text-black">
          <Link to={"/verification"}>Prev</Link>
        </button>
        <button
          disabled={disabledNext || isLoading}
          className="btn bg-black text-white hover:text-black"
          onClick={handleSubmit}
        >
          {isLoading ? "Processing" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Configuration;
