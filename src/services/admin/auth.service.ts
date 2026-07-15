import api from '../api';

export interface Role {
  _id: string;
  key: string;
  name: string;
  description?: string;
  isActive: boolean;
  module: string;
  permissions: any[];
}

export interface IStaffPermissions {
  canApproveOrders: boolean;
  canManageEmployees: boolean;
  canManageTeam: boolean;
  canManageWallet: boolean;
  canViewReports: boolean;
  canManageSettings: boolean;
}

export interface AdminUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role | string;
  partner?: string | any;
  isActive: boolean;
  mustChangePassword?: boolean;
  staffPermissions?: IStaffPermissions;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    admin: AdminUser;
    token: string;
    expiresAt: string;
    requiresPasswordChange: boolean;
  };
}

export class AuthService {
  static async login(credentials: { email: string; password: string }): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/admin/auth/login', credentials);
    return response.data;
  }

  static logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  }

  static getToken(): string | null {
    return localStorage.getItem('admin_token');
  }

  static getUser(): AdminUser | null {
    const userStr = localStorage.getItem('admin_user');
    return userStr ? JSON.parse(userStr) as AdminUser : null;
  }

  static setUser(user: AdminUser) {
    localStorage.setItem('admin_user', JSON.stringify(user));
  }

  static async changePassword(newPassword: string): Promise<void> {
    await api.post('/admin/auth/change-password', { newPassword });
  }
}
