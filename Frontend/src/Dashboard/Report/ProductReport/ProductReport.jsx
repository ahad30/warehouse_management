import { useState } from "react";
import SearchAndAddBtn from "../../../components/Reusable/Inputs/SearchAndAddBtn";
import TableHeadingTitle from "../../../components/Reusable/Titles/TableHeadingTitle";
import { useGetProductsReportQuery } from "../../../features/ProductReport/productReport";
import DashboardBackground from "../../../layouts/Dashboard/DashboardBackground";

const ProductReport = () => {
  const { data } = useGetProductsReportQuery();

  const [filterData, setFilterData] = useState([]);

  //  search filtering
  const setFiltering = (search) => {
    const filteredData = data?.product?.filter((item) =>
      item?.invoice_no?.toLowerCase()?.includes(search?.toLowerCase())
    );
    if (filteredData) {
      setFilterData(filteredData);
    }
  };
  return (
    <DashboardBackground>
      <TableHeadingTitle>Product {data?.product?.length}</TableHeadingTitle>

      <SearchAndAddBtn
        btnTitle={"Add Invoice"}
        btnPath={"/dashboard/invoice/new"}
        setFiltering={setFiltering}
      />
    </DashboardBackground>
  );
};

export default ProductReport;
