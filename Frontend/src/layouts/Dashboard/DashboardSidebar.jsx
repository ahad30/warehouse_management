import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSetting } from "react-icons/ai";
import { BiCategory, BiGrid, BiLogOut, BiUserCircle } from "react-icons/bi";
import { FaFileInvoiceDollar, FaStore } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { BsFillCartFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SiBrandfolder } from "react-icons/si";
import { toast } from "react-hot-toast";
import { useUserLogOutMutation } from "../../features/User/userApi";
import { logOut } from "../../features/Auth/authSlice";

const DashboardSidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  // LOGOUT STARTS
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userLogOut, { isLoading, isError, error, isSuccess, data }] =
    useUserLogOutMutation();

  const handleLogOut = () => {
    userLogOut();
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading(<p>Loading...</p>, { id: 1 });
    }
    if (isError && !data?.status) {
      toast.error(error?.data?.message);
    }

    if (isSuccess && data?.status) {
      dispatch(logOut());
      navigate("/login");
      toast.success(data?.message, { id: 1 });
    }
  }, [
    data?.message,
    data?.status,
    dispatch,
    error?.data?.message,
    isError,
    isLoading,
    isSuccess,
    navigate,
  ]);
  // LOGOUT ENDS

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
    <div className="bg-gray-100 lg:w-2/12 fixed -mt-2">
      <div className="join join-vertical w-full  px-4 rounded-none border-r border-gray-300 min-h-screen text-base-content">
        <ul className="sideBar">
          {sideBarData &&
            sideBarData?.map((item) => (
              <li
                key={item?.name}
                className={`my-3 flex items-center gap-x-2 hover:bg-sky-50 p-3 ${isActive(
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
          <div className="pt-20">
            <Link
              className={`flex gap-x-2 ${isActive("/dashboard/setting")}`}
              to="/dashboard/setting"
            >
              <AiOutlineSetting size={25}></AiOutlineSetting>
              <p>Settings</p>
            </Link>
          </div>
          <div className="pt-5">
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
