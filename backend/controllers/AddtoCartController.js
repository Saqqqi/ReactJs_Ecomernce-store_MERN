const Cart = require('../models/AddtoCart');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.activeUserId;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const existingProduct = cart.products.find(
      entry => entry.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    
    console.log(`User with ID ${userId} added ${quantity} of product ${productId} to their cart`);

    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Failed to add product to cart', error: error.message });
  }
};


exports.getCartDetails = async (req, res) => {
  try {
    const userId = req.activeUserId;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId }).populate('products.product');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error('Error fetching cart details:', error);
    res.status(500).json({ message: 'Failed to fetch cart details', error: error.message });
  }
};
// In your backend controller

exports.updateCartItem = async (req, res) => {

  try {
    const { itemId, quantity } = req.body;
    const userId = req.activeUserId;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the cart item to update
    const cartItem = cart.products.find(entry => entry.product.toString() === itemId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Update the quantity of the cart item
    cartItem.quantity = quantity;

    // Save the updated cart
    await cart.save();

    console.log(`Quantity of item ${itemId} updated to ${quantity}`);

    res.status(200).json({ message: 'Cart item updated successfully' });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ message: 'Failed to update cart item', error: error.message });
  }
};
exports.removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.activeUserId;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the index of the cart item to remove
    const itemIndex = cart.products.findIndex(entry => entry.product.toString() === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Remove the item from the cart
    cart.products.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();

    console.log(`Item ${itemId} removed from cart`);

    res.status(200).json({ message: 'Cart item removed successfully' });
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({ message: 'Failed to remove cart item', error: error.message });
  }
};