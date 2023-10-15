import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useNewInvoiceMutation } from "../../../../features/Invoice/InvoiceApi";
import { UseErrorMessages } from "../../../../components/Reusable/UseErrorMessages/UseErrorMessages";

const SubmitInvoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invoice = useSelector((state) => state?.invoice);
  const { customer, items } = invoice;
  console.log(items);
  const [
    newInvoice,
    { isLoading, isError, error, isSuccess, data: newInvoiceData },
  ] = useNewInvoiceMutation();

  const handleNewInvoice = () => {
    if (!customer?.name || (!customer?.phone && !customer?.email)) {
      toast.error("Please Provide Customer Info", { id: 1 });
    } else if (items?.length === 0) {
      toast.error("Please select items", { id: 1 });
    } else if (items?.length > 0) {
      newInvoice(invoice);
    }
  };

  const errorMessages = UseErrorMessages(error);

  useEffect(() => {
    if (isError) {
      const errorMessage = error?.data?.message || error?.status;
      toast.error(errorMessage, { id: 1 });
    }
    if (isSuccess && newInvoiceData?.status) {
      toast.success(newInvoiceData?.message, { id: 1 });
      return navigate("/dashboard/invoice");
    }
  }, [
    isLoading,
    isError,
    error,
    isSuccess,
    newInvoiceData,
    dispatch,
    navigate,
  ]);

  return (
    <>
      <div className={`w-[300px] ml-auto flex justify-center bg-[#0369A1] text-white rounded-md px-3 py-2 ${items?.length === 0 ? "bg-slate-400" : ""}`}>
        <button
          className=""
          onClick={handleNewInvoice}
          disabled={items?.length === 0}
        >
          {isLoading ? "Saving..." : "Save Invoice"}
        </button>
      </div>
      {errorMessages &&
        errorMessages?.map((errorMessage, index) => (
          <p
            key={index}
            className="border border-red-400 p-3 sm:w-2/5 my-2 rounded-lg"
          >
            {errorMessage}
          </p>
        ))}
    </>
  );
};

export default SubmitInvoice;
