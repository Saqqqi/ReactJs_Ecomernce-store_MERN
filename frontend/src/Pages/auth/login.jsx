import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { loginUser } from '../../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State variable to store login error
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    const result = await loginUser(userData);
    if (result.success) {
      localStorage.setItem('loginData', JSON.stringify(result.data));
      console.log('Login successful:', result.data);
      window.location.href = '/'; // Redirect to home page after successful login
    } else {
      console.error('Login failed:', result.error);
      setError(result.error); // Set error state if login fails
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3>Login</h3>
              </div>
              <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>} {/* Display error message if login fails */}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
      <label htmlFor="password">Password</label>
      <div className="input-group">
        <input
          type={showPassword ? 'text' : 'password'}
          className="form-control"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleTogglePasswordVisibility}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
    </div>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </form>
              </div>
              <div className="card-footer text-center">
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
