const saveUserData = (userData) => {
  localStorage.setItem('loginData', JSON.stringify(userData)); // Save user data as loginData
};

const removeUserData = () => {
  localStorage.removeItem('loginData'); // Remove user data from localStorage
};

export const getUserData = () => {
  const userData = JSON.parse(localStorage.getItem('loginData')) || null;
  console.log('User Data:', userData); // Log the JSON data
  return userData;
};


const getUserName = () => {
  const loginData = localStorage.getItem('loginData');
  if (loginData) {
    const userData = JSON.parse(loginData);
    return userData.user;
  }
  return null;
};

export { getUserName ,saveUserData, removeUserData  };

