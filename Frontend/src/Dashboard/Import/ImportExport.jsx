import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";

const ImportExport = () => {
  return (
 <DashboardBackground>
   <h2 className="text-xl font-semibold font-poppins mt-2">
      Import/Export
  </h2>
  <div className="mt-5">
  <div className="flex flex-col">
    <label className="font-bold text-lg">Import :</label>
    <input type="file" className="file-input bg-[#e74c3c] w-full max-w-xs mt-2 text-white"/>
  </div> 
  </div>
  <div className="mt-5">
  <div className="flex flex-col">
    <label className="font-bold text-lg">Export :</label>
  <div className="flex space-x-2 items-center">
    <div className="">

  <select className="select select-bordered w-full max-w-xs mt-3 font-bold">
  <option disabled selected className="font-bold">Select Warehouse</option>
  <option>Warehouse One</option>
  <option>Warehouse Two</option>
  <option>Warehouse Three</option>
  <option>Warehouse Four</option>
  <option>Warehouse Five</option>
</select>
  </div>
  <button className="bg-[#e74c3c] mt-3 px-3 py-2 rounded-md text-white  w-[5%]">All</button>
</div>
  </div> 
  </div>
 </DashboardBackground>
  )
}

export default ImportExport;