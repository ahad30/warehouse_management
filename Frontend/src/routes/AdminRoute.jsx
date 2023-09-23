import { node } from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user?.role === "admin") {
    return <Navigate to={"/dashboard"}></Navigate>;
  }
  return children;
};

AdminRoute.propTypes = {
  children: node,
};

export default AdminRoute;
