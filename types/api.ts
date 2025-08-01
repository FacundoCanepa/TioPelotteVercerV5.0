export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ApiError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface StrapiEntity {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}