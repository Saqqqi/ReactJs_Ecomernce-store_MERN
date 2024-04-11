// productService.js

import { apiUrl } from '../config';

const getProductList = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products. HTTP status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched products:', data);
    return data;
  } catch (error) {
    console.error('Error fetching product list:', error.message);
    return [];
  }
};



export { getProductList };
