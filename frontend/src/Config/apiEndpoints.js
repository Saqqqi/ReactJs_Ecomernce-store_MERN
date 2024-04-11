// apiEndpoints.js

import { apiUrl } from '../config';

const productEndpoints = {
  addToCart: `${apiUrl}/api/products/cart/add`,
  getCartItems: `${apiUrl}/api/cart`,
  updateCartItem: `${apiUrl}/api/products/cart/update`,
  removeCartItem: `${apiUrl}/api/products/cart/remove`,
};

const authEndpoints = {
  registerUser: `${apiUrl}/auth/signup`,
  loginUser: `${apiUrl}/auth/login`,
  logoutUser: `${apiUrl}/api/logout`,
  checkUserActiveStatus: `${apiUrl}/auth/user`,
};

const favoriteEndpoints = {
  addToFavorites: `${apiUrl}/api/favorites/add`,
  getFavoriteItems: `${apiUrl}/api/favorites`,
  removeFavoriteItem: `${apiUrl}/api/favorites/remove`,
};

export { productEndpoints, authEndpoints, favoriteEndpoints };
