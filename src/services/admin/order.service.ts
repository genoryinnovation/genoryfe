import api from '../api';

export interface Order {
  _id: string;
  orderNumber: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  items: Array<{
    product: {
      _id: string;
      title: string;
      sku: string;
      images: string[];
    };
    quantity: number;
    price: number;
    lineTotal: number;
  }>;
  subtotal?: number;
  deliveryFee?: number;
  totalAmount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };
}

export class OrderService {
  static async getOrders(params: any = { page: 1, limit: 10 }): Promise<any> {
    const response = await api.get('/admin/orders', {
      params,
    });
    return response.data;
  }

  static async getOrderStats(): Promise<any> {
    const response = await api.get('/admin/orders/stats');
    return response.data;
  }

  static async getOrder(id: string): Promise<any> {
    const response = await api.get(`/admin/orders/${id}`);
    return response.data;
  }

  static async updateOrderStatus(id: string, status: string, notes?: string): Promise<any> {
    const response = await api.patch(`/admin/orders/${id}/status`, { status, notes });
    return response.data;
  }
}
