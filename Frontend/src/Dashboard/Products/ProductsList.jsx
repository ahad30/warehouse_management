import { BiCartAdd } from "react-icons/bi";
import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import { useMemo } from "react";
import productData from "./productData.json";
import BasicTable from "../Tables/BasicTable";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";

const ProductsList = () => {
  const data = useMemo(() => productData, []);
  const columns = [
    {
      header: "",
      accessorKey: "id",
      footer: "",
    },
    {
      header: "Img",
      accessorKey: "img",
      footer: "Img",
    },
    {
      header: "Code",
      accessorKey: "code",
      footer: "Code",
    },
    {
      header: "Name",
      accessorKey: "name",
      footer: "Name",
    },
    {
      header: "Price",
      accessorKey: "price",
      footer: "Price",
    },
    {
      header: "Unit",
      accessorKey: "unit",
      footer: "Unit",
    },
    {
      header: "Category",
      accessorKey: "category",
      footer: "Category",
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
    {
      header: "",
      accessorKey: "id",
      footer: "",
    },
  ];

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>Products</TableHeadingTitle>

        <BasicTable
          data={data}
          columns={columns}
          btnTitle={"Add Product"}
          btnPath={"/dashboard/product/add"}
          btnIcon={<BiCartAdd size={20} />}
        ></BasicTable>
      </DashboardBackground>
    </>
  );
};

export default ProductsList;
