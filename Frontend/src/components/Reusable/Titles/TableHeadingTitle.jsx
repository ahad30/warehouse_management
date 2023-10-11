import PropTypes from "prop-types";

const TableHeadingTitle = ({ children }) => {
  return <h2 className="text-xl font-semibold">{children}</h2>;
};

TableHeadingTitle.propTypes = {
  children: PropTypes.node,
};

export default TableHeadingTitle;
