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
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import { BiSolidDuplicate } from "react-icons/bi";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";

const BrandListCustom = () => {
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
    return  <UseLoading />;
  }

  if (brandsIsError) {
    console.error(brandsError);
  }

  

  


  console.log(brandsData?.brands)

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>
          Brands {brandsData?.brands?.length}
          {/* Change the table title */}
        </TableHeadingTitle>

        

        <SearchAndAddBtn
          btnTitle={"Add brand"}
          btnPath={"/dashboard/brand/add"}
          btnIcon={<BiSolidDuplicate size={20} />}
          setFiltering={setFiltering}
        />
        

        {!brandsIsSuccess && brandsData?.status ? (
          <p className="text-center text-2xl mt-10">
            {brandsData?.message}
          </p>
        ) : (
          <div className="overflow-x-scroll">
            <table className="table table-sm table-pin-rows table-pin-cols">
              {/* Table header */}
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Img</th>
                  <th>Name</th>
                  <th>Action</th>
                  
                </tr>
              </thead>

              <tbody>
                {brandsData?.brands?.map((brand) => (
                  <tr key={brand?.id}>
                    <td>{brand?.id}</td>
                    <td><img className="w-8 h-8 rounded-full" src={brand?.brand_img ? brand?.brand_img : "https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg"} alt="" /></td>
                    <td>{brand?.brand_name}</td>
                    <td className="flex gap-x-2 items-center">
                      <FiEdit
                        onClick={() => {
                          handleModalEditInfo(brand);
                        }}
                        className="cursor-pointer"
                        size={20}
                      />
                      <RiDeleteBin4Line
                        onClick={() => {
                          onDelete(brand?.id);
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
                  <th>Img</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        <EditBrand
          brand={brand}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </DashboardBackground>
    </>
  );
};

export default BrandListCustom;
