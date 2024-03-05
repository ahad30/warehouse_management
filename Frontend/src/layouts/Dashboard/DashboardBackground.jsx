import { node } from "prop-types";

const DashboardBackground = ({ children }) => {
  return (
    <div className=" bg-white border min-h-[90vh] rounded-md p-3 lg:p-5">
      {children}
    </div>
  );
};

DashboardBackground.propTypes = {
  children: node,
};

export default DashboardBackground;
