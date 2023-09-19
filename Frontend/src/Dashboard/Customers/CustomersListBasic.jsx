import { AiOutlineUserAdd } from "react-icons/ai";
import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import BasicTable from "../Tables/BasicTable";
import { useMemo } from "react";
import customerData from "./customerData.json";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";

const CustomersListBasic = () => {
  const data = useMemo(() => customerData, []);
  const columns = [
    {
      header: "",
      accessorKey: "id",
      footer: "",
    },
    {
      header: "Profile",
      accessorKey: "profile",
      footer: "Profile",
    },
    {
      header: "Name",
      accessorKey: "name",
      footer: "Name",
    },
    {
      header: "Email",
      accessorKey: "email",
      footer: "Email",
    },
    {
      header: "Phone",
      accessorKey: "phone",
      footer: "Phone",
    },
    {
      header: "Address",
      accessorKey: "address",
      footer: "Address",
    },
    {
      header: "Notes",
      accessorKey: "notes",
      footer: "Notes",
    },
    {
      header: "Register Date",
      accessorKey: "registerDate",
      footer: "Register Date",
    },
    {
      header: "Actions",
      accessorKey: "",
      footer: "Actions",
    },
    {
      header: "",
      accessorKey: "id",
      footer: "",
    },
  ];

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>Customers</TableHeadingTitle>

        <BasicTable
          data={data}
          columns={columns}
          btnTitle={"Add Customer"}
          btnPath={"/dashboard/customer/add"}
          btnIcon={<AiOutlineUserAdd size={20} />}
        >
          {" "}
        </BasicTable>
      </DashboardBackground>
    </>
  );
};

export default CustomersListBasic;
