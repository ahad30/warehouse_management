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
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import InvoicePDF from "../../components/PDF/InvoicePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";

const CategoriesListCustom = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [category, setCategory] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const itemsPerPage = 10;



  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    isError: categoriesIsError,
    error: categoriesError,
    isSuccess: categoriesIsSuccess,
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
    setFilterData(categoriesData?.categories);
  }, [categoriesData?.categories ,categoriesData]);

  // DELETE STARTS
  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });

    // Change the mutation name to useDeleteCategoryMutation
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
    const filteredData = categoriesData?.categories?.filter((item) =>
      item?.category_name?.toLowerCase().includes(search.toLowerCase())
      );
      if(filteredData){
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
      name: "Name",
      selector: "category_name",
    },
    {
      name: "Description",
      selector: "description",
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

  if (categoriesIsError) {
    console.error(categoriesError);
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
              paginationPerPage={itemsPerPage}
              paginationRowsPerPageOptions={[itemsPerPage, 5, 10, 15]}
              paginationTotalRows={filterData?.length}
              onChangePage={(page) => setCurrentPage(page)}
            /> )}
       
        <EditCategory
          category={category}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </DashboardBackground>
    </>
  );
};

export default CategoriesListCustom;
