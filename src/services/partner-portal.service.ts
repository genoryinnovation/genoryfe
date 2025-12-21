import api from './api';

export interface PartnerStats {
  employeeCount: number;
  pendingOrders: number;
  walletBalance: number;
  todaySpend: number;
  monthSpend: number;
}

export interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  hrEmployeeId?: string;
  membership?: {
    status: 'active' | 'suspended';
    employeeId?: string;
    settings: {
      orderThreshold: number;
      requiresApproval: boolean;
      monthlySpendLimit?: number;
      monthlyRequestsLimit?: number;
    };
    joinedAt: Date;
  };
  isActive: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    [key: string]: any;
  };
}

export class PartnerPortalService {
  /**
   * Get Dashboard Stats
   */
  static async getStats() {
    const response = await api.get('/admin/partner-portal/stats');
    return response.data.data as PartnerStats;
  }

  /**
   * Employees
   */
  static async getEmployees(params: any = { page: 1, limit: 10 }) {
    const response = await api.get('/admin/partner-portal/employees', { params });
    return response.data as PaginatedResponse<Employee>;
  }

  static async inviteEmployee(data: {
    email: string;
    firstName: string;
    lastName: string;
    hrEmployeeId?: string;
    orderThreshold?: number;
  }) {
    const response = await api.post('/admin/partner-portal/employees/invite', data);
    return response.data.data;
  }

  static async bulkInviteEmployees(employees: any[]) {
    const response = await api.post('/admin/partner-portal/employees/bulk-invite', { employees });
    return response.data.data;
  }

  static async getEmployeeDetails(employeeId: string) {
    const response = await api.get(`/admin/partner-portal/employees/${employeeId}`);
    return response.data.data as Employee;
  }

  static async getEmployeeActivity(employeeId: string, params: any = { page: 1 }) {
    const response = await api.get(`/admin/partner-portal/employees/${employeeId}/activity`, { params });
    return response.data as PaginatedResponse<any>;
  }

  static async updateEmployeeSettings(employeeId: string, settings: any) {
    const response = await api.patch(`/admin/partner-portal/employees/${employeeId}/settings`, { settings });
    return response.data.data;
  }

  static async toggleEmployeeMembershipStatus(employeeId: string, status: 'active' | 'suspended') {
    const response = await api.patch(`/admin/partner-portal/employees/${employeeId}/membership/status`, { status });
    return response.data.data;
  }

  /**
   * Team
   */
  static async getTeam(params: any = {}) {
    const response = await api.get('/admin/partner-portal/team', { params });
    return response.data as PaginatedResponse<any>;
  }

  static async inviteTeamMember(data: { firstName: string, lastName: string, email: string }) {
    const response = await api.post('/admin/partner-portal/team/invite', data);
    return response.data.data;
  }

  static async resendTeamInvitation(adminId: string) {
    const response = await api.post(`/admin/partner-portal/team/resend/${adminId}`);
    return response.data.data;
  }

  static async revokeTeamInvitation(adminId: string) {
    const response = await api.post(`/admin/partner-portal/team/revoke/${adminId}`);
    return response.data.data;
  }

  static async getTeamMemberDetails(adminId: string) {
    const response = await api.get(`/admin/partner-portal/team/${adminId}`);
    return response.data.data;
  }

  static async getTeamMemberActivity(adminId: string, params: any = { page: 1 }) {
    const response = await api.get(`/admin/partner-portal/team/${adminId}/activity`, { params });
    return response.data.data;
  }

  static async toggleTeamMemberSuspension(adminId: string) {
    const response = await api.post(`/admin/partner-portal/team/${adminId}/toggle-suspension`);
    return response.data.data;
  }

  /**
   * Orders
   */
  static async getOrderRequests(params: any = { page: 1, limit: 10 }) {
    const response = await api.get('/admin/partner-portal/orders', { params });
    return response.data as PaginatedResponse<any>;
  }

  static async getOrderRequest(requestId: string) {
    const response = await api.get(`/admin/partner-portal/orders/${requestId}`);
    return response.data.data;
  }

  static async processOrder(data: {
    requestId: string;
    action: 'approve' | 'reject';
    pin?: string;
    notes?: string;
  }) {
    const response = await api.post('/admin/partner-portal/orders/process', data);
    return response.data.data;
  }

  /**
   * Wallet
   */
  static async getTransactions(params: any = { page: 1, limit: 10 }) {
    const response = await api.get('/admin/partner-portal/wallet/transactions', { params });
    return response.data as PaginatedResponse<any> & { balance: number };
  }

  static async getWalletStats() {
    const response = await api.get('/admin/partner-portal/wallet/stats');
    return response.data.data as {
      totalTransactions: number;
      totalDeposits: number;
      depositCount: number;
      totalDeductions: number;
      deductionCount: number;
      netChange: number;
      balance: number;
    };
  }

  static async initializeWalletFunding(amount: number) {
    const response = await api.post('/admin/partner-portal/wallet/initialize-funding', { amount });
    return response.data.data;
  }

  static async verifyWalletFunding(reference: string) {
    const response = await api.get(`/admin/partner-portal/wallet/verify-funding/${reference}`);
    return response.data.data;
  }

  /**
   * Settings
   */
  static async getSettings() {
    const response = await api.get('/admin/partner-portal/settings');
    return response.data.data;
  }

  static async updateSettings(settings: any) {
    const response = await api.patch('/admin/partner-portal/settings', settings);
    return response.data.data;
  }

  static async updatePin(pin: string) {
    const response = await api.patch('/admin/partner-portal/settings/pin', { pin });
    return response.data.data;
  }
}
