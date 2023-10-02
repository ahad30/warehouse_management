import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../features/Auth/authSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import { useUserLogOutMutation } from "../../features/User/userApi";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [userLogOut, { isLoading, isError, error, isSuccess, data }] =
    useUserLogOutMutation();

  console.log(data, isLoading, isError, error, isSuccess);

  const handleLogOut = () => {
    userLogOut();
  };

  if (isError && !data?.status) {
    toast.error(error?.data?.message);
  }

  if (isSuccess && data?.status) {
    dispatch(logOut());
    toast.success(data?.message, { id: 1 });
  }

  return (
    <div className="navbar bg-base-100 w-full max-w-[1440px] mx-auto border-b">
      <div className="flex-1">
        <Link to={"/dashboard"} className="normal-case text-xl font-bold">
          Invoice Management
        </Link>
      </div>
      <div className="flex-none gap-2">
        {/* Login & Logout */}
        <div className="hidden lg:block">
          {user ? (
            <button
              className="bg-red-600 text-white px-2 py-1 rounded-md"
              onClick={() => handleLogOut()}
            >
              Logout
            </button>
          ) : (
            <Link className="bg-[#55C360]" to={"/login"}>
              Login
            </Link>
          )}
        </div>

        {/* User Profile */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              {user && (
                <div className="hidden lg:block">
                  <p>{user?.email}</p>
                </div>
              )}
            </li>
            <li>
              {user && (
                <div className="hidden lg:block">
                  <Link to={"/dashboard"}>Dashboard</Link>
                </div>
              )}
            </li>
            <li>
              <label
                htmlFor="dashboard-drawer"
                className="drawer-button lg:hidden"
              >
                Dashboard
              </label>
            </li>
            <li>
              <Link
                to={"/dashboard/setting/default"}
                className="justify-between"
              >
                Profile Settings
              </Link>
            </li>
            <li onClick={() => handleLogOut()}>
              <button>Logout</button>
            </li>
          </ul>
        </div>
        <label
          htmlFor="dashboard-drawer"
          className="sm:hidden drawer-button lg:hidden"
        >
          <RxHamburgerMenu size={30} />
        </label>
      </div>
    </div>
  );
};

export default Navbar;
