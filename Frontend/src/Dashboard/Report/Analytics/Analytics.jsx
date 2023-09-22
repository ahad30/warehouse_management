import DashboardBackground from "../../../layouts/Dashboard/DashboardBackground";
import TotalSalesBar from "./Bars/TotalSalesBar";
import TotalProductsChart from "./Charts/TotalProductsChart";
import TotalCalculations from "./TotalCalculations/TotalCalculations";

const Analytics = () => {
  return (
    <DashboardBackground>
      <TotalCalculations />
      <div className="grid lg:grid-cols-2 gap-5">
        <TotalProductsChart />
        <TotalSalesBar />
      </div>
    </DashboardBackground>
  );
};

export default Analytics;
