import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Properties
export const getProperties = async (filters = {}) => {
  const response = await api.get('/properties', { params: filters });
  return response.data;
};

export const getProperty = async (id: number) => {
  const response = await api.get(`/properties/${id}`);
  return response.data;
};

export const createProperty = async (propertyData: any) => {
  const response = await api.post('/properties', propertyData);
  return response.data;
};

export const updateProperty = async (id: number, propertyData: any) => {
  const response = await api.put(`/properties/${id}`, propertyData);
  return response.data;
};

export const deleteProperty = async (id: number) => {
  await api.delete(`/properties/${id}`);
};

// Users
export const register = async (userData: any) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const login = async (credentials: any) => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};

export const getFavorites = async (userId: number) => {
  const response = await api.get(`/users/${userId}/favorites`);
  return response.data;
};

export const addToFavorites = async (userId: number, propertyId: number) => {
  const response = await api.post(`/users/${userId}/favorites/${propertyId}`);
  return response.data;
};

export const removeFromFavorites = async (userId: number, propertyId: number) => {
  await api.delete(`/users/${userId}/favorites/${propertyId}`);
};