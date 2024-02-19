import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
// import { toast } from "react-hot-toast";
// import { useEffect, useState } from "react";
// import UseLoading from "../../components/Reusable/useLoading/UseLoading";
// import EditCustomer from "./EditCustomer";
// import { BiSolidDuplicate } from "react-icons/bi";
// import {
//   useDeleteCustomerMutation,
//   useGetCustomersQuery,
// } from "../../features/Customer/customerApi";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";

// import { FaEdit } from "react-icons/fa";
// import DataTable from "react-data-table-component";
// import DeleteConformation from "../../components/DeleteConformationAlert/DeletConformation";

const CustomersList = () => {
  UseTitle("Customers");
  // const [modalIsOpen, setModalIsOpen] = useState(false);

  // const [customer, setCustomer] = useState({});

  // const [currentPage, setCurrentPage] = useState(1);
  // const [filterData, setFilterData] = useState([]);
  // const itemsPerPage = 11;

  // const {
  //   data: customersData,
  //   isLoading: customersIsLoading,
  //   isSuccess: customersIsSuccess,
  // } = useGetCustomersQuery();

  // useEffect(() => {
  //   setFilterData(customersData?.customers);
  // }, [customersData, customersData?.customers]);

  // const [
  //   deleteCustomer,
  //   {
  //     isLoading: deleteIsLoading,
  //     isError: deleteIsError,
  //     error: deleteError,
  //     isSuccess: deleteIsSuccess,
  //     data: deleteData,
  //   },
  // ] = useDeleteCustomerMutation();

  // DELETE STARTS
  // const onDelete = (id) => {
  //   DeleteConformation(id, () => deleteCustomer(id));
  // };

  // useEffect(() => {
  //   if (deleteIsLoading) {
  //     toast.loading("Loading...", { id: 1 });
  //   }

  //   if (deleteIsError) {
  //     toast.error(deleteData?.message || deleteError?.status, { id: 1 });
  //   }

  //   if (deleteIsSuccess) {
  //     toast.success(deleteData?.message, { id: 1 });
  //   }
  // }, [
  //   deleteIsLoading,
  //   deleteIsError,
  //   deleteError,
  //   deleteIsSuccess,
  //   deleteData,
  // ]);
  // DELETE ENDS

  // EDIT STARTS
  // const handleModalEditInfo = (row) => {
  //   setCustomer(row);
  //   setModalIsOpen(true);
  // };
  // EDIT ENDS

  // const columns = [
  //   {
  //     name: "Serial",
  //     cell: (row) => {
  //       // Calculate the serial number based on the current page and items per page
  //       const serialNumber =
  //         (currentPage - 1) * itemsPerPage + filterData.indexOf(row) + 1;
  //       return <span>{serialNumber}</span>;
  //     },
  //   },
  //   {
  //     name: "Name",
  //     selector: (row) => <>{row?.name}</>,
  //   },
  //   {
  //     name: "email",
  //     selector: (row) => <>{row?.email}</>,
  //   },
  //   {
  //     name: "phone",
  //     selector: (row) => <>{row?.phone}</>,
  //   },

  //   {
  //     name: "address",
  //     selector: (row) => <>{row?.address}</>,
  //   },

  //   {
  //     name: "Actions",
  //     cell: (row) => (
  //       <div>
  //         <button onClick={() => handleModalEditInfo(row)}>
  //           <FaEdit size={20}></FaEdit>
  //         </button>
  //         <button onClick={() => onDelete(row?.id)}>
  //           <RiDeleteBin4Line size={20}></RiDeleteBin4Line>
  //         </button>
  //       </div>
  //     ),
  //   },
  // ];
  // SEARCH FILTERING STARTS
  // const setFiltering = (search) => {
  //   const filteredData = customersData?.customers?.filter((item) =>
  //     item?.name?.toLowerCase().includes(search.toLowerCase())
  //   );
  //   setFilterData(filteredData);
  // };

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // SEARCH FILTERING ENDS

  return (
    <>
      <DashboardBackground>
        <div className="mt-10">
          <p className="text-center font-semibold text-lg mb-3 ">
            Product Search
          </p>
          <form className="flex items-center max-w-sm mx-auto">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Product code..."
                required
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white bg-[#e74c3c] rounded-lg border border-[#e74c3c]"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>

          <div className="grid grid-cols-2  mt-10">
            <div className="px-2 lg:px-72 flex gap-2 lg:gap-10 ">
              <img
                src="https://m.media-amazon.com/images/I/71fJ8PJ8ooL._AC_UL1500_.jpg"
                className="w-10 md:w-8 max-w-full max-h-full h-20 md:h-15 rounded"
                alt="Apple Watch"
              />
              <img
                src="https://m.media-amazon.com/images/I/71fJ8PJ8ooL._AC_UL1500_.jpg"
                className="w-10 md:w-8 max-w-full max-h-full h-20 md:h-15 "
                alt="Apple Watch"
              />
              <img
                src="https://m.media-amazon.com/images/I/71fJ8PJ8ooL._AC_UL1500_.jpg"
                className="w-10 md:w-8 max-w-full max-h-full h-20 md:h-15 "
                alt="Apple Watch"
              />
              <img
                src="https://m.media-amazon.com/images/I/71fJ8PJ8ooL._AC_UL1500_.jpg"
                className="w-10 md:w-8 max-w-full max-h-full h-20 md:h-15 "
                alt="Apple Watch"
              />
            </div>
            <div>
              <p className="text-lg">Product Title: Watch</p>
              <div className="flex items-center">
                <label>Quantity : </label>
                <button
                  className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-5 w-5 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  type="button"
                >
                  <span className="sr-only">Quantity button</span>
                  <svg
                    className="w-2 h-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <div>
                  <input
                    type="number"
                    id="first_product"
                    className="bg-gray-50 w-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0"
                    required
                  />
                </div>
                <button
                  className="inline-flex items-center justify-center h-5 w-5 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  type="button"
                >
                  <span className="sr-only">Quantity button</span>
                  <svg
                    className="w-2 h-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-lg">
                <p>Price: $230</p>
                <p>Description : Nice watch</p>
                <button className="px-2 py-1 bg-[#e74c3c] mt-3 rounded text-white">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <TableHeadingTitle>
          Customers : {customersData?.customers?.length}
        </TableHeadingTitle> */}

        {/* <SearchAndAddBtn
          btnTitle={"Add customer"}
          btnPath={"/dashboard/customer/add"}
          btnIcon={<BiSolidDuplicate size={20}></BiSolidDuplicate>}
          setFiltering={setFiltering}
        /> */}
        {/* Customers Table */}

        {/* {!customersIsSuccess && customersData?.status ? (
          <p className="text-center text-2xl mt-10">{customersData?.message}</p>
        ) : (
          filterData?.length > 0 &&
          filterData != "" && (
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
        )} */}
        {/* 
        <EditCustomer
          customer={customer}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        /> */}
      </DashboardBackground>
    </>
  );
};

export default CustomersList;
