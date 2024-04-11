// favoriteService.js

import { favoriteEndpoints } from '../Config/apiEndpoints'

const addToFavorites = async (productId) => {
  try {
    const response = await fetch(favoriteEndpoints.addToFavorites, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }), // Pass productId in the request body
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to add product to favorites');
    }

    const data = await response.json();
    console.log(data.message); // Product added to favorites successfully
  } catch (error) {
    console.error('Error adding product to favorites:', error.message);
    throw error;
  }
};
const getFavoriteItems = async () => {
  try {
    const response = await fetch(favoriteEndpoints.getFavoriteItems, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any necessary authentication headers if required
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch favorite items');
    }

    const data = await response.json();
    console.log("getFavoriteItems", data)
    return data; // Assuming the response contains the favorite items
  } catch (error) {
    console.error('Error fetching favorite items:', error.message);
    throw error;
  }
};
const removeFavoriteItem = async (itemId) => {
  try {
    const response = await fetch(favoriteEndpoints.removeFavoriteItem, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId }), // Pass itemId in the request body
    });

    if (!response.ok) {
      throw new Error('Failed to remove item from favorites');
    }

    const data = await response.json();
    if (data.message) {
      console.log(data.message); // Log the message from the server
    } else {
      throw new Error('Removed item data not provided in the response');
    }
  } catch (error) {
    console.error('Error removing item from favorites:', error.message);
    throw error;
  }
};


export { addToFavorites, removeFavoriteItem, getFavoriteItems };
