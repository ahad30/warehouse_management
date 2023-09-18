import { array, func, node, string } from "prop-types";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import SearchAndAddBtn from "../Inputs/SearchAndAddBtn";

// Table.jsx
const UseTable = ({
  data,
  columns,
  onDelete,
  onEdit,
  btnTitle,
  btnPath,
  btnIcon,
  setFiltering,
}) => {
  return (
    <div>
      {/* SearchAndAddBtn */}
      <SearchAndAddBtn
        btnTitle={btnTitle}
        btnPath={btnPath}
        btnIcon={btnIcon}
        setFiltering={setFiltering}
      />
      <div className="overflow-x-scroll">
        <table className="table table-sm table-pin-rows table-pin-cols">
          {/* Table header */}
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.header}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={column.key}>{row[column.key]}</td>
                ))}
                <td>
                  <div className="flex items-center gap-x-3">
                    <FiEdit
                      onClick={() => {
                        onEdit(row?.id);
                      }}
                      className="cursor-pointer"
                      size={20}
                    />{" "}
                    <RiDeleteBin4Line
                      onClick={() => {
                        onDelete(row?.id);
                      }}
                      className="cursor-pointer"
                      size={20}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.header}</th>
              ))}
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

UseTable.propTypes = {
  data: array,
  columns: array,
  onDelete: func,
  onEdit: func,
  onSearch: func,
  btnTitle: string,
  btnPath: string,
  btnIcon: node,
  setFiltering: func,
};

export default UseTable;
