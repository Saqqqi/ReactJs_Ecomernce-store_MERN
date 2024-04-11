// App.js

import React, { useEffect, useState } from 'react';
import FilterItem from './FilterItem';
import SideBar from './Sidebar'; // Your SideBar component
import './App.css'; // Import CSS file
import { fetchCategories, fetchBrands } from '../../utils/apiUtils'; 
import { getProductList } from '../../services/productService';

const App = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories and brands
        const categoriesData = await fetchCategories();
        const brandsData = await fetchBrands();
        const productsData = await getProductList();
        setCategories(categoriesData);
        setBrands(brandsData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedBrand(null); // Clear selected brand
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setSelectedCategory(null); // Clear selected category
  };

  // Filter products based on selected category or brand
  const filteredProducts = selectedCategory
    ? products.filter(product => product.categories.includes(selectedCategory))
    : selectedBrand
      ? products.filter(product => product.brand === selectedBrand)
      : products;

  const handleShowAll = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
  };

  return (
    <div className="app-container">
      <SideBar
        brands={brands}
        categories={categories}
        selectedCategory={selectedCategory}
        selectedBrand={selectedBrand}
        onCategoryClick={handleCategoryClick}
        onBrandClick={handleBrandClick}
      />
      <FilterItem
        products={filteredProducts}
        onShowAll={handleShowAll}
      />
    </div>
  );
};

export default App;


