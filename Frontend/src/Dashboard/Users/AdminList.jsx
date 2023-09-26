import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import UseTable from "../../components/Reusable/useTable/UseTable";
import { BiCartAdd } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import EditUser from "./EditUser";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../features/User/userApi";

const AdminList = () => {
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
    { key: "role", header: "Role" },
    { key: "status", header: "Status" },
    { key: "address", header: "Address" },
    { key: "city", header: "City" },
    { key: "country", header: "Country" },
  ];

  // USERS CONTENT
  let content;

  // ALL USERS
  if (usersIsLoading) {
    return (content = <UseLoading />);
  }

  if (usersIsError) {
    console.error(usersError);
  }

  if (!usersData?.status) {
    return (content = (
      <>
        <p className="text-center text-2xl mt-10">{usersData?.message}</p>
      </>
    ));
  }

  if (usersIsSuccess && usersData?.status) {
    content = (
      <>
        <UseTable
          data={usersData?.users.filter((user) => user.role === "admin")}
          columns={columns}
          handleModalEditInfo={handleModalEditInfo}
          onDelete={onDelete}
          btnTitle={"Add User"}
          btnPath={"/dashboard/user/add"}
          btnIcon={<BiCartAdd size={20} />}
          setFiltering={setFiltering}
        />
      </>
    );
  }

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>
          Users {usersData?.customers?.length}
        </TableHeadingTitle>
        {/* Users Table */}
        {content}
        <EditUser
          user={user}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </DashboardBackground>
    </>
  );
};

export default AdminList;
