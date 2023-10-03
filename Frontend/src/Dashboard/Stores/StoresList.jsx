import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";

import UseTable from "../../components/Reusable/useTable/UseTable";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import EditStore from "./EditStore";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import { FaStore } from "react-icons/fa";
import {
  useDeleteStoreMutation,
  useGetStoresQuery,
} from "../../features/Store/storeApi";

const StoresList = () => {
  UseTitle("Customers");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [store, setStore] = useState({});

  const {
    data: storesData,
    isLoading: storesIsLoading,
    isError: storesIsError,
    error: storesError,
    isSuccess: storesIsSuccess,
  } = useGetStoresQuery();

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
    deleteCustomer(id);
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
  const setFiltering = (data) => {
    console.log(data);
  };
  // SEARCH FILTERING ENDS

  const columns = [
    { key: "id", header: "ID" },
    { key: "store_name", header: "Name" },
    { key: "store_email", header: "Email" },
    { key: "store_phone", header: "Phone" },
    { key: "store_web", header: "Web" },
    { key: "store_address", header: "Address" },
  ];

  // CUSTOMERS CONTENT
  let content;

  // ALL CUSTOMERS
  if (storesIsLoading) {
    return (content = <UseLoading />);
  }

  if (storesIsError) {
    console.error(storesError);
  }

  if (!storesData?.status) {
    return (content = (
      <>
        <p className="text-center text-2xl mt-10">{storesData?.message}</p>
      </>
    ));
  }

  if (storesIsSuccess && storesData?.status) {
    content = (
      <>
        <UseTable
          data={storesData?.stores}
          columns={columns}
          handleModalEditInfo={handleModalEditInfo}
          onDelete={onDelete}
          btnTitle={"Add Store"}
          btnPath={"/dashboard/store/add"}
          btnIcon={<FaStore size={20} />}
          setFiltering={setFiltering}
        />
      </>
    );
  }

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>
          Stores {storesData?.stores?.length}
        </TableHeadingTitle>
        {/* Customers Table */}
        {content}
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
