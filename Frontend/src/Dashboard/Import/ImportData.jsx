import { useSetImportMutation } from "../../features/Import/ImportApi";
import { useGetDefaultSettingsQuery } from "../../features/Settings/settingsApi";

const ImportData = () => {
  // const tableData = [
  //   {
  //     product_Name: "Apple MacBook Pro",
  //     color: "Silver",
  //     category: "Laptop",
  //     price: 2999,
  //   },
  //   {
  //     product_Name: "Microsoft Surface Pro",
  //     color: "White",
  //     category: "Laptop",
  //     price: 1999,
  //   },
  //   {
  //     product_Name: "Magic Mouse 2",
  //     color: "Black",
  //     category: "Accessories",
  //     price: 99,
  //   },
  // ];
  const [setImport, { data }] = useSetImportMutation();
  const { data: settingsData } = useGetDefaultSettingsQuery();
  const handleSubmit = async () => {
    setImport(data);
    console.log();
  };
  return (
    <>
      <div>
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
            onClick={handleSubmit}
            type="submit"
            className="inline-flex items-center py-2 px-4 ms-2 text-sm font-medium text-white rounded bg-[#e74c3c]"
          >
            Import
          </button>
        </div>
      </div>
    </>
  );
};

export default ImportData;
