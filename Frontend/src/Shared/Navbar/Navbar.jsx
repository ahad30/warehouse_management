import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 w-full max-w-[1440px] mx-auto">
      <div className="flex-1">
        <Link to={"/"} className="normal-case text-xl font-bold">
          Invoice Generator
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="hidden lg:block">
          <Link to={"/dashboard"}>Dashboard</Link>
        </div>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1691904398~exp=1691904998~hmac=c868d5c96d084bec6d238d0f1e5ab4b1e6e9e64b9ba7338f650ad540e1f5e387" />
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
