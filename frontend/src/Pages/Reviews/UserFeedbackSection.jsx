import React, { useState, useEffect } from 'react';
import { fetchReviews } from '../../services/StarRatingService';
import { IoMdStar } from "react-icons/io";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'; // Import the desired icon

const UserFeedbackSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        const reviewsData = await fetchReviews(productId);
        const filteredReviews = reviewsData.filter(review => review.product_ID === productId);
        setReviews(filteredReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviewsData();
  }, [productId]);

  const Review = ({ review, index }) => {
    const formattedDateTime = new Date(review.createdAt).toLocaleString();

    return (
      <div key={review._id} className={index > 0 ? 'mt-4' : ''}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="avatar-icon bg-primary text-white d-flex align-items-center justify-content-center">
                <FontAwesomeIcon icon={faCircleUser} size="2x" />
              </div>
            </div>
            <div className="col">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="font-weight-bold mb-0">{review.userName}</h4>
                <span className="text-muted">{formattedDateTime}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <IoMdStar
                key={i}
                className="star"
                size={20}
                color={i < review.rating ? "#FDCC0D" : "#e4e5e9"}
                style={{ cursor: "pointer", transition: "color 200ms" }}
              />
            ))}
          </div>
        </div>
        <p className="mt-2">{review.comment}</p>
        {index !== reviews.length - 1 && <hr className="my-4" />}
      </div>
    );
  };

  const Reviews = ({ reviews }) => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5>User Reviews</h5>
              </div>
              <div className="card-body">
                {reviews.length === 0 ? (
                  <p>No rating or reviews available</p>
                ) : (
                  reviews.map((review, index) => (
                    <Review key={review._id} review={review} index={index} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <Reviews reviews={reviews} />;
};

export default UserFeedbackSection;
