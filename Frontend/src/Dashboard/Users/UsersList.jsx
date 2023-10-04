import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { BiSolidDuplicate } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import EditUser from "./EditUser";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import {
  useDeleteUserMutation,
  useGetUserRolesQuery,
  useGetUsersQuery,
} from "../../features/User/userApi";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";

const UsersList = () => {
  UseTitle("Users");
  const [modalIsOpen, setModalIsOpen] = useState(null);
  const [user, setUser] = useState({});
  const [allUserData, setAllUserData] = useState([]);
  const { data: rolesData } = useGetUserRolesQuery();
  // const [reload, setReload] = useState(false);
  const [filterData, setFilterData] = useState(allUserData);

  const {
    data: usersData,
    isLoading: usersIsLoading,
    isError: usersIsError,
    error: usersError,
    isSuccess: usersIsSuccess,
  } = useGetUsersQuery();

  useEffect(() => {
    // setAllUserData(filterData);
    if (filterData.length > 0) {
      setAllUserData(filterData);
    } else {
      setAllUserData(usersData?.users);
    }

    // setAllUserData(usersData?.users);
  }, [usersData, usersData?.users, filterData]);

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
    console.log(id);
    deleteUser(id);
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

  // console.log(allUserData)

  // EDIT STARTS
  const handleModalEditInfo = (user) => {
    setUser(user);
    setModalIsOpen(true);
  };
  // EDIT ENDS

  // SEARCH FILTERING STARTS
  const setFiltering = (data) => {
    console.log(data);
  };
  // SEARCH FILTERING ENDS
  /*
  const columns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    { key: "get_role.role", header: "Role" },
    { key: "status", header: "Status" },
    { key: "address", header: "Address" },
    { key: "city", header: "City" },
    { key: "country", header: "Country" },
  ];
*/
  // ALL USERS
  if (usersIsLoading) {
    return <UseLoading />;
  }

  if (usersIsError) {
    console.error(usersError);
  }

  // console.log(usersData?.users);
  // console.log(rolesData.roles)

  const handleFilter = (data) => {
    if (data) {
      const filterUsers = allUserData.filter(
        (user) => user?.get_role?.role === data
      );
      // console.log(filterUsers)

      setFilterData(filterUsers);
      // setReload(!reload); // Apply the filter and update the state
    }
  };
  // console.log(allUserData)
  console.log(filterData);
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

        <div className="form-control my-5 w-1/6 ">
          <label className="label">
            <span className="label-text">Filter</span>
          </label>

          <select
            onChange={(e) => handleFilter(e.target.value)}
            className=" px-4 py-2 focus:border-0"
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
                  <th>Role</th>
                  <th>Status</th>
                  <th>Address</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {allUserData &&
                  allUserData?.map((user, idx) => (
                    <tr key={user?.id}>
                      <td>{idx + 1}</td>
                      <td>
                        <img
                          className="w-8 h-auto rounded-full"
                          src={`${
                            import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT
                          }/uploads/users/${user?.img}`}
                          alt=""
                        />
                      </td>
                      <td>{user?.name}</td>
                      <td>{user?.email}</td>
                      <td>{user?.phone}</td>
                      <td>{user?.get_role?.role}</td>
                      <td>{user?.status}</td>
                      <td>{user?.address}</td>
                      <td>{user?.notes}</td>
                      <td className="flex gap-x-2 items-center">
                        <FiEdit
                          onClick={() => {
                            handleModalEditInfo(user);
                          }}
                          className="cursor-pointer"
                          size={20}
                        />
                        <RiDeleteBin4Line
                          onClick={() => {
                            onDelete(user?.id);
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
                  <th>role</th>
                  <th>status</th>
                  <th>Address</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </tfoot>
            </table>
          </div>
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
