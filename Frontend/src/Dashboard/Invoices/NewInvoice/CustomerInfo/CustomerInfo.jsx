import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { array } from "prop-types";
import { getCustomerInfo } from "../../../../features/Invoice/invoiceSlice";

const CustomerInfo = ({ customers }) => {
  const dispatch = useDispatch();

  const [customer, setCustomer] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Function to handle changes in the input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update the customer state with the new values
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle selecting a customer by phone number
  const handleSelectedPhone = (phone) => {
    // Find the customer in the list of customers with a matching phone number
    const matchedCustomer = customers?.find(
      (customer) => customer?.phone === phone
    );
    // Set the selected customer in the state
    setCustomer(matchedCustomer);
  };

  // UseEffect to dispatch the customer information to the Redux store
  useEffect(() => {
    dispatch(getCustomerInfo(customer));
  }, [dispatch, customer]);

  return (
    <div className="bg-[#F3F4F6] border border-[#D1D5DB] rounded-lg p-5">
      <h2 className="text-2xl font-semibold mb-9">Billing To</h2>
      <form>
        <label htmlFor="">
          Select Customers <br />
          <select
            className="select select-bordered w-full my-3"
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
              className="input input-bordered input-md w-full my-3"
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
              className="input input-bordered input-md w-full my-3"
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
              className="input input-bordered input-md w-full my-3"
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
              className="input input-bordered input-md w-full my-3"
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
