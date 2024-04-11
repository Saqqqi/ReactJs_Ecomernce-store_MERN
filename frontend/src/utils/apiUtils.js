// apiUtils.js

import { getProductList } from '../services/productService';

const fetchCategories = async () => {
  try {
    // Fetch the product list
    const products = await getProductList();

    // Extract unique categories from products
    const categories = [...new Set(products.map(product => product.categories[1]).flat())];
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    return [];
  }
};

const fetchBrands = async () => {
  try {
    // Fetch the product list
    const products = await getProductList();

    // Extract unique brand names from products
    const brands = [...new Set(products.map(product => product.brand))];
    return brands;
  } catch (error) {
    console.error('Error fetching brands:', error.message);
    return [];
  }
};

export { fetchCategories, fetchBrands };
