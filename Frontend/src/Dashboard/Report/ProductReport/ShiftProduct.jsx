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

const ShiftProduct = () => {
  UseTitle("Products Report");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [date, setDate] = useState(null);

  const { data: productsReport, isLoading } = useGetProductsReportQuery({
    // date,
    // startDate,
    // endDate,
  });

  const { data: defaultSettings } = useGetDefaultSettingsQuery();

  useEffect(() => {
    setFilterData(productsReport?.products);
  }, [productsReport?.products, productsReport]);

  const [filterData, setFilterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;

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
      name: "Sold Price (Avg.)",

      selector: (row) => <>{parseFloat(row?.price).toFixed(2)}</>,
    },
    {
      name: "Quantity",
      selector: (row) => <>{row?.quantity}</>,
      sortable: true,
    },
    {
      name: `${defaultSettings?.settings?.taxation} (Avg.)`,

      selector: (row) => <>{parseFloat(row?.average_vat).toFixed(2)}</>,
    },
    {
      name: "Total",
      selector: (row) => (
        <>
          {(
            parseFloat(row?.total_sold_price_without_vat) +
            (parseFloat(row?.total_sold_price_without_vat) *
              parseFloat(row?.average_vat)) /
              100
          ).toFixed(2)}
        </>
      ),
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

  // console.log(filterData)
  return (
    <DashboardBackground>
      <TableHeadingTitle>
        Products: {productsReport?.products?.length}
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
          keyField="id"
        />
      </div>
    </DashboardBackground>
  );
};

export default ShiftProduct;
