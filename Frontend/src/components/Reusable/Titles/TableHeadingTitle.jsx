import PropTypes from "prop-types";

const TableHeadingTitle = ({ children }) => {
  return (
    <h2 className="text-xl font-semibold font-poppins mt-2">
      Total {children}
    </h2>
  );
};

TableHeadingTitle.propTypes = {
  children: PropTypes.node,
};

export default TableHeadingTitle;
