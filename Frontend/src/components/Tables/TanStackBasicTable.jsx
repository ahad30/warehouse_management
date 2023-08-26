import { FiEdit } from "react-icons/fi";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
// import { DateTime } from "luxon";

const TanStackBasicTable = ({ data, columns }) => {
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
    <div className="w3-container">
      {/* Search filter */}
      <input
        className="input input-bordered"
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        placeholder="Search filter"
      />
      {/* Table */}
      <table className="w3-table-all">
        <thead>
          {table.getHeaderGroups()?.map((headerGroup) => (
            <tr key={headerGroup?.id}>
              {headerGroup?.headers?.map((header) => (
                <>
                  <th
                    key={header?.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header?.column?.columnDef?.header,
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
        {/* <tfoot>
          {table.getFooterGroups()?.map((footerGroup) => (
            <tr key={footerGroup?.id}>
              {footerGroup?.headers?.map((footer) => (
                <th key={footer?.id}>
                  {flexRender(
                    footer?.column?.columnDef?.footer,
                    footer.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>

      {/* Pagination */}
      <div className="flex justify-between">
        <button onClick={() => table.setPageIndex(0)}>First page</button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous page
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next page
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Last page
        </button>
      </div>
    </div>
  );
};

export default TanStackBasicTable;
