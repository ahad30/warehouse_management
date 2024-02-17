import { useState } from "react";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { useGetDefaultSettingsQuery } from "../../features/Settings/settingsApi";
import ImportAsCSV from "./ImportAsCSV";

const ImportExport = () => {
  const [filterData, setFilterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;
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
        <div>
          <p className="text-xl font-semibold font-poppins mt-1 cursor-pointer">
            <span className="hover:underline ">Import /</span>
            <span className="hover:underline ">Export</span>
          </p>
          <div className="mt-5 border w-full bg-[#F3F4F6] rounded">
            <div className="flex justify-between">
              <div className="mt-4 flex">
                <label className="font-bold text-lg mt-4 px-4">Import:</label>
                <input
                  type="file"
                  className="file-input bg-[#e74c3c] w-full max-w-[350px] mt-2 mb-2 text-white"
                />
              </div>
              <div className="mt-7 mr-5">
                <button className="px-5 py-2 bg-[#e74c3c] text-white rounded">
                  Import
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 border w-full bg-[#F3F4F6] rounded">
            <div className="flex justify-between">
              <div className="flex">
                <label className="font-bold text-lg mt-5 px-4">Export :</label>
                <div className="flex space-x-2 items-center">
                  <button className="bg-[#e74c3c] mt-3 px-3 py-2 rounded-md text-white">
                    All
                  </button>
                  <div className="mb-1">
                    <select className="select select-bordered w-full max-w-xs mt-4 font-bold">
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
              <div className="flex gap-10">
                <div className="flex flex-col md:flex-row justify-start md:justify-between md:items-center gap-3 mt-5">
                  <label htmlFor="from">
                    <input
                      className="input input-sm input-bordered w-full"
                      type="date"
                      onChange={(e) => handleStartDate(e.target.value)} // Call handleStartDate when the "From" date changes
                    />
                  </label>
                  <label htmlFor="to">
                    <input
                      className="input input-sm input-bordered w-full"
                      type="date"
                      onChange={(e) => handleEndDate(e.target.value)} // Call handleEndDate when the "To" date changes
                    />
                  </label>
                </div>
                <div className="mt-5 mr-4">
                  <button className="px-5 py-2 bg-[#e74c3c] text-white rounded">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex lg:flex-row justify-end gap-2 mt-4">
            {/* Import download as CSV file */}
            <ImportAsCSV data={filterData} />
          </div>
        </div>
      </>
    </DashboardBackground>
  );
};

export default ImportExport;
