import { useEffect, useState } from "react";
import UseLoading from "../../../components/Reusable/useLoading/UseLoading";
import { useGetDefaultSettingsQuery } from "../../../features/Settings/settingsApi";
import { useGetProductsReportQuery } from "../../../features/ProductReport/productReport";
import UseTitle from "../../../components/Reusable/UseTitle/UseTitle";
import DataTable from "react-data-table-component";
import InvoiceDateFiltering from "../../Invoices/InvoiceDateFiltering";
import { BsFiletypePdf } from "react-icons/bs";
import ProductsReportAsPDF from "./ProductsReportAsPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ProductsReportAsCSV from "./ProductsReportAsCSV";
import DashboardBackground from "../../../layouts/Dashboard/DashboardBackground";
import TableHeadingTitle from "../../../components/Reusable/Titles/TableHeadingTitle";
import { useGetAllShiftReportQuery } from "../../../features/Report/reportApi";

const ShiftProduct = () => {
  UseTitle("Shift Report");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [date, setDate] = useState(null);
  const [wareHouseId, setWareHouseId] = useState("");
  const { data: allShitReport, isLoading } = useGetAllShiftReportQuery({
    end_date: endDate ? endDate : "",
    start_date: startDate ? startDate : "",
    time_range: date ? date : "",
    warehouse_id: wareHouseId ? wareHouseId : "",
  });
  // console.log(allShitReport);
  const { data: defaultSettings } = useGetDefaultSettingsQuery();
  useEffect(() => {
    if (allShitReport?.data) {
      const modifiedData = allShitReport?.data?.map((item, index) => {
        return {
          "Serial No": index + 1,
          "Incoming Product": item?.cameProducts,
          Date: item?.date,
        };
      });
      // console.log(modifiedData)
      setFilterData(modifiedData);
    }
  }, [allShitReport, allShitReport?.data]);

  const [filterData, setFilterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;
  // console.log(filterData);
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
      selector: (row) => <>{row?.["Serial No"]}</>,
    },
    {
      name: "Total Incoming Product ",
      selector: (row) => (
        <>
          <p>
            {row?.["Total Incoming Product"]} <span className="mx-1">Piece</span>
          </p>
        </>
      ),
    },

    {
      name: "Date",
      selector: (row) => <>{row?.["Date"]}</>,
    },
  ];

  if (isLoading) {
    return <UseLoading />;
  }
  console.log(filterData)
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
        <ProductsReportAsCSV data={filterData} />
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
        conditionalKey={"shift"}
        setWareHouseId={setWareHouseId}
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
      {!wareHouseId && (
        <p className="text-center my-12 text-2xl">
          Please Select Warehouse First
        </p>
      )}
    </DashboardBackground>
  );
};

export default ShiftProduct;
