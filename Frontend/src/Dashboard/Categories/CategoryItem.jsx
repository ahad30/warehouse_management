import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import PropTypes, { object } from "prop-types";
import { useUpdateCategoryMutation } from "../../features/Category/categoryApi";

const CategoryItem = ({ idx, category }) => {
  const [updateCategory, { isLoading, isError, error, isSuccess }] =
    useUpdateCategoryMutation();

  const handleEdit = (id) => {
    console.log(id);
  };
  const handleDelete = (id) => {
    console.log(id);
  };
  
  return (
    <tr>
      <th>{idx + 1}</th>
      <td>{category?.category_name}</td>
      <td>{category?.description}</td>
      <td>
        <div className="flex items-center gap-x-3">
          <FiEdit
            onClick={() => {
              handleEdit(category?.id);
            }}
            className="cursor-pointer"
            size={20}
          />
          <RiDeleteBin4Line
            onClick={() => {
              handleDelete(category?.id);
            }}
            className="cursor-pointer"
            size={20}
          />
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
