import React, { useState } from 'react';
import Login from './components/Login';
import UsersList from './components/UsersList';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div>
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <UsersList onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;