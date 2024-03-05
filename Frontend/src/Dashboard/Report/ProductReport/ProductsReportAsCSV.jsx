import { array } from "prop-types";
import { BsFiletypeCsv } from "react-icons/bs";
import { CSVLink } from "react-csv";

const ProductsReportAsCSV = ({data}) => {
  return (
    <>
      <CSVLink
        data={data ? data : []}
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
  column: array,
};

export default ProductsReportAsCSV;
