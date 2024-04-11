// models/Favorite.js

const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
