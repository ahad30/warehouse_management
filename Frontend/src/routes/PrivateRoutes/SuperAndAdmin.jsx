import { node } from "prop-types";
import { useSelector } from "react-redux";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";

const SuperAndAdmin = ({ children }) => {
  const { user, isLoading } = useSelector((state) => state?.auth);

  if (isLoading) {
    return <UseLoading></UseLoading>;
  } else if (
    user?.get_role?.role === "Admin" ||
    user?.get_role?.role === "Sub Admin"
  ) {
    return children;
  }
};

export default SuperAndAdmin;
SuperAndAdmin.propTypes = {
  children: node,
};
