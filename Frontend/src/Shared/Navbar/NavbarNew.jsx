import { AiOutlinePlusCircle,AiOutlineMenu } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const NavbarNew = () => {
  const { user } = useSelector((state) => state.auth);

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
          <Link to={"/dashboard/invoice/new"}>New Invoice</Link>
        </div>
        


        <div className="p-4 flex items-center gap-x-2">
          <img
            className="w-12 h-12 rounded-full"
            src={
              user?.img
                ? user?.img
                : `https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png`
            }
            alt=""
          />
          <p className="flex flex-col gap-0">
            <span className="font-semibold">
              {user?.name ? user?.name : `John Doe`}
            </span>
            <span>{user?.get_role?.role ? user?.get_role?.role : `Role`}</span>
          </p>
       </div>
      </div>


    </div>
  );
};

export default NavbarNew;
