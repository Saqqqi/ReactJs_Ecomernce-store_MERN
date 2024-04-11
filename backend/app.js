// app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); // Import authRoutes
const authController = require('./controllers/authController'); // Import authController
// const { addToFavorites } = require('./controllers/favoriteController');
const favoriteRoutes = require('./routes/favorite');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


// Mounting routes
app.use('/api', productRoutes);
app.use('/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/logout', authController.logout);



mongoose.connect('mongodb+srv://xegaf96809:q7SlC22ySpoq4xhp@cluster0.yhbsuos.mongodb.net/products')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
