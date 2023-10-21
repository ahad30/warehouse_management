import { Link, useLocation } from "react-router-dom";
import Step from "./Step";
import { useState } from "react";
import { useFinalStepMutation } from "../../features/Installation/installationApi";

const InstallationFinish = () => {
  const [finalStep, { isLoading, isError, error, isSuccess, data }] =
    useFinalStepMutation();
  const [databaseSql, setDatabaseSql] = useState({});
  const location = useLocation();
  const path = location?.pathname;

  const submitData = (e) => {
    const { name, value } = e.target;
    setDatabaseSql((prev) => ({ ...prev, [name]: value }));
  };
  const importSql = (e) => {
    finalStep({
      requirementForStep1: 1,
      requirementForStep2: 1,
      requirementForStep3: 1,
    });
  };

  console.log(isLoading, isError, error, isSuccess, data);
  return (
    <div className="lg:p-12 p-3">
      <Step path={path}></Step>

      {/* <form */}
      {/* action=""
        className="w-full flex lg:p-12 bg-gray-100 justify-center "
      > */}
      <label htmlFor="file">
        <div className="flex justify-center">
          <button
            onClick={importSql}
            className="btn text-white btn-wide bg-blue-500 "
          >
            Import SQL
          </button>
        </div>
        {/* <input onChange={submitData} name="sql_file" className="hidden" id="file" type="file" /> */}
      </label>
      {/* </form> */}

      <div className="flex justify-between   my-12 items-center">
        <button className="btn text-white hover:text-black bg-black">
          <Link to={"/configuration"}>Prev</Link>
        </button>
        <button className="btn text-white hover:text-black bg-black">
          Finish
        </button>
      </div>
    </div>
  );
};

export default InstallationFinish;
