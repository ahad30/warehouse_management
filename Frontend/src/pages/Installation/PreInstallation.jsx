import { Link, useLocation } from "react-router-dom";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import { useGetStepOneQuery } from "../../features/Installation/installationApi";
import Step from "./Step";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";

const PreInstallation = () => {
  UseTitle("Pre Installation");
  const { data: stepOneData, isLoading } = useGetStepOneQuery();

  const location = useLocation();
  const path = location?.pathname;

  const extensionData = [
    {
      name: "internetConnection",
      currentStatus: stepOneData?.internetConnection ? "on" : "off",
      status: stepOneData?.internetConnection ? "ok" : "not ok",
    },
    {
      name: "mysqli",
      currentStatus: stepOneData?.mysqli ? "on" : "off",
      status: stepOneData?.mysqli ? "ok" : "not ok",
    },
    {
      name: "curl",
      currentStatus: stepOneData?.curl ? "on" : "off",
      status: stepOneData?.curl ? "ok" : "not ok",
    },
    {
      name: "mbstring",
      currentStatus: stepOneData?.mbstring ? "on" : "off",
      status: stepOneData?.mbstring ? "ok" : "not ok",
    },
    {
      name: "xml",
      currentStatus: stepOneData?.xml ? "on" : "off",
      status: stepOneData?.xml ? "ok" : "not ok",
    },
    {
      name: "gd",
      currentStatus: stepOneData?.gd ? "on" : "off",
      status: stepOneData?.gd ? "ok" : "not ok",
    },
    {
      name: "allowUrlFopen",
      currentStatus: stepOneData?.allowUrlFopen ? "on" : "off",
      status: stepOneData?.allowUrlFopen ? "ok" : "not ok",
    },
    {
      name: "openSSLPhpExtension",
      currentStatus: stepOneData?.openSSLPhpExtension ? "on" : "off",
      status: stepOneData?.openSSLPhpExtension ? "ok" : "not ok",
    },
    {
      name: "pdoPhpExtension",
      currentStatus: stepOneData?.pdoPhpExtension ? "on" : "off",
      status: stepOneData?.pdoPhpExtension ? "ok" : "not ok",
    },
    {
      name: "bcMathPhpExtension",
      currentStatus: stepOneData?.bcMathPhpExtension ? "on" : "off",
      status: stepOneData?.bcMathPhpExtension ? "ok" : "not ok",
    },
    {
      name: "ctypePhpExtension",
      currentStatus: stepOneData?.ctypePhpExtension ? "on" : "off",
      status: stepOneData?.ctypePhpExtension ? "ok" : "not ok",
    },
    {
      name: "jsonPhpExtension",
      currentStatus: stepOneData?.jsonPhpExtension ? "on" : "off",
      status: stepOneData?.jsonPhpExtension ? "ok" : "not ok",
    },
    {
      name: "tokenizerPhpExtension",
      currentStatus: stepOneData?.tokenizerPhpExtension ? "on" : "off",
      status: stepOneData?.tokenizerPhpExtension ? "ok" : "not ok",
    },
    {
      name: "fileinfoPhpExtension",
      currentStatus: stepOneData?.fileinfoPhpExtension ? "on" : "off",
      status: stepOneData?.fileinfoPhpExtension ? "ok" : "not ok",
    },
  ];

  if (isLoading) {
    return <UseLoading />;
  }

  return (
    <div className="lg:p-20 p-5 flex flex-col gap-y-4">
      <Step path={path}></Step>

      {/* table one  */}
      <div className="w-full ">
        <p>
          1. Please configure your php settings to match following requirement
        </p>
        {/* table one  */}
        <div className="overflow-x-auto my-5">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="uppercase bg-gray-300 p-2 font-semibold">
                <th>PHP SETTINGS</th>
                <th>CURRENT VERSION</th>
                <th>REQUIRED VERSION</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody className="uppercase">
              {/* row 1 */}
              <tr className=" ">
                <th className="mb-3">PHP Version</th>
                <td className="mb-3">{stepOneData?.currentPhpVersion}</td>
                <td className="mb-3">{stepOneData?.requiredPhpVersion}</td>
                <td className=" ">
                  <button
                    className={`btn btn-sm rounded-full my-3 ${
                      stepOneData?.currentPhpVersion >=
                      stepOneData?.requiredPhpVersion
                        ? `text-white bg-blue-500`
                        : "text-white bg-red-500"
                    }`}
                  >
                    {stepOneData?.currentPhpVersion >=
                    stepOneData?.requiredPhpVersion
                      ? "ok"
                      : "not ok"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* table two*/}
      <div className="w-full">
        <p>
          2. Please make sure the extension/settings listed below are
          installed/enabled your php setting to match following requirement:
        </p>
        {/* table one  */}
        <div className="overflow-x-auto my-5">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="uppercase bg-gray-300 p-2 font-semibold">
                <th>Extension/Settings</th>
                <th>Required Settings</th>
                <th>Current Settings</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="uppercase">
              {/* row 1 */}

              {extensionData.map((item, idx) => (
                <tr key={idx} className=" ">
                  <th className="mb-3">{item?.name}</th>
                  <td className="mb-3">On</td>
                  <td className="mb-3">{item?.currentStatus}</td>
                  <td className="">
                    <button
                      className={`btn btn-sm rounded-full my-3 ${
                        item?.status
                          ? `text-white bg-blue-500`
                          : "text-white bg-red-500"
                      }`}
                    >
                      {item?.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* footer page */}
      <div className="w-full my-12">
        <p className="mb-12">
          3. Please make sure the extension/settings listed below are
          installed/enabled your php setting to match following requirement:
        </p>
        {/* each footer start */}
        <div className="flex justify-between border-b  border-gray-600 my-2  w-full  pb-2 ">
          <p className="font-bold">/resources</p>
          <div className="">
            <button
              className={`btn btn-sm rounded-full my-3 ${
                stepOneData?.resourcesPermission
                  ? `text-white bg-blue-500`
                  : "text-white bg-red-500"
              }`}
            >
              {stepOneData?.resourcesPermission ? "ok" : "not ok"}
            </button>
          </div>
        </div>
        {/* each footer end */}
        {/* each footer start */}
        <div className="flex justify-between border-b border-gray-600 my-2  w-full  pb-2 ">
          <p className="font-bold">/public</p>
          <div className="">
            {" "}
            <button
              className={`btn btn-sm rounded-full my-3 ${
                stepOneData?.publicPermission
                  ? `text-white bg-blue-500`
                  : "text-white bg-red-500"
              }`}
            >
              {stepOneData?.publicPermission ? "ok" : "not ok"}
            </button>
          </div>
        </div>
        {/* each footer end */}
        {/* each footer start */}
        <div className="flex justify-between border-b border-gray-600 my-2  w-full  pb-2 ">
          <p className="font-bold">/storage</p>
          <div className="">
            {" "}
            <button
              className={`btn btn-sm rounded-full my-3 ${
                stepOneData?.storagePermission
                  ? `text-white bg-blue-500`
                  : "text-white bg-red-500"
              }`}
            >
              {stepOneData?.storagePermission ? "ok" : "not ok"}
            </button>
          </div>
        </div>

        {/* each footer end */}
        {/* each footer start */}
        <div className="flex justify-between border-b border-gray-600 my-2  w-full  pb-2 ">
          <p className="font-bold">.env</p>
          <div className="">
            {" "}
            <button
              className={`btn btn-sm rounded-full my-3 ${
                stepOneData?.envPermission
                  ? `text-white bg-blue-500`
                  : "text-white bg-red-500"
              }`}
            >
              {stepOneData?.envPermission ? "ok" : "not ok"}
            </button>
          </div>
        </div>
        {/* each footer end */}
      </div>
      <div className="flex justify-between items-center">
        <button className="btn bg-black text-white ">
          <Link to={"/"}>Prev</Link>
        </button>
        <button
          className="btn bg-black text-white"
          disabled={!stepOneData?.requirementForStep1}
        >
          <Link to={"/verification"}>Next</Link>
        </button>
      </div>
    </div>
  );
};

export default PreInstallation;
