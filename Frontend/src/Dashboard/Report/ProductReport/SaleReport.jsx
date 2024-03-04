import DataTable from "react-data-table-component";
import UseLoading from "../../../components/Reusable/useLoading/UseLoading";
import InvoiceDateFiltering from "../../Invoices/InvoiceDateFiltering";
import { BsFiletypePdf } from "react-icons/bs";
import ProductsReportAsPDF from "./ProductsReportAsPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ProductsReportAsCSV from "./ProductsReportAsCSV";
import TableHeadingTitle from "../../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../../layouts/Dashboard/DashboardBackground";
import { useEffect, useState } from "react";
import { useGetDefaultSettingsQuery } from "../../../features/Settings/settingsApi";
import { useGetProductsReportQuery } from "../../../features/ProductReport/productReport";
import UseTitle from "../../../components/Reusable/UseTitle/UseTitle";
import { useGetAllSalesReportQuery } from "../../../features/Report/reportApi";

const SaleReport = () => {
  UseTitle("Products Report");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [date, setDate] = useState(null);

  const { data: allSalesReport, isLoading } = useGetAllSalesReportQuery({
    end_date: endDate ? endDate : "",
    start_date: startDate ? startDate : "",
    time_range: date ? date : "",
  });

  const { data: defaultSettings } = useGetDefaultSettingsQuery();
  useEffect(() => {
    if (allSalesReport?.data) {
      const modifiedData = allSalesReport?.data?.map((item, index) => {
        return {
          serial_no: index + 1,
          ...item,
        };
      });
      // console.log(modifiedData)
      setFilterData(modifiedData);
    }
  }, [allSalesReport, allSalesReport?.data]);

  const [filterData, setFilterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;
console.log(filterData)
  const handleStartDate = (date) => {
    setStartDate(date);
    setDate("custom");
  };

  const handleEndDate = (date) => {
    setEndDate(date);
    setDate("custom");
  };

  const handleDate = (date) => {
    setDate(date);
    setStartDate("");
    setEndDate("");
  };

  const handleDateClear = () => {
    setStartDate(null);
    setEndDate(null);
    setDate(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const columns = [
    {
      name: "Serial no",
      selector: (row) => <>{row?.serial_no}</>,
    },
    {
      name: "New Products",
      selector: (row) => (
        <>
          <p>
            {row?.newProducts} <span className="mx-1">Piece</span>
          </p>
        </>
      ),
    },
    {
      name: "Sold Products",
      selector: (row) => (
        <>
          <p>
            {row?.soldProducts} <span className="mx-1">Piece</span>
          </p>
        </>
      ),
    },
    {
      name: "Date",
      selector: (row) => <>{row?.date}</>,
    },
  ];
  // console.log(filterData);

  // ALL INVOICES Loading
  if (isLoading) {
    return <UseLoading />;
  }


  return (
    <DashboardBackground>
      <TableHeadingTitle>
        {/* Products: {productsReport?.products?.length} */}
      </TableHeadingTitle>

      {/* <SearchAndAddBtn
          btnTitle={"Add Product"}
          btnPath={"/dashboard/product/add"}
          btnIcon={<BiCartAdd size={20} />}
          setFiltering={setFiltering}
        /> */}

      {/* Download PDF and CSV */}
      <div className="flex lg:flex-row justify-center lg:justify-end gap-2">
        {/* Invoices download as CSV file */}
        <ProductsReportAsCSV
          // column={[
          //   { value: "soldProducts", key: "Sold Products" },
          //   { value: "newProducts", key: "New Products" },
          //   { value: "date", key: "Date" },
          // ]}
          column={[
            { value: "soldProducts", key: "Sold Products" },
            { value: "newProducts", key: "New Products" },
            { value: "date", key: "Date" },
          ]}
          data={filterData}
        />
        {/* Invoices download as PDF file */}
        {/* <button className="border border-[#0369A1] text-[#0369A1] px-2 py-1 text-sm rounded-md w-full sm:w-fit cursor-pointer">
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
        </button> */}
      </div>

      <InvoiceDateFiltering
        handleStartDate={handleStartDate}
        handleEndDate={handleEndDate}
        handleDate={handleDate}
        handleDateClear={handleDateClear}
        startDate={startDate}
        endDate={endDate}
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
          keyField="id"
        />
      </div>
    </DashboardBackground>
  );
};

export default SaleReport;
