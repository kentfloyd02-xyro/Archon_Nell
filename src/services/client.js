export const API_BASE = (import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' && window.location.hostname !== 'localhost' ? `${window.location.origin}/api` : 'http://localhost:5000/api')).replace(/\/+$/, '');
export const BASE_URL = (import.meta.env.VITE_BASE_URL || (typeof window !== 'undefined' && window.location.hostname !== 'localhost' ? window.location.origin : 'http://localhost:5000')).replace(/\/+$/, '');

export async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const token = localStorage.getItem('archon_token');

  const headers = {
    ...options.headers,
  };

  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const userStr = localStorage.getItem('archon_user');
  if (userStr) {
    try {
      const u = JSON.parse(userStr);
      if (u?.email && !headers['X-User-Email']) headers['X-User-Email'] = u.email;
      if (u?.name && !headers['X-User-Name']) headers['X-User-Name'] = u.name;
      if (u?.role && !headers['X-User-Role']) headers['X-User-Role'] = u.role;
      if ((u?._id || u?.id) && !headers['X-User-Id']) headers['X-User-Id'] = u._id || u.id;
    } catch {}
  }

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const res = await fetch(url, { ...options, headers });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errorMsg = data.error || data.message || `Request failed with status ${res.status}`;
      const err = new Error(errorMsg);
      err.status = res.status;
      err.forcePasswordReset = Boolean(data.forcePasswordReset);
      err.otpAborted = Boolean(data.otpAborted);
      err.remainingAttempts = data.remainingAttempts;
      err.cooldownSeconds = data.cooldownSeconds;
      throw err;
    }

    return data;
  } catch (err) {
    console.error(`[API Error] ${endpoint}:`, err.message);
    throw err;
  }
}

export async function checkApiHealth() {
  try {
    const res = await fetch(`${BASE_URL}/`, { method: 'GET' });
    return res.ok;
  } catch {
    return false;
  }
}
