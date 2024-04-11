import React, { useEffect, useState } from 'react';
import FilterItem from './FilterItem';
import './Style/filterStyle.css'; // Import CSS file
import { fetchCategories, fetchBrands } from '../../utils/apiUtils';
import { getProductList } from '../../services/productService';

const SideBar = () => {
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
    <>
      <div className="sidebar" style={{ marginTop: '78px' }}>
        <h2>Categories</h2>

        {/* Display categories */}
        {categories.map((category, index) => (
          <div key={index} className={selectedCategory === category ? 'selected-category' : 'category'} onClick={() => handleCategoryClick(category)}>
            <span>{category}</span>
            {/* You can set the item count dynamically */}
            <span className="item-count">XX</span>
          </div>
        ))}

        {/* Display brands */}
        <h2>Brands</h2>
        {brands.map((brand, index) => (
          <div key={index} className={selectedBrand === brand ? 'selected-brand' : 'brand'} onClick={() => handleBrandClick(brand)}>
            <span>{brand}</span>
            {/* You can set the item count dynamically */}
            <span className="item-count">XX</span>
          </div>
        ))}

        {/* Show all button */}
        <button className="more-filters-btn" onClick={handleShowAll}>Show All</button>
      </div>

      <div style={{ marginLeft: '250px', padding: '20px' }}>
        <FilterItem products={filteredProducts} />
      </div>
    </>
  );
};

export default SideBar;
