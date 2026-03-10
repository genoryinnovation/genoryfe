import api from '../api';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status?: string; // Assuming status field
  referralStatus: 'regular' | 'agent';
  agentConfig?: {
    commissionRate: number;
    customerDiscountRate: number;
    maxCommissionPerOrder: number;
    minOrderAmount: number;
    totalReferrals: number;
    totalEarnings: number;
  };
  createdAt: string;
  // Add other fields as needed
}

export class UserService {
  static async getUsers(params: any = { page: 1, limit: 10 }): Promise<any> {
    const response = await api.get('/admin/users', {
      params,
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
