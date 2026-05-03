import api from './api';

export const getPublicConfig = async (key: string) => {
  const response = await api.get(`/user/config/${key}`);
  return response.data.data;
};
