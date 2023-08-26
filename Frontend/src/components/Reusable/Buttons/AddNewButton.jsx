import { node, string } from "prop-types";
import { Link } from "react-router-dom";

const AddNewButton = ({ children, path, icon }) => {
  return (
    <Link
      to={path}
      className="btn bg-gray-600 text-white hover:bg-gray-600 hover:text-white"
    >
      <span className="flex items-center gap-x-2">
        <span>{icon}</span>
        <span className="hidden sm:block">{children}</span>
      </span>
    </Link>
  );
};

AddNewButton.propTypes = {
  children: node,
  path: string,
  icon: node,
};

export default AddNewButton;
