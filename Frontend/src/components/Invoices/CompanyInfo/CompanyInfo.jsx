import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCompanyInfo } from "../../../features/Invoice/InvoiceSlice";
import { useGetCompanyInfoQuery } from "../../../features/Settings/SettingsApi";

const CompanyInfo = () => {
  const { data: companyInfoData } = useGetCompanyInfoQuery();
  const companyInfo = companyInfoData?.company_info;
  const dispatch = useDispatch();
  const [company, setCompany] = useState({
    company_name: "",
    company_email: "",
    company_phone: "",
    company_address: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(getCompanyInfo(company));
  }, [dispatch, company]);

  return (
    <>
      <form>
        <h2 className="text-xl font-semibold mb-3">Billing From:</h2>
        <input
          onChange={handleInputChange}
          name="company_name"
          type="text"
          placeholder="Company Name"
          className="input input-bordered input-md w-full my-2"
          required
          defaultValue={companyInfo?.company_name}
        />
        <input
          onChange={handleInputChange}
          name="company_email"
          type="email"
          placeholder="Email"
          className="input input-bordered input-md w-full my-2"
          required
          defaultValue={companyInfo?.company_email}
        />
        <input
          onChange={handleInputChange}
          name="company_phone"
          type="text"
          placeholder="Phone"
          className="input input-bordered input-md w-full my-2"
          required
          defaultValue={companyInfo?.company_phone}
        />
        <input
          onChange={handleInputChange}
          name="company_address"
          type="text"
          placeholder="Address"
          className="input input-bordered input-md w-full my-2"
          required
          defaultValue={companyInfo?.company_address}
        />
      </form>
    </>
  );
};

export default CompanyInfo;
