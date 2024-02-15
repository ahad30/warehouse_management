import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";

const ImportExport = () => {
  return (
    <DashboardBackground>
      <p className="text-xl font-semibold font-poppins mt-1 cursor-pointer">
        <span className="hover:underline ">Import /</span>
        <span className="hover:underline ">Export</span>
      </p>
      {/* <h2 className="text-xl font-semibold font-poppins mt-2 hover:underline cursor-pointer">
        Import / Export
      </h2> */}
      <div className="mt-5 border w-full bg-[#F3F4F6] rounded">
        <div className="flex px-6 gap-4 ">
          <label className="font-bold text-lg py-4 ">Import :</label>
          <input
            type="file"
            className="file-input bg-[#e74c3c] w-full max-w-xs mt-2 text-white"
          />
        </div>
      </div>
      <div className="mt-5 border w-full bg-[#F3F4F6] rounded">
        <div className="flex px-6 gap-4  ">
          <label className="font-bold text-lg py-4">Export :</label>
          <div className="flex space-x-2 items-center">
            <button className="bg-[#e74c3c] mt-3 px-3 py-2 rounded-md text-white">
              All
            </button>
            <div className="">
              <select className="select select-bordered w-full max-w-xs mt-2 font-bold">
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
    </DashboardBackground>
  );
};

export default ImportExport;
