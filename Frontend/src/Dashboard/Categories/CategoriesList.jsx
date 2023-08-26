import { BiSolidDuplicate } from "react-icons/bi";
import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import categoriesData from "./categoriesData.json";
import { useMemo } from "react";
import BasicTable from "../Tables/BasicTable";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";

const CategoriesList = () => {
  const data = useMemo(() => categoriesData, []);
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
      header: "Description",
      accessorKey: "desc",
      footer: "Description",
    },
    {
      header: "Actions",
      accessorKey: "",
      footer: "Actions",
    },
  ];

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>Categories</TableHeadingTitle>

        <BasicTable
          data={data}
          columns={columns}
          btnTitle={"Add Category"}
          btnPath={"/dashboard/category/add"}
          btnIcon={<BiSolidDuplicate size={20} />}
        ></BasicTable>
      </DashboardBackground>
    </>
  );
};

export default CategoriesList;
