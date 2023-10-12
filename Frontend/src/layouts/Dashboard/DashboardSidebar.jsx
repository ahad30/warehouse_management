import { Link, useLocation } from "react-router-dom";
import { AiOutlineSetting, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory, BiLogOut, BiUserCircle } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { LiaFileInvoiceDollarSolid, LiaStoreSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SiBrandfolder } from "react-icons/si";
import { TbFileInvoice } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import UserLogout from "../../components/Reusable/UserLogout/UserLogout";

const DashboardSidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const handleLogOut = UserLogout();

  const [sideBarData, setSidebarData] = useState([
    {
      name: "Dashboard",
      icon: <RxDashboard size={25}></RxDashboard>,
      path: "/dashboard",
    },
    {
      name: "Users",
      icon: <BiUserCircle size={25} />,
      path: "/dashboard/user",
    },
    {
      name: "Customers",
      icon: <FiUsers size={25} />,
      path: "/dashboard/customer",
    },
    {
      name: "Category",
      icon: <BiCategory size={25} />,
      path: "/dashboard/category",
    },
    {
      name: "Brand",
      icon: <SiBrandfolder size={25} />,
      path: "/dashboard/brand",
    },
    {
      name: "Store",
      // icon: <FaStore size={25} />,
      icon: <LiaStoreSolid size={25}></LiaStoreSolid>,
      path: "/dashboard/store",
    },
    {
      name: "Product",
      icon: <AiOutlineShoppingCart size={25}></AiOutlineShoppingCart>,
      path: "/dashboard/product",
    },

    {
      name: "Invoices",
      icon: <LiaFileInvoiceDollarSolid size={25} />,
      path: "/dashboard/invoice",
    },
    {
      name: "Reports",
      icon: <TbFileInvoice size={25}></TbFileInvoice>,
      path: "/dashboard/report",
    },
    {
      name: "Settings",
      icon: <AiOutlineSetting size={25} />,
      path: "/dashboard/setting",
    },
  ]);

  useEffect(() => {
    if (user?.get_role?.role !== "admin") {
      setSidebarData((prev) =>
        prev.filter((section) => section?.name !== "Users")
      );
    } else if (user?.get_role?.role !== ("admin" || "manager")) {
      setSidebarData((prev) =>
        prev.filter(
          (section) => section?.name !== "Users" && section?.name !== "Settings"
        )
      );
    }
  }, [user]);

  const isActive = (path) => {
    return location.pathname === path ? "active-link" : "";
  };

  return (
    <div className="bg-gray-100 lg:w-2/12 fixed -mt-2">
      <div className="join join-vertical w-full px-4 rounded-none border-r border-gray-300 min-h-screen text-base-content">
        <ul className="sideBar">
          {sideBarData &&
            sideBarData?.map((item) => (
              <li
                key={item?.name}
                className={`my-2 flex items-center gap-x-2 hover:bg-sky-50 p-3 ${isActive(
                  item?.path
                )}`}
              >
                <Link to={item?.path} className="flex gap-x-2">
                  <span>{item?.icon} </span> <span>{item?.name}</span>
                </Link>
              </li>
            ))}
        </ul>

        <div>
          {/* <div className="mt-10">
            <Link
              className={`flex gap-x-2 ${isActive("/dashboard/setting")}`}
              to="/dashboard/setting"
            >
              <AiOutlineSetting size={25}></AiOutlineSetting>
              <p>Settings</p>
            </Link>
          </div> */}
          <div className="pt-5 ml-2">
            <button
              className="flex gap-x-2 text-[#EF4444] font-bold"
              onClick={() => handleLogOut()}
            >
              <BiLogOut size={25} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
