import { Outlet } from "react-router-dom";
import NavbarNew from "../../Shared/Navbar/NavbarNew";
import DashboardSidebar from "./DashboardSidebar";
import Navbar from "../../Shared/Navbar/Navbar";
// import Navbar from "../../Shared/Navbar/Navbar";
// import DashboardSidebarDropdown from "./DashboardSidebarDropdown/DashboardSidebarDropdown";

const DashboardLayout = () => {
  return (
    <div className="max-w-[1920px]  mx-auto">
      <div className="sticky top-0 z-10">
        {/* <Navbar /> */}
        {/* <NavbarNew></NavbarNew> */}
        {/* <Navbar/> */}
        <NavbarNew></NavbarNew>
      </div>

      <div className="drawer w-full  lg:drawer-open">
        
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />


        <div className="drawer-content flex justify-end   ">
          {/* Dashboard  content*/}
          <div className="lg:w-5/6 w-full"><Outlet /></div>
        </div>

        <div className="drawer-side  relative shadow-xl -z-0 top-auto ">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          {/* Dashboard sidebar */}
          {/* <DashboardSidebarDropdown/> */}
          <DashboardSidebar />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
