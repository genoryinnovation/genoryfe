import api from '../api';

export interface Partner {
  _id: string;
  name: string;
  registrationNumber?: string;
  industry?: string;
  employeeCount?: number;
  isActive: boolean;
  createdAt: string;
}

export interface CreatePartnerDto {
  name: string;
  registrationNumber?: string;
  industry?: string;
  employeeCount?: number;
}

export interface PartnerListResponse {
  success: boolean;
  message: string;
  data: {
    partners: Partner[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}

export class PartnerService {
  static async getPartners(page = 1, limit = 10, search = ''): Promise<PartnerListResponse> {
    const response = await api.get<PartnerListResponse>('/admin/partners', {
      params: { page, limit, search },
    });
    return response.data;
  }

  static async createPartner(data: CreatePartnerDto): Promise<any> {
    const response = await api.post('/admin/partners', data);
    return response.data;
  }

  static async getPartner(id: string): Promise<any> {
    const response = await api.get(`/admin/partners/${id}`);
    return response.data;
  }

  static async updatePartner(id: string, data: Partial<CreatePartnerDto>): Promise<any> {
    const response = await api.patch(`/admin/partners/${id}`, data);
    return response.data;
  }
}
