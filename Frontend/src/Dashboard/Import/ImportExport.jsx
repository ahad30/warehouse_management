import { useEffect, useState } from "react";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import ImportAsCSV from "./ImportAsCSV";
import ImportTable from "./ImportTable";
import { useGetDefaultSettingsQuery } from "../../features/Settings/settingsApi";
import { useAddExportMutation } from "../../features/Export/ExportApi";
import { useGetProductsQuery } from "../../features/Product/productApi";

const ImportExport = () => {
  const [filterData, setFilterData] = useState([]);
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  // const [date, setDate] = useState(null);
  const { data: settingsData } = useGetDefaultSettingsQuery();

  const [addExport, { isLoading, isError, error, isSuccess, data }] =
    useAddExportMutation();
  const {
    data: productsData,
    isLoading: productsIsLoading,
    isSuccess: productsIsSuccess,
  } = useGetProductsQuery({ pageNumber: 0 });
  // console.log(productsData);
  // const handleStartDate = (date) => {
  //   setStartDate(date);
  //   setDate(null);
  // };

  // const handleEndDate = (date) => {
  //   setEndDate(date);
  //   setDate(null);
  // };
  const handleSubmit = async () => {
    console.log("exporting");
    console.log(productsData?.products?.data);
    // addExport();
    // const url = window.URL.createObjectURL(
    //   new Blob([productsData?.products?.data])
    // );
    // const link = document.createElement("a");
    // link.href = url;
    // link.setAttribute("download", "file.csv"); //or any other extension
    // document.body.appendChild(link);
    // link.click();
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

          <div className="flex mt-3 mb-2">
            <div className="w-full">
              <input
                type="file"
                className="file-input bg-[#e74c3c] w-full text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2 px-4 ms-2 text-sm font-medium text-white rounded bg-[#e74c3c]"
            >
              Import
            </button>
          </div>

          <label className="font-bold text-lg mt-5 ">Export :</label>
          <div className="mt-2 border bg-[#F3F4F6] rounded">
            <div className="flex justify-between">
              <div className="flex">
                {/* <label className="font-bold text-lg  p-5">Export :</label> */}
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
                <div className="m-3">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-[#e74c3c] rounded"
                  >
                    Export
                  </button>
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
