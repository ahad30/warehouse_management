import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import EditCustomer from "./EditCustomer";
import { BiSolidDuplicate } from "react-icons/bi";

import {
  useDeleteCustomerMutation,
  useGetCustomersQuery,
} from "../../features/Customer/customerApi";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";

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

  // ALL CUSTOMERS
  if (customersIsLoading) {
    return <UseLoading />;
  }

  if (customersIsError) {
    console.error(customersError);
  }

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>
          Customers {customersData?.customers?.length}
        </TableHeadingTitle>
        <SearchAndAddBtn
          btnTitle={"Add customer"}
          btnPath={"/dashboard/customer/add"}
          btnIcon={<BiSolidDuplicate size={20}></BiSolidDuplicate>}
          setFiltering={setFiltering}
        />
        {/* Customers Table */}
        {!customersIsSuccess && customersData?.status ? (
          <p className="text-center text-2xl mt-10">{customersData?.message}</p>
        ) : (
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
                {customersData?.customers &&
                  customersData?.customers?.map((customer) => (
                    <tr key={customer?.id}>
                      <td>{customer.id}</td>
                      <td>{customer?.profile_image}</td>
                      <td>{customer?.name}</td>
                      <td>{customer?.email}</td>
                      <td>{customer?.phone}</td>
                      <td>{customer?.notes}</td>
                      <td>{customer?.address}</td>
                      <td className="flex gap-x-2 items-center">
                        <FiEdit
                          onClick={() => {
                            handleModalEditInfo(customer);
                          }}
                          className="cursor-pointer"
                          size={20}
                        />
                        <RiDeleteBin4Line
                          onClick={() => {
                            onDelete(customer?.id);
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
        )}
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
