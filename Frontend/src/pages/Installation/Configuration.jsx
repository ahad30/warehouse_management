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
      requirementForStep3: 1,
    });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      navigate("/final-step");
    }
  }, [navigate, isError, error, isSuccess]);

console.log(stepFourData, isLoading, isSuccess, isError, error);

  return (
    <div className="bg-gray-100 p-5">
      <Step path={path}></Step>

      <form className="w-full flex flex-col gap-y-6" action="">
        {/* field div start */}
        <div className="flex flex-col my-5  gap-4">
          {/* field one */}
          <p className="font-semibold">
            1. Pleas enter your application details
          </p>
          <div className="form-control  w-full">
            <label className="label">
              <span className="label-text">App Name</span>
            </label>
            <input
              type="text"
              onChange={submitData}
              placeholder="app name"
              name="appName"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        {/* field div end */}

        {/* field div start */}
        <div>
          <p className="font-semibold">
            2. Pleas enter your database connection details
          </p>
          {/* input field */}
          <div className="grid grid-cols-2 my-4 gap-4 ">
            <div className="form-control  w-full">
              <label className="label">
                <span className="label-text">Database Host</span>
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
                <span className="label-text">Database user </span>
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
                <span className="label-text">Database Name</span>
              </label>
              <input
                type="text"
                onChange={submitData}
                placeholder="Database Name"
                name="databaseName"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control  w-full">
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
          <p className="font-semibold">3. Pleas enter smtp details</p>
          {/* input field */}
          <div className="grid grid-cols-2 my-4 gap-4 ">
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

            <div className="col-span-2 flex gap-4">
              <div className="form-control  w-full">
                <label className="label">
                  <span className="label-text">Mail Address</span>
                </label>
                <input
                  type="text"
                  onChange={submitData}
                  placeholder="mail Address"
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
                  placeholder="mail username"
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
      <div className="flex justify-between items-center">
        <button>
          <Link to={"/verification"}>Prev</Link>
        </button>
        <button onClick={handleSubmit}>
          {isLoading ? "Processing" : "Finish"}
        </button>
      </div>
    </div>
  );
};

export default Configuration;
