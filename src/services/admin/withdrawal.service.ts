import api from '../api';

export interface Withdrawal {
  _id: string;
  userId: string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  earningTransactionId: string;
  amount: number;
  bankDetails: {
    accountNumber: string;
    bankName: string;
    accountName: string;
    bankCode: string;
  };
  status: 'pending' | 'completed' | 'failed' | 'rejected' | 'processing';
  reference: string;
  paystackTransferCode?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WithdrawalResponse {
  success: boolean;
  data: Withdrawal[];
}

export const WithdrawalService = {
  async getAllWithdrawals(): Promise<WithdrawalResponse> {
    const response = await api.get('/admin/withdrawals');
    return response.data;
  },

  async approveWithdrawal(withdrawalId: string): Promise<any> {
    const response = await api.post(`/admin/withdrawals/${withdrawalId}/approve`);
    return response.data;
  },

  async rejectWithdrawal(withdrawalId: string, reason: string): Promise<any> {
    const response = await api.post(`/admin/withdrawals/${withdrawalId}/reject`, { reason });
    return response.data;
  }
};
