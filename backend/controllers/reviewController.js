const Review = require('../models/review');
const userController = require('./userController');

exports.addReview = async (req, res, next) => {
  try {
    const { productId, rating, comment, userName } = req.body;
    const userId = await userController.getActiveUserId();
    console.log(`Saving review for user ID: ${userId}`); // Log the message indicating the user ID
    console.log('Received productId:', productId);
    const review = new Review({
      user_ID: userId,
      product_ID: productId,
      rating,
      comment,
      userName
    });
    await review.save();
    console.log('Review added successfully:', review.toJSON());
    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Failed to add review', error: error.message });
  }
};

exports.getAllReviews = async (req, res, next) => {
  try {
    const allReviews = await Review.find();
    res.status(200).json({ reviews: allReviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
};
