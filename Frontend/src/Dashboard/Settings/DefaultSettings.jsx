import { useForm } from "react-hook-form";
import {
  useGetCompanyInfoQuery,
  useUpdateCompanyInfoMutation,
} from "../../features/Settings/SettingsApi";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const DefaultSettings = () => {
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

  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    if (companyInfo) {
      setValue("company_name", companyInfo?.company_name || "");
      setValue("company_email", companyInfo?.company_email || "");
      setValue("company_phone", companyInfo?.company_phone || "");
      setValue("company_address", companyInfo?.company_address || "");
    }
  }, [companyInfo, setValue]);

  const onSubmit = (data) => {
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
    <DashboardBackground>
      <div>
        {/* Company info */}
        <h2 className="text-2xl font-semibold my-5">Company Info</h2>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
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
      </div>
      {/* QR Code Status */}
      <div className="flex gap-x-2 text-xl my-5">
        QR Code Status:
        <input type="checkbox" className="toggle toggle-md" checked />
      </div>
      {/* User profile */}
      <h2 className="text-2xl font-semibold my-5">User Profile</h2>
      <div className="grid md:grid-cols-[1fr_3fr] gap-10 mt-10 border rounded-md p-5">
        <div className="sm:border-r-2 w-[90%] md:w-[70%] mx-auto">
          <div className="avatar">
            <div className="w-28 rounded-full">
              <img
                src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`}
              />
            </div>
          </div>
        </div>
        <form>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="input input-bordered input-md w-full my-2"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered input-md w-full my-2"
          />
          <input
            name="phone"
            type="text"
            placeholder="Phone"
            className="input input-bordered input-md w-full my-2"
            required
          />
          <input
            name="role"
            type="text"
            placeholder="Role"
            className="input input-bordered input-md w-full my-2"
            required
          />
          <input
            name="address"
            type="text"
            placeholder="Address"
            className="input input-bordered input-md w-full my-2"
            required
          />
          <input
            name="zip_code"
            type="text"
            placeholder="Zip Code"
            className="input input-bordered input-md w-full my-2"
            required
          />
          <input
            name="city"
            type="text"
            placeholder="city"
            className="input input-bordered input-md w-full my-2"
            required
          />
          <input
            name="state"
            type="text"
            placeholder="state"
            className="input input-bordered input-md w-full my-2"
            required
          />
          <input
            name="country"
            type="text"
            placeholder="country"
            className="input input-bordered input-md w-full my-2"
            required
          />
          <input
            type="submit"
            // className="input input-bordered input-md my-2"
            className="btn bg-gray-600 text-white hover:bg-gray-600 hover:text-white"
            defaultValue={"Update Profile"}
            required
          />
        </form>
      </div>
    </DashboardBackground>
  );
};

export default DefaultSettings;
