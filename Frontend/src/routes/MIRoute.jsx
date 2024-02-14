import { node } from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import UseLoading from "../components/Reusable/useLoading/UseLoading";

const MIRoute = ({ children }) => {
  // MANAGER, INVENTORY MANAGER
  const location = useLocation();
  const { user, isLoading } = useSelector((state) => state?.auth);

  if (isLoading) {
    return <UseLoading />;
  }
  if (
    user?.get_role?.role == "admin" ||
    user?.get_role?.role == "manager" ||
    user?.get_role?.role == "inventory_manager"
  ) {
    return children;
  } else {
    // toast.error("Sorry! You have not Permitted!", { id: 1 });
    // return <Navigate to={"/"} state={{ from: location }} replace />;
  }
};

MIRoute.propTypes = {
  children: node,
};

export default MIRoute;
