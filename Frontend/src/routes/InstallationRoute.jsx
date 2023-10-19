import { node } from "prop-types";
import { toast } from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import UseLoading from "../components/Reusable/useLoading/UseLoading";
import { useGetAlreadyInstallQuery } from "../features/Installation/installationApi";

const InstallationRoute = ({ children }) => {
  const location = useLocation();
  const { data, isLoading } = useGetAlreadyInstallQuery();

  if (data?.message === "Already Installed") {
    localStorage.setItem("installation", true);
  }

  if (isLoading) {
    <UseLoading />;
  }

  if (data?.message === "Already Installed") {
    toast.error("Please, Complete installation Process!", { id: 1 });
    return (
      <Navigate to={"/pre-installation"} state={{ from: location }} replace />
    );
  }
  return children;
};

InstallationRoute.propTypes = {
  children: node,
};

export default InstallationRoute;
