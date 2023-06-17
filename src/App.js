import React, { useState } from 'react';
import axios from 'axios';
import './app.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://reqres.in/api/users?page=1');
      setUsers(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand">Brand: {selectedBrand}</div>
        <div className="brand-options">
          <button
            className={`btn ${selectedBrand === 'AirData' ? 'selected' : ''}`}
            onClick={() => handleBrandClick('AirData')}
          >
            AirData
          </button>
          <button
            className={`btn ${selectedBrand === 'Censusster' ? 'selected' : ''}`}
            onClick={() => handleBrandClick('Censusster')}
          >
            Censusster
          </button>
          <button
            className={`btn ${selectedBrand === 'Data Works' ? 'selected' : ''}`}
            onClick={() => handleBrandClick('Data Works')}
          >
            Data Works
          </button>
        </div>
        <button className="btn" onClick={getUsers}>Get users</button>
      </nav>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="grid-container">
          {users.map((user) => (
            <div className="user-card" key={user.id}>
              <img className="avatar" src={user.avatar} alt={user.first_name} />
              <p className="name">{`${user.first_name} ${user.last_name}`}</p>
              <p className="email">{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
