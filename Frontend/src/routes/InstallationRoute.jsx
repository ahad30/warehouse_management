import { node } from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const InstallationRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkInstallation = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_PORT}/already-install`
        );

        const data = response?.data;
        if (data?.message === "Not Installed") {
          navigate("/pre-installation");
          localStorage.setItem("installationLocal", "false");
        } else if (data?.message === "Already Installed") {
          localStorage.setItem("installationLocal", "true");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
   
    };

    checkInstallation();
  }, [navigate]);

  return children;
};

InstallationRoute.propTypes = {
  children: node,
};

export default InstallationRoute;
