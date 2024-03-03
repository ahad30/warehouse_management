import { useState } from "react";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import ImportAsCSV from "./ImportAsCSV";
import { useGetDefaultSettingsQuery } from "../../features/Settings/settingsApi";
import ImportData from "./ImportData";
import {
  useGetExportMutation,
  useGetAllExportsMutation,
} from "../../features/ExportApi/ExportApi";
import { useGetStoresQuery } from "../../features/Store/storeApi";
import ExportModal from "./ExportModal";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";

const Export = () => {
  UseTitle("Import_Export");
  const [filterData, setFilterData] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const { data: settingsData } = useGetDefaultSettingsQuery();
  const [url, setUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [getSpecificWarehouseCsv, { data: WareHouseData }] =
    useGetExportMutation();
  const [getallWarehouseCsv, { data: allWareHouseData }] =
    useGetAllExportsMutation();
  const [track, setTrack] = useState("");
  const { data: storesData } = useGetStoresQuery();

  const generateCsvData = async (from) => {
    if (!track) {
      alert("plz select first");
    } else if (from === "All") {
      const res = await getallWarehouseCsv().unwrap();
      setUrl(res?.url);
      setShowButton(true);
    } else if (from === "warehouse") {
      const res = await getSpecificWarehouseCsv(track?.id).unwrap();
      setUrl(res?.url);
      setShowButton(true);
    }
  };

  console.log(track);
  console.log(url);
  return (
    <DashboardBackground>
      <>
        <div className="mt-5">
          <p className="text-center text-xl font-semibold font-poppins underline underline-offset-8 ">
            Import / Export
          </p>
          <ImportData />
        </div>
        <div>
          <p>
            To know about how to import csv file and know about file structure
            <button
              onClick={() => {
                setModalIsOpen(true);
              }}
              className="px-2 underline text-blue-600"
            >
              click here
            </button>
          </p>
          <ExportModal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
          />
        </div>

        <>
          <label className="font-bold text-lg mt-5 ">Export :</label>
          <div className="mt-2 border bg-[#F3F4F6] rounded">
            <div className="flex justify-between">
              <div className="flex space-x-2 items-center m-1">
                <button
                  onClick={() => setTrack("All")}
                  type="button"
                  className="bg-[#e74c3c]  px-3 py-2 rounded-md text-white"
                >
                  All
                </button>
                <div>
                  <label className="input-group">
                    <select
                      className="select select-bordered w-full max-w-xs"
                      required
                      onChange={(e) =>
                        setTrack({ name: "warehouse", id: e.target.value })
                      }
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
                  <div
                    onClick={() =>
                      generateCsvData(
                        track?.name === "warehouse" ? track?.name : track
                      )
                    }
                  >
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
          <div className="flex lg:flex-row justify-end mt-4">
            {/* Import download as CSV file */}
            <ImportAsCSV data={filterData} />
          </div>
        </>
      </>
    </DashboardBackground>
  );
};

export default Export;
