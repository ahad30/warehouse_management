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
import UseTable from "../../components/Reusable/useTable/UseTable";
import EditCategory from "./EditCategory";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const CategoriesListCustom = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [category, setCategory] = useState({});

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
  const setFiltering = (data) => {
    console.log(data);
  };
  // SEARCH FILTERING ENDS

  // ALL CATEGORIES
  if (categoriesIsLoading) {
    return <UseLoading />;
  }

  if (categoriesIsError) {
    console.error(categoriesError);
  }

  // if (categoriesIsSuccess && categoriesData?.status) {
  //   content = (
  //     <>

  //       {/* <UseTable
  //         data={categoriesData?.categories}
  //         columns={columns}
  //         handleModalEditInfo={handleModalEditInfo}
  //         onDelete={onDelete}
  //         btnTitle={"Add Category"}
  //         btnPath={"/dashboard/category/add"}
  //         btnIcon={<BiSolidDuplicate size={20} />}
  //         setFiltering={setFiltering}
  //       /> */}
  //     </>
  //   );
  // }
  return (
    <>
      <DashboardBackground>
        <Link to={'/dashboard/invoice/new'}><button className="btn"> click</button></Link>
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
        {!categoriesIsSuccess && categoriesData?.status ? (
          <p className="text-center text-2xl mt-10">
            {categoriesData?.message}
          </p>
        ) : (
          <div className="overflow-x-scroll">
            <table className="table table-sm table-pin-rows table-pin-cols">
              {/* Table header */}
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {categoriesData?.categories?.map((category) => (
                  <tr key={category?.id}>
                    <td>{category?.id}</td>
                    <td>{category?.category_name}</td>
                    <td>{category?.description}</td>
                    <td className="flex gap-x-2 items-center">
                      <FiEdit
                        onClick={() => {
                          handleModalEditInfo(category);
                        }}
                        className="cursor-pointer"
                        size={20}
                      />
                      <RiDeleteBin4Line
                        onClick={() => {
                          onDelete(category?.id);
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
                  <th>ID</th>

                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </tfoot>
            </table>
          </div>
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

export default CategoriesListCustom;
