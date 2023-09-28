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
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";

const CategoriesList = () => {
  UseTitle("Categories");
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
    deleteCategory(id); // Change the mutation name to useDeleteCategoryMutation
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

  const columns = [
    { key: "id", header: "ID" },
    { key: "category_name", header: "Name" },
    { key: "description", header: "Description" },
  ];

  // CATEGORIES CONTENT
  let content;

  // ALL CATEGORIES
  if (categoriesIsLoading) {
    return (content = <UseLoading />);
  }

  if (categoriesIsError) {
    console.error(categoriesError);
  }

  if (!categoriesData?.status) {
    return (content = (
      <>
        <p className="text-center text-2xl mt-10">{categoriesData?.message}</p>
      </>
    ));
  }

  if (categoriesIsSuccess && categoriesData?.status) {
    content = (
      <>
        <UseTable
          data={categoriesData?.categories}
          columns={columns}
          handleModalEditInfo={handleModalEditInfo}
          onDelete={onDelete}
          btnTitle={"Add Category"}
          btnPath={"/dashboard/category/add"}
          btnIcon={<BiSolidDuplicate size={20} />}
          setFiltering={setFiltering}
        />
      </>
    );
  }
  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>
          Categories {categoriesData?.categories?.length}{" "}
          {/* Change the table title */}
        </TableHeadingTitle>
        {/* Categories Table */}
        {content}
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
