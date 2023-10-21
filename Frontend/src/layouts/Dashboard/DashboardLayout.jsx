import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="z-1 font-poppins">
      <div className="sticky top-0 " style={{ zIndex: 10 }}>
        <Navbar></Navbar>
        {/* Render the Navbar component for user navigation */}
      </div>

      <div className="drawer w-full lg:drawer-open -z-1">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        <div className="drawer-content ">
          {/* Dashboard content rendered inside the layout */}
          <div className="max-w-[100vw] md:max-w-none border-2 border-red-400">
            <Outlet />
            {/* Render the content of the current route */}
          </div>
        </div>

        <div className="drawer-side  shadow-xl  top-auto">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <DashboardSidebar />
          {/* Render the sidebar component for navigation within the dashboard */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
