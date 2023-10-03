import { node } from "prop-types";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  
  let token = localStorage.getItem('access_token')
  // if (!user?.jwt_token) {
  if (!token) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
};

PrivateRoute.propTypes = {
  children: node,
};

export default PrivateRoute;
