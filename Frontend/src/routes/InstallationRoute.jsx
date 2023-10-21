import { node } from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const InstallationRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const installationLocal = localStorage.getItem("installationLocal");

    if (installationLocal && installationLocal === "true") {
      return children;
    } else if (!installationLocal || installationLocal === "false") {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_PORT}/already-install`)
        .then((response) => {
          const data = response?.data;
          if (data?.message === "Not Installed") {
            navigate("/pre-installation");
            localStorage.setItem("installationLocal", "false");
          } else if (data?.message === "Already Installed") {
            localStorage.setItem("installationLocal", "true");
            return children;
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  }, [navigate, children]);

  // return children;
};

InstallationRoute.propTypes = {
  children: node,
};

export default InstallationRoute;
