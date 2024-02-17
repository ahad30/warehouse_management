import { array } from "prop-types";
import { BsFiletypeCsv } from "react-icons/bs";
import { CSVLink } from "react-csv";

const ImportAsCSV = ({ data }) => {
  const csvData = data?.map((item) => ({
    Invoice_No: item?.invoice_no,
    Issue_Date: item?.issue_date,
    Customer_Name: item?.customer?.name,
    Sub_Total: parseFloat(item?.sub_total).toFixed(2),
    Discount: `${item?.discount}%`,
    Shipping: item?.shipping,
    Total: parseFloat(item?.total).toFixed(2),
    Paid_Amount: parseFloat(item?.paid_amount).toFixed(2),
    Due: parseFloat(item?.due_amount).toFixed(2),
    Due_Date: item?.due_date,
    Status: item?.status === 0 ? "Due" : "Paid",
    Sold_Items: item?.saleitems?.map(
      (product) => `${product?.name} [${product?.quantity} ${product?.unit}] `
    ),
    Customer_Phone: item?.customer?.phone,
    Customer_Email: item?.customer?.email,
  }));

  return (
    <>
      <CSVLink
        data={data ? csvData : []}
        filename="Invoices Report.csv"
        className="flex justify-center items-center gap-x-2 border border-[#0369A1] text-[#0369A1] px-2 py-1 text-sm rounded-md w-full sm:w-fit cursor-pointer"
      >
        <BsFiletypeCsv size={20} /> Download as CSV
      </CSVLink>
    </>
  );
};

ImportAsCSV.propTypes = {
  data: array,
};

export default ImportAsCSV;
