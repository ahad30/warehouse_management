import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";

import UseTable from "../../components/Reusable/useTable/UseTable";
import { BiCartAdd } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import EditCustomer from "./EditCustomer";
import {
  useDeleteCustomerMutation,
  useGetCustomersQuery,
} from "../../features/Customer/customerApi";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";

const CustomersListCustom = () => {
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

  // console.log(customersData?.customers)
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
  console.log()
  if (customersIsSuccess && customersData?.status) {
    return content = (

      <>

        <div className="overflow-x-scroll">
          <table className="table table-sm table-pin-rows table-pin-cols">
            {/* Table header */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {
             customersData?.customers && customersData?.customers.map((customer) => <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer?.profile_image}</td>
                  <td>{customer?.name}</td>
                  <td>{customer?.email}</td>
                  <td>{customer?.phone}</td>
                  <td>{customer?.notes}</td>
                  <td>{customer?.address}</td>
                  <td className="flex gap-x-2 items-center">
                    {handleModalEditInfo && (
                      <FiEdit
                        onClick={() => {
                          handleModalEditInfo(customer);
                        }}
                        className="cursor-pointer"
                        size={20}
                      />
                    )}
                    {onDelete && (
                      <RiDeleteBin4Line
                        onClick={() => {
                          onDelete(customer?.id);
                        }}
                        className="cursor-pointer"
                        size={20}
                      />
                    )}
                  </td>


                </tr>

                )
              }
            </tbody>

            <tfoot>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </tfoot>
          </table>
        </div>
        {/* <UseTable
          data={customersData?.customers}
          columns={columns}
          handleModalEditInfo={handleModalEditInfo}
          onDelete={onDelete}
          btnTitle={"Add Customer"}
          btnPath={"/dashboard/customer/add"}
          btnIcon={<BiCartAdd size={20} />}
          setFiltering={setFiltering}
        /> */}
      </>
    );

  }

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>
          Customers {customersData?.customers?.length}
        </TableHeadingTitle>
        {/* Customers Table */}
        {content}
        <EditCustomer
          customer={customer}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </DashboardBackground>
    </>
  );
};

export default CustomersListCustom;
