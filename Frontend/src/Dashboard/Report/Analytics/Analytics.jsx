import { useSelector } from "react-redux";
import DashboardBackground from "../../../layouts/Dashboard/DashboardBackground";
import TotalSalesBar from "./Bars/TotalSalesBar";
import TotalProductsChart from "./Charts/TotalProductsChart";
import TotalCalculations from "./TotalCalculations/TotalCalculations";

const Analytics = () => {
  const { api_token } = useSelector((state) => state?.auth);
  console.log(api_token);
  
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
