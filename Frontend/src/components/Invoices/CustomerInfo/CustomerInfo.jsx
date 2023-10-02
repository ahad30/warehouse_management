import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCustomerInfo } from "../../../features/Invoice/invoiceSlice";
import { array } from "prop-types";

const CustomerInfo = ({ customers }) => {
  const dispatch = useDispatch();

  const [customer, setCustomer] = useState({
    id: "",
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

  const handleSelectedPhone = (phone) => {
    const matchedCustomer = customers?.find(
      (customer) => customer.phone === phone
    );
    setCustomer(matchedCustomer);
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
          defaultValue={customer?.name}
          disabled
        />
        <input
          onChange={handleInputChange}
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered input-md w-full my-2"
          defaultValue={customer?.email}
          disabled
        />
        <select
          className="select select-bordered w-full my-2"
          onChange={(e) => handleSelectedPhone(e.target.value)}
          required
          name="name"
        >
          <option value="">Select Customer Phone</option>
          {customers?.map((customer, i) => (
            <option key={i} value={customer?.phone}>
              {customer?.phone}
            </option>
          ))}
        </select>
        <input
          onChange={handleInputChange}
          name="address"
          type="text"
          placeholder="Address"
          className="input input-bordered input-md w-full my-2"
          defaultValue={customer?.address}
          disabled
        />
      </form>
    </>
  );
};

CustomerInfo.propTypes = {
  customers: array,
};

export default CustomerInfo;
