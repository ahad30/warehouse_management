import { node } from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation()
  
  let token = localStorage.getItem('access_token')
  // if (!user?.jwt_token) {
  if (!token) {
    return <Navigate to={"/login"} state={{from: location}} replace  ></Navigate>;
  }
  return children;
};

PrivateRoute.propTypes = {
  children: node,
};

export default PrivateRoute;
