import { useGetProductsReportQuery } from "../../../features/ProductReport/productReport";
import { Link, NavLink } from "react-router-dom";

const ProductReport = () => {
  const { data } = useGetProductsReportQuery();

  return <div>ProductReport</div>;
};

export default ProductReport;
