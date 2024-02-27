import { useState } from "react";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import ImportAsCSV from "./ImportAsCSV";
import { useGetDefaultSettingsQuery } from "../../features/Settings/settingsApi";
import { useSetExportMutation } from "../../features/Export/ExportApi";

import ImportData from "./ImportData";

const ImportExport = () => {
  const [filterData, setFilterData] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const { data: settingsData } = useGetDefaultSettingsQuery();
  const [setExport, { data }] = useSetExportMutation();

  const handleSubmit = async () => {
    setExport();
    console.log();
  };

  return (
    <DashboardBackground>
      <>
        <div className="mt-5">
          <p className="text-center text-xl font-semibold font-poppins underline underline-offset-8 ">
            Import / Export
          </p>
          <ImportData />
          <div>
            <p>
              To know about how to import csv file and know about file structure
              <a href="" className="px-2 underline text-blue-600">
                click here
              </a>
            </p>
          </div>
          <label className="font-bold text-lg mt-5 ">Export :</label>
          <div className="mt-2 border bg-[#F3F4F6] rounded">
            <div className="flex justify-between">
              <div className="flex">
                <div className="flex space-x-2 items-center m-1">
                  <button className="bg-[#e74c3c]  px-3 py-2 rounded-md text-white">
                    All
                  </button>
                  <div>
                    <select className="select select-bordered w-full max-w-xs  font-bold">
                      <option disabled selected className="font-bold">
                        Select Warehouse
                      </option>
                      <option>Warehouse One</option>
                      <option>Warehouse Two</option>
                      <option>Warehouse Three</option>
                      <option>Warehouse Four</option>
                      <option>Warehouse Five</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex gap-10 ">
                <div className="m-3 flex">
                  {showButton && (
                    <a
                      href={data?.url}
                      className="cursor-pointer m-auto border px-2 py-1 text-[#e74c3c]  rounded text-sm shadow transition duration-300"
                      rel="noopener noreferrer"
                      download
                    >
                      Download
                    </a>
                  )}
                  <div onClick={() => setShowButton(!showButton)}>
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-[#e74c3c] rounded"
                    >
                      Generate CSV
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex lg:flex-row justify-end  mt-4">
            {/* Import download as CSV file */}
            <ImportAsCSV data={filterData} />
          </div>
        </div>
      </>
    </DashboardBackground>
  );
};

export default ImportExport;
