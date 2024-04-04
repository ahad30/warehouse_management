import { Link, useLocation } from "react-router-dom";
import { AiOutlineSetting, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory, BiUserCircle } from "react-icons/bi";
// import { FiUsers } from "react-icons/fi";
import { LiaFileInvoiceDollarSolid, LiaStoreSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SiBrandfolder } from "react-icons/si";
import { TbFileInvoice } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import UserLogout from "../../components/Reusable/UserLogout/UserLogout";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdOutlineImportExport } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const DashboardSidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state?.auth);

  const handleLogOut = UserLogout();

  const [sideBarData, setSidebarData] = useState([
    // {
    //   name: "Dashboard",
    //   icon: <RxDashboard size={25}></RxDashboard>,
    //   path: "/dashboard",
    // },
    {
      name: "Import/Export",
      icon: <MdOutlineImportExport size={25}></MdOutlineImportExport>,
      path: "/dashboard/import",
    },
    {
      name: "Search",
      icon: <IoSearch size={25} />,
      path: "/dashboard/product/search",
    },
    {
      name: "Warehouse",
      icon: <LiaStoreSolid size={25}></LiaStoreSolid>,
      path: "/dashboard/store",
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
      name: "Products",
      icon: <AiOutlineShoppingCart size={25}></AiOutlineShoppingCart>,
      path: "/dashboard/product",
    },
    {
      name: "Shift Product",
      icon: <LiaFileInvoiceDollarSolid size={25} />,
      path: "/dashboard/products/transfer",
    },
    {
      name: "History",
      icon: <FaHistory size={18}></FaHistory>,
      path: "/dashboard/history",
    },
    {
      name: "Users",
      icon: <BiUserCircle size={25} />,
      path: "/dashboard/user",
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

  // useEffect(() => {
  //   if (user?.get_role?.role === "manager") {
  //     setSidebarData((prev) =>
  //       prev.filter((section) => {
  //         return (
  //           section?.name !== "Users" &&
  //           section?.name !== "Dashboard" &&
  //           section?.name !== "Settings"
  //         );
  //       })
  //     );
  //   }

  //   if (user?.get_role?.role === "sales_representative") {
  //     setSidebarData((prev) =>
  //       prev.filter((section) => {
  //         return (
  //           section?.name !== "Dashboard" &&
  //           section?.name !== "Users" &&
  //           section?.name !== "Customers" &&
  //           section?.name !== "Category" &&
  //           section?.name !== "Brand" &&
  //           section?.name !== "Store" &&
  //           section?.name !== "Product" &&
  //           section?.name !== "Reports" &&
  //           section?.name !== "Settings"
  //         );
  //       })
  //     );
  //   }

  //   if (user?.get_role?.role === "accountant") {
  //     setSidebarData((prev) =>
  //       prev.filter((section) => {
  //         return (
  //           section?.name !== "Dashboard" &&
  //           section?.name !== "Users" &&
  //           section?.name !== "Customers" &&
  //           section?.name !== "Category" &&
  //           section?.name !== "Brand" &&
  //           section?.name !== "Store" &&
  //           section?.name !== "Product" &&
  //           section?.name !== "Settings"
  //         );
  //       })
  //     );
  //   }

  //   if (user?.get_role?.role === "cashier") {
  //     setSidebarData((prev) =>
  //       prev.filter((section) => {
  //         return (
  //           section?.name !== "Dashboard" &&
  //           section?.name !== "Users" &&
  //           section?.name !== "Customers" &&
  //           section?.name !== "Category" &&
  //           section?.name !== "Brand" &&
  //           section?.name !== "Store" &&
  //           section?.name !== "Product" &&
  //           section?.name !== "Settings"
  //         );
  //       })
  //     );
  //   }

  //   if (user?.get_role?.role === "inventory_manager") {
  //     setSidebarData((prev) =>
  //       prev.filter((section) => {
  //         return (
  //           section?.name !== "Dashboard" &&
  //           section?.name !== "Users" &&
  //           section?.name !== "Customers" &&
  //           section?.name !== "Invoices" &&
  //           section?.name !== "Reports" &&
  //           section?.name !== "Settings"
  //         );
  //       })
  //     );
  //   }
  // }, [user]);

  useEffect(() => {
    if (user?.get_role?.role === "Staff") {
      setSidebarData((prev) =>
        prev.filter((item) => {
          return (
            item.name !== "Settings" &&
            item.name !== "Users" &&
            item.name !== "History" &&
            item.name !== "Shift Product" &&
            item.name !== "Warehouse" &&
            item.name !== "Category" &&
            item.name !== "Brand"
          );
        })
      );
    }
    if (user?.get_role?.role === "Sub Admin") {
      setSidebarData((prev) =>
        prev.filter((item) => {
          return item.name !== "Settings" ;
        })
      );
    }
  }, [user]);

  const isActive = (path) => {
    return location.pathname === path ? "active-link" : "";
  };

  return (
    <div className=" bg-gray-100 pb-12 text -mt-2 py-3   ">
      <div className="join join-vertical flex flex-col  w-full px-4 rounded-none  border-gray-300 -base-content">
        <ul className="sideBar lg:mt-5 ">
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

          <li
            onClick={() => handleLogOut()}
            className=" mb-12 cursor-pointer flex text-[#EF4444] font-bold items-center gap-x-2 hover.bg-sky-50 p-3 mt-10"
          >
            <RiLogoutCircleRLine size={25} /> Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
