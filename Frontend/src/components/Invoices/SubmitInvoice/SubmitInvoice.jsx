import { ImDownload2, ImPrinter } from "react-icons/im";
import { GrPowerReset } from "react-icons/gr";
import { AiOutlineSave } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../../features/Invoice/InvoiceSlice";

const SubmitInvoice = () => {
  const invoice = useSelector((state) => state?.invoice);
  console.log(invoice);

  const dispatch = useDispatch();
  const handleNewInvoice = (data) => {
    console.log(data);
  };

  const handleResetState = () => {
    dispatch(resetState());
    window.location.reload(false);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="btn-group border btn-group-vertical lg:btn-group-horizontal">
        <button
          onClick={() => handleNewInvoice()}
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
