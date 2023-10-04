import { useForm } from "react-hook-form";
import {
  useGetCompanyInfoQuery,
  useUpdateCompanyInfoMutation,
} from "../../features/Settings/settingsApi";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const CompanyInfoUpdate = () => {
  const { handleSubmit, register, setValue } = useForm();

  const { data: companyInfoData } = useGetCompanyInfoQuery();
  const [
    updateCompanyInfo,
    {
      isLoading: updateIsLoading,
      isError: updateIsError,
      error: updateError,
      isSuccess: updateIsSuccess,
      data: updateData,
    },
  ] = useUpdateCompanyInfoMutation();

  const companyInfo = companyInfoData?.company_info;

  useEffect(() => {
    if (companyInfo) {
      setValue("company_name", companyInfo?.company_name || "");
      setValue("company_email", companyInfo?.company_email || "");
      setValue("company_phone", companyInfo?.company_phone || "");
      setValue("company_address", companyInfo?.company_address || "");
    }
  }, [companyInfo, setValue]);

  const handleSubmitCompanyInfo = (data) => {
    console.log({ ...data, id: companyInfo?.id });
    updateCompanyInfo({ ...data, id: companyInfo?.id });
  };

  useEffect(() => {
    if (updateIsLoading) {
      toast.loading("Loading...", { id: 1 });
    }

    if (updateIsError) {
      toast.error(updateError?.data?.message || updateError?.status, { id: 1 });
    }

    if (updateIsSuccess) {
      toast.success(updateData?.message, { id: 1 });
    }
  }, [
    updateIsLoading,
    updateIsError,
    updateError,
    updateIsSuccess,
    updateData?.message,
  ]);
  console.log(
    updateIsLoading,
    updateIsError,
    updateError,
    updateIsSuccess,
    updateData
  );
  return (
    <div>
      {/* Company info */}
      <h2 className="text-2xl font-semibold my-5">Company Info</h2>
      <form
        onSubmit={handleSubmit(handleSubmitCompanyInfo)}
        className="grid md:grid-cols-[2fr_2fr_2fr_2fr_1fr] gap-2"
      >
        <input
          name="name"
          type="text"
          className="input input-bordered input-md my-2"
          required
          {...register("company_name")}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered input-md my-2"
          required
          {...register("company_email")}
        />
        <input
          name="phone"
          type="text"
          placeholder="Phone"
          className="input input-bordered input-md my-2"
          required
          {...register("company_phone")}
        />
        <input
          name="address"
          type="text"
          placeholder="Address"
          className="input input-bordered input-md my-2"
          required
          {...register("company_address")}
        />
        <input
          type="submit"
          className="input input-bordered input-md my-2 bg-gray-600 text-white hover:bg-gray-600 hover:text-white cursor-pointer"
          // className="btn bg-gray-600 text-white hover:bg-gray-600 hover:text-white"
          defaultValue={"Update Info"}
          required
        />
      </form>
    </div>
  );
};

export default CompanyInfoUpdate;
