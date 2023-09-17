import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import PropTypes, { object } from "prop-types";

const CategoryItem = ({ idx, category }) => {
  return (
    <tr>
      <th>{idx + 1}</th>
      <td>{category?.category_name}</td>
      <td>{category?.description}</td>
      <td>
        <div className="flex items-center gap-x-3">
          <FiEdit className="cursor-pointer" size={20} />{" "}
          <RiDeleteBin4Line className="cursor-pointer" size={20} />
        </div>
      </td>
      <th>{idx + 1}</th>
    </tr>
  );
};

CategoryItem.propTypes = {
  idx: PropTypes.string,
  category: object,
};

export default CategoryItem;
