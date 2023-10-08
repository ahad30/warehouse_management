import { array } from "prop-types";
import { BsFiletypeCsv } from "react-icons/bs";
import { CSVLink } from "react-csv";

const InvoiceAsCSV = ({ data }) => {
  const csvData = data?.map((item) => ({
    Invoice_No: item?.invoice_no,
    Issue_Date: item?.issue_date,
    Customer_Name: item?.customer?.name,
    Sub_Total: item?.sub_total,
    Discount: item?.discount,
    Shipping: item?.shipping,
    Total: item?.total,
    Paid_Amount: item?.paid_amount,
    Due: item?.due_amount,
    Due_Date: item?.due_date,
    Status: item?.status === 0 ? "Due" : "Paid",
    Sold_Items: item?.saleitems?.map(
      (product) => `${product?.name} (${product?.quantity} ${product?.unit})`
    ),
    Customer_Phone: item?.customer?.phone,
    Customer_Email: item?.customer?.email,
  }));

  return (
    <>
      <CSVLink
        data={csvData}
        // headers={headers}
        filename="Invoices Report.csv"
        className="flex items-center gap-x-2 bg-[#0369A1] text-white px-3 py-2 rounded-md w-full sm:w-fit cursor-pointer"
      >
        <BsFiletypeCsv size={20} /> Download as CSV
      </CSVLink>
    </>
  );
};

InvoiceAsCSV.propTypes = {
  data: array,
};

export default InvoiceAsCSV;
