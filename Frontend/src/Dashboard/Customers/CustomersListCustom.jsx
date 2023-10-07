import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
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
import { FaEdit } from "react-icons/fa";
import DataTable from "react-data-table-component";

const CustomersListCustom = () => {
  UseTitle("Customers");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [customer, setCustomer] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const itemsPerPage = 10;

  const {
    data: customersData,
    isLoading: customersIsLoading,
    isError: customersIsError,
    error: customersError,
    isSuccess: customersIsSuccess,
  } = useGetCustomersQuery();

  useEffect(() => {
    setFilterData(customersData?.customers);
  }, [customersData, customersData?.customers]);

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
  const handleModalEditInfo = (row) => {
    setCustomer(row);
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
      name: "Image",
      cell: (row) => (
        <img
          src={
            row.profile_image
              ? `${
                  import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT
                }/uploads/customer/${row?.profile_image}`
              : "https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg"
          }
          alt="User"
          className=" w-12 h-12 rounded-full"
        />
      ),
    },
    {
      name: "Name",
      selector: "name",
    },
    {
      name: "email",
      selector: "email",
      // cell: (row) => {
      // return  <div style={{ overflow: "auto", whiteSpace: "nowrap", width: "100%" }}>
      //     {row?.email}
      //   </div>
      // }
    },
    {
      name: "phone",
      selector: "phone",
    },

    {
      name: "address",
      selector: "address",
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
    const filteredData = customersData?.customers?.filter((item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase())
    );
    setFilterData(filteredData);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
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
          filterData?.length > 0 && (
            <DataTable
              columns={columns}
              data={filterData}
              pagination
              paginationPerPage={itemsPerPage}
              paginationRowsPerPageOptions={[itemsPerPage, 5, 10, 15]}
              paginationTotalRows={filterData?.length}
              onChangePage={(page) => setCurrentPage(page)}
            />
          )
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

// {!customersIsSuccess && customersData?.status ? (
//   <p className="text-center text-2xl mt-10">{customersData?.message}</p>
// ) : (
//   <div className="overflow-x-scroll">
//     <table className="table table-sm table-pin-rows table-pin-cols">
//       {/* Table header */}
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Image</th>
//           <th>Name</th>
//           <th>Email</th>
//           <th>Phone Number</th>
//           <th>Address</th>
//           <th>Notes</th>
//           <th>Actions</th>
//         </tr>
//       </thead>

//       <tbody>
//         {customersData?.customers &&
//           customersData?.customers?.map((customer) => (
//             <tr key={customer?.id}>
//               <td>{customer.id}</td>
//               <td>{customer?.profile_image}</td>
//               <td>{customer?.name}</td>
//               <td>{customer?.email}</td>
//               <td>{customer?.phone}</td>
//               <td>{customer?.notes}</td>
//               <td>{customer?.address}</td>
//               <td className="flex gap-x-2 items-center">
//                 <FiEdit
//                   onClick={() => {
//                     handleModalEditInfo(customer);
//                   }}
//                   className="cursor-pointer"
//                   size={20}
//                 />
//                 <RiDeleteBin4Line
//                   onClick={() => {
//                     onDelete(customer?.id);
//                   }}
//                   className="cursor-pointer"
//                   size={20}
//                 />
//               </td>
//             </tr>
//           ))}
//       </tbody>

//       <tfoot>
//         <tr>
//           <th>ID</th>
//           <th>Image</th>
//           <th>Name</th>
//           <th>Email</th>
//           <th>Phone Number</th>
//           <th>Address</th>
//           <th>Notes</th>
//           <th>Actions</th>
//         </tr>
//       </tfoot>
//     </table>
//   </div>
// )}
