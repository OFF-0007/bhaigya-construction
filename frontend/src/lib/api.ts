import { ApiResponse, ServicePackage, Project, ImageGallery, ImageType } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://bc-control.bhaigyaconstruction.com/api/v1';

async function fetcher<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  // ─── Service Packages ──────────────────────────────────────────────────────
  getServicePackages: () =>
    fetcher<ApiResponse<ServicePackage[]>>('/service-packages', {
      next: { revalidate: 3600 },
    }),

  getServicePackageBySlug: (slug: string) =>
    fetcher<ApiResponse<ServicePackage>>(`/service-packages/slug/${slug}`, {
      next: { revalidate: 3600 },
    }),

  getServicePackageById: (id: number) =>
    fetcher<ApiResponse<ServicePackage>>(`/service-packages/${id}`, {
      next: { revalidate: 3600 },
    }),

  // ─── Projects ──────────────────────────────────────────────────────────────
  getProjects: () =>
    fetcher<ApiResponse<Project[]>>('/projects', {
      next: { revalidate: 0 },
    }),

  getProjectBySlug: (slug: string) =>
    fetcher<ApiResponse<Project>>(`/projects/slug/${slug}`, {
      next: { revalidate: 0 },
    }),

  getProjectById: (id: number) =>
    fetcher<ApiResponse<Project>>(`/projects/${id}`, {
      next: { revalidate: 0 },
    }),

  // ─── Image Gallery ───────────────────────────────────────────────────────────
  getGallery: (imageTypeId?: number) => {
    const url = imageTypeId ? `/gallery?image_type_id=${imageTypeId}` : '/gallery';
    return fetcher<ApiResponse<ImageGallery[]>>(url, {
      next: { revalidate: 300 },
    });
  },

  getImageTypes: () =>
    fetcher<ApiResponse<ImageType[]>>('/image-types', {
      next: { revalidate: 300 },
    }),

  getOfficeBranches: () =>
    fetcher<ApiResponse<import('@/types/api').OfficeBranch[]>>('/office-branches', {
      next: { revalidate: 0 },
    }),
};
