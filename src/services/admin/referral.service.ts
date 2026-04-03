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
    customerDiscountRate: number;
    maxCommissionPerOrder: number;
    minOrderAmount: number;
    totalReferrals: number;
    totalEarnings: number;
    totalDiscountsGiven: number;
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

export interface AgentApplication {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: {
    countryCode: string;
    number: string;
  };
  agentApplication: {
    status: 'pending' | 'approved' | 'rejected';
    appliedAt: string;
    rejectionReason?: string;
    kyc: {
      idType: string;
      idNumber: string;
      idImage: string;
      selfieImage: string;
    };
  };
  createdAt: string;
}

export class ReferralService {
  static async getAgents(params: any = { page: 1, limit: 10 }): Promise<any> {
    const response = await api.get('/admin/referrals/agents', {
      params,
    });
    return response.data;
  }

  static async updateAgentConfig(userId: string, data: {
    commissionRate?: number;
    customerDiscountRate?: number;
    maxCommissionPerOrder?: number;
    minOrderAmount?: number;
  }): Promise<any> {
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

  static async promoteToAgent(userId: string, data: { 
    commissionRate?: number;
    customerDiscountRate?: number;
    maxCommissionPerOrder?: number;
    minOrderAmount?: number;
  } = {}): Promise<any> {
    const response = await api.post(`/admin/referrals/promote/${userId}`, data);
    return response.data;
  }

  static async getInvitations(params: any = { page: 1, limit: 10 }): Promise<any> {
    const response = await api.get('/admin/referrals/invitations', {
      params,
    });
    return response.data;
  }

  static async getAgentApplications(params: any = { page: 1, limit: 10 }): Promise<any> {
    const response = await api.get('/admin/referrals/applications', {
      params,
    });
    return response.data;
  }

  static async reviewAgentApplication(userId: string, data: {
    status: 'approved' | 'rejected';
    rejectionReason?: string;
    commissionRate?: number;
    customerDiscountRate?: number;
  }): Promise<any> {
    const response = await api.post(`/admin/referrals/applications/${userId}/review`, data);
    return response.data;
  }

  static async getReferredUsers(agentId: string, params: any = { page: 1, limit: 10 }): Promise<any> {
    const response = await api.get('/admin/users', {
      params: {
        ...params,
        referredBy: agentId,
      },
    });
    return response.data;
  }
}
