import { array } from "prop-types";
import { BsFiletypeCsv } from "react-icons/bs";
import { CSVLink } from "react-csv";

const ProductsReportAsCSV = ({ data }) => {
  const csvData = data?.map((item) => ({
    "Product Name": item?.product_name,
    "Sold Price (Avg.)": parseFloat(item?.price).toFixed(2),
    Quantity: item?.quantity,
    "VAT (Avg.)": parseFloat(item?.average_vat).toFixed(2),
    Total: (
      parseFloat(item?.total_sold_price_without_vat) +
      (parseFloat(item?.total_sold_price_without_vat) *
        parseFloat(item?.average_vat)) /
        100
    ).toFixed(2),
    "Last Sale Date": item?.last_sale_date,
  }));

  return (
    <>
      <CSVLink
        data={data ? csvData : []}
        filename="Products Report.csv"
        className="flex justify-center items-center gap-x-2 border border-[#0369A1] text-[#0369A1] px-2 py-1 text-sm rounded-md w-full sm:w-fit cursor-pointer"
      >
        <BsFiletypeCsv size={20} /> Download as CSV
      </CSVLink>
    </>
  );
};

ProductsReportAsCSV.propTypes = {
  data: array,
};

export default ProductsReportAsCSV;
