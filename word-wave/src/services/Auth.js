import axios from 'axios';

const BASE_URL = 'https://wordwave-app-backend.onrender.com';

export const apiSignUp = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/register`, {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
      admin: false  // Set this based on your requirements
    });
    return response.data;
  } catch (error) {
    console.error('Signup API Error:', error.response?.data || error.message);
    throw error;
  }
};

export const apiLogin = async (payload) => {
  return apiClient.post("/users/login", payload);
};

export const apiLogout = async () => {
  return apiClient.post('/users/logout');
};