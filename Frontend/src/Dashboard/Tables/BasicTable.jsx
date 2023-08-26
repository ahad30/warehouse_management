import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { array, node, string } from "prop-types";
import { useState } from "react";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";

const BasicTable = ({ data, columns, btnTitle, btnIcon, btnPath }) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="max-w-full p-2">
      {/* Search and Add New Button */}
      <SearchAndAddBtn
        setFiltering={setFiltering}
        btnTitle={btnTitle}
        btnIcon={btnIcon}
        btnPath={btnPath}
      ></SearchAndAddBtn>

      {/* Table */}
      <div className="overflow-x-scroll">
        <table className="table table-pin-rows table-pin-cols">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <>
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {
                            { asc: "🔼", desc: "🔽" }[
                              header.column.getIsSorted() ?? null
                            ]
                          }
                        </div>
                      )}
                    </th>
                  </>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((footer) => (
                  <>
                    <th key={footer.id}>
                      {footer.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            footer.column.columnDef.footer,
                            footer.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  </>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-3">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className={`rounded-l-lg bg-gray-600 text-white px-3 py-1 border-r ${
            !table.getCanPreviousPage() && "bg-gray-500"
          }`}
        >
          Prev
        </button>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className={`rounded-r-lg bg-gray-600 text-white px-3 py-1 border-l ${
            !table.getCanNextPage() && "bg-gray-500"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

BasicTable.propTypes = {
  data: array,
  columns: array,
  btnTitle: string,
  btnPath: string,
  btnIcon: node,
};

export default BasicTable;
