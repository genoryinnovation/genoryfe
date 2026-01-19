import api from '../api';

export interface SystemConfig {
  _id: string;
  key: string;
  value: any;
  group: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  description?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpsertSystemConfigDto {
  key: string;
  value: any;
  group: string;
  type?: 'string' | 'number' | 'boolean' | 'json';
  description?: string;
  isPublic?: boolean;
}

export class SystemConfigService {
  /**
   * Get all configs
   */
  static async getAll(group?: string) {
    const params: any = {};
    if (group) params.group = group;
    
    const response = await api.get<{ success: boolean; data: SystemConfig[] }>('/admin/configuration/settings', { params });
    return response.data;
  }

  /**
   * Get value by key (Helper for direct value access)
   */
  static async getValue<T = any>(key: string): Promise<T | null> {
    try {
      const response = await api.get<{ success: boolean; data: { key: string; value: T } }>(`/admin/configuration/settings/${key}`);
      return response.data.data.value;
    } catch (error) {
      return null;
    }
  }

  /**
   * Upsert config
   */
  static async upsert(data: UpsertSystemConfigDto) {
    const response = await api.post<{ success: boolean; data: SystemConfig }>('/admin/configuration/settings', data);
    return response.data;
  }

  /**
   * Delete config
   */
  static async delete(key: string) {
    const response = await api.delete<{ success: boolean; message: string }>(`/admin/configuration/settings/${key}`);
    return response.data;
  }
}
