import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../features/Product/productApi";
import UseTable from "../../components/Reusable/useTable/useTable";
import { BiCartAdd } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import UseLoading from "../../components/Reusable/useLoading/useLoading";

const ProductsList = () => {
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

  const [
    updateProduct,
    {
      isLoading: updateIsLoading,
      isError: updateIsError,
      error: updateError,
      isSuccess: updateIsSuccess,
      data: updateData,
    },
  ] = useUpdateProductMutation();

  // EDIT STARTS
  const onEdit = (id, updatedData) => {
    updateProduct({ id, updatedData });
  };

  useEffect(() => {
    if (updateIsLoading) {
      toast.loading("Loading...", { id: 1 });
    }

    if (updateIsError) {
      toast.error(updateError?.status, { id: 1 });
    }

    if (updateIsSuccess) {
      toast.success(updateData?.message, { id: 1 });
    }
  }, [
    updateIsLoading,
    updateIsError,
    updateError,
    updateIsSuccess,
    updateData?.message,
  ]);
  // EDIT ENDS

  // DELETE STARTS
  const onDelete = (id) => {
    deleteProduct(id);
  };

  useEffect(() => {
    if (deleteIsLoading) {
      toast.loading("Loading...", { id: 1 });
    }

    if (deleteIsError) {
      toast.error(deleteError?.status, { id: 1 });
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

  // SEARCH FILTERING STARTS
  const setFiltering = (data) => {
    console.log(data);
  };

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
          onEdit={onEdit}
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
      </DashboardBackground>
    </>
  );
};

export default ProductsList;
