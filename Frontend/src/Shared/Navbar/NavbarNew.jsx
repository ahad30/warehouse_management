import { AiOutlinePlusCircle, AiOutlineMenu } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserLogout from "../../components/Reusable/UserLogout/UserLogout";

const NavbarNew = () => {
  const { user } = useSelector((state) => state.auth);

  const handleLogOut = UserLogout();

  return (
    <div className="bg-gray-100 flex justify-between border-b border-gray-300">
      <div className="border-r lg:w-2/12 p-4 border-gray-300 flex items-center justify-center">
        <Link to={"/dashboard"} className="font-bold hidden lg:block">
          Invoice management
        </Link>
        <label htmlFor="dashboard-drawer" className="drawer-button lg:hidden">
          <AiOutlineMenu></AiOutlineMenu>
        </label>
      </div>

      {/* right side */}
      <div className="flex items-center gap-2">
        <div className="flex items-center space-x-2 bg-[#0369A1] text-white rounded-md px-3 py-2 ">
          <AiOutlinePlusCircle size={25} />
          <Link to={"/dashboard/invoice/new"}>
            {" "}
            <span className="hidden sm:block">New Invoice</span>
          </Link>
        </div>

        <div className="p-4 flex items-center gap-x-2">
          <Link to={"/dashboard/profile"}>
            <img
              className="w-12 h-12 rounded-full"
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
            <span className="font-semibold">
              {user?.name ? `${user?.name.slice(0, 12)}...` : `John Doe`}
            </span>
            <span className="flex items-center gap-x-2">
              <span>
                {user?.get_role?.role ? user?.get_role?.role : `Role`}
              </span>
              <span className="cursor-pointer">
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

export default NavbarNew;
