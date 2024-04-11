// ProductCard.js

import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, handleAddToFavorites }) => {
  return (
    <div className="col mb-4">
      <div className="card h-100 shadow product-card">
        <img
          src={product.image_url}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
          alt={product.name}
        />
        <div className="card-body">
          <h5 className="card-title mb-2">{product.name}</h5>
          <p className="card-text mb-3">{product.description}</p>
          <p className="card-text"><small><strong>Brand:</strong> {product.brand}</small></p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <Link to={`/detail/${product._id}`} className="btn btn-primary">View Details</Link>
          <button onClick={() => handleAddToFavorites(product._id)} className="btn btn-outline-success">Add to Favorites</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
