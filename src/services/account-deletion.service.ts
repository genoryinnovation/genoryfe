import api from './api';

export const requestAccountDeletion = async (contact: string) => {
  const response = await api.post('/auth/account-deletion/request', { contact });
  return response.data;
};

export const confirmAccountDeletion = async (identifier: string, otp: string) => {
  const response = await api.post('/auth/account-deletion/confirm', { identifier, otp });
  return response.data;
};
