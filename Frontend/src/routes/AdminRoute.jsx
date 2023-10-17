import { node } from "prop-types";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import UseLoading from "../components/Reusable/useLoading/UseLoading";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { user, isLoading } = useSelector((state) => state?.auth);

  if (isLoading) {
    <UseLoading />;
  }

  if (user?.get_role?.role !== "admin") {
    toast.error("Sorry! You have not Permitted!", { id: 1 });
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }
  return children;
};

AdminRoute.propTypes = {
  children: node,
};

export default AdminRoute;
