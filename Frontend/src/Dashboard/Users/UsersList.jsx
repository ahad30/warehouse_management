import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { BiSolidDuplicate } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import EditUser from "./EditUser";
import { RiDeleteBin4Line } from "react-icons/ri";
import {
  useDeleteUserMutation,
  useGetUserRolesQuery,
  useGetUsersQuery,
} from "../../features/User/userApi";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";
import DataTable from "react-data-table-component";
import {FaEdit } from "react-icons/fa";
import DeleteConformation from "../../components/DeleteConformationAlert/DeletConformation";

const UsersList = () => {
  UseTitle("Users");
  const [modalIsOpen, setModalIsOpen] = useState(null);
  const [user, setUser] = useState({});

  const { data: rolesData } = useGetUserRolesQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const itemsPerPage = 11;

  const {
    data: usersData,
    isLoading: usersIsLoading,
    isSuccess: usersIsSuccess,
  } = useGetUsersQuery();

  useEffect(() => {
    setFilterData(usersData?.users);
  }, [usersData?.users, usersData]);

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

  // DELETE STARTS
  const onDelete = (id) => {
    DeleteConformation(id, () => deleteUser(id));
  };

  useEffect(() => {
    if (deleteIsLoading) {
      toast.loading("Loading...", { id: 1 });
    }

    if (deleteIsError) {
      toast.error(deleteData?.data?.message || deleteError?.status, { id: 1 });
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

  // EDIT STARTS
  const handleModalEditInfo = (row) => {
    setUser(row);
    setModalIsOpen(true);
  };
  // EDIT ENDS

  // SEARCH FILTERING ENDS

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
      // selector: "name",
      selector: (row) => <>{row?.name}</>,
      sortable: true,
    },
    {
      name: "email",
      // selector: "email",
      selector: (row) => <>{row?.email}</>,
      // cell: (row) => {
      // return  <div style={{ overflow: "auto", whiteSpace: "nowrap", width: "100%" }}>
      //     {row?.email}
      //   </div>
      // }
    },
    {
      name: "phone",
      // selector: "phone",
      selector: (row) => <>{row?.phone}</>,
    },
    {
      name: "role",
      selector: (row) => row?.get_role?.role,
    },
    // {
    //   name: "Status",
    //   cell: (row) => (
    //     <div>
    //       {row.status === "active" ? (
    //         <p className="flex items-center gap-x-2">
    //           {" "}
    //           {row?.status} <FaCheckCircle style={{ color: "green" }} />
    //         </p>
    //       ) : (
    //         <p className="flex items-center gap-x-2">
    //           {row?.status} <FaTimesCircle style={{ color: "red" }} />
    //         </p>
    //       )}
    //     </div>
    //   ),
    // },
    {
      name: "address",
      // selector: "address",
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

  // ALL USERS
  if (usersIsLoading) {
    return <UseLoading />;
  }

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

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>
          Users {usersData?.customers?.length}
        </TableHeadingTitle>
        {/* Users Table */}

        <SearchAndAddBtn
          btnTitle={"Add user"}
          btnPath={"/dashboard/user/add"}
          btnIcon={<BiSolidDuplicate size={20}></BiSolidDuplicate>}
          setFiltering={setFiltering}
        />

        <div className="form-control my-5 w-full mb-3 lg:w-1/6 ">
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
                className="focus:border-0"
                key={userRole?.id}
                value={userRole?.role}
              >
                {userRole?.role}
              </option>
            ))}
          </select>
        </div>

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
