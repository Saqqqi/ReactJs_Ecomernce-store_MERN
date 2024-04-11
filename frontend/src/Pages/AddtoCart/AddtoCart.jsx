import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCartItems, updateCartItem, removeCartItem } from '../../services/addToCart'; // Import the removeCartItem function
import './styleCart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { updateCartItem } from '../../services/addtocart'; 
const Addtocart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false); 
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const items = await getCartItems();
      setCartItems(items);
      setShowCart(items.length > 0);
    } catch (error) {
      console.error('Error fetching cart items:', error.message);
    }
  };
  // Function to calculate total price
  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.product.price * item.quantity;
    });
    return total.toFixed(2);
  };

  // Function to handle quantity change
  const handleQuantityChange = async (event, itemId) => {
    try {
      const newQuantity = parseInt(event.target.value);
      const updatedCartItems = cartItems.map(item => {
        if (item.product._id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setCartItems(updatedCartItems);

      // Call the updateCartItem function from the service
      await updateCartItem(itemId, newQuantity);
    } catch (error) {
      console.error('Error handling quantity change:', error.message);
    }
  };
  const handleRemoveCartItem = async (itemId) => {
    try {
      // Remove the item from the cart in the frontend
      const updatedCartItems = cartItems.filter(item => item.product._id !== itemId);
      setCartItems(updatedCartItems);

      // Call the removeCartItem function from the service to remove the item from the cart in the backend
      await removeCartItem(itemId);
      setShowCart(updatedCartItems.length > 0);
    } catch (error) {
      console.error('Error removing cart item:', error.message);
    }
  };


  return (
    <>
    {showCart ? (
      <section className=" my-5">
        <div className="container">
          <div className="row">
            {/* cart */}
            <div className="col-lg-9">
              <div className="card border shadow-0">
                <div className="m-4">
                  <h4 className="card-title mb-4">Your shopping cart</h4>
                  {/* Cart items */}
                  {cartItems.map(item => (
                    <div key={item.product._id} className="row gy-3 mb-4">
                      <div className="col-lg-5">
                        <div className="me-lg-5">
                          <div className="d-flex">
                            <img
                              src={item.product.image_url}
                              className="border rounded me-3"
                              style={{ width: '96px', height: '96px' }}
                              alt={item.product.name}
                            />
                            <div className="">
                              <Link to="#" className="nav-link">{item.product.name}</Link>
                              <p className="text-muted">{item.product.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                        <div className="">
                          <select style={{ width: '100px' }} className="form-select me-4" value={item.quantity} onChange={(event) => handleQuantityChange(event, item.product._id)}>
                            {/* Display options for quantity based on available quantity */}
                            {item.product.quantity && item.product.quantity > 0 &&
                              [...Array(parseInt(item.product.quantity)).keys()].map((option, index) => (
                                <option key={index}>{option + 1}</option>
                              ))
                            }
                          </select>
                        </div>

                        <div className="">
                          <h6>${(item.product.price * item.quantity).toFixed(2)}</h6>
                          <p className="text-muted text-nowrap">${item.product.price} / per item</p>
                        </div>
                      </div>
                      <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                        <div className="float-md-end">
                        {/* <Link to="/favorite_items" className="btn btn-light border px-2 icon-hover-primary">
        <FontAwesomeIcon icon={faHeart} className="fa-lg px-1 text-secondary" />
      </Link> */}
      <button onClick={() => handleRemoveCartItem(item.product._id)} className="btn btn-light border text-danger icon-hover-danger" >
              <FontAwesomeIcon icon={faTrash} className="fa-lg px-1" />
              Remove
            </button>

                        </div>
                      </div>
                    </div>
                  ))}
                  {/* End of Cart items */}
                </div>
                <div className="border-top pt-4 mx-4">
                  <p><i className="fas fa-truck text-muted fa-lg"></i> Free Delivery within 1-2 weeks</p>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  </p>
                </div>
              </div>
            </div>
            {/* cart */}
            {/* summary */}
            <div className="col-lg-3">
              <div className="card mb-3 border shadow-0">
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label className="form-label">Have coupon?</label>
                      <div className="input-group">
                        <input type="text" className="form-control border" name="" placeholder="Coupon code" />
                        <button className="btn btn-light border">Apply</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card shadow-0 border">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Total price:</p>
                    <p className="mb-2">${calculateTotalPrice()}</p>
                  </div>
                  {/* Other summary details */}
                  {/* ... */}
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Total price:</p>
                    <p className="mb-2 fw-bold">${calculateTotalPrice()}</p>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-success w-100 shadow-0 mb-2">Make Purchase</button>
                    <button className="btn btn-light w-100 border mt-2">Back to shop</button>
                  </div>
                </div>
              </div>
            </div>
            {/* summary */}
          </div>
        </div>
        </section>
      ) : ( // If showCart is false, render the message
        <div className="text-center my-5">
          <h3>No items available in the cart</h3>
          <p>Please go to the <Link to="/">homepage</Link> to add items to your cart.</p>
        </div>
      )}
    </>
  );
};


export default Addtocart;
