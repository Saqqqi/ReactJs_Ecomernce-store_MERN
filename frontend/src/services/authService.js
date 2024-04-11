import { removeUserData } from '../utils/authUtils';
import { authEndpoints } from '../Config/apiEndpoints'
// Function to handle response from API requests
const handleResponse = async (response) => {
  if (response.ok) {
    const data = await response.json();
    return { success: true, data };
  } else {
    const errorData = await response.json();
    return { success: false, error: errorData.message || 'Operation failed' };
  }
};

// Function to make API requests
const makeRequest = async (url, method, body) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Network error:', error);
    return { success: false, error: 'Operation failed due to a network error' };
  }
};

// Function to register a new user
const registerUser = async (userData) => {
  return await makeRequest(authEndpoints.registerUser, 'POST', userData);
};

// Function to log in a user
const loginUser = async (userData) => {
  const result = await makeRequest(authEndpoints.loginUser, 'POST', userData);
  if (result.success) {
    localStorage.setItem('loginData', JSON.stringify(result.data));
  }
  return result.data; // Return user data
};


// Function to log out a user
const logoutUser = async () => {
  const userData = JSON.parse(localStorage.getItem('loginData'));
  const firstName = userData ? userData.user : null;

  console.log('Logging out user:', firstName);

  removeUserData();
  console.log('User logged out');

  try {
    const response = await fetch(authEndpoints.logoutUser, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName }),
    });
    if (!response.ok) {
      throw new Error('Logout failed');
    }
    return response.json();
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

// Function for check checkUserActiveStatus


const checkUserActiveStatus = async () => {
  try {
    const response = await fetch(authEndpoints.authEndpoints);

    if (response.ok) {
      const userData = await response.json();
      const user = userData.data.users[0];

      if (user.isActive) {
        console.log('User is active:', user.isActive);
      } else {
        console.log('User is inactive:', user.isActive);
      }

      return user; // Return the user data
    } else {
      console.error('Failed to fetch user data');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};




// Exporting functions to be used by other modules
export { registerUser, loginUser, logoutUser, checkUserActiveStatus };