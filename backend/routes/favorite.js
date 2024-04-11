const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const isActiveUser = require('../middleware/isActiveUser');
router.use(isActiveUser);

router.post('/add', favoriteController.addToFavorites);
router.delete('/remove', favoriteController.removeFavoriteItem); // Add a new route for removing favorite item
router.get('/', favoriteController.getFavoriteItems);

module.exports = router;
