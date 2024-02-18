import { useState } from "react";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { useGetDefaultSettingsQuery } from "../../features/Settings/settingsApi";
import ImportAsCSV from "./ImportAsCSV";
import ImportTable from "./ImportTable";

const ImportExport = () => {
  const [filterData, setFilterData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [date, setDate] = useState(null);
  const { data: settingsData } = useGetDefaultSettingsQuery();

  const handleStartDate = (date) => {
    setStartDate(date);
    setDate(null);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
    setDate(null);
  };

  return (
    <DashboardBackground>
      <>
        <div className="mt-5">
          <p className="text-center text-xl font-semibold font-poppins underline underline-offset-8 ">
            Import / Export
          </p>
          <p className="text-xl font-semibold font-poppins mt-1 cursor-pointer">
            <span className="hover:underline-offset-8 ">Import :</span>
          </p>

          <form className="flex mt-2">
            <div className="w-full">
              <label htmlFor="voice-search" className="sr-only">
                Search
              </label>
              <input
                type="file"
                className="file-input bg-[#e74c3c] w-full text-white "
                required
              />
              {/* <button
                type="button"
                className="absolute inset-y-0 end-0 flex items-center pe-3"
              >
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
                  />
                </svg>
              </button> */}
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2 px-4 ms-2 text-sm font-medium text-white rounded bg-[#e74c3c]"
            >
              Import
            </button>
          </form>
          <div className="mt-5 border bg-[#F3F4F6] rounded">
            <div className="flex justify-between">
              <div className="flex">
                <label className="font-bold text-lg  p-5">Export :</label>
                <div className="flex space-x-2 items-center ">
                  <button className="bg-[#e74c3c]  px-3 py-2 rounded-md text-white">
                    All
                  </button>
                  <div className="">
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
                <div className="flex flex-col md:flex-row justify-start md:justify-between md:items-center gap-3">
                  <label htmlFor="from">
                    <input
                      className="input input-sm input-bordered w-full cursor-pointer"
                      type="date"
                      onChange={(e) => handleStartDate(e.target.value)} // Call handleStartDate when the "From" date changes
                    />
                  </label>
                  <label htmlFor="to">
                    <input
                      className="input input-sm input-bordered w-full cursor-pointer"
                      type="date"
                      onChange={(e) => handleEndDate(e.target.value)} // Call handleEndDate when the "To" date changes
                    />
                  </label>
                </div>
                <div className="m-3">
                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-[#e74c3c] rounded    "
                  >
                    <svg
                      className="w-4 h-4 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    Search
                  </button>
                  {/* <button className="px-5 py-2 bg-[#e74c3c] text-white rounded">
                    Search
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="flex lg:flex-row justify-end  mt-4">
            {/* Import download as CSV file */}
            <ImportAsCSV data={filterData} />
          </div>
          <ImportTable />
        </div>
      </>
    </DashboardBackground>
  );
};

export default ImportExport;
