const express = require('express');
const router = express.Router();
const isActiveUser = require('../middleware/isActiveUser');
const productController = require('../controllers/productController');
const reviewController = require('../controllers/reviewController');
const { addToCart, updateCartItem, getCartDetails ,removeCartItem} = require('../controllers/AddtoCartController'); // Import updateCartItem function

router.use(isActiveUser);

// Route to fetch all products
router.get('/products', productController.getAllProducts);

// Route to create a new product
router.post('/products', productController.createProduct);

// Route to add a review for a product
router.post('/products/:productId/reviews', reviewController.addReview);

// Route to fetch all reviews for a product
router.get('/products/:productId/reviews', reviewController.getAllReviews);

// Route to add an item to the cart
router.post('/products/cart/add', addToCart);

// Route to update a cart item
router.post('/products/cart/update', updateCartItem); // Define the route for updating cart items

// Route to fetch cart details
router.get('/cart', getCartDetails);


router.post('/products/cart/remove', removeCartItem);
module.exports = router;
