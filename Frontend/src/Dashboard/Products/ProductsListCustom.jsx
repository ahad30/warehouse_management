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
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";

const ProductsListCustom = () => {
  UseTitle("Products");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [product, setProduct] = useState({});
 
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const itemsPerPage = 10;


  const {
    data: productsData,
    isLoading: productsIsLoading,
    isError: productsIsError,
    error: productsError,
    isSuccess: productsIsSuccess,
  } = useGetProductsQuery();

  useEffect(() => {
    setFilterData(productsData?.products);
  }, [productsData?.products , productsData]);


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
  const columns = [
    {
      name: "Serial",
      cell: (row) => {
        // Calculate the serial number based on the current page and items per page
        const serialNumber =
          (currentPage - 1) * itemsPerPage + filterData.indexOf(row) + 1;
        return <span>{serialNumber}</span>;
      },
    },

    {
      name: "Image",
      cell: (row) => (
        <img
          src={
            row?.product_img
              ? `${
                  import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT
                }/uploads/products/${row?.product_img}`
              : "https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg"
          }
          alt="User"
          className=" w-12 h-12 rounded-full"
        />
      ),
    },
    {
      name: "Name",
      selector: "product_name",
    },
    {
      name: "Code",
      selector: "product_code",
    },
    {
      name: "Retail price",
      selector: "product_retail_price",
    },
    {
      name: "Sold price",
      selector: "product_sale_price",
    },
    {
      name: "Quantity",
      selector: "product_quantity",
    },
    {
      name: "Unit",
      selector: "product_unit",
    },
    {
      name: "Category",
      selector: (row)=> row?.get_category?.category_name
    },
    {
      name: "Brand",
      selector: (row)=> row?.get_brand?.brand_name
    },
    
  
   
    
    

    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button onClick={() => handleModalEditInfo(row)}>
            <FaEdit size={20}></FaEdit>
          </button>
          <button onClick={() => onDelete(row?.id)}>
            <RiDeleteBin4Line size={20}></RiDeleteBin4Line>
          </button>
        </div>
      ),
    },
  ];

  const setFiltering = (search) => {
    const filteredData = productsData?.products.filter((item) =>
      item?.product_name?.toLowerCase().includes(search.toLowerCase())
      );
      if(filteredData){
        setFilterData(filteredData);
      }
      
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
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
          filterData?.length > 0 && (
            <DataTable
              columns={columns}
              data={filterData}
              pagination
              paginationPerPage={itemsPerPage}
              paginationRowsPerPageOptions={[itemsPerPage, 5, 10, 15]}
              paginationTotalRows={filterData?.length}
              onChangePage={(page) => setCurrentPage(page)}
            />
          )
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
