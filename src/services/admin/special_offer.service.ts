import api from '../api';

export interface SpecialOfferItem {
  product: any; // Using any for simplicity as product structure is complex and imported elsewhere
  quantity: number;
}

export interface SpecialOffer {
  _id: string;
  title: string;
  description?: string;
  image: string;
  type: 'SINGLE' | 'COMBO';
  items: SpecialOfferItem[];
  price: number;
  originalPrice?: number;
  criteria: {
    minOrders?: number;
    targetUser?: 'ALL' | 'NEW' | 'EXISTING';
  };
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
}

export class SpecialOfferService {
  static async getOffers(page = 1, limit = 10, type = '', isActive?: boolean): Promise<any> {
    const params: any = { page, limit, type };
    if (isActive !== undefined) params.isActive = isActive;
    
    const response = await api.get('/admin/special-offers', { params });
    return response.data;
  }

  static async getOffer(id: string): Promise<any> {
    const response = await api.get(`/admin/special-offers/${id}`);
    return response.data;
  }

  static async createOffer(data: any): Promise<any> {
    const response = await api.post('/admin/special-offers', data);
    return response.data;
  }

  static async updateOffer(id: string, data: any): Promise<any> {
    const response = await api.patch(`/admin/special-offers/${id}`, data);
    return response.data;
  }

  static async deleteOffer(id: string): Promise<any> {
    const response = await api.delete(`/admin/special-offers/${id}`);
    return response.data;
  }
}
