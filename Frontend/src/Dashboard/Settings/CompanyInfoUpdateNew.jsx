import { useForm } from "react-hook-form";
import {
  useGetCompanyInfoQuery,
  useUpdateCompanyInfoMutation,
} from "../../features/Settings/settingsApi";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const CompanyInfoUpdateNew = () => {
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
        className="grid grid-cols-5 gap-5 items-center justify-center"
      >

        {/* file upload  */}
        <div className="w-full row-span-2 flex flex-col justify-center items-center">
          <div className=" bg-white  p-5 w-40 h-40  flex justify-center items-center rounded-lg">
            <img
              className="w-full"

              src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`}
            />
          </div>


          {/* <label htmlFor="" id="customFileInput" className="custom-file-input text-black opacity-70">choose file</label> */}

          <input
            type="file"
            className="file-input file-input-ghost w-full max-w-xs custom-file-input"
            id="customFileInput"
            {...register("company_logo")}
          />
        </div>

        {/* name field  */}
        <div className="col-span-2">
          <label htmlFor="name" className="label">
            {" "}
            company Name
          </label>
          <input
            name="name"
            type="text"
            className="input input-bordered input-md my-2 w-full"
            required
            {...register("company_name")}
          />
        </div>

        {/* email field  */}
        <div className="col-span-2">
          <label htmlFor="email" className="label">
            Company email
          </label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered input-md my-2 w-full"
            required
            {...register("company_email")}
          />
        </div>

          {/* phone field */}
        <div className=" col-span-2">
          <label htmlFor="phone"> Phone</label>
          <input
            name="phone"
            type="text"
            placeholder="Phone"
            className="input input-bordered input-md my-2 w-full"
            required
            {...register("company_phone")}
          />
        </div>
         

         {/* address field */}
        <div className="col-span-2">
          <label htmlFor="address">Address</label>
        <input
          name="address"
          type="text"
          placeholder="Address"
          className="input input-bordered input-md my-2 w-full"
          required
          {...register("company_address")}
        />
        </div>

        <div className=" flex justify-end col-span-5">
          <input
            type="submit"
            className="input input-bordered input-md my-2 btn-wide bg-[#0369a1] text-white hover:bg-gray-600 hover:text-white cursor-pointer"
            // className="btn bg-gray-600 text-white hover:bg-gray-600 hover:text-white"
            defaultValue={"Update Info"}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default CompanyInfoUpdateNew;