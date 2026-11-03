import { request } from './client';

export const authService = {
  loginInit: (email, password, deviceId = null, trustDevice = false) =>
    request('/auth/login-init', {
      method: 'POST',
      body: JSON.stringify({ email, password, deviceId, trustDevice })
    }),

  loginVerifyOtp: (email, code, deviceId = null, trustDevice = false) =>
    request('/auth/login-verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, code, deviceId, trustDevice })
    }),

  forgotPasswordInit: (email) =>
    request('/auth/forgot-password-init', {
      method: 'POST',
      body: JSON.stringify({ email })
    }),

  forgotPasswordVerify: (email, code, newPassword) =>
    request('/auth/forgot-password-verify', {
      method: 'POST',
      body: JSON.stringify({ email, code, newPassword })
    }),

  resendOtp: (email, purpose) =>
    request('/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify({ email, purpose })
    }),

  register: (userData) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),

  getMe: () => request('/auth/me'),

  getCustomers: () => request('/auth/customers'),

  updateProfile: (profileData) =>
    request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    })
};

export default authService;
