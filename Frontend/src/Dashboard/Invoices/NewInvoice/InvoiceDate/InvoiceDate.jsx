import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addDays, format } from "date-fns";
import { getInvoice } from "../../../../features/Invoice/invoiceSlice";

const InvoiceDate = () => {
  const dispatch = useDispatch();
  // Get the current issue date formatted as "yyyy-MM-dd"
  const issueDate = format(new Date(), "yyyy-MM-dd");

  // Calculate the due date as 3 days from the current date and format it
  const dueDate = addDays(new Date(), 3);
  const formattedDueDate = format(dueDate, "yyyy-MM-dd");

  const [invoiceInfo, setInvoiceInfo] = useState({
    issueDate: issueDate || "",
    dueDate: formattedDueDate || "",
  });

  // Function to handle changes in the input fields
  const handleOnChange = (event) => {
    const { name, value } = event.target;

    // Update the invoiceInfo state with the new values
    setInvoiceInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UseEffect to dispatch the invoiceInfo to the Redux store
  useEffect(() => {
    dispatch(getInvoice(invoiceInfo));
  }, [dispatch, invoiceInfo]);

  return (
    <div className="mb-5 bg-[#F3F4F6] border border-[#D1D5DB] rounded-lg p-5">
      <div className="grid grid-cols-2 gap-x-5 ">
        <label htmlFor="Issue Date">
          Issue Date
          <input
            onChange={handleOnChange}
            name="issueDate"
            type="date"
            className="input my-3 input-bordered w-full"
            defaultValue={issueDate}
          />
        </label>
        <label htmlFor="Due Date">
          Due Date
          <input
            onChange={handleOnChange}
            name="dueDate"
            type="date"
            className="input my-3 input-bordered w-full"
            defaultValue={formattedDueDate}
          />
        </label>
      </div>
    </div>
  );
};

export default InvoiceDate;
