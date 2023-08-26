import { Link } from "react-router-dom";
import {
  AiOutlineSetting,
  AiOutlineTable,
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
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { BsFiletypePdf, BsFillCartFill, BsPieChartFill } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";

const DashboardSidebar = () => {
  const sideBarData = [
    {
      name: "Dashboard",
      icon: <BiGrid size={25} />,
    },
    {
      name: "Users",
      icon: <BiUserCircle size={25} />,
      subLinks: [
        {
          name: "Add User",
          link: "/dashboard/user/add",
          icon: <AiOutlineUserAdd size={20} />,
        },
        {
          name: "Users list",
          link: "/dashboard/user",
          icon: <FiUsers size={20} />,
        },
      ],
    },
    {
      name: "Customers",
      icon: <FiUsers size={25} />,
      subLinks: [
        {
          name: "Add Customer",
          link: "/dashboard/customer/add",
          icon: <AiOutlineUserAdd size={20} />,
        },
        {
          name: "Customers list",
          link: "/dashboard/customer",
          icon: <FiUsers size={20} />,
        },
      ],
    },
    {
      name: "Category",
      icon: <BiCategory size={25} />,
      subLinks: [
        {
          name: "Add Category",
          link: "/dashboard/category/add",
          icon: <BiSolidDuplicate size={20} />,
        },
        {
          name: "Categories",
          link: "/dashboard/category",
          icon: <BiCategory size={25} />,
        },
      ],
    },
    {
      name: "Product",
      icon: <BsFillCartFill size={25} />,
      subLinks: [
        {
          name: "Add Product",
          link: "/dashboard/product/add",
          icon: <BiCartAdd size={20} />,
        },
        {
          name: "Products List",
          link: "/dashboard/product",
          icon: <BsFillCartFill size={20} />,
        },
      ],
    },
    {
      name: "Sales Report",
      icon: <BsPieChartFill size={25} />,
      subLinks: [
        {
          name: "Sales Report",
          link: "/dashboard/report",
          icon: <AiOutlineTable size={20} />,
        },
        {
          name: "Sales Analytics",
          link: "/dashboard/analytics",
          icon: <BsPieChartFill size={20} />,
        },
      ],
    },
    {
      name: "Invoices",
      icon: <FaFileInvoiceDollar size={25} />,
      subLinks: [
        {
          name: "New Invoice",
          link: "/dashboard/invoice/new",
          icon: <BiSolidPurchaseTag size={20} />,
        },
        {
          name: "Invoices List",
          link: "/dashboard/invoice",
          icon: <FaFileInvoiceDollar size={20} />,
        },
      ],
    },
    {
      name: "Settings",
      icon: <AiOutlineSetting size={25} />,
      subLinks: [
        {
          name: "Default Setting",
          link: "/dashboard/setting/default",
          icon: <GiSettingsKnobs size={20} />,
        },
        {
          name: "PDF Setting",
          link: "/dashboard/setting/pdf",
          icon: <BsFiletypePdf size={20} />,
        },
      ],
    },
  ];

  return (
    <div className="bg-white">
      <div className="join join-vertical w-[250px] min-h-screen text-base-content">
        {sideBarData?.map((sideBar, i) => (
          <div
            key={i}
            className="collapse collapse-arrow join-item border border-base-300"
          >
            <input type="radio" name="my-accordion-4" checked="checked" />
            <div className="collapse-title text-lg font-medium uppercase">
              <span className="flex items-center gap-x-2">
                {sideBar?.icon}
                <span>{sideBar?.name}</span>
              </span>
            </div>
            <div className="collapse-content ml-5">
              <ul className="flex flex-col gap-3">
                {sideBar?.subLinks?.map((link, i) => (
                  <span key={i} className="flex items-center gap-x-2">
                    {link?.icon}
                    <Link key={i} to={link?.link}>
                      {link?.name}
                    </Link>
                  </span>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSidebar;
