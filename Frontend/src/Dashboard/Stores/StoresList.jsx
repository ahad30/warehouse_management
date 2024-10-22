import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import EditStore from "./EditStore";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import {
  useDeleteStoreMutation,
  useGetStoresQuery,
} from "../../features/Store/storeApi";
import { RiDeleteBin4Line } from "react-icons/ri";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";
import { FaEdit, FaStore } from "react-icons/fa";
import DataTable from "react-data-table-component";
import DeleteConformation from "../../components/DeleteConformationAlert/DeletConformation";
import { useSelector } from "react-redux";

const StoresList = () => {
  const { user } = useSelector((state) => state.auth);
  UseTitle("Warehouse");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [store, setStore] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const itemsPerPage = 11;

  const {
    data: storesData,
    isLoading: storesIsLoading,
    isError: storesIsError,
    error: storesError,
    isSuccess: storesIsSuccess,
  } = useGetStoresQuery();

  useEffect(() => {
    setFilterData(storesData?.data);
  }, [storesData?.data]);

  // console.log(storesData);

  const [
    deleteCustomer,
    {
      isLoading: deleteIsLoading,
      isError: deleteIsError,
      error: deleteError,
      isSuccess: deleteIsSuccess,
      data: deleteData,
    },
  ] = useDeleteStoreMutation();

  // DELETE STARTS
  const onDelete = (id) => {
    DeleteConformation(id, () => deleteCustomer(id));
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
  const handleModalEditInfo = (store) => {
    setStore(store);
    setModalIsOpen(true);
  };

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
      name: "Name",
      // selector: "store_name",
      selector: (row) => <>{row?.name}</>,
    },
    {
      name: "Email",
      // selector: "store_email",
      selector: (row) => <>{row?.email}</>,
    },
    {
      name: "Phone",
      // selector: "store_phone",
      selector: (row) => <>{row?.phone}</>,
    },
    {
      name: "Address",
      // selector: "store_address",
      selector: (row) => <>{row?.address}</>,
    },
    {
      name: "City",
      // selector: "store_address",
      selector: (row) => <>{row?.city}</>,
    },

    {
      name: "Image",
      cell: (row) => (
        <img
          src={
            row?.image
              ? `${import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT}${
                  row?.image
                }`
              : "https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg"
          }
          className="w-10 h-auto rounded-full"
        />
      ),
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="space-x-2">
          <button onClick={() => handleModalEditInfo(row)}>
            <FaEdit size={20}></FaEdit>
          </button>
          {user?.get_role?.role === "Admin" && (
            <button onClick={() => onDelete(row?.id)}>
              <RiDeleteBin4Line size={20}></RiDeleteBin4Line>
            </button>
          )}
          {/* <button><FaEye size={20}/>
          </button> */}
        </div>
      ),
    },
  ];

  const setFiltering = (search) => {
    const filteredData = storesData?.data.filter((item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredData) {
      setFilterData(filteredData);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // SEARCH FILTERING ENDS

  // ALL CUSTOMERS
  if (storesIsLoading) {
    return <UseLoading />;
  }

  if (storesIsError) {
    console.error(storesError);
  }

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>
          Warehouse: {storesData?.data?.length}
        </TableHeadingTitle>
        <div className="lg:w-[84vw] w-full">
          <SearchAndAddBtn
            btnTitle={"Add Warehouse"}
            btnPath={"/dashboard/store/add"}
            btnIcon={<FaStore size={20} />}
            setFiltering={setFiltering}
          />
        </div>

        {!storesIsSuccess && storesData?.status ? (
          <p className="text-center text-2xl mt-10">{storesData?.message}</p>
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

        <EditStore
          store={store}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </DashboardBackground>
    </>
  );
};

export default StoresList;
