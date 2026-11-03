import { request } from './client';

export const voucherService = {
  getVouchers: () => request('/vouchers'),

  validateVoucher: (code, subtotal) =>
    request('/vouchers/validate', {
      method: 'POST',
      body: JSON.stringify({ code, subtotal })
    })
};

export default voucherService;
