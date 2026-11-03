import { request } from './client';

export const reviewService = {
  getReviews: (productId = null) => request(productId ? `/reviews/${productId}` : '/reviews'),

  addReview: (reviewData) =>
    request('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData)
    }),

  analyzeReviews: async (reviews, productId = null, productTitle = "") => {
    try {
      return await request('/reviews/analyze', {
        method: 'POST',
        body: JSON.stringify({ reviews, productId, productTitle })
      });
    } catch (err) {
      try {
        const proxyRes = await fetch('http://127.0.0.1:5001/api/reviews/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reviews, productId, productTitle })
        });
        if (proxyRes.ok) return await proxyRes.json();
      } catch {}
      throw err;
    }
  }
};

export default reviewService;
