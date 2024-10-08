import axios from 'axios';

export const BASE_URL = 'http://127.0.0.1:8000/';
export const accessToken = localStorage.getItem('userDetails')

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