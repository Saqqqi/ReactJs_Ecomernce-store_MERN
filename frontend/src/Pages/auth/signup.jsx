import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authService';
// import { saveUserData } from '../../utils/authUtils';

const Signup = () => {
  const navigate = useNavigate();  // Updated from useHistory
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const result = await registerUser(formData);
  
    if (!result || !result.hasOwnProperty('success')) {
      console.error('Unexpected result from registerUser:', result);
      // Handle unexpected situation
      return;
    }
  
    const { success, data, error } = result;
  
    if (success) {
      console.log('Signup successful:', data);
     
      navigate('/login');
    } else {
      console.error('Signup failed:', error);
      // Handle the error
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Sign Up</h3>
            </div>
            <div className="card-body">
            <form onSubmit={handleSubmit}>
  {/* First Name */}
  <div className="form-group">
    <label htmlFor="firstName">First Name</label>
    <input
      type="text"
      className="form-control"
      id="firstName"
      name="firstName"
      placeholder="Enter your first name"
      value={formData.firstName}
      onChange={handleChange}
      required
    />
  </div>

  {/* Last Name */}
  <div className="form-group">
    <label htmlFor="lastName">Last Name</label>
    <input
      type="text"
      className="form-control"
      id="lastName"
      name="lastName"
      placeholder="Enter your last name"
      value={formData.lastName}
      onChange={handleChange}
      required
    />
  </div>

  {/* Email */}
  <div className="form-group">
    <label htmlFor="email">Email</label>
    <input
      type="email"
      className="form-control"
      id="email"
      name="email"
      placeholder="Enter your email"
      value={formData.email}
      onChange={handleChange}
      required
    />
  </div>

  {/* Password */}
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input
      type="password"
      className="form-control"
      id="password"
      name="password"
      placeholder="Enter your password"
      value={formData.password}
      onChange={handleChange}
      required
    />
  </div>

  {/* Add more fields if needed */}

  {/* Submit Button */}
  <button type="submit" className="btn btn-primary">
    Sign Up
  </button>
</form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
