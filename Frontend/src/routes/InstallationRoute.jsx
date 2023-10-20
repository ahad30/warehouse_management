import { node } from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const InstallationRoute = ({ children }) => {
  const navigate = useNavigate();
  const [installation, setInstallation] = useState(true);

  useEffect(() => {
    const installationLocal = localStorage.getItem("installation");
    setInstallation(installation);

    if (installation === "false") {
      navigate("/pre-installation");
    } else if (installationLocal === "false") {
      fetch(`${import.meta.env.VITE_REACT_APP_PORT}/already-install`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.message === "Not Installed") {
            setInstallation(false);
            localStorage.setItem("installationLocal", installation);
          } else if (data?.message === "Already Installed") {
            setInstallation(true);
            localStorage.setItem("installationLocal", installation);
          }
        });
    }
  }, [navigate, installation]);

  console.log(installation);

  // if (data?.message === "Not Installed") {
  //   toast.error("Please, Complete installation Process!", { id: 1 });
  //   return (
  //     <Navigate to={"/pre-installation"} state={{ from: location }} replace />
  //   );
  // }
  return children;
};

InstallationRoute.propTypes = {
  children: node,
};

export default InstallationRoute;
