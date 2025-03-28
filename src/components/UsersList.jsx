import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../constants/api';
import UserEditModal from './UserEditModal';

const UsersList = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (currentPage) => {
    try {
      const response = await fetch(`${BASE_URL}/users?page=${currentPage}`);
      const data = await response.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId));
      }
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const handleUpdate = async (updatedUser) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });

      if (response.ok) {
        setUsers(users.map(user => 
          user.id === updatedUser.id ? updatedUser : user
        ));
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <div className="users-container">
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <img 
              src={user.avatar} 
              alt={`${user.first_name} ${user.last_name}`} 
              className="user-avatar" 
            />
            <h3>{`${user.first_name} ${user.last_name}`}</h3>
            <div className="user-actions">
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button 
                className="delete-button"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button 
            key={i} 
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {selectedUser && (
        <UserEditModal 
          user={selectedUser} 
          onUpdate={handleUpdate}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UsersList;