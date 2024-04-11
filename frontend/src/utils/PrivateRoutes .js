import { Outlet, Navigate } from 'react-router-dom';
import { getUserData } from './authUtils'; // Import the function to retrieve user data from local storage

const PrivateRoutes = () => {
    // Retrieve user data from local storage
    const userData = getUserData();
    
    // Check if user data is present (logged in)
    const isAuthenticated = userData !== null;

    // If not authenticated, log a message to console
    if (!isAuthenticated) {
        console.log('Please login first');
    }

    // Render the Outlet if user is authenticated, otherwise navigate to the login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
