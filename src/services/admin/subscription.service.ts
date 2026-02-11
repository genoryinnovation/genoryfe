import api from '../api';

export interface Subscription {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  name: string;
  items: Array<{
    product: {
      _id: string;
      title: string;
      sku: string;
      images: string[];
    };
    quantity: number;
    title: string;
    price?: number;
    image?: string;
  }>;
  frequency: 'weekly' | 'bi-weekly' | 'monthly';
  startDate: string;
  nextDeliveryDate: string;
  nextBillingDate: string;
  status: 'active' | 'paused' | 'cancelled';
  deliveryAddress: {
    firstName: string;
    lastName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
  };
  paymentMethod: 'wallet' | 'card';
  createdAt: string;
}

export class SubscriptionService {
  static async getSubscriptions(params: any = { page: 1, limit: 10 }): Promise<any> {
    const response = await api.get('/admin/subscriptions', {
      params,
    });
    return response.data;
  }

  static async getSubscription(id: string): Promise<any> {
    const response = await api.get(`/admin/subscriptions/${id}`);
    return response.data;
  }

  static async updateStatus(id: string, status: string): Promise<any> {
    const response = await api.patch(`/admin/subscriptions/${id}/status`, { status });
    return response.data;
  }

  static async manualRenew(id: string): Promise<any> {
    const response = await api.post(`/admin/subscriptions/${id}/renew`, {});
    return response.data;
  }
}
