import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="max-w-[1920px] mx-auto">
      <div className="sticky top-0 z-10">
        <Navbar></Navbar>{" "}
        {/* Render the Navbar component for user navigation */}
      </div>

      <div className="drawer w-full lg:drawer-open">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        <div className="drawer-content flex justify-end">
          {/* Dashboard content rendered inside the layout */}
          <div className="lg:w-5/6 w-full">
            <Outlet /> {/* Render the content of the current route */}
          </div>
        </div>

        <div className="drawer-side relative shadow-xl -z-0 top-auto">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <DashboardSidebar />
          {/* Render the sidebar component for navigation within the dashboard */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
