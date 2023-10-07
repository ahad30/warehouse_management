import { ImDownload2, ImPrinter } from "react-icons/im";
import { GrPowerReset } from "react-icons/gr";
import { AiOutlineSave } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../../features/Invoice/invoiceSlice";
import { useNewInvoiceMutation } from "../../../features/Invoice/InvoiceApi";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { logOut } from "../../../features/Auth/authSlice";
import { useNavigate } from "react-router-dom";

const SubmitInvoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invoice = useSelector((state) => state?.invoice);
  const [
    newInvoice,
    { isLoading, isError, error, isSuccess, data: newInvoiceData },
  ] = useNewInvoiceMutation();

  const handleNewInvoice = () => {
    newInvoice(invoice);
  };

  console.log(isLoading, isError, error, isSuccess, newInvoiceData);

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

  // console.log(isLoading, isError, error, isSuccess, newInvoiceData);

  const handleResetState = () => {
    dispatch(resetState());
    window.location.reload(false);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="btn-group border btn-group-vertical lg:btn-group-horizontal">
        <button
          onClick={handleNewInvoice}
          className="btn btn-success text-white"
        >
          <AiOutlineSave /> Save
        </button>
        <button className="btn btn-secondary text-white">
          {" "}
          <ImDownload2 /> Download
        </button>
        <button className="btn btn-accent text-white">
          {" "}
          <ImPrinter />
          Print
        </button>
        <button
          onClick={handleResetState}
          className="btn bg-red-600 text-white"
        >
          {" "}
          <GrPowerReset color="white" /> Reset
        </button>
      </div>
    </div>
  );
};

export default SubmitInvoice;
