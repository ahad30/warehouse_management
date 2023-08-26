import PropTypes from "prop-types";

const TableHeadingTitle = ({ children }) => {
  return <h2 className="text-xl mt-5 font-semibold">{children}</h2>;
};

TableHeadingTitle.propTypes = {
  children: PropTypes.node,
};

export default TableHeadingTitle;
