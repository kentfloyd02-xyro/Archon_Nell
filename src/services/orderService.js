import { request } from './client';

export const orderService = {
  getOrders: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/orders${query ? `?${query}` : ''}`);
  },

  getOrder: (orderNumber) => request(`/orders/${orderNumber}`),

  createOrder: (orderData) =>
    request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    }),

  updateOrderStatus: (orderNumber, newStatus, performedBy = null) =>
    request(`/orders/${orderNumber}/status`, {
      method: 'PUT',
      body: JSON.stringify({ newStatus, performedBy })
    }),

  cancelOrder: (orderNumber, reason, performedBy = null) =>
    request(`/orders/${orderNumber}/cancel`, {
      method: 'PUT',
      body: JSON.stringify({ reason, performedBy })
    }),

  requestRefund: (orderNumber, refundData) =>
    request(`/orders/${orderNumber}/refund`, {
      method: 'PUT',
      body: JSON.stringify(refundData)
    }),

  approveRefund: (orderNumber, restoreStock = true, performedBy = null) =>
    request(`/orders/${orderNumber}/refund/approve`, {
      method: 'PUT',
      body: JSON.stringify({ restoreStock, performedBy })
    }),

  rateOrder: (orderNumber, rating, notes) =>
    request(`/orders/${orderNumber}/rate`, {
      method: 'PUT',
      body: JSON.stringify({ rating, notes })
    })
};

export default orderService;
