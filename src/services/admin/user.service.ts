import api from '../api';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status?: string; // Assuming status field
  createdAt: string;
  // Add other fields as needed
}

export class UserService {
  static async getUsers(page = 1, limit = 10, search = '', status = ''): Promise<any> {
    const response = await api.get('/admin/users', {
      params: { page, limit, search, status },
    });
    return response.data;
  }

  static async getUser(id: string): Promise<any> {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  }

  static async getUserStats(): Promise<any> {
    const response = await api.get('/admin/users/stats');
    return response.data;
  }
}
