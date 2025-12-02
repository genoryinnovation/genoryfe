import api from '../api';

export class WalletService {
  static async getWallet(userId: string): Promise<any> {
    const response = await api.get(`/admin/users/${userId}/wallet`);
    return response.data;
  }

  static async topUpWallet(userId: string, amount: number, type: 'naira' | 'token', notes?: string): Promise<any> {
    const response = await api.post(`/admin/users/${userId}/wallet/topup`, { amount, type, notes });
    return response.data;
  }

  static async getTransactions(userId: string, page = 1, limit = 10): Promise<any> {
    const response = await api.get(`/admin/users/${userId}/wallet/transactions`, {
      params: { page, limit },
    });
    return response.data;
  }

  static async getWallets(page = 1, limit = 10, search = ''): Promise<any> {
    const response = await api.get('/admin/wallets', {
      params: { page, limit, search },
    });
    return response.data;
  }

  static async getWalletStats(): Promise<any> {
    const response = await api.get('/admin/wallets/stats');
    return response.data;
  }
}
