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

export interface ProjectType {
  id: number;
  name: string;
  slug: string;
  description: string;
  status: string;
}

export interface ProjectImage {
  id: number;
  projectId: number;
  fileUrl: string;
  altText: string;
  isPrimary: boolean;
}

export interface Project {
  id: number;
  projectName: string;
  slug: string;
  description: string;
  isActive: boolean;
  isFeatured: boolean;
  projectType: ProjectType;
  primaryImage: ProjectImage | null;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: boolean;
  links?: any;
  meta?: any;
}
