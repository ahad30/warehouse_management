import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../features/Category/categoryApi";
import { BiSolidDuplicate } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import EditCategory from "./EditCategory";
import { RiDeleteBin4Line } from "react-icons/ri";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import DeleteConformation from "../../components/DeleteConformationAlert/DeletConformation";

const CategoriesList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [category, setCategory] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const itemsPerPage = 11;

  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
  } = useGetCategoriesQuery();

  const [
    deleteCategory,
    {
      isLoading: deleteIsLoading,
      isError: deleteIsError,
      error: deleteError,
      isSuccess: deleteIsSuccess,
      data: deleteData,
    },
  ] = useDeleteCategoryMutation();

  useEffect(() => {
    setFilterData(categoriesData?.data);
  }, [categoriesData?.data]);


  // DELETE STARTS
  const onDelete = (id) => {
    DeleteConformation(id, () => deleteCategory(id));
  };

  useEffect(() => {
    if (deleteIsLoading) {
      toast.loading("Loading...", { id: 1 });
    }

    if (deleteIsError && !deleteData?.status) {
      console.log(deleteData, deleteError);
      toast.error(deleteData?.message || deleteError?.data?.message, { id: 1 });
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
  const handleModalEditInfo = (category) => {
    setCategory(category);
    setModalIsOpen(true);
  };
  // EDIT ENDS

  // SEARCH FILTERING STARTS
  const setFiltering = (search) => {
    const filteredData = categoriesData?.data?.filter((item) =>
      item?.category_name?.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredData) {
      setFilterData(filteredData);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

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
            row?.image
              ? `${
                  import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT
                }${row?.image}`
              : "https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg"
          }
          className="w-10 h-auto rounded-full"
        />
      ),
    },
    // {
    //   name: "Store",
    //   selector: (row) => {row?.name},
    // },

    {
      name: "Name",
      selector: (row) => <>{row?.category_name}</>,
    },
    {
      name: "Description",

      selector: (row) => <>{row?.description}</>,
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

  // SEARCH FILTERING ENDS

  // ALL CATEGORIES
  if (categoriesIsLoading) {
    return <UseLoading />;
  }

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>
          Categories {categoriesData?.categories?.length}{" "}
          {/* Change the table title */}
        </TableHeadingTitle>
        {/* SEARCH AND BTN */}
        <SearchAndAddBtn
          btnTitle={"Add Category"}
          btnPath={"/dashboard/category/add"}
          btnIcon={<BiSolidDuplicate size={20} />}
          setFiltering={setFiltering}
        />
        {/* Categories Table */}
        {filterData?.length > 0 && (
          <DataTable
            columns={columns}
            data={filterData}
            pagination
            responsive
            paginationPerPage={itemsPerPage}
            paginationRowsPerPageOptions={[itemsPerPage, 5, 10, 15]}
            paginationTotalRows={filterData?.length}
            onChangePage={(page) => setCurrentPage(page)}
            keyField="id"
          />
        )}

        <EditCategory
          category={category}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </DashboardBackground>
    </>
  );
};

export default CategoriesList;
