import { useEffect, useState } from "react";
import SearchAndAddBtn from "../../../components/Reusable/Inputs/SearchAndAddBtn";
import TableHeadingTitle from "../../../components/Reusable/Titles/TableHeadingTitle";
import { useGetProductsReportQuery } from "../../../features/ProductReport/productReport";
import DashboardBackground from "../../../layouts/Dashboard/DashboardBackground";
import DataTable from "react-data-table-component";
import UseTitle from "../../../components/Reusable/UseTitle/UseTitle";

const ProductReport = () => {
  UseTitle("Products Report");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [date, setDate] = useState(null);

  const { data: productsReport, refetch } = useGetProductsReportQuery({
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
      item?.invoice_no?.toLowerCase()?.includes(search?.toLowerCase())
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
      name: "Price",
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
      name: "Last Sale",
      selector: (row) => <>{row?.last_sale_date}</>,
    },
  ];

  return (
    <DashboardBackground>
      <TableHeadingTitle>
        Product {productsReport?.products?.length}
      </TableHeadingTitle>

      <SearchAndAddBtn
        btnTitle={"Add Invoice"}
        btnPath={"/dashboard/invoice/new"}
        setFiltering={setFiltering}
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
