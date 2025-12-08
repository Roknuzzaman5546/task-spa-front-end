import api from './index';

export const register = (payload) => api.post('/register', payload);
export const login = (payload) => api.post('/login', payload);
export const logout = () => api.post('/logout');
