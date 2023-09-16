import { BiSolidDuplicate } from "react-icons/bi";
import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
// import categoriesData from "./categoriesData.json";
import { useMemo } from "react";
import BasicTable from "../Tables/BasicTable";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { useGetCategoriesQuery } from "../../features/Category/categoryApi";

const CategoriesList = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  const data = useMemo(() => categories?.success, [categories?.success]);

  const columns = [
    {
      header: "",
      accessorKey: "id",
      footer: "",
    },
    {
      header: "Name",
      accessorKey: "category_name",
      footer: "Name",
    },
    {
      header: "Description",
      accessorKey: "description",
      footer: "Description",
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
