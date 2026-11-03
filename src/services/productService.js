import { request } from './client';

export const productService = {
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/products${query ? `?${query}` : ''}`);
  },

  getProduct: (id) => request(`/products/${id}`),

  updateStock: (id, delta) =>
    request(`/products/${id}/stock`, {
      method: 'PUT',
      body: JSON.stringify({ delta })
    }),

  createProduct: (data) =>
    request('/products', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  updateProduct: (id, data) =>
    request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  deleteProduct: (id) =>
    request(`/products/${id}`, {
      method: 'DELETE'
    })
};

export default productService;
