import UseTitle from "../../../../components/Reusable/UseTitle/UseTitle";
import DashboardBackground from "../../../../layouts/Dashboard/DashboardBackground";
import ProductSaleBarChart from "../ProductSaleBarChart/ProductSaleBarChart";
import RevenueSaleBar from "../RevenueSaleBar/RevenueSaleBar";
import TotalCalculations from "../TotalCalculations/TotalCalculations";

const DashboardAnalytics = () => {
  UseTitle("Dashboard Analytics");
  return (
    <DashboardBackground>
      <TotalCalculations />
      <div className="grid mt-20 lg:grid-cols-1 gap-8">
        <div className="bg-[#f0f9ff] border border-[#BAE6FD] flex flex-col gap-y-12 p-12 rounded-xl">
          <h1 className="font-semibold  text-4xl">Revenue</h1>
          <RevenueSaleBar />
        </div>
        <div className=" bg-[#FFFBEB] flex flex-col gap-y-12 border border-[#FDE68A] p-12 rounded-xl">
          <h1 className="font-semibold  text-4xl">Sales</h1>
          <ProductSaleBarChart />
        </div>
      </div>
    </DashboardBackground>
  );
};

export default DashboardAnalytics;
