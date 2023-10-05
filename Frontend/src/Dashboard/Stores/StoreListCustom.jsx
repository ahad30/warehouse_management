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
import { FiEdit } from "react-icons/fi";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";
import { BiSolidDuplicate } from "react-icons/bi";

const StoreListCustom = () => {
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
          btnIcon={<BiSolidDuplicate size={20} />}
          setFiltering={setFiltering}
        />

        {!storesIsSuccess && storesData?.status ? (
          <p className="text-center text-2xl mt-10">{storesData?.message}</p>
        ) : (
          <div className="overflow-x-scroll">
            <table className="table table-sm table-pin-rows table-pin-cols">
              {/* Table header */}
              <thead>
                <tr>
                  <th>Serial no</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>web</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {storesData?.stores?.map((store, index) => (
                  <tr key={store?.id}>
                    <td>{index + 1}</td>
                    <td>{store?.store_name}</td>
                    <td>{store?.store_phone}</td>
                    <td>{store?.store_email}</td>
                    <td>{store?.store_web}</td>
                    <td>{store?.store_address}</td>
                    <td className="flex gap-x-2 items-center">
                      <FiEdit
                        onClick={() => {
                          handleModalEditInfo(store);
                        }}
                        className="cursor-pointer"
                        size={20}
                      />
                      <RiDeleteBin4Line
                        onClick={() => {
                          onDelete(store?.id);
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
                  <th>Serial no</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>web</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </tfoot>
            </table>
          </div>
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

export default StoreListCustom;
