import { ApiResponse, ServicePackage } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

/**
 * Base fetcher function for API calls
 */
async function fetcher<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * API service object containing all specific API calls
 */
export const api = {
  // Service Packages
  getServicePackages: () => 
    fetcher<ApiResponse<ServicePackage[]>>('/service-packages', {
      next: { revalidate: 3600 } // Cache for 1 hour by default (adjust as needed)
    }),

  // Add other API calls here as they are developed
  // getAbout: () => fetcher<ApiResponse<AboutData>>('/about'),
  // getPortfolio: () => fetcher<ApiResponse<PortfolioItem[]>>('/portfolio'),
  // postContact: (data: any) => fetcher('/contact', { method: 'POST', body: JSON.stringify(data) }),
};
