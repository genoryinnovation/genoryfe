import api from '../api';

export interface Agent {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  referralCode: string;
  referralStatus: 'regular' | 'agent';
  agentConfig?: {
    commissionRate: number;
    totalReferrals: number;
    totalEarnings: number;
  };
  createdAt: string;
}

export interface ActivationCode {
  _id: string;
  code: string;
  createdBy: any;
  usedBy?: any;
  isUsed: boolean;
  expiresAt: string;
  usedAt?: string;
  createdAt: string;
}

export class ReferralService {
  static async getAgents(params: any = { page: 1, limit: 10 }): Promise<any> {
    const response = await api.get('/admin/referrals/agents', {
      params,
    });
    return response.data;
  }

  static async updateAgentConfig(userId: string, data: { commissionRate: number }): Promise<any> {
    const response = await api.patch(`/admin/referrals/agents/${userId}/config`, data);
    return response.data;
  }

  static async getActivationCodes(params: any = { page: 1, limit: 10 }): Promise<any> {
    const response = await api.get('/admin/referrals/activation-codes', {
      params,
    });
    return response.data;
  }

  static async generateActivationCode(data: { expiresAfterDays?: number } = {}): Promise<any> {
    const response = await api.post('/admin/referrals/activation-codes', data);
    return response.data;
  }

  static async getStats(): Promise<any> {
    const response = await api.get('/admin/referrals/stats');
    return response.data;
  }
}
