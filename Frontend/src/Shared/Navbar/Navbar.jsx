import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../features/Auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className="navbar bg-base-100 w-full max-w-[1440px] mx-auto">
      <div className="flex-1">
        <Link to={"/"} className="normal-case text-xl font-bold">
          Invoice Generator
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="hidden lg:block">
          {user ? (
            <button onClick={() => handleLogOut()}>Logout</button>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>

        {user && (
          <div className="hidden lg:block">
            <Link to={"/dashboard"}>Dashboard</Link>
          </div>
        )}

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
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <div className="">
                <label
                  htmlFor="dashboard-drawer"
                  className="drawer-button lg:hidden"
                >
                  Dashboard
                </label>
              </div>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
