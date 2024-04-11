import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard'; 
const FilterItem = ({ products, selectedCategory, selectedBrand }) => {
  const uniqueBrands = [...new Set(products.map(product => product.brand))];
  const uniqueCategories = [...new Set(products.map(product => product.categories[0]))];

  return (
    <div className="scrollable-container">
    {uniqueBrands && <h3>{uniqueBrands}</h3>}
    {selectedBrand && <h3>{uniqueCategories}</h3>}
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} /> // Render ProductCard component
        ))}
      </div>
      {/* Horizontal line with same design */}
      <hr style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)', margin: '20px 0' }} />
    </div>
  </div>
);
};


export default FilterItem;
