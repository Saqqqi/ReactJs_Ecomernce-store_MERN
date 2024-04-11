import React from 'react';
// import { useLocation } from 'react-router-dom';
import Header from './components/Header/header';
// import Footer from './components/Footer/footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  // const location = useLocation();

  // // Function to determine whether to show the footer
  // const shouldShowFooter = () => {
  //   const excludedRoutes = ['/login', '/signup'];
  //   return !excludedRoutes.includes(location.pathname);
  // };

  return (
    <>
      <Header />
      <Outlet />
      {/* {shouldShowFooter() && <Footer />} */}
    </>
  );
};

export default Layout;
