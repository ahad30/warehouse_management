import { useSelector } from "react-redux";

const NavbarNew = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <div className="bg-gray-100 flex justify-between border-b border-gray-300">
      <div className="border-r w-[250px] p-4 border-gray-300 "><p className="font-bold">Invoice management</p></div>

      {/* right side */}
      <div className="p-4 flex items-center gap-x-2">
       <img className="w-12 h-12 rounded-full" src={user?.img ? user?.img : `https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png`} alt="" />


        <p>{user?.name ? user?.name : `jhon due`}</p>
      </div>
    </div>
  );
};

export default NavbarNew;
