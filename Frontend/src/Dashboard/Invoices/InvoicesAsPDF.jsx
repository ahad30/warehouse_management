import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { BsFiletypePdf } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";

const InvoicesAsPDF = ({ data }) => {
  const [isShow, setIsShow] = useState(false);
  const allInvoicesRef = useRef();

  const handleAllInvoicesPrint = useReactToPrint({
    content: () => allInvoicesRef.current,
    documentTitle: "Invoices",
    onAfterPrint: toast.success("Invoices Print Successfully", { id: 1 }),
  });

  const handlePrintShow = () => {
    setIsShow(true);
    handleAllInvoicesPrint();
  };

  return (
    <>
      <button
        onClick={handlePrintShow}
        className="flex items-center gap-x-2 border border-[#0369A1] text-[#0369A1] px-3 py-2 rounded-md w-full sm:w-fit cursor-pointer"
      >
        <BsFiletypePdf size={20} /> Download as PDF
      </button>

      {isShow && (
        <table
          ref={allInvoicesRef}
          className="table table-sm table-pin-rows table-pin-cols w-0 overflow-hidden" 
        >
          <tr>
            <th>Invoice</th>
            <th>total</th>
            <th>discount</th>
            <th>Invoice</th>
            <th>total</th>
            <th>discount</th>
            <th>Invoice</th>
            <th>total</th>
            <th>discount</th>
            <th>Invoice</th>
            <th>total</th>
            <th>discount</th>
            <th>Invoice</th>
            <th>total</th>
            <th>discount</th>
          </tr>
        </table>
      )}
    </>
  );
};

export default InvoicesAsPDF;
