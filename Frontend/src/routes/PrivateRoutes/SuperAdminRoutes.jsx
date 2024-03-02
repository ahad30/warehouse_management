import { node } from "prop-types";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const SuperAdminRoutes = ({ children }) => {
  const { user, isLoading } = useSelector((state) => state?.auth);

  if (isLoading) {
    return <UseLoading></UseLoading>;
  } else if (user?.get_role?.role === "Admin") {
    return children;
  } else {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }
};

export default SuperAdminRoutes;
SuperAdminRoutes.propTypes = {
  children: node,
};
