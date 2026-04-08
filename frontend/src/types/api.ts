export interface ServiceCategory {
  id: number;
  category_name: string;
  is_active: boolean;
  type: string;
  createdAt: string;
}

export interface ServicePackage {
  id: number;
  title: string;
  slug: string;
  description: string;
  benefits: string[];
  is_active: boolean;
  popularity: string;
  price: string;
  is_featured: boolean;
  category: ServiceCategory;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: boolean;
}
