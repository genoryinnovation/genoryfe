import api from '../api';

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    admin: any;
    token: string;
    expiresAt: string;
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

  static getUser(): any | null {
    const userStr = localStorage.getItem('admin_user');
    return userStr ? JSON.parse(userStr) : null;
  }
}
