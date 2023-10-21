import { node } from "prop-types";

const DashboardBackground = ({ children }) => {
  return (
    <div className=" bg-white border rounded-md p-3 lg:px-5">{children}</div>
  );
};

DashboardBackground.propTypes = {
  children: node,
};

export default DashboardBackground;
