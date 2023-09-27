import { node } from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user?.jwt_token) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
};

PrivateRoute.propTypes = {
  children: node,
};

export default PrivateRoute;
