import { node } from "prop-types";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import UseLoading from "../components/Reusable/useLoading/UseLoading";

const MACRoute = ({ children }) => {
  // MANAGER, ACCOUNTANT, CASHIER ROUTE
  const location = useLocation();
  const { user, isLoading } = useSelector((state) => state?.auth);

  // if (
  //   user?.get_role?.role !== "admin" &&
  //   user?.get_role?.role !== "manager" &&
  //   user?.get_role?.role !== "accountant" &&
  //   user?.get_role?.role !== "cashier"
  // ) {
  //   toast.error("Sorry! You have not Permitted!", { id: 1 });
  //   return <Navigate to={"/"} state={{ from: location }} replace />;
  // }
  if (isLoading) {
    return <UseLoading />;
  }
  if (
    user?.get_role?.role == "admin" ||
    user?.get_role?.role == "manager" ||
    user?.get_role?.role == "accountant" ||
    user?.get_role?.role == "cashier"
  ) {
    return children;
  } else {
    toast.error("Sorry! You have not Permitted!", { id: 1 });

    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
};

MACRoute.propTypes = {
  children: node,
};

export default MACRoute;
