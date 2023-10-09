import UseTitle from "../../../components/Reusable/UseTitle/UseTitle";
import DashboardBackground from "../../../layouts/Dashboard/DashboardBackground";
import TotalSalesBar from "./Bars/TotalSalesBar";
import TotalProductsChart from "./Charts/TotalProductsChart";
import ProductSaleBarChart from "./ProductSaleBarChart/ProductSaleBarChart";
import RevenueSaleBar from "./RevenueSaleBar/RevenueSaleBar";
import TotalCalculations from "./TotalCalculations/TotalCalculations";

const Analytics = () => {
  UseTitle("Dashboard Analytics");
  return (
    <DashboardBackground>
      <TotalCalculations />
      <div className="grid mt-20 lg:grid-cols-1 gap-8">
        {/* <TotalProductsChart /> */}
        {/* <TotalSalesBar /> */}
        <div className="bg-[#f0f9ff] p-12 rounded-lg">
          <RevenueSaleBar />
        </div>
        <div className=" bg-[#FFFBEB] p-12 rounded-lg">
          <ProductSaleBarChart />
        </div>
      </div>
    </DashboardBackground>
  );
};

export default Analytics;
