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

const StoresList = () => {
  UseTitle("Customers");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [store, setStore] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const itemsPerPage = 10;

  const {
    data: storesData,
    isLoading: storesIsLoading,
    isError: storesIsError,
    error: storesError,
    isSuccess: storesIsSuccess,
  } = useGetStoresQuery();

  useEffect(() => {
    setFilterData(storesData?.stores);
  }, [storesData?.stores, storesData]);

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
      name: "Name",
      // selector: "store_name",
      selector: (row) => <>{row?.store_name}</>,
    },
    {
      name: "email",
      // selector: "store_email",
      selector: (row) => <>{row?.store_email}</>,

      // cell: (row) => {
      // return  <div style={{ overflow: "auto", whiteSpace: "nowrap", width: "100%" }}>
      //     {row?.email}
      //   </div>
      // }
    },
    {
      name: "phone",
      // selector: "store_phone",
      selector: (row) => <>{row?.store_phone}</>,
    },
    {
      name: "web",
      selector: (row) => <>{row?.store_web}</>,
    },

    {
      name: "address",
      // selector: "store_address",
      selector: (row) => <>{row?.store_address}</>,
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
    const filteredData = storesData?.stores.filter((item) =>
      item?.store_name?.toLowerCase().includes(search.toLowerCase())
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
          Stores {storesData?.stores?.length}
        </TableHeadingTitle>

        <SearchAndAddBtn
          btnTitle={"Add store"}
          btnPath={"/dashboard/store/add"}
          btnIcon={<FaStore size={20} />}
          setFiltering={setFiltering}
        />

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
