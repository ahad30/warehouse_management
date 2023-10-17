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
import DeleteConformation from "../../components/DeleteConformationAlert/DeletConformation";

const CustomersList = () => {
  UseTitle("Customers");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [customer, setCustomer] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const itemsPerPage = 11;

  const {
    data: customersData,
    isLoading: customersIsLoading,
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
  const handleModalEditInfo = (row) => {
    setCustomer(row);
    setModalIsOpen(true);
  };
  // EDIT ENDS
  console.log("console data" + JSON.stringify(filterData));

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
      selector: (row) => <>{row?.name}</>,
    },
    {
      name: "email",
      selector: (row) => <>{row?.email}</>,
    },
    {
      name: "phone",
      selector: (row) => <>{row?.phone}</>,
    },

    {
      name: "address",
      selector: (row) => <>{row?.address}</>,
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
          (filterData?.length > 0 && filterData != "")  && (
            <DataTable
           
              columns={columns}
              data={filterData}
              pagination
              responsive
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

export default CustomersList;