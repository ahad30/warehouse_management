import { useForm } from "react-hook-form";
import { useGetCompanyInfoQuery } from "../../../features/Settings/SettingsApi";
import CompanyInfo from "../CompanyInfo/CompanyInfo";
import CustomerInfo from "../CustomerInfo/CustomerInfo";
import { useEffect } from "react";

const BillingInfo = () => {
  const { data: companyInfoData } = useGetCompanyInfoQuery();
  const companyInfo = companyInfoData?.company_info;

  const { register, setValue } = useForm();

  useEffect(() => {
    if (companyInfo) {
      setValue("company_name", companyInfo?.company_name || "");
      setValue("company_email", companyInfo?.company_email || "");
      setValue("company_phone", companyInfo?.company_phone || "");
      setValue("company_address", companyInfo?.company_address || "");
    }
  }, [companyInfo, setValue]);

  return (
    <>
      <div className="my-5">
        <div className="grid  md:grid-cols-2 gap-10">
          <CompanyInfo />
          {/* <>
            <form>
              <h2 className="text-xl font-semibold mb-3">Billing From:</h2>
              <input
                name="name"
                type="text"
                placeholder="Company Name"
                className="input input-bordered input-md w-full my-2"
                required
                {...register("company_name")}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="input input-bordered input-md w-full my-2"
                {...register("company_email")}
              />
              <input
                name="phone"
                type="text"
                placeholder="Phone"
                className="input input-bordered input-md w-full my-2"
                required
                {...register("company_phone")}
              />
              <input
                name="address"
                type="text"
                placeholder="Address"
                className="input input-bordered input-md w-full my-2"
                required
                {...register("company_address")}
              />
            </form>
          </> */}
          <CustomerInfo />
        </div>
      </div>
    </>
  );
};

export default BillingInfo;
