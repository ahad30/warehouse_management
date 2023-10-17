import { node } from "prop-types";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ManagerRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state?.auth);

  if (user?.get_role?.role !== "admin" && user?.get_role?.role !== "manager") {
    toast.error("Sorry! You have not Permitted!", { id: 1 });
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }
  return children;
};

ManagerRoute.propTypes = {
  children: node,
};

export default ManagerRoute;
