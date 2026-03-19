import api from '../api';

export interface GiftCard {
  _id: string;
  code: string;
  gifterId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  recipientInfo: {
    email?: string;
    phone?: string;
    name?: string;
  };
  items: Array<any>;
  subtotal: number;
  totalAmount: number;
  currency: string;
  deliveryFeeCoveredByGifter: boolean;
  status: string;
  originalOrderId: any;
  redemptionOrderId?: any;
  createdAt: string;
  updatedAt: string;
}

export class GiftCardService {
  static async getGiftCards(params: any = { page: 1, limit: 10 }): Promise<any> {
    const response = await api.get('/admin/gift-cards', {
      params,
    });
    return response.data;
  }

  static async getGiftCardStats(): Promise<any> {
    const response = await api.get('/admin/gift-cards/stats');
    return response.data;
  }

  static async getGiftCard(id: string): Promise<any> {
    const response = await api.get(`/admin/gift-cards/${id}`);
    return response.data;
  }

  static async cancelGiftCard(id: string): Promise<any> {
    const response = await api.patch(`/admin/gift-cards/${id}/cancel`);
    return response.data;
  }
}
