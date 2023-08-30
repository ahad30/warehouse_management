import { BiSolidDuplicate } from "react-icons/bi";
import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import categoriesData from "./categoriesData.json";
import { useEffect, useMemo } from "react";
import BasicTable from "../Tables/BasicTable";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";

const CategoriesList = () => {
  useEffect(() => {
    fetch("http://localhost:8000/api/categories", {
      method: "GET",
      headers: {
        Authorization: `Bearer 27|laravel_sanctum_52jgDkVSyFfaOFB0Lbmj9rvbLdYasdndKwXPVPyqf35929a1`,
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, []);

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
