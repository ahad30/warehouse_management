import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { BiSolidDuplicate } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import EditUser from "./EditUser";
import {
  useDeleteUserMutation,
  useGetUserRolesQuery,
  useGetUsersQuery,
} from "../../features/User/userApi";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import DeleteConformation from "../../components/DeleteConformationAlert/DeletConformation";
import { RiDeleteBin4Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { UseErrorMessages } from "../../components/Reusable/UseErrorMessages/UseErrorMessages";
import useShowAsyncMessage from "../../components/Reusable/UseShowAsyncMessage/useShowAsyncMessage";

const UsersList = () => {
  const { get_role } = useSelector((state) => state.auth?.user);
  console.log(get_role);
  UseTitle("Users");

  // State to manage the edit user modal
  const [modalIsOpen, setModalIsOpen] = useState(null);

  // State to hold user data for editing
  const [user, setUser] = useState({});

  // Query to fetch user roles
  const { data: rolesData } = useGetUserRolesQuery();
  console.log(rolesData);
  // Pagination and filtering related states
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const itemsPerPage = 11;

  // Query to fetch user data
  const {
    data: usersData,
    isLoading: usersIsLoading,
    isSuccess: usersIsSuccess,
  } = useGetUsersQuery();

  // When user data changes, set the filtered data
  useEffect(() => {
    setFilterData(usersData?.users);
  }, [usersData?.users, usersData]);

  // Mutation to delete a user
  const [
    deleteUser,
    {
      isLoading: deleteIsLoading,
      isError: deleteIsError,
      error: deleteError,
      isSuccess: deleteIsSuccess,
      data: deleteData,
    },
  ] = useDeleteUserMutation();
  console.log(rolesData?.roles?.some((a) => a?.role === "Admin"));
  // Function to delete a user

  const onDelete = (id) => {
   
    // if (
    //   get_role?.role === "Sub Admin" &&
    //   usersData?.users?.some(
    //     (item) => item?.id == id && item?.get_role?.role === "Admin"
    //   )
    // ) {
    //   toast.error("Access denied");
    // }
    // else if (
    //   get_role?.role === "Sub Admin" &&
    //   usersData?.users?.some(
    //     (item) => item?.id == id && item?.get_role?.role === "Sub Admin"
    //   )
    // ) {
    //   toast.error("Access denied");
    // }
    // else if (
    //   get_role?.role === "Admin" &&
    //   usersData?.users?.some(
    //     (item) => item?.id == id && item?.get_role?.role === "Admin"
    //   )
    // ) {
    //   toast.error("Access denied");
    // } else {
    //   deleteUser(id);
    //   // console.log("hello");
    // }
    deleteUser(id)
  };
  // console.log(dele)
  UseErrorMessages(deleteError)
  useShowAsyncMessage(
    deleteIsLoading,
    deleteIsError,
    deleteError,
    deleteIsSuccess,
    deleteData,
  
  );
 

  // Function to handle opening the edit user modal
  const handleModalEditInfo = (row) => {
    setUser(row);
    setModalIsOpen(true);
  };

  // Columns configuration for the DataTable
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
            row.img
              ? `${
                  import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT
                }/uploads/users/${row?.img}`
              : "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
          }
          alt="User"
          className=" w-10 h-10 rounded-full"
        />
      ),
    },
    {
      name: "Name",
      selector: (row) => <>{row?.name}</>,
    },
    {
      name: "email",
      selector: (row) => <>{row?.email}</>,
    },
    // {
    //   name: "phone",
    //   selector: (row) => <>{row?.phone}</>,
    // },
    {
      name: "role",
      selector: (row) => row?.get_role?.role,
    },
    // {
    //   name: "address",
    //   selector: (row) => <>{row?.address}</>,
    // },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button onClick={() => handleModalEditInfo(row)}>
            <FaEdit size={20}></FaEdit>
          </button>
          {(get_role?.role === "Admin" || get_role?.role === "Sub Admin") && (
            <button onClick={() => onDelete(row?.id)}>
              <RiDeleteBin4Line size={20}></RiDeleteBin4Line>
            </button>
          )}
        </div>
      ),
    },
  ];

  // Function to filter users based on role
  const handleFilter = (data) => {
    if (usersData?.users && data) {
      const filter = usersData?.users.filter(
        (user) => user?.get_role?.role === data
      );
      setFilterData(filter);
    } else {
      setFilterData(usersData?.users);
    }
  };

  // Function to set the filter data based on user name search
  const setFiltering = (search) => {
    const filteredData = usersData?.users?.filter((item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredData) {
      setFilterData(filteredData);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Render loading indicator if user data is loading
  if (usersIsLoading) {
    return <UseLoading />;
  }

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>Users: {usersData?.users?.length}</TableHeadingTitle>
        {/* Users Table */}
        <SearchAndAddBtn
          btnTitle={"Add user"}
          btnPath={"/dashboard/user/add"}
          btnIcon={<BiSolidDuplicate size={20}></BiSolidDuplicate>}
          setFiltering={setFiltering}
        />
        <div className="form-control w-fit my-5 mb-3 lg:w-1/6 ">
          <label className="label">
            <span className="label-text font-bold">Filter by role</span>
          </label>
          <select
            onChange={(e) => handleFilter(e?.target?.value)}
            className="select select-bordered"
          >
            <option value={""}>Select Role</option>
            {rolesData?.roles?.map((userRole) => (
              <option
                className="focus-border-0"
                key={userRole?.id}
                value={userRole?.role}
              >
                {userRole?.role}
              </option>
            ))}
          </select>
        </div>
        <div className=" overflow-x-scroll">
          {!usersIsSuccess && usersData?.status ? (
            <p className="text-center text-2xl mt-10">{usersData?.message}</p>
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
        </div>
        <EditUser
          user={user}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </DashboardBackground>
    </>
  );
};

export default UsersList;
