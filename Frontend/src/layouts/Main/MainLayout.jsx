import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import NavTest from "../../Shared/Navbar/NavTest";
import NavTest2 from "../../Shared/Navbar/NavTest2";

const MainLayout = () => {
  return (
    <div>
      {/* <Navbar /> */}
      {/* <NavTest/> */}
      {/* <NavTest2 /> */}
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
