const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true, 
  },
  password: String,
  isActive: {
    type: Boolean,
    default: false, 
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] // Define favorites array
});

const User = mongoose.model('User', userSchema);

module.exports = User;
