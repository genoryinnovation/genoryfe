import api from '../api';

export interface PickupLocation {
  _id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    landmark?: string;
  };
  contact: {
    name: string;
    phone: string;
    email?: string;
  };
  geolocation?: {
    lat: number;
    lng: number;
  };
  isActive: boolean;
  costPerKm: number;
  costPerGram: number;
  createdAt: string;
  updatedAt: string;
}

export type CreatePickupLocationDto = Omit<PickupLocation, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdatePickupLocationDto = Partial<CreatePickupLocationDto>;

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PickupLocationStats {
  total: number;
  active: number;
  inactive: number;
}

export interface GetLocationsParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}

export class ConfigurationService {
  /**
   * Get all pickup locations
   */
  static async getPickupLocations(params: GetLocationsParams = {}) {
    const response = await api.get<{ success: boolean; data: PickupLocation[]; meta: PaginationMeta }>('/admin/configuration/pickup-locations', { params });
    return response.data;
  }

  /**
   * Get pickup location stats
   */
  static async getPickupLocationStats() {
    const response = await api.get<{ success: boolean; data: PickupLocationStats }>('/admin/configuration/pickup-locations/stats');
    return response.data;
  }

  /**
   * Get pickup location by ID
   */
  static async getPickupLocation(id: string) {
    const response = await api.get<{ success: boolean; data: PickupLocation }>(`/admin/configuration/pickup-locations/${id}`);
    return response.data;
  }

  /**
   * Create pickup location
   */
  static async createPickupLocation(data: CreatePickupLocationDto) {
    const response = await api.post<{ success: boolean; data: PickupLocation }>('/admin/configuration/pickup-locations', data);
    return response.data;
  }

  /**
   * Update pickup location
   */
  static async updatePickupLocation(id: string, data: UpdatePickupLocationDto) {
    const response = await api.put<{ success: boolean; data: PickupLocation }>(`/admin/configuration/pickup-locations/${id}`, data);
    return response.data;
  }

  /**
   * Delete pickup location
   */
  static async deletePickupLocation(id: string) {
    const response = await api.delete<{ success: boolean; message: string }>(`/admin/configuration/pickup-locations/${id}`);
    return response.data;
  }
}
