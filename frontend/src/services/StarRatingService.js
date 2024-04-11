import { apiUrl } from '../config';

const fetchReviews = async (productId) => {
  try {
    const response = await fetch(`${apiUrl}/api/products/${productId}/reviews`);
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    const data = await response.json();
    return data.reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

const submitReview = async (productId, reviewData) => {
  try {
    const response = await fetch(`${apiUrl}/api/products/${productId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData)
    });

    if (!response.ok) {
      throw new Error('Failed to submit review');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};

export { fetchReviews, submitReview };
