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
      (customer) => customer?.phone === phone
    );
    setCustomer(matchedCustomer);
  };

  useEffect(() => {
    dispatch(getCustomerInfo(customer));
  }, [dispatch, customer]);

  return (
    <div className="bg-[#F3F4F6] border border-[#D1D5DB] rounded-lg p-5">
      <h2 className="text-2xl font-semibold mb-3">Billing To</h2>
      <form>
        <label htmlFor="">
          Select Customers <br />
          <select
            className="select select-bordered sm:w-full my-2"
            onChange={(e) => handleSelectedPhone(e.target.value)}
            name="name"
          >
            <option value="">Select Customer Phone</option>
            {customers?.map((customer, i) => (
              <option key={i} value={customer?.phone}>
                {customer?.phone}
              </option>
            ))}
          </select>
        </label>
        <div className="grid sm:grid-cols-2 gap-x-5">
          <label htmlFor="Name">
            Customer Name
            <input
              onChange={handleInputChange}
              name="name"
              type="text"
              placeholder="Customer Name"
              className="input input-bordered input-md w-full my-2"
              required
              defaultValue={customer?.name}
            />
          </label>
          <label htmlFor="Phone">
            Customer Phone
            <input
              onChange={handleInputChange}
              name="phone"
              type="text"
              placeholder="Customer Phone"
              className="input input-bordered input-md w-full my-2"
              required
              defaultValue={customer?.phone}
            />
          </label>
          <label htmlFor="">
            Customer Email
            <input
              onChange={handleInputChange}
              name="email"
              type="email"
              placeholder="Customer Email"
              className="input input-bordered input-md w-full my-2"
              defaultValue={customer?.email}
            />
          </label>

          <label htmlFor="Address">
            Customer Address
            <input
              onChange={handleInputChange}
              name="address"
              type="text"
              placeholder="Customer Address"
              className="input input-bordered input-md w-full my-2"
              defaultValue={customer?.address}
            />
          </label>
        </div>
      </form>
    </div>
  );
};

CustomerInfo.propTypes = {
  customers: array,
};

export default CustomerInfo;
