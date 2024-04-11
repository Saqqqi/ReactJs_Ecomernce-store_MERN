import React, { useState, useEffect } from 'react';
import './style.css';
import { getFavoriteItems, removeFavoriteItem } from '../../services/FavoriteItems';
import { Link } from 'react-router-dom';

const FavoriteItems = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    fetchFavoriteItems();
  }, []);

  const fetchFavoriteItems = async () => {
    try {
      const response = await getFavoriteItems();
      setFavoriteItems(response.favorites);
    } catch (error) {
      console.error('Error fetching favorite items:', error.message);
    }
  };

  const handleRemoveFromFavorites = async (itemId) => {
    try {
      await removeFavoriteItem(itemId);
      // After removal, fetch and update the favorite items list
      fetchFavoriteItems();
    } catch (error) {
      console.error('Error removing item from favorites:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Favorite Items</h2>
      {favoriteItems.length === 0 ? (
        <div className="text-center">
          <p>No items available in favorites.</p>
          <Link to="/" className="btn btn-primary">Go to Home</Link>
        </div>
      ) : (
        <div className="row">
          {favoriteItems.map((item) => (
            <div key={item._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow">
                <img
                  className="card-img-top"
                  src={item.image_url}
                  alt={item.name}
                  style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                />
                <div className="card-body">
                  <h5 className="card-title mb-2">{item.name}</h5>
                  <p className="card-text">${item.price}</p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <Link to={`/detail/${item._id}`} className="btn btn-primary">View Details</Link>
                  <button onClick={() => handleRemoveFromFavorites(item._id)} className="btn btn-outline-danger">Remove from Favorites</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteItems;
