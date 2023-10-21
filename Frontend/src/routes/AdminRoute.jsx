import { node } from "prop-types";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import UseLoading from "../components/Reusable/useLoading/UseLoading";
import UserLogout from "../components/Reusable/UserLogout/UserLogout";
import { useEffect, useState } from "react";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { user, isLoading } = useSelector((state) => state?.auth);
  const handleLogOut = UserLogout();
  


  

  if (isLoading) {
    return <UseLoading />;
  }

  if (user?.get_role?.role == "admin") {
    // toast.error("Sorry! You have not Permitted!", { id: 1 });
    // return <Navigate to={"/"} state={{ from: location }} replace />;
    return children;
  }

 
  // return children;
  return <Navigate to={"/login"} state={{ from: location }} replace />;


  // else  {
  //   return <Navigate to={"/login"} state={{ from: location }} replace />;
  // }
  
  
};

AdminRoute.propTypes = {
  children: node,
};

export default AdminRoute;
