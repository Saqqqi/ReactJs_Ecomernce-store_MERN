const User = require('../models/User');
const Product = require('../models/Product');

exports.addToFavorites = async (req, res) => {
  console.log("hiiit");
  try {
    const { productId } = req.body;
    const userId = req.activeUserId;

    const user = await User.findById(userId).populate('favorites');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product is already in the user's favorites
    const isProductInFavorites = user.favorites.some(favorite => favorite._id.toString() === productId);
    if (isProductInFavorites) {
      console.log('Product already present in favorites of user');
      return res.status(400).json({ message: 'Product already present in favorites of user' });
    }

    // Add the product to the user's favorites
    user.favorites.push(product);
    await user.save();

    res.status(200).json({ message: 'Product added to favorites successfully' });
  } catch (error) {
    console.error('Error adding product to favorites:', error);
    res.status(500).json({ message: 'Failed to add product to favorites', error: error.message });
  }
};




exports.getFavoriteItems = async (req, res) => {
  try {
    // Get the user ID from the request object (added by the isActiveUser middleware)
    const userId = req.activeUserId;

    // Fetch the user from the database based on the user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch details of favorite items from the database
    const favoriteItems = [];
    for (const itemId of user.favorites) {
      const item = await Product.findById(itemId);
      if (item) {
        favoriteItems.push(item);
      }
    }

    // Return the favorite items with full JSON details
    res.status(200).json({ favorites: favoriteItems });
  } catch (error) {
    console.error('Error fetching favorite items:', error);
    res.status(500).json({ message: 'Failed to fetch favorite items', error: error.message });
  }
};exports.removeFavoriteItem = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.activeUserId;

    console.log('Removing item from favorites:', itemId); // Log the item ID being removed

    const user = await User.findById(userId).populate('favorites');
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the item from user's favorites
    user.favorites = user.favorites.filter(favorite => favorite._id.toString() !== itemId);
    await user.save();

    console.log('Item removed from user favorites:', itemId); // Log the removed item ID
    res.status(200).json({ message: 'Item removed from favorites successfully' });
  } catch (error) {
    console.error('Error removing item from favorites:', error);
    res.status(500).json({ message: 'Failed to remove item from favorites', error: error.message });
  }
};
