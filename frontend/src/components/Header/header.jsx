import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUserData } from '../../utils/authUtils';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaUserCircle } from 'react-icons/fa';
import { logoutUser } from '../../services/authService';
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => getUserData() !== null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setIsLoggedIn(getUserData() !== null);
    const userData = getUserData();
    if (userData) {
      setUsername(userData.user);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call logoutUser directly
      console.log('User logged out');
      setIsLoggedIn(false);
  
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000); // 2000 milliseconds = 2 seconds
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
  
  return (
    <header>
  <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#f0f0f0' }}>


        <Link className="navbar-brand" to="/">
        ElectroMart
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/" activeClassName="active" exact>
                Home
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/detail" activeClassName="active">
                Detail
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/filter" activeClassName="active">
                Filter
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/addtocart" activeClassName="active">
                Cart
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/favorite_Items" activeClassName="active">
              Favorite
              </NavLink>
            </li>
          </ul>
        </div>


        <div className="user-info ml-auto">
          {isLoggedIn ? (
            <Dropdown>
              <Dropdown.Toggle variant="light" id="avatar-dropdown">
                <div className="d-flex align-items-center">
                  <FaUserCircle size={24} className="me-2" />
                  <span>{username}</span>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          <Link to="/setting" className="dropdown-item">Setting</Link>

              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link to="/login">
              <button className="btn btn-outline-primary">Login</button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;