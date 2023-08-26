import { AiOutlineUserAdd } from "react-icons/ai";
import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import BasicTable from "../Tables/BasicTable";
import { useMemo } from "react";
import userData from "./userData.json";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";

const UsersList = () => {
  const data = useMemo(() => userData, []);

  const columns = [
    {
      header: "",
      accessorKey: "id",
      footer: "",
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
      header: "GST No",
      accessorKey: "gstNo",
      footer: "GST No",
    },
    {
      header: "Role",
      accessorKey: "role",
      footer: "Role",
    },
    {
      header: "Status",
      accessorKey: "status",
      footer: "Status",
    },
    {
      header: "Branch",
      accessorKey: "branch",
      footer: "Branch",
    },
    {
      header: "Register Date",
      accessorKey: "registerDate",
      footer: "Register Date",
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
        <TableHeadingTitle>Users</TableHeadingTitle>
        <BasicTable
          data={data}
          columns={columns}
          btnPath={"/dashboard/user/add"}
          btnTitle={"Add User"}
          btnIcon={<AiOutlineUserAdd size={20} />}
        ></BasicTable>
      </DashboardBackground>
    </>
  );
};

export default UsersList;
