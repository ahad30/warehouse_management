import { useDispatch, useSelector } from "react-redux";
import { useNewInvoiceMutation } from "../../../features/Invoice/InvoiceApi";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { logOut } from "../../../features/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import { UseErrorMessages } from "../../Reusable/UseErrorMessages/UseErrorMessages";

const SubmitInvoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invoice = useSelector((state) => state?.invoice);

  const [
    newInvoice,
    { isLoading, isError, error, isSuccess, data: newInvoiceData },
  ] = useNewInvoiceMutation();

  const handleNewInvoice = () => {
    console.log(invoice?.calculation);
    newInvoice(invoice);
  };

  const errorMessages = UseErrorMessages(error);

  useEffect(() => {
    const handleApiError = (error) => {
      if (error?.originalStatus === 405) {
        toast.error("Invalid Token Please Re-Login!");
        return dispatch(logOut());
      } else {
        const errorMessage = error?.data?.message || error?.status;
        toast.error(errorMessage, { id: 1 });
      }
    };

    if (isError) {
      handleApiError(error);
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

  console.log(isLoading, isError, error, isSuccess, newInvoiceData);

  return (
    <>
      <div className="w-[300px] ml-auto flex justify-center bg-[#0369A1] text-white rounded-md px-3 py-2">
        <button className="" onClick={handleNewInvoice}>
          Save Invoice
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
