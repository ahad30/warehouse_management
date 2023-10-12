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

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("company_name", data?.company_name);
    formData.append("company_email", data?.company_email);
    formData.append("company_phone", data?.company_phone);
    formData.append("company_address", data?.company_address);
    formData.append("id", companyInfo?.id);
    if (data?.company_img.length > 0) {
      formData.append("company_img", data?.company_img[0]);
    }

    updateCompanyInfo(formData);
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
        className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-center justify-center"
      >
        {/* file upload  */}
        <div className="w-full lg:row-span-2 flex flex-col lg:justify-center lg:items-center">
          <div className=" bg-white p-5 w-40 h-40 flex justify-center items-center rounded-lg">
            <img
              className="w-full"
              src={
                companyInfo?.company_img
                  ? `${
                      import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT
                    }/uploads/companyInfo/${companyInfo?.company_img}`
                  : `https://cdn-icons-png.flaticon.com/512/5149/5149174.png`
              }
            />
          </div>

          {/* <label htmlFor="" id="customFileInput" className="custom-file-input text-black opacity-70">choose file</label> */}

          <div className="form-control w-full mt-5">
            <input
              type="file"
              className="file-input file-input-bordered"
              id="customFileInput"
              {...register("company_img")}
            />
          </div>
        </div>

        {/* name field  */}
        <div className="lg:col-span-2">
          <label htmlFor="name" className="label">
            Company Name
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
        <div className="lg:col-span-2">
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
        <div className=" lg:col-span-2">
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
        <div className="lg:col-span-2">
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

        <div className=" flex lg:justify-end lg:col-span-5">
          <input
            type="submit"
            className="input w-full input-bordered input-md my-2 lg:btn-wide bg-[#0369a1] text-white hover:bg-gray-600 hover:text-white cursor-pointer"
            defaultValue={"Update Info"}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default CompanyInfoUpdate;
