import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import ImportTable from "./ImportTable";

const ImportExport = () => {
  return (
    <DashboardBackground>
      <>
        <div>
          <p className="text-xl font-semibold font-poppins mt-1 cursor-pointer">
            <span className="hover:underline ">Import /</span>
            <span className="hover:underline ">Export</span>
          </p>
          <div className="mt-5 border w-full bg-[#F3F4F6] rounded">
            <div className="flex ">
              <div className="px-4 mt-4">
                <label className="font-bold text-lg mt-4">Import:</label>
              </div>
              <input
                type="file"
                className="file-input bg-[#e74c3c] w-full max-w-[250px] mt-2 mb-2 text-white"
              />
            </div>
          </div>
          <div className="mt-4 border w-full bg-[#F3F4F6] rounded">
            <div className="flex px-4 gap-6">
              <label className="font-bold text-lg mt-5">Export :</label>
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
          </div>
          <ImportTable />
        </div>
      </>
    </DashboardBackground>
  );
};

export default ImportExport;
