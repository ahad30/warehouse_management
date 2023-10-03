import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import UseTable from "../../components/Reusable/useTable/UseTable";
import EditBrand from "./EditBrand";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import { SiBrandfolder } from "react-icons/si";
import {
  useDeleteBrandMutation,
  useGetBrandsQuery,
} from "../../features/Brand/brandApi";

const BrandsList = () => {
  UseTitle("Categories");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [brand, setBrand] = useState({});

  const {
    data: brandsData,
    isLoading: brandsIsLoading,
    isError: brandsIsError,
    error: brandsError,
    isSuccess: brandsIsSuccess,
  } = useGetBrandsQuery();

  const [
    deleteBrand,
    {
      isLoading: deleteIsLoading,
      isError: deleteIsError,
      error: deleteError,
      isSuccess: deleteIsSuccess,
      data: deleteData,
    },
  ] = useDeleteBrandMutation();

  // DELETE STARTS
  const onDelete = (id) => {
    deleteBrand(id);
  };

  useEffect(() => {
    if (deleteIsLoading) {
      toast.loading("Loading...", { id: 1 });
    }

    if (deleteIsError && !deleteData?.status) {
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
  const handleModalEditInfo = (brand) => {
    setBrand(brand);
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
    { key: "brand_name", header: "Name" },
    { key: "brand_img", header: "Image" },
  ];

  // CATEGORIES CONTENT
  let content;

  // ALL CATEGORIES
  if (brandsIsLoading) {
    return (content = <UseLoading />);
  }

  if (brandsIsError) {
    console.error(brandsError);
  }

  if (!brandsData?.status) {
    return (content = (
      <>
        <p className="text-center text-2xl mt-10">{brandsData?.message}</p>
      </>
    ));
  }

  if (brandsIsSuccess && brandsData?.status) {
    content = (
      <>
        <UseTable
          data={brandsData?.brands}
          columns={columns}
          handleModalEditInfo={handleModalEditInfo}
          onDelete={onDelete}
          btnTitle={"Add Brand"}
          btnPath={"/dashboard/brand/add"}
          btnIcon={<SiBrandfolder size={20} />}
          setFiltering={setFiltering}
        />
      </>
    );
  }
  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>
          Brands {brandsData?.brands?.length}
          {/* Change the table title */}
        </TableHeadingTitle>

        {/* Brands Table */}
        {content}
        <EditBrand
          brand={brand}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </DashboardBackground>
    </>
  );
};

export default BrandsList;
