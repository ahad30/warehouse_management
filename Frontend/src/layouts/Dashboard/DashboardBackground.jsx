import { node } from "prop-types";

const DashboardBackground = ({ children }) => {
  return (
    <div className="mx-auto bg-white border rounded-r-md p-3 lg:p-5  min-h-screen max-w-[100vw]">
      {children}
    </div>
  );
};

DashboardBackground.propTypes = {
  children: node,
};

export default DashboardBackground;
