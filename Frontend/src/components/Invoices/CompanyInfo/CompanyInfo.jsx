import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCompanyInfo } from "../../../features/Invoice/InvoiceSlice";

const CompanyInfo = () => {
  const dispatch = useDispatch();
  const [company, setCompany] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
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
          name="name"
          type="text"
          placeholder="Company Name"
          className="input input-bordered input-md w-full my-2"
          required
        />
        <input
          onChange={handleInputChange}
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered input-md w-full my-2"
        />
        <input
          onChange={handleInputChange}
          name="phone"
          type="text"
          placeholder="Phone"
          className="input input-bordered input-md w-full my-2"
          required
        />
        <input
          onChange={handleInputChange}
          name="address"
          type="text"
          placeholder="Address"
          className="input input-bordered input-md w-full my-2"
          required
        />
      </form>
    </>
  );
};

export default CompanyInfo;
