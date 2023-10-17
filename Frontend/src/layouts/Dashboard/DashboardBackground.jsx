import { node } from "prop-types";


const DashboardBackground = ({ children }) => {
  return (
    <div className="mx-auto overflow-scroll bg-white border rounded-md p-3 lg:px-5  min-h-screen max-w-[100vw]">
      {children}
    </div>
  );
};

DashboardBackground.propTypes = {
  children: node,
  
};

export default DashboardBackground;
