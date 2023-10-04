import { BsFiletypeCsv, BsFiletypePdf } from "react-icons/bs";
import ReportItem from "./ReportItem";
import { format } from "date-fns";
import { useMemo } from "react";
import reportData from "./reportData.json";
import DashboardBackground from "../../../layouts/Dashboard/DashboardBackground";
import { useGetSalesReportsQuery } from "../../../features/SalesReport/salesReportApi";

const ReportList = () => {
  const toDay = format(new Date(), "yyyy-MM-dd");
  const { data: reports } = useGetSalesReportsQuery();
  console.log(reports);

  const data = useMemo(() => reportData, []);
  const columns = [
    {
      header: "",
      accessorKey: "id",
      footer: "",
    },
    {
      header: "Invoice No",
      accessorKey: "invoice no.",
      footer: "Invoice No",
    },
    {
      header: "Invoice Date",
      accessorKey: "invoice date",
      footer: "Invoice Date",
    },
    {
      header: "Due Date",
      accessorKey: "due date",
      footer: "Due Date",
    },
    {
      header: "Status",
      accessorKey: "status",
      footer: "Status",
    },
    {
      header: "Grand Total",
      accessorKey: "grand total",
      footer: "Grand Total",
    },
    {
      header: "Invoice To",
      accessorKey: "invoice to",
      footer: "Invoice To",
    },
  ];

  return (
    <>
      <DashboardBackground>
        {/* Normal table */}
        <div className="my-5 flex flex-col lg:flex-row justify-start lg:justify-between lg:items-center gap-y-3">
          <div className="flex flex-col lg:flex-row gap-2">
            <label htmlFor="from">
              From:
              <input
                className="input input-sm input-bordered"
                type="date"
              />
            </label>
            <label htmlFor="to">
              To:
              <input
                className="input input-sm input-bordered"
                type="date"
                value={toDay}
              />
            </label>
            <input
              type="submit"
              className="btn btn-accent btn-sm inline-block w-fit"
              value={"Get Report"}
            />
          </div>
          <div className="flex lg:flex-row justify-between gap-2">
            <button className="btn btn-info w-fit">
              <BsFiletypeCsv size={20} /> CSV
            </button>
            <button className="btn btn-success w-fit">
              <BsFiletypePdf size={20} /> PDF
            </button>
          </div>
        </div>
        <div className="overflow-x-auto max-w-[100vw]">
          <table className="table table-sm table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th></th>
                <td>Invoice No.</td>
                <td>Invoice Date</td>
                <td>Due Date</td>
                <td>Status</td>
                <td>Grand Total</td>
                <td>Invoice To</td>
                <th>Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((user, index) => (
                <ReportItem key={index} user={user} index={index} />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <td>Invoice No.</td>
                <td>Invoice Date</td>
                <td>Due Date</td>
                <td>Status</td>
                <td>Grand Total</td>
                <td>Invoice To</td>
                <th>Actions</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </DashboardBackground>
    </>
  );
};

export default ReportList;
