import { useEffect } from "react";
import { useSetImportMutation } from "../../features/Import/ImportApi";
import { useGetDefaultSettingsQuery } from "../../features/Settings/settingsApi";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
const ImportData = () => {
  const { data: settingsData } = useGetDefaultSettingsQuery();
  const [setImport, { isLoading, isError, error, isSuccess, data }] =
    useSetImportMutation();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", data?.csv[0]);
    setImport(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully Imported", { id: 1 });
    } else if (isError) {
      toast.error("Error importing");
    } else if (isLoading) {
      toast.loading("Importing! Please wait...");
      setTimeout(() => {
        toast.remove();
      }, 5000);
    }
  }, [
    isLoading,
    isError,
    error,
    isSuccess,
    data?.message,
    data?.status,
    dispatch,
  ]);

  return (
    <>
      <div>
        <p className="text-xl font-semibold font-poppins mt-1 cursor-pointer">
          <span className="hover:underline-offset-8 ">Import :</span>
        </p>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex mt-3 mb-2">
            <input
              type={"file"}
              id={"csvFileInput"}
              accept={".csv"}
              name="csv"
              {...register("csv")}
              className="file-input bg-[#e74c3c] w-full text-white"
            />

            <button
              type="submit"
              onClick={handleSubmit}
              className="inline-flex items-center py-2 px-4 ms-2 text-sm font-medium text-white rounded bg-[#e74c3c]"
            >
              Import
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ImportData;
