// src/UserTable.js
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const ReactDataTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch user data from JSONPlaceholder API
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const columns = [
    {
      name: "User Image",
      selector: "id",
      cell: (row) => (
        <img
          src={`https://i.pravatar.cc/150?u=${row.id}`}
          alt="User"
          className="h-8 w-8 rounded-full"
        />
      ),
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button onClick={() => handleEdit(row)}>Edit</button>
          <button onClick={() => handleDelete(row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleDelete = (userId) => {
    // Delete the user using JSONPlaceholder API
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(() => {
        // Remove the deleted user from the state
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user: ", error);
      });
  };

  const handleUpdate = (updatedUser) => {
    // Update the user using JSONPlaceholder API
    axios
      .put(
        `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
        updatedUser
      )
      .then(() => {
        // Update the user in the state
        setUsers(
          users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setSelectedUser(null); // Clear the selected user
      })
      .catch((error) => {
        console.error("Error updating user: ", error);
      });
  };

  return (
    <div>
      <DataTable
        className="table table-sm table-pin-rows table-pin-cols"
        title="User List"
        columns={columns}
        data={users}
        pagination
        paginationPerPage={10}
        striped
        dense
      />
      {selectedUser && (
        <div>
          <h2>Edit User</h2>
          {/* Implement your update form here */}
          <button onClick={() => handleUpdate(selectedUser)}>Save</button>
        </div>
      )}
    </div>
  );
};

export default ReactDataTable;
