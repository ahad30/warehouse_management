import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../features/Product/productApi";
import { BiCartAdd } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import EditProduct from "./EditProduct";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import { RiDeleteBin4Line } from "react-icons/ri";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import { useGetStoresQuery } from "../../features/Store/storeApi";
import { useGetCategoriesQuery } from "../../features/Category/categoryApi";
import { useGetBrandsQuery } from "../../features/Brand/brandApi";
import { da } from "date-fns/locale";
import DeleteConformation from "../../components/DeleteConformationAlert/DeletConformation";
import Paginator from "../../components/Paginator/Paginator";
import { useDispatch, useSelector } from "react-redux";
import { clear, incrementByAmount } from "../../features/Page/pageSlice";
import useGetCurrentPage from "../../Hooks/useGetCurrentPage";
const ProductsList = () => {
  UseTitle("Products");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [product, setProduct] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const itemsPerPage = 11;

  const { data: brandsData } = useGetBrandsQuery();
  const { data: categoryData } = useGetCategoriesQuery();
  const { data: storesData } = useGetStoresQuery();
  const ActivePageNumber = useSelector((state) => state?.pageSlice?.value);

  const {
    data: productsData,
    isLoading: productsIsLoading,
    isSuccess: productsIsSuccess,
  } = useGetProductsQuery({ pageNumber: ActivePageNumber });

  const dispatch = useDispatch();

  const pageNumber = useGetCurrentPage();
  useEffect(() => {
    if (pageNumber > 1) {
      dispatch(incrementByAmount(pageNumber));
    }
    setFilterData(productsData?.products);
  }, [
    productsData?.products,
    productsData,
    ActivePageNumber,
    dispatch,
    pageNumber,
  ]);

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
    DeleteConformation(id, () => deleteProduct(id));
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
          (currentPage - 1) * itemsPerPage + filterData?.data?.indexOf(row) + 1;
        return <span>{serialNumber}</span>;
      },
    },

    {
      name: "Image",
      cell: (row) => (
        <img
          src={
            row?.images
              ? `${import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT}${
                  row?.images
                }`
              : "https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg"
          }
          alt="User"
          className=" w-10 h-auto rounded-lg"
        />
      ),
    },
    {
      name: "Name",
      selector: (row) => <>{row?.product_name}</>,
    },
    {
      name: "Code",
      selector: (row) => <>{row?.unique_code}</>,
    },
    {
      name: "Retail price",
      selector: (row) => <>{row?.product_retail_price}</>,
    },
    {
      name: "Sold price",
      selector: (row) => <>{row?.product_sale_price}</>,
    },
    // {
    //   name: "Quantity",
    //   selector: (row) => <>{row?.product_quantity}</>,
    // },
    {
      name: "Unit",
      selector: (row) => <>{row?.product_unit}</>,
    },
    {
      name: "Category",
      selector: (row) => row?.get_category?.category_name,
    },
    {
      name: "Store",
      selector: (row) => row?.warehouse?.name,
    },
    {
      name: "Brand",
      selector: (row) => row?.get_brand?.brand_name,
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
    if (filteredData) {
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

  const filterCategory = (data) => {
    if (data && productsData?.products) {
      const filter = productsData?.products.filter(
        (product) => product?.get_category?.category_name?.id == data
      );
      filter && setFilterData(filter);
    } else {
      setFilterData(productsData?.products);
    }
  };

  const filterBrand = (data) => {
    if (data && productsData?.products) {
      const filter = productsData?.products.filter(
        (product) => product?.get_brand?.id == data
      );
      filter && setFilterData(filter);
    } else {
      setFilterData(productsData?.products);
    }
  };

  const filterStore = (data) => {
    if (data && productsData?.products) {
      const filter = productsData?.products.filter(
        (product) => product?.get_store?.id == data
      );
      filter && setFilterData(filter);
    } else {
      setFilterData(productsData?.products?.data);
    }
  };
  console.log(filterData);

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>Products: {productsData?.total}</TableHeadingTitle>
        <div className="mr-10">
          <SearchAndAddBtn
            btnTitle={"Add Product"}
            btnPath={"/dashboard/product/add"}
            btnIcon={<BiCartAdd size={20} />}
            setFiltering={setFiltering}
          />
        </div>
        {/* <SearchAndAddBtn
          btnTitle={"Add Product"}
          btnPath={"/dashboard/product/add"}
          btnIcon={<BiCartAdd size={20} />}
          setFiltering={setFiltering}
        /> */}

        {/* Products Table */}
        {/* {!productsIsSuccess && productsData?.status ? (
          <p className="text-center text-2xl mt-10">{productsData?.message}</p>
        ) : (
          filterData?.length > 0 && ( */}
        <div>
          <DataTable
            columns={columns}
            data={filterData?.data}
            responsive
            keyField="id"
          />
          <br></br>
          <Paginator links={filterData?.links} />
          <br></br>
          <br></br>
        </div>
        {/* ) */}
        {/* )} */}
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
