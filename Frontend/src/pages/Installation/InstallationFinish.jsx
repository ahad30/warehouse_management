import { Link, useLocation } from "react-router-dom";
import Step from "./Step";
import { useEffect, useState } from "react";
import { useFinalStepMutation } from "../../features/Installation/installationApi";
import { toast } from "react-hot-toast";
import SuccessMessage from "../../components/Reusable/Messages/SuccessMessage";

const InstallationFinish = () => {
  const [finalStep, { isLoading, isError, error, isSuccess, data }] =
    useFinalStepMutation();
  const [databaseSql, setDatabaseSql] = useState({});
  const location = useLocation();
  const path = location?.pathname;

  const importSql = (e) => {
    finalStep({
      requirementForStep1: 1,
      requirementForStep2: 1,
      requirementForStep3: 1,
    });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.status, { id: 1 });
    }
    if (isSuccess) {
      toast.success(data?.message, { id: 1 });
    }
  }, [isError, error, isSuccess]);

  console.log(isLoading, isError, error, isSuccess, data);

  return (
    <div className="lg:p-12 p-3">
      <Step path={path}></Step>

      {!isSuccess && (
        <label htmlFor="file">
          <div className="flex justify-center">
            <button
              onClick={importSql}
              className="btn text-white btn-wide bg-blue-500 "
            >
              Import SQL
            </button>
          </div>
        </label>
      )}

      {isSuccess && data?.message && <SuccessMessage message={data?.message} />}

      <div className="flex justify-between   my-12 items-center">
        <button className="btn text-white hover:text-black bg-black">
          <Link to={"/configuration"}>Prev</Link>
        </button>
        <Link
          disabled={!isSuccess}
          className="btn text-white hover:text-black bg-black"
          to={"/"}
        >
          Finish
        </Link>
      </div>
    </div>
  );
};

export default InstallationFinish;
