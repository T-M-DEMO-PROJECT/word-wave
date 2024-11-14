import { apiClient } from "./config";

export const apiSignUp = async (payload) => {
  return await apiClient.post(`/users/register`, payload);
};
export const apiLogin = async (payload) => {
  return apiClient.post("/users/login", payload);
};

export const apiLogout = async () => {
  return apiClient.post('/users/logout');
};