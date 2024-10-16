import axios from 'axios';

export const userName = localStorage.getItem('user_name')

const BASE_URL = 'http://127.0.0.1:8000/'; // Update with your API base URL

const api = axios.create({
  baseURL: BASE_URL,
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');

  if (!refreshToken) {
    console.error('No refresh token found');
    return null; // Indicate that the refresh failed
  }

  try {
    const response = await axios.post(`${BASE_URL}api/token/refresh/`, {
      refresh: refreshToken,
    });
    // Store the new access token
    localStorage.setItem('access_token', response.data.access);
    console.log('New Access Token:', response.data.access);
    return response.data.access; // Return the new access token
  } catch (error) {
    console.error('Failed to refresh token:', error);
    // Optionally log the user out or redirect to login
    return null; // Indicate that the refresh failed
  }
};

// Add a response interceptor
api.interceptors.response.use(
  response => response, // Return response as is if successful
  async error => {
    const originalRequest = error.config;

    // Check if the error status is 401
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request to avoid infinite loops

      const newAccessToken = await refreshAccessToken(); // Attempt to refresh the token

      if (newAccessToken) {
        // Retry the original request with the new access token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Retry the request
      }
    }

    return Promise.reject(error); // Reject the promise if not handled
  }
);

export { api, BASE_URL };



const apiService = async (method, endpoint, data = null, params = {}) => {
  try {
    const config = {
      method: method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers here, e.g., authorization token
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      params: params,
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Helper functions for CRUD operations
export const createResource = (endpoint, data) => apiService('post', endpoint, data);
export const readResource = (endpoint, params) => apiService('get', endpoint, null, params);
export const updateResource = (endpoint, data) => apiService('put', endpoint, data);
export const deleteResource = (endpoint) => apiService('delete', endpoint);

export default apiService;