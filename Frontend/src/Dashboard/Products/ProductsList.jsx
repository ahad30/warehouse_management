import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../features/Product/productApi";
import UseTable from "../../components/Reusable/useTable/useTable";
import { BiCartAdd } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/useLoading";
import EditProduct from "./EditProduct";

const ProductsList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [product, setProduct] = useState("");
  const {
    data: productsData,
    isLoading: productsIsLoading,
    isError: productsIsError,
    error: productsError,
    isSuccess: productsIsSuccess,
  } = useGetProductsQuery();

  const [
    deleteProduct,
    {
      isLoading: deleteIsLoading,
      isError: deleteIsError,
      error: deleteError,
      isSuccess: deleteIsSuccess,
      data: deleteData,
    },
  ] = useDeleteProductMutation();

  // DELETE STARTS
  const onDelete = (id) => {
    deleteProduct(id);
  };

  useEffect(() => {
    if (deleteIsLoading) {
      toast.loading("Loading...", { id: 1 });
    }

    if (deleteIsError) {
      toast.error(deleteData?.message || deleteError?.status, { id: 1 });
    }

    if (deleteIsSuccess) {
      toast.success(deleteData?.message, { id: 1 });
    }
  }, [
    deleteIsLoading,
    deleteIsError,
    deleteError,
    deleteIsSuccess,
    deleteData,
  ]);
  // DELETE ENDS

  // EDIT STARTS
  const handleModalEditInfo = (product) => {
    setProduct(product);
    setModalIsOpen(true);
    // updateProduct({ id, updatedData });
  };
  // EDIT ENDS

  // SEARCH FILTERING STARTS
  const setFiltering = (data) => {
    console.log(data);
  };
  // SEARCH FILTERING ENDS

  const columns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "code", header: "Code" },
    { key: "price", header: "Price" },
    { key: "unit", header: "Unit" },
    { key: "desc", header: "Description" },
  ];

  // PRODUCTS CONTENT
  let content;

  // ALL PRODUCTS
  if (productsIsLoading) {
    return (content = <UseLoading />);
  }

  if (productsIsError) {
    console.error(productsError);
  }

  if (!productsData?.status) {
    return (content = (
      <>
        <p className="text-center text-2xl mt-10">{productsData?.message}</p>
      </>
    ));
  }

  if (productsIsSuccess && productsData?.status) {
    content = (
      <>
        <UseTable
          data={productsData?.products}
          columns={columns}
          handleModalEditInfo={handleModalEditInfo}
          onDelete={onDelete}
          btnTitle={"Add Product"}
          btnPath={"/dashboard/product/add"}
          btnIcon={<BiCartAdd size={20} />}
          setFiltering={setFiltering}
        />
      </>
    );
  }

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>
          Products {productsData?.products?.length}
        </TableHeadingTitle>
        {/* Products Table */}
        {content}
        <EditProduct
          product={product}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </DashboardBackground>
    </>
  );
};

export default ProductsList;
