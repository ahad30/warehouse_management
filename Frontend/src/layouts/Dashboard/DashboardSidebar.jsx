import { Link, useLocation } from "react-router-dom";
import { AiOutlineSetting, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory, BiUserCircle } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { LiaFileInvoiceDollarSolid, LiaStoreSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SiBrandfolder } from "react-icons/si";
import { TbFileInvoice } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import UserLogout from "../../components/Reusable/UserLogout/UserLogout";
import { RiLogoutCircleRLine } from "react-icons/ri";

const DashboardSidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state?.auth);

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

  console.log(sideBarData);

  useEffect(() => {
    if (
      user?.get_role?.role !== "admin" &&
      user?.get_role?.role !== "manager"
    ) {
      setSidebarData((prev) =>
        prev.filter((section) => {
          return section?.name !== "Users" && section?.name !== "Settings";
        })
      );
    }
  }, [user]);

  const isActive = (path) => {
    return location.pathname === path ? "active-link" : "";
  };

  return (
    <div className="h-screen bg-gray-100 pb-12 text lg:w-2/12  overflow-y-scroll fixed -mt-2 py-3">
      <div className="join join-vertical flex flex-col     w-full px-4 rounded-none border-r border-gray-300 -base-content">
        <ul className="sideBar  ">
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
