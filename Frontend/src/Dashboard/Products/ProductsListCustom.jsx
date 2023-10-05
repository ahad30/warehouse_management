import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../features/Product/productApi";
import { BiSolidDuplicate } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import EditProduct from "./EditProduct";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";

const ProductsListCustom = () => {
  UseTitle("Products");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [product, setProduct] = useState({});
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
  };
  // EDIT ENDS

  // SEARCH FILTERING STARTS
  const setFiltering = (data) => {
    console.log(data);
  };
  // SEARCH FILTERING ENDS

  // ALL PRODUCTS
  if (productsIsLoading) {
    return <UseLoading />;
  }

  if (productsIsError) {
    console.error(productsError);
  }

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>
          Products {productsData?.products?.length}
        </TableHeadingTitle>

        <SearchAndAddBtn
          btnTitle={"Add Product"}
          btnPath={"/dashboard/product/add"}
          btnIcon={<BiSolidDuplicate size={20} />}
          setFiltering={setFiltering}
        />

        {/* Products Table */}
        {!productsIsSuccess && productsData?.status ? (
          <p className="text-center text-2xl mt-10">{productsData?.message}</p>
        ) : (
          <div className="overflow-x-scroll">
            <table className="table table-sm table-pin-rows table-pin-cols">
              {/* Table header */}
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>code</th>
                  <th>Retail price</th>
                  <th>Sold Price</th>
                  <th>Quantity</th>
                  <th>unit</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {productsData?.products?.map((product, index) => (
                  <tr key={product?.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        className="w-8 h-8 rounded-full"
                        src={
                          product?.product_img
                            ? `${
                                import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT
                              }/uploads/products/${product?.product_img}`
                            : "https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg"
                        }
                        alt=""
                      />
                    </td>
                    <td>{product?.product_name}</td>
                    <td>{product?.product_code}</td>
                    <td>{product?.product_retail_price}</td>
                    <td>{product?.product_sale_price}</td>
                    <td>{product?.product_quantity}</td>
                    <td>{product?.product_unit}</td>
                    <td>{product?.get_category?.category_name}</td>
                    <td>{product?.get_brand?.brand_name}</td>

                    <td className="flex gap-x-2 items-center">
                      <FiEdit
                        onClick={() => {
                          handleModalEditInfo(product);
                        }}
                        className="cursor-pointer"
                        size={20}
                      />
                      <RiDeleteBin4Line
                        onClick={() => {
                          onDelete(product?.id);
                        }}
                        className="cursor-pointer"
                        size={20}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <th>Sl</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>code</th>
                  <th>Retail price</th>
                  <th>Sold Price</th>
                  <th>Quantity</th>
                  <th>unit</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Action</th>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        <EditProduct
          product={product}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </DashboardBackground>
    </>
  );
};

export default ProductsListCustom;
