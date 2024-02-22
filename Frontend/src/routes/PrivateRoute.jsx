import { node } from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Get the current route location
  const location = useLocation();

  // Check if the access token is present in local storage
  let token = localStorage.getItem("access_token");

  // If the access token is not present, redirect to the login page

  if (!token) {
    return (
      <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
    );
  }

  // If the access token is present, render the children components
  return children;
};

PrivateRoute.propTypes = {
  children: node,
};

export default PrivateRoute;
