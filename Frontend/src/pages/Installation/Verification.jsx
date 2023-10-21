import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePostStepThreeMutation } from "../../features/Installation/installationApi";
import toast from "react-hot-toast";
import Step from "./Step";

const Verification = () => {

  const location = useLocation();
  const path = location?.pathname             

  
  


  const [
    postStepThreeData,
    { data: stepThreeData, isLoading, isError, error, isSuccess },
  ] = usePostStepThreeMutation();

  const [verification, setVerification] = useState({});
  const navigate = useNavigate();
  const submitData = (e) => {
    const { name, value } = e.target;

    setVerification((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    postStepThreeData({ ...verification, requirementForStep1: 1 });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess && stepThreeData?.requirementForStep2) {
      navigate("/configuration");
    }
  }, [navigate, isError, error, isSuccess, stepThreeData?.requirementForStep2]);

  return (
    <div className="bg-gray-100 p-5">
    
   

<Step path={path}></Step>

      <p className="font-semibold">
        Please enter your item purchase code and evanto username
      </p>

      <form className="w-full" action="">
        <div className="flex flex-col my-5 lg:flex-row gap-4">
          {/* field one */}
          <div className="form-control  w-full">
            <label className="label">
              <span className="label-text">Evanto Username</span>
            </label>
            <input
              onChange={submitData}
              type="text"
              placeholder="evanto username"
              className="input input-bordered w-full"
              name="evantoUsername"
            />
          </div>
          {/* field one */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Item Purchase Code</span>
            </label>
            <input
              onChange={submitData}
              type="text"
              placeholder="Item code"
              name="purchaseCode"
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </form>

      <div className="flex justify-between items-center">
        <button>
          <Link to={"/pre-installation"}>Prev</Link>
        </button>
        <button onClick={handleSubmit}>
          {isLoading ? "Processing" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Verification;
