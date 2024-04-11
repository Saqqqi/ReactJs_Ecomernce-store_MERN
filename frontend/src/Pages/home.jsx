import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getProductList } from '../services/productService';
import { Link } from 'react-router-dom';
import { checkUserActiveStatus } from '../services/authService';
import { addToFavorites } from '../services/FavoriteItems';
import ProductCard from '../components/ProductCard'; 

const Home = () => {
  console.log('Home component rendered');
  const [products, setProducts] = useState([]);
  const [isActiveUser, setIsActiveUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchProducts();
    checkUserStatus();
  }, []);

  const handleAddToFavorites = async (productId) => {
    try {
      await addToFavorites(productId);
      console.log('Product added to favorites successfully');
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding product to favorites:', error.message);
      if (error.message === 'Product already present in favorites of user') {
        setErrorMessage('Product already in favorites');
      }
    }
  };

  const fetchProducts = async () => {
    try {
      const productList = await getProductList();
      setProducts(productList);
    } catch (error) {
      console.error('Error fetching product list:', error.message);
    }
  };

  const checkUserStatus = async () => {
    try {
      const activeUser = await checkUserActiveStatus();
      setIsActiveUser(!!activeUser);
    } catch (error) {
      console.error('Error checking user status:', error);
    }
  };

  return (
    <>
      <div className="banner">
        <div className="container">
          {/* <h1>Welcome to Our ElectroMart Store</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <h3 className="btn btn-primary">Shop Now</h3> */}
        </div>
      </div>
      <div className="container mt-4">
        <div className="jumbotron">
          {!isActiveUser && (
            <Link to="/login">
              {/* <button className="btn btn-primary">Login</button> */}
            </Link>
          )}
        </div>
      </div>

      {products.length > 0 && (
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} handleAddToFavorites={handleAddToFavorites} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
