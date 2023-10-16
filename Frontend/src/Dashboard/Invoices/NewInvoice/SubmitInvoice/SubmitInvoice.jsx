import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useNewInvoiceMutation } from "../../../../features/Invoice/InvoiceApi";
import { UseErrorMessages } from "../../../../components/Reusable/UseErrorMessages/UseErrorMessages";

const SubmitInvoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invoice = useSelector((state) => state?.invoice); // Get invoice data from Redux store
  console.log(invoice);
  const [
    newInvoice,
    { isLoading, isError, error, isSuccess, data: newInvoiceData },
  ] = useNewInvoiceMutation(); // Mutation function to create a new invoice

  // Function to handle the creation of a new invoice
  const handleNewInvoice = () => {
    // Check if customer information and items are provided
    if (
      !invoice?.customer?.name ||
      (!invoice?.customer?.phone && !invoice?.customer?.email)
    ) {
      toast.error("Please Provide Customer Info", { id: 1 }); // Display an error toast message
    } else if (invoice?.items?.length === 0) {
      toast.error("Please select items", { id: 1 }); // Display an error toast message
    } else if (invoice?.items?.length > 0) {
      newInvoice(invoice); // Submit the new invoice using the mutation
    }
  };

  const errorMessages = UseErrorMessages(error); // Get error messages from a custom hook

  // Handle the outcome of the new invoice creation
  useEffect(() => {
    if (isError) {
      const errorMessage = error?.data?.message || error?.status;
      toast.error(errorMessage, { id: 1 }); // Display an error toast message
    }
    if (isSuccess && newInvoiceData?.status) {
      toast.success(newInvoiceData?.message, { id: 1 }); // Display a success toast message
      return navigate("/dashboard/invoice"); // Redirect to the invoice dashboard on success
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
      <div
        className={`w-[300px] ml-auto flex justify-center bg-[#0369A1] text-white rounded-md px-3 py-2 ${
          invoice?.items?.length === 0 || isLoading ? "bg-slate-400" : ""
        }`}
      >
        <button
          className=""
          onClick={handleNewInvoice}
          disabled={invoice?.items?.length === 0 || isLoading}
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
