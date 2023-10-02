import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import UseTable from "../../components/Reusable/useTable/UseTable";
import { BiCartAdd, BiSolidDuplicate } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import EditUser from "./EditUser";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../features/User/userApi";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";

const UsersList = () => {
  UseTitle("Users");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useState({});

  const {
    data: usersData,
    isLoading: usersIsLoading,
    isError: usersIsError,
    error: usersError,
    isSuccess: usersIsSuccess,
  } = useGetUsersQuery();

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
    deleteUser(id);
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

  // USERS CONTENT
  // ALL USERS
  if (usersIsLoading) {
    return <UseLoading />;
  }

  if (usersIsError) {
    console.error(usersError);
  }

  console.log(usersData.users);

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
                  <th>role</th>
                  <th>status</th>
                  <th>Address</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {usersData?.users &&
                  usersData?.users?.map((user) => (
                    <tr key={user?.id}>
                      <td>{user.id}</td>
                      <td>{user?.profile_image}</td>
                      <td>{user?.name}</td>
                      <td>{user?.email}</td>
                      <td>{user?.phone}</td>
                      <td>{user?.role}</td>
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
