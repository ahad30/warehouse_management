import { node } from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // const { user } = useSelector((state) => state.auth);
  // const { access_token } = useSelector((state) => state.auth);
  let access_token = JSON.parse(localStorage.getItem("access_token"));
  
  console.log(access_token);
  if (!access_token) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
};

PrivateRoute.propTypes = {
  children: node,
};

export default PrivateRoute;
