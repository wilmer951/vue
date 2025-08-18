// authFetch.js
export function authFetch(url, options = {}) {
  const token = localStorage.getItem('jwt_token');

  const headers = {
    ...(options.headers || {}),
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  };

  return fetch(url, { ...options, headers });
}
