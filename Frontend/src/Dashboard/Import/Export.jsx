import { useEffect, useState } from "react";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import ImportAsCSV from "./ImportAsCSV";
import { useGetDefaultSettingsQuery } from "../../features/Settings/settingsApi";
import ImportData from "./ImportData";
import { useForm } from "react-hook-form";
import {
  useGetExportMutation,
  useGetAllExportsMutation,
} from "../../features/ExportApi/ExportApi";
import { useGetStoresQuery } from "../../features/Store/storeApi";

const Export = () => {
  const { register, handleSubmit } = useForm();
  const [filterData, setFilterData] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const { data: settingsData } = useGetDefaultSettingsQuery();
  const [url, setUrl] = useState("");

  const [getSpecificWarehouseCsv, { data: WareHouseData }] =
    useGetExportMutation();
  const [getallWarehouseCsv, { data: allWareHouseData }] =
    useGetAllExportsMutation();

  const onSubmit = (formData) => {
    const warehouseId = formData.warehouse_id;
    console.log(warehouseId);
    getSpecificWarehouseCsv(warehouseId);
  };
  const { data: storesData } = useGetStoresQuery();

  useEffect(() => {
    if (WareHouseData?.url) {
      setUrl(WareHouseData?.url);
    }
    if (allWareHouseData?.url) {
      setUrl(allWareHouseData?.url);
    }
  }, [WareHouseData, allWareHouseData]);

  const handleAllCsvData = () => {
    getallWarehouseCsv();
  };

  console.log(allWareHouseData);

  return (
    <DashboardBackground>
      <>
        <div className="mt-5">
          <p className="text-center text-xl font-semibold font-poppins underline underline-offset-8 ">
            Import / Export
          </p>
          <ImportData />
        </div>
        {/* <div>
          <p>
            To know about how to import csv file and know about file structure
            <a href="" className="px-2 underline text-blue-600">
              click here
            </a>
          </p>
        </div> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="font-bold text-lg mt-5 ">Export :</label>
          <div className="mt-2 border bg-[#F3F4F6] rounded">
            <div className="flex justify-between">
              <div className="flex space-x-2 items-center m-1">
                <button
                  onClick={() => handleAllCsvData}
                  type="button"
                  className="bg-[#e74c3c]  px-3 py-2 rounded-md text-white"
                >
                  All
                </button>
                <div>
                  <label className="input-group">
                    <select
                      // onChange={()=>}
                      className="select select-bordered w-full max-w-xs"
                      required
                      {...register("warehouse_id")}
                    >
                      <option value={""}>Select Warehouse Info</option>
                      {storesData?.data?.map((data) => (
                        <option key={data?.id} value={data?.id}>
                          {data?.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
              <div className="flex gap-10 ">
                <div className="m-3 flex">
                  {showButton && (
                    <a
                      href={url}
                      className="cursor-pointer m-auto border px-2 py-1 text-[#e74c3c]  rounded text-sm shadow transition duration-300"
                      rel="noopener noreferrer"
                      download
                    >
                      Download
                    </a>
                  )}
                  <div onClick={() => setShowButton(!showButton)}>
                    <button
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
        </form>
      </>
    </DashboardBackground>
  );
};

export default Export;
