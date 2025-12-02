import api from '../api';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parentCategory?: Category;
  displayOrder: number;
  status: 'active' | 'inactive';
}

export interface Product {
  _id: string;
  sku: string;
  title: string;
  description: string;
  category: Category;
  price: number;
  currency: string;
  images: string[];
  inventory: {
    quantity: number;
    unit: string;
    reorderLevel: number;
  };
  status: 'active' | 'inactive' | 'discontinued';
}

export class CatalogService {
  // Categories
  static async getCategories(): Promise<any> {
    const response = await api.get('/admin/catalog/categories');
    return response.data;
  }

  static async getCategoryStats(): Promise<any> {
    const response = await api.get('/admin/catalog/categories/stats');
    return response.data;
  }

  static async createCategory(data: any): Promise<any> {
    const response = await api.post('/admin/catalog/categories', data);
    return response.data;
  }

  static async updateCategory(id: string, data: any): Promise<any> {
    const response = await api.patch(`/admin/catalog/categories/${id}`, data);
    return response.data;
  }

  static async deleteCategory(id: string): Promise<any> {
    const response = await api.delete(`/admin/catalog/categories/${id}`);
    return response.data;
  }

  // Products
  static async getProducts(page = 1, limit = 10, search = '', category = '', status = ''): Promise<any> {
    const response = await api.get('/admin/catalog/products', {
      params: { page, limit, search, category, status },
    });
    return response.data;
  }

  static async getProductStats(): Promise<any> {
    const response = await api.get('/admin/catalog/products/stats');
    return response.data;
  }

  static async createProduct(data: any): Promise<any> {
    const response = await api.post('/admin/catalog/products', data);
    return response.data;
  }

  static async getProduct(id: string): Promise<any> {
    const response = await api.get(`/admin/catalog/products/${id}`);
    return response.data;
  }

  static async getProductMetrics(id: string): Promise<any> {
    const response = await api.get(`/admin/catalog/products/${id}/metrics`);
    return response.data;
  }

  static async updateProduct(id: string, data: any): Promise<any> {
    const response = await api.patch(`/admin/catalog/products/${id}`, data);
    return response.data;
  }

  static async deleteProduct(id: string): Promise<any> {
    const response = await api.delete(`/admin/catalog/products/${id}`);
    return response.data;
  }
}
