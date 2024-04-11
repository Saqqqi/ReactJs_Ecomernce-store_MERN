import React, { useState } from "react";
import { IoMdStar } from "react-icons/io";
import { submitReview } from '../../services/StarRatingService';
import { getUserName } from '../../utils/authUtils';

const StarRating = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const userName = getUserName();

  const handleOpenReview = () => {
    setIsReviewOpen(true);
  };

  const handleCloseReview = () => {
    setIsReviewOpen(false);
  };

  const handleSubmitReview = async () => {
    try {
      const reviewData = { rating, comment, productId, userName };
      console.log('Review data:', reviewData);

      const data = await submitReview(productId, reviewData);
      console.log('Review submitted successfully:', data);

      setRating(0);
      setComment("");
      handleCloseReview();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="container">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <div className="text-right mb-3">
              <button
                className="btn btn-primary"
                onClick={handleOpenReview}
              >
                Leave a Review
              </button>
            </div>

            {isReviewOpen && (
              <div className="row" id="post-review-box">
                <div className="col-md-12">
                  <form>
                    <textarea
                      className="form-control mb-3"
                      id="new-review"
                      name="comment"
                      placeholder="Enter your review here..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />

                    <div className="d-flex align-items-center mb-3">
                      {[...Array(5)].map((_, i) => {
                        const ratingValue = i + 1;

                        return (
                          <label key={i} className="mx-1">
                            <input
                              type="radio"
                              name="rating"
                              value={ratingValue}
                              onClick={() => setRating(ratingValue)}
                              style={{ display: "none" }}
                            />
                            <IoMdStar
                              className="star"
                              size={30}
                              color={ratingValue <= (hover || rating) ? "#FDCC0D" : "#e4e5e9"}
                              onMouseEnter={() => setHover(ratingValue)}
                              onMouseLeave={() => setHover(null)}
                              style={{ cursor: "pointer", transition: "color 200ms" }}
                            />
                          </label>
                        );
                      })}
                      <p className="ml-2">Rating: {rating}</p>
                    </div>

                    <div className="text-right">
                      <button
                        className="btn btn-secondary mr-2"
                        onClick={handleCloseReview}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-success"
                        type="button"
                        onClick={handleSubmitReview}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarRating;
