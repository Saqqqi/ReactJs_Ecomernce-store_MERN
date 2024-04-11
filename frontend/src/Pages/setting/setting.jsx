import React, { useState, useEffect } from 'react';
import './style.css';
import { apiUrl } from '../../config';
import { getUserData } from '../../utils/authUtils';

const Setting = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${apiUrl}/auth/user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getUserData().token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      console.log('Fetched user data:', data);

      // Extract user data from the response and update state
      const user = data.data.users[0];
      setUserData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      
     
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/auth/user/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUserData().token}`,
        },
        body: JSON.stringify({
          ...userData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      console.log('User data updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <>
    <div className="wrapper bg-white ">
      <h4 className="pb-4 border-bottom">Account settings</h4>
      <div className="d-flex align-items-start py-3 border-bottom">
        {/* Profile photo */}
        <img
          src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          className="img"
          alt=""
        />
  
        <div className="pl-sm-4 pl-2 mr-auto" id="img-section">
          <b>Profile Photo</b>
          <p>Accepted file type .png. Less than 1MB</p>
          <button className="btn button border">
            <b>Upload</b>
          </button>
      
        </div>
      </div>
      <div className="py-2">
        <form onSubmit={handleSubmit}>
          {/* User information fields */}
          <div className="row py-2">
            <div className="col-md-6">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="bg-light form-control"
                placeholder="Steve"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 pt-md-0 pt-3">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="bg-light form-control"
                placeholder="Smith"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row py-2">
            <div className="col-md-6">
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                disabled
                className="bg-light form-control"
                placeholder="steve_@email.com"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 pt-md-0 pt-3">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                className="bg-light form-control"
                placeholder="+1 213-548-6015"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <hr /> {/* Horizontal line to separate user profile and password sections */}
          {/* Password change fields */}
          <div className="row py-2">
            <div className="col-md-6">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                className="bg-light form-control"
                placeholder="New Password"
                name="newPassword"
                value={userData.newPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 pt-md-0 pt-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="bg-light form-control"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>
  
          <div className="py-3 pb-4 border-bottom">
            <button type="submit" className="btn btn-primary mr-3">
              Save Changes
            </button>
            <button className="btn border button">Cancel</button>
          </div>
        </form>
        <div className="d-sm-flex align-items-center pt-3" id="deactivate">
          <div>
            <b>Deactivate your account</b>
            <p>Details about your company account and password</p>
          </div>
          <div className="ml-auto">
            <button className="btn danger">Deactivate</button>
          </div>
        </div>
      </div>
    </div>
  </>
  
  );
};

export default Setting;
