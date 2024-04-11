import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes ';
// Import your components
import Layout from './layout';
import Home from './Pages/home';
import Detail from './Pages/detail';
import Signup from './Pages/auth/signup';
import Login from './Pages/auth/login';
import NotFound from './Pages/NotFound';
import Setting from './Pages/setting/setting';
import SideBar from './Pages/Category/Sidebar';
import Addtocart from './Pages/AddtoCart/AddtoCart';
import FavoriteItems from './Pages/FavoriteItems/FavoriteItems';
import Loading from './Pages/loading'; // Import the Loading component

const App = () => {
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Simulate loading time
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading to false after timeout
    }, 2000); // Adjust the timeout duration as needed

    return () => clearTimeout(timeout); // Cleanup function to clear timeout
  }, []);

  return (
    <>
      {loading ? ( // Render loading component while loading is true
        <Loading />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              {/* <PrivateRoutes>
                <Route path="detail" element={<Detail />} />
              </PrivateRoutes> */}
              <Route path="detail/:productId" element={<Detail />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route element={<PrivateRoutes />}> {/* Include PrivateRoutes component */}
                <Route path="/setting" element={<Setting />} />
                <Route path="/filter" element={<SideBar />} />
                <Route path="/addtocart" element={<Addtocart />} />
                <Route path="/favorite_Items" element={<FavoriteItems />} />
              </Route>
              <Route path="*" element={<NotFound />} /> {/* 404 route */}
            </Route>
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to home for unknown routes */}
          </Routes>
        </Router>
      )}
    </>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
reportWebVitals();
