import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";

import UseTable from "../../components/Reusable/useTable/UseTable";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import EditStore from "./EditStore";
import {
  useDeleteCustomerMutation,
  useGetCustomersQuery,
} from "../../features/Customer/customerApi";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import { FaStore } from "react-icons/fa";

const StoresList = () => {
  UseTitle("Customers");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [customer, setCustomer] = useState({});

  const {
    data: customersData,
    isLoading: customersIsLoading,
    isError: customersIsError,
    error: customersError,
    isSuccess: customersIsSuccess,
  } = useGetCustomersQuery();

  const [
    deleteCustomer,
    {
      isLoading: deleteIsLoading,
      isError: deleteIsError,
      error: deleteError,
      isSuccess: deleteIsSuccess,
      data: deleteData,
    },
  ] = useDeleteCustomerMutation();

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
  const handleModalEditInfo = (customer) => {
    setCustomer(customer);
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
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    { key: "address", header: "Address" },
    { key: "notes", header: "Notes" },
  ];

  // CUSTOMERS CONTENT
  let content;

  // ALL CUSTOMERS
  if (customersIsLoading) {
    return (content = <UseLoading />);
  }

  if (customersIsError) {
    console.error(customersError);
  }

  if (!customersData?.status) {
    return (content = (
      <>
        <p className="text-center text-2xl mt-10">{customersData?.message}</p>
      </>
    ));
  }

  if (customersIsSuccess && customersData?.status) {
    content = (
      <>
        <UseTable
          data={customersData?.customers}
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
          Stores {customersData?.customers?.length}
        </TableHeadingTitle>
        {/* Customers Table */}
        {content}
        <EditStore
          customer={customer}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </DashboardBackground>
    </>
  );
};

export default StoresList;
