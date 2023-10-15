import { useEffect, useState } from "react";
import SearchAndAddBtn from "../../../components/Reusable/Inputs/SearchAndAddBtn";
import TableHeadingTitle from "../../../components/Reusable/Titles/TableHeadingTitle";
import { useGetProductsReportQuery } from "../../../features/ProductReport/productReport";
import DashboardBackground from "../../../layouts/Dashboard/DashboardBackground";
import DataTable from "react-data-table-component";
import UseTitle from "../../../components/Reusable/UseTitle/UseTitle";
import UseLoading from "../../../components/Reusable/useLoading/UseLoading";
import { BiCartAdd } from "react-icons/bi";
import InvoiceDateFiltering from "../../Invoices/InvoiceDateFiltering";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BsFiletypePdf } from "react-icons/bs";
import ProductsReportAsPDF from "./ProductsReportAsPDF";
import ProductsReportAsCSV from "./ProductsReportAsCSV";

const ProductReport = () => {
  UseTitle("Products Report");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [date, setDate] = useState(null);

  const { data: productsReport, isLoading } = useGetProductsReportQuery({
    date,
    startDate,
    endDate,
  });

  useEffect(() => {
    setFilterData(productsReport?.products);
  }, [productsReport?.products, productsReport]);

  const [filterData, setFilterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleStartDate = (date) => {
    setStartDate(date);
    setDate(null);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
    setDate(null);
  };

  const handleDate = (date) => {
    setDate(date);
    setStartDate(null);
    setEndDate(null);
  };

  const handleDateClear = () => {
    setStartDate(null);
    setEndDate(null);
    setDate(null);
  };

  //  search filtering
  const setFiltering = (search) => {
    const filteredData = productsReport?.products?.filter((item) =>
      item?.product_name?.toLowerCase()?.includes(search?.toLowerCase())
    );
    if (filteredData) {
      setFilterData(filteredData);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const columns = [
    {
      name: "Product Name",
      selector: (row) => <>{row?.product_name}</>,
      sortable: true,
    },
    {
      name: "Sold Price",
      selector: (row) => <>{row?.price}</>,
    },
    {
      name: "Quantity",
      selector: (row) => <>{row?.quantity}</>,
      sortable: true,
    },
    {
      name: "Total Price",
      selector: (row) => <>{row?.total_sold_price}</>,
    },
    {
      name: "Last Sale Date",
      selector: (row) => <>{row?.last_sale_date}</>,
    },
  ];

  // ALL INVOICES Loading
  if (isLoading) {
    return <UseLoading />;
  }

  return (
    <DashboardBackground>
      <TableHeadingTitle>
        Products {productsReport?.products?.length}
      </TableHeadingTitle>

      <SearchAndAddBtn
        btnTitle={"Add Product"}
        btnPath={"/dashboard/product/add"}
        btnIcon={<BiCartAdd size={20} />}
        setFiltering={setFiltering}
      />

      {/* Download PDF and CSV */}
      <div className="flex lg:flex-row justify-end gap-2">
        {/* Invoices download as CSV file */}
        <ProductsReportAsCSV data={filterData} />
        {/* Invoices download as PDF file */}
        <button className="border border-[#0369A1] text-[#0369A1] px-2 py-1 text-sm rounded-md w-full sm:w-fit cursor-pointer">
          <PDFDownloadLink
            document={
              <ProductsReportAsPDF
                data={filterData}
                startDate={startDate}
                endDate={endDate}
              />
            }
            fileName="Products Report"
          >
            <span className="flex justify-center items-center gap-x-2">
              <BsFiletypePdf size={20} /> Download as PDF
            </span>
          </PDFDownloadLink>
        </button>
      </div>

      <InvoiceDateFiltering
        handleStartDate={handleStartDate}
        handleEndDate={handleEndDate}
        handleDate={handleDate}
        handleDateClear={handleDateClear}
      />

      <div className="overflow-x-scroll">
        <DataTable
          columns={columns}
          data={filterData}
          pagination
          responsive
          paginationPerPage={itemsPerPage}
          paginationRowsPerPageOptions={[itemsPerPage, 5, 10, 15]}
          paginationTotalRows={filterData?.length}
          onChangePage={(page) => setCurrentPage(page)}
        />
      </div>
    </DashboardBackground>
  );
};

export default ProductReport;
