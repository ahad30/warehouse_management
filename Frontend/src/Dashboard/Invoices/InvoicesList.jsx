import { BiSolidPurchaseTag } from "react-icons/bi";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import invoiceData from "./invoiceData.json";
import { useMemo } from "react";
import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import BasicTable from "../Tables/BasicTable";

const InvoicesList = () => {
  const data = useMemo(() => invoiceData, []);

  const columns = [
    {
      header: "",
      accessorKey: "id",
      footer: "",
    },
    {
      header: "Invoice No",
      accessorKey: "invoiceno",
      footer: "Invoice No",
    },
    {
      header: "Invoice To",
      accessorKey: "invoiceto",
      footer: "",
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
      footer: "Quantity",
    },
    {
      header: "Total",
      accessorKey: "total",
      footer: "Total",
    },
    {
      header: "Discount",
      accessorKey: "discount",
      footer: "Discount",
    },
    {
      header: "Shipping",
      accessorKey: "shipping",
      footer: "Shipping",
    },
    {
      header: "Grandtotal",
      accessorKey: "grandtotal",
      footer: "Grandtotal",
    },
    {
      header: "Invoice Date",
      accessorKey: "invoicedate",
      footer: "Invoice Date",
    },
    {
      header: "Due Date",
      accessorKey: "duedate",
      footer: "Due Date",
    },
  ];

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>Invoices</TableHeadingTitle>
        <BasicTable
          data={data}
          columns={columns}
          btnTitle={"New Invoice"}
          btnPath={"/dashboard/invoice/new"}
          btnIcon={<BiSolidPurchaseTag size={20} />}
        />
      </DashboardBackground>
    </>
  );
};

export default InvoicesList;
