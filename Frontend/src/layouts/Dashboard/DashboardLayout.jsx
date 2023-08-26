import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="max-w-[1440px] mx-auto">
      <Navbar />
      <div className="drawer lg:drawer-open">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          {/* Dashboard  content*/}
          <Outlet />
        </div>
        <div className="drawer-side shadow-xl z-50 top-auto">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          {/* Dashboard sidebar */}
          <DashboardSidebar />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
