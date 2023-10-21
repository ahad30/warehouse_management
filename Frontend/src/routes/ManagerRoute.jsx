import { node } from "prop-types";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import UserLogout from "../components/Reusable/UserLogout/UserLogout";
import { useEffect, useState } from "react";
import UseLoading from "../components/Reusable/useLoading/UseLoading";

const ManagerRoute = ({ children }) => {
  const location = useLocation();
  const { user, isLoading } = useSelector((state) => state?.auth);

 

  if (isLoading) {
    return <UseLoading />;
  }

  // if (user?.get_role?.role !== "admin" && user?.get_role?.role !== "manager") {
  //   toast.error("Sorry! You have not Permitted!", { id: 1 });
  //   return <Navigate to={"/"} state={{ from: location }} replace />;
  // }
  if (user?.get_role?.role == "manager" || user?.get_role?.role == "admin") {
    // toast.error("Sorry! You have not Permitted!", { id: 1 });
    // return <Navigate to={"/"} state={{ from: location }} replace />;
    return children;
  } else {
    toast.error("Sorry! You have not Permitted!", { id: 1 });

    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
};

ManagerRoute.propTypes = {
  children: node,
};

export default ManagerRoute;
