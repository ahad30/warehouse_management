import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import PropTypes from "prop-types";

const CategoryItem = ({ index }) => {
  return (
    <tr>
      <th>{index + 1}</th>
      <td>Samsung</td>
      <td>This is Samsung category</td>
      <td>
        <div className="flex items-center gap-x-3">
          <FiEdit className="cursor-pointer" size={20} />{" "}
          <RiDeleteBin4Line className="cursor-pointer" size={20} />
        </div>
      </td>
    </tr>
  );
};

CategoryItem.propTypes = {
  index: PropTypes.string,
};

export default CategoryItem;
