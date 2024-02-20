import { node } from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import UseLoading from "../components/Reusable/useLoading/UseLoading";
import toast from "react-hot-toast";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state?.auth);

  if (isLoading) {
    return <UseLoading />;
  }

  // if (user?.get_role?.role == "Admin") {
  //   return children;
  // } else {
  //   if(user){
  //   console.log(user)
  //   //  toast.error("Sorry! You have not Permitted!");
  //   return navigate('/403')
  //  }
  // }
  if(user?.get_role){

    if(user?.get_role?.role == 'Admin'){
      return children;
    }else{
        return <Navigate to={"/403"} state={{ from: location }} replace />;
    }
  }

};

AdminRoute.propTypes = {
  children: node,
};

export default AdminRoute;
