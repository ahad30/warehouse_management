import UseTitle from "../../../../components/Reusable/UseTitle/UseTitle"; // Import the UseTitle component for setting the page title
import DashboardBackground from "../../../../layouts/Dashboard/DashboardBackground"; // Import the DashboardBackground layout
import ProductSaleBarChart from "../ProductSaleBarChart/ProductSaleBarChart"; // Import the ProductSaleBarChart component for displaying product sales
import RevenueSaleBar from "../RevenueSaleBar/RevenueSaleBar"; // Import the RevenueSaleBar component for displaying revenue sales
import TotalCalculations from "../TotalCalculations/TotalCalculations"; // Import the TotalCalculations component for displaying total calculations

const DashboardAnalytics = () => {
  UseTitle("Dashboard Analytics"); // Set the page title to "Dashboard Analytics"
  return (
    <DashboardBackground>
      {" "}
      {/* Render the DashboardBackground layout */}
      <TotalCalculations />
      {/* Render the TotalCalculations component for total calculations */}
      <div className="grid mt-20 lg:grid-cols-1 gap-8">
        <div className="bg-[#f0f9ff] border border-[#BAE6FD] flex flex-col gap-y-12 p-3 pl-0 lg:p-12 rounded-xl">
          <h1 className="font-semibold text-2xl lg:text-4xl font-poppins text-center">
            Last 30 days revenue
          </h1>{" "}
          {/* Display the section title for revenue */}
          <RevenueSaleBar />
          {/* Render the RevenueSaleBar component for displaying revenue sales */}
        </div>
        <div className=" bg-[#FFFBEB] flex flex-col gap-y-12 border border-[#FDE68A]  p-3 lg:p-12  rounded-xl">
          <h1 className="font-semibold  text-2xl lg:text-4xl font-poppins text-center">
            Last 30 days Sales
          </h1>{" "}
          {/* Display the section title for sales */}
          <ProductSaleBarChart />
          {/* Render the ProductSaleBarChart component for displaying product sales */}
        </div>
      </div>
    </DashboardBackground>
  );
};

export default DashboardAnalytics;
