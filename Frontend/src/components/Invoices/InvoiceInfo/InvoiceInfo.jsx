import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getInvoice } from "../../../features/Invoice/InvoiceSlice";

const InvoiceInfo = () => {
  const dispatch = useDispatch();

  const [invoice, setInvoice] = useState({
    invoiceNo: 0,
    issueDate: "",
    dueDate: "",
  });

  // GET INPUT VALUE FROM INPUT FIELD
  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // INVOICE SEND TO REDUX STORE
  useEffect(() => {
    dispatch(getInvoice(invoice));
  }, [dispatch, invoice]);

  return (
    <div className="my-5">
      <h2 className="text-2xl font-bold mb-3">Invoice</h2>
      <form className="flex flex-col md:flex-row justify-normal md:justify-between md:items-center gap-5">
        <div className="form-control">
          <label className="input-group input-group-sm">
            <span>Invoice #</span>
            <input
              onChange={handleOnChange}
              name="invoiceNo"
              type="text"
              placeholder="123456"
              className="input input-bordered input-sm"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group input-group-sm">
            <span>Invoice Issue Date:</span>
            <input
              onChange={handleOnChange}
              name="issueDate"
              type="date"
              placeholder="Type here"
              className="input input-bordered input-sm"
            />
          </label>
        </div>

        <div className="form-control">
          <label className="input-group input-group-sm">
            <span>Invoice Due Date:</span>
            <input
              onChange={handleOnChange}
              name="dueDate"
              type="date"
              placeholder=""
              className="input input-bordered input-sm"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default InvoiceInfo;
