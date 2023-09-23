import { array, bool, func, node, object, string } from "prop-types";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import SearchAndAddBtn from "../Inputs/SearchAndAddBtn";
import { FaDownload } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";

// Table.jsx
const UseTable = ({
  data,
  columns,
  onDelete,
  handleModalEditInfo,
  handleInvoicePDF,
  handleInvoiceView,
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
              {columns?.map((column) => (
                <th key={column?.key}>{column?.header}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {data?.map((row) => (
              <tr key={row?.id}>
                {columns?.map((column) => (
                  <td key={column?.key}>
                    {column.key === "img" ? (
                      <>
                        <img
                          className="w-8 h-8 rounded-full border"
                          src={row[column?.key]}
                        />
                      </>
                    ) : (
                      row[column?.key]
                    )}
                  </td>
                ))}
                <td>
                  <div className="flex items-center gap-x-3">
                    {handleInvoicePDF && (
                      <FaDownload
                        onClick={() => {
                          handleInvoicePDF(row);
                        }}
                        className="cursor-pointer"
                        size={20}
                      />
                    )}
                    {handleInvoiceView && (
                      <BsFillEyeFill
                        onClick={() => {
                          handleInvoiceView(row);
                        }}
                        className="cursor-pointer"
                        size={20}
                      />
                    )}

                    <FiEdit
                      onClick={() => {
                        handleModalEditInfo(row);
                      }}
                      className="cursor-pointer"
                      size={20}
                    />
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
              {columns?.map((column) => (
                <th key={column?.key}>{column?.header}</th>
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
  handleModalEditInfo: func,
  onSearch: func,
  btnTitle: string,
  btnPath: string,
  btnIcon: node,
  setFiltering: func,
  modalIsOpen: bool,
  setModalIsOpen: func,
  editItem: object,
  handleInvoicePDF: func,
  handleInvoiceView: func,
};

export default UseTable;
