import { AiOutlinePlusCircle } from "react-icons/ai";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserLogout from "../../components/Reusable/UserLogout/UserLogout";
import { useGetCompanyInfoQuery } from "../../features/Settings/settingsApi";

const Navbar = () => {
  // Get the user data from the Redux store
  const { user } = useSelector((state) => state.auth);

  // Query to get company information
  const { data } = useGetCompanyInfoQuery();

  // Function to handle user logout
  const handleLogOut = UserLogout();

  return (
    <div className="bg-gray-100 flex items-center justify-between border-b border-gray-300 ">
      <div className=" lg:w-[15%] lg:p-4 border-gray-300 flex items-center justify-center">
        {/* Link to the dashboard and company logo or name */}
        <Link to={"/"} className="font-bold hidden lg:block">
          {data?.company_info?.company_img ? (
            // Display company logo if available
            <img
              className="w-28 h-12 rounded-md object-contain"
              src={`${
                import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT
              }/uploads/companyInfo/${data?.company_info?.company_img}`}
              alt=""
            />
          ) : (
            // Display company name if logo is not available
            <>{data?.company_info?.company_name}</>
          )}
        </Link>

        {/* Drawer button for mobile view */}
        <label
          htmlFor="dashboard-drawer"
          className="drawer-button   lg:hidden cursor-pointer text-xl btn "
        >
          <HiBars3BottomLeft />
        </label>
      </div>

      {/* Right side of the navigation bar */}
      <div className="flex items-center gap-2">
        {/* Button to create a new invoice */}
        {user?.get_role?.role !== "inventory_manager" && (
          <div className="flex items-center space-x-2 bg-[#e74c3c] text-white rounded-md px-3 py-2">
            <Link
              className="flex justify-center gap-2 items-center"
              to={"/dashboard/pos"}
            >
              <AiOutlinePlusCircle size={25} />{" "}
              <span className="hidden sm:block">POS</span>
            </Link>
          </div>
        )}

        {/* User profile information and logout option */}
        <div className="p-4 flex items-center gap-x-2">
          <Link to={"/dashboard/profile"}>
            {/* User profile image */}
            <img
              className="w-12 h-12 rounded-full object-contain"
              src={
                user?.img
                  ? `${
                      import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT
                    }/uploads/users/${user?.img}`
                  : `https://cdn-icons-png.flaticon.com/512/149/149071.png`
              }
              alt=""
            />
          </Link>

          <p className="flex flex-col gap-0">
            {/* User name */}
            <span className="font-semibold">
              {user?.name ? `${user?.name.slice(0, 12)}...` : `John Doe`}
            </span>
            <span className="flex items-center gap-x-2">
              <span>
                {/* User role */}
                {user?.get_role?.role ? user?.get_role?.role : `Role`}
              </span>
              <span className="cursor-pointer">
                {/* Logout option */}
                <RiLogoutCircleRLine
                  title="Log Out"
                  color="red"
                  onClick={() => handleLogOut()}
                  size={20}
                />
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
