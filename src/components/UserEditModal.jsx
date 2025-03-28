
import React, { useState, useEffect } from 'react';

const UserEditModal = ({ user, onUpdate, onClose }) => {
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onUpdate({
        ...user,
        first_name: firstName,
        last_name: lastName,
        email
      });
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Edit User</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="modal-actions">
              <button type="submit">Update</button>
              <button type="button" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default UserEditModal;