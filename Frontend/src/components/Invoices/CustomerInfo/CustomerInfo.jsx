import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCustomerInfo } from "../../../features/Invoice/InvoiceSlice";

const CustomerInfo = () => {
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(getCustomerInfo(customer));
  }, [dispatch, customer]);

  return (
    <>
      <form>
        <h2 className="text-xl font-semibold mb-3">Billing To:</h2>
        <input
          onChange={handleInputChange}
          name="name"
          type="text"
          placeholder="Customer Name"
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
        />
        <input
          onChange={handleInputChange}
          name="address"
          type="text"
          placeholder="Address"
          className="input input-bordered input-md w-full my-2"
        />
      </form>
    </>
  );
};

export default CustomerInfo;
