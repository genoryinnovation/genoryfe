import api from './api';

export interface PartnerProfile {
  _id: string;
  user: string;
  type: 'driver' | 'rider' | 'errander';
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  vehicle?: {
    type: string;
    make: string;
    model: string;
    plateNumber: string;
    color: string;
    images: string[];
  };
  kyc: {
    idType: string;
    idNumber: string;
    idImage: string;
    selfieImage: string;
    status: string;
  };
  isOnline: boolean;
  currentLocation?: {
    latitude: number;
    longitude: number;
    updatedAt: string;
  };
  earnings: {
    balance: number;
    total: number;
  };
}

export class PartnerService {
  static async apply(data: { type: string; vehicle?: any; kyc: any }): Promise<any> {
    const response = await api.post('/partners/apply', data);
    return response.data;
  }

  static async getProfile(): Promise<any> {
    const response = await api.get('/partners/me');
    return response.data;
  }

  static async updateStatus(isOnline: boolean): Promise<any> {
    const response = await api.patch('/partners/status', { isOnline });
    return response.data;
  }

  static async updateLocation(latitude: number, longitude: number): Promise<any> {
    const response = await api.patch('/partners/location', { latitude, longitude });
    return response.data;
  }
}
