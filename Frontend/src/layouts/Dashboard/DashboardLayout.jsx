import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="z-1 font-poppins max-h-screen overflow-hidden">
      <div className=" " style={{ zIndex: 10 }}>
        <Navbar></Navbar>
        {/* Render the Navbar component for user navigation */}
      </div>

      <div className="drawer w-full lg:drawer-open -z-1    ">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        <div className="drawer-content ">
          {/* Dashboard content rendered inside the layout */}
          <div
            className={`max-w-[100vw] 
          ${
            location?.pathname === "/dashboard/pos"
              ? "lg:max-w-[100vw]"
              : "lg:max-w-[90vw] max-h-[90vh]"
          }
          overflow-x-hidden  overflow-y-scroll scrollbar-5`}
          >
            <Outlet />
            {/* Render the content of the current route */}
          </div>
        </div>

        {location?.pathname !== "/dashboard/pos" && (
          <div className="drawer-side  shadow-xl  top-auto  ">
            <label
              htmlFor="dashboard-drawer"
              className="drawer-overlay"
            ></label>
            <DashboardSidebar />
            {/* Render the sidebar component for navigation within the dashboard */}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
