import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, createUser, updateUser } from "../api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setPhoneNumber(userToEdit.phoneNumber);
      setEditUserId(userId);
    }
  };

  const handleCreateUser = async () => {
    try {
      if (editUserId) {
        // Update existing user
        await updateUser(editUserId, { name, email, phoneNumber });
        setUsers(
          users.map((user) => {
            if (user.id === editUserId) {
              return { ...user, name, email, phoneNumber };
            }
            return user;
          })
        );
        setEditUserId(null);
      } else {
        // Create new user
        const newUser = await createUser({ name, email, phoneNumber });
        setUsers([...users, newUser]);
      }
      setName("");
      setEmail("");
      setPhoneNumber("");
    } catch (error) {
      console.log("Error creating/updating user:", error);
    }
  };

  return (
    <div className="content-section">
      <h3>Users</h3>

      <div className="user-info">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button onClick={handleCreateUser}>
          {editUserId ? "Update User" : "Create User"}
        </button>
      </div>
      <div className="user-listings">
        {users.map((user) => (
          <div className="user-item" key={user.id}>
             <div className="user-item-info">
            <h4>{user.name}</h4>
            <p>{user.email}</p>
            <p>{user.phoneNumber}</p>
            </div>
            <div className="user-actions">
              <button onClick={() => handleEditUser(user.id)}>Edit</button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
