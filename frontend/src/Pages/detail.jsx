import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductList } from '../services/productService';
import  {addToCart}  from '../services/addToCart'; // Import addToCart function
import StarRating from "./Reviews/StarRating";
import UserFeedbackSection from "./Reviews/UserFeedbackSection";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Detail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const productList = await getProductList();
      const matchedProduct = productList.find(product => product._id === productId.toString());
      if (matchedProduct) {
        console.log('Product Details:', matchedProduct);
        setProduct(matchedProduct);
      } else {
        console.error('Product not found with ID:', productId);
      }
    } catch (error) {
      console.error('Error fetching product details:', error.message);
    }
  };

  // Event handler for Add to cart button
  const handleAddToCart = () => {
    // Assuming you want to add only one quantity to the cart
    addToCart(productId, 1);
  };

  return (
    <div className="container mt-4">
      {product ? (
        <div className="row">
          <div className="col-md-6 mb-4"><br />
            <img
              src={product.image_url}
              className="img-fluid rounded"
              alt={product.name}
              style={{ width: '600px', height: '400px' }} // Set maxWidth and maxHeight to 400px
            />
          </div>

          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text"><strong>Description:</strong> {product.description}</p>
                <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                <p className="card-text"><strong>Brand:</strong> {product.brand}</p>
                <p className="card-text"><strong>Color:</strong> {product.color}</p>
                <p className="card-text"><strong>Storage:</strong> {product.storage}</p>
                <p className="card-text"><strong>RAM:</strong> {product.RAM}</p>
                <p className="card-text"><strong>Screen Size:</strong> {product.screenSize}</p>
                <p className="card-text"><strong>Categories:</strong> {product.categories.join(', ')}</p>
                <p className="card-text"><strong>Ratings:</strong> {product.ratings}</p>
                <p className="card-text"><strong>Availability:</strong> {product.availability ? 'Available' : 'Not Available'}</p>
              </div>
              {/* Add event handler to the Add to cart button */}
              {/* <button className='btn btn-success'>Add to cart</button> */}
              <button type="button" className="btn btn-primary" onClick={handleAddToCart}>
  <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
</button>


            </div>
          </div>
          <StarRating productId={productId} /><br /><br /><br />
          <UserFeedbackSection productId={productId} productName={product.name} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;
