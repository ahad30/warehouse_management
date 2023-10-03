import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineSetting,
  // AiOutlineTable,
  AiOutlineUserAdd,
} from "react-icons/ai";
import {
  BiCartAdd,
  BiCategory,
  BiGrid,
  BiSolidDuplicate,
  BiSolidPurchaseTag,
  BiUserCircle,
} from "react-icons/bi";
import { FaFileInvoiceDollar, FaStore } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { BsFiletypePdf, BsFillCartFill, BsPieChartFill } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SiBrandfolder } from "react-icons/si";

const DashboardSidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const [sideBarData, setSidebarData] = useState([
    {
      name: "Dashboard",
      icon: <BiGrid size={25}></BiGrid>,
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
      icon: <FaStore size={25} />,
      path: "/dashboard/store",
    },
    {
      name: "Product",
      icon: <BsFillCartFill size={25} />,
      path: "/dashboard/product",
    },

    {
      name: "Invoices",
      icon: <FaFileInvoiceDollar size={25} />,
      path: "/dashboard/invoice",
    },
  ]);

  useEffect(() => {
    if (user?.get_role?.role !== "admin") {
      setSidebarData((prev) =>
        prev.filter((section) => section?.name !== "Users")
      );
    } else if (user?.get_role?.role === "manager") {
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
    <div className="bg-gray-50 -mt-2">
      <div className="join join-vertical  w-[250px] px-4 rounded-none border-r border-gray-300 min-h-screen text-base-content">
        <ul className="sideBar">
          {sideBarData &&
            sideBarData?.map((item) => (
              <li
                key={item?.name}
                className={`my-3 flex items-center gap-x-2 hover:bg-sky-50 p-3 ${isActive(item?.path)}`}
              >
                <Link to={item?.path} className="flex gap-x-2">
                  <span>{item?.icon} </span> <span>{item?.name}</span>
                </Link>
              </li>
            ))}
        </ul>

        {/* <div className="pt-40">
          <Link className={`flex gap-x-2 ${isActive("/dashboard/setting/default")}`} to="/dashboard/setting/default">
            <AiOutlineSetting size={25}></AiOutlineSetting>
            <p>Settings</p>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default DashboardSidebar;
