import { productEndpoints } from '../Config/apiEndpoints'

const addToCart = async (productId, quantity) => {
  try {
    const response = await fetch(productEndpoints.addToCart, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to add product to cart');
    }

    const data = await response.json();
    console.log(data.message); // Product added to cart successfully
  } catch (error) {
    console.error('Error adding product to cart:', error.message);
    throw error;
  }
};

const getCartItems = async () => {
  try {
    const response = await fetch(productEndpoints.getCartItems, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to fetch cart items');
    }

    const data = await response.json();
    return data.cart.products;
  } catch (error) {
    console.error('Error fetching cart items:', error.message);
    throw error;
  }
};

const updateCartItem = async (itemId, newQuantity) => {
  try {
    const response = await fetch(productEndpoints.updateCartItem, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId, quantity: newQuantity }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to update cart item');
    }

    console.log('Cart item updated successfully');
  } catch (error) {
    console.error('Error updating cart item in backend:', error.message);
    throw error;
  }
};
const removeCartItem = async (itemId) => {
  try {
    const response = await fetch(productEndpoints.removeCartItem, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to remove item from cart');
    }

    console.log('Item removed from cart successfully');
  } catch (error) {
    console.error('Error removing item from cart:', error.message);
    throw error;
  }
};


export { addToCart, getCartItems, updateCartItem, removeCartItem };
