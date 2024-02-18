import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import EditBrand from "./EditBrand";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import {
  useDeleteBrandMutation,
  useGetBrandsQuery,
} from "../../features/Brand/brandApi";
import { RiDeleteBin4Line } from "react-icons/ri";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";
import { FaEdit } from "react-icons/fa";
import DataTable from "react-data-table-component";
import DeleteConformation from "../../components/DeleteConformationAlert/DeletConformation";
import { SiBrandfolder } from "react-icons/si";

const BrandsList = () => {
  UseTitle("Brands");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [brand, setBrand] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const itemsPerPage = 11;

  const {
    data: brandsData,
    isLoading: brandsIsLoading,
    isSuccess: brandsIsSuccess,
  } = useGetBrandsQuery();

  useEffect(() => {
    setFilterData(brandsData?.data);
  }, [brandsData?.data, brandsData]);

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
    DeleteConformation(id, () => deleteBrand(id));
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
      name: "Logo",
      cell: (row) => (
        <img
          src={
            row.brand_img
              ? `${
                  import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT
                }/uploads/brands/${row?.brand_img}`
              : "https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg"
          }
          alt="User"
          className=" w-10 h-auto rounded-full"
        />
      ),
    },
    {
      name: "Name",
      // selector: "brand_name",
      selector: (row) => <>{row?.brand_name}</>,
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

  // SEARCH FILTERING STARTS
  const setFiltering = (search) => {
    const filteredData = brandsData?.brands?.filter((item) =>
      item?.brand_name?.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredData) {
      setFilterData(filteredData);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // SEARCH FILTERING ENDS

  if (brandsIsLoading) {
    return <UseLoading />;
  }

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>
          Brands: {brandsData?.brands?.length}
          {/* Change the table title */}
        </TableHeadingTitle>

        <SearchAndAddBtn
          btnTitle={"Add brand"}
          btnPath={"/dashboard/brand/add"}
          btnIcon={<SiBrandfolder size={20} />}
          setFiltering={setFiltering}
        />

        {!brandsIsSuccess && brandsData?.status ? (
          <p className="text-center text-2xl mt-10">{brandsData?.message}</p>
        ) : (
          filterData?.length > 0 && (
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
          )
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

export default BrandsList;
