// ─── Service ──────────────────────────────────────────────────────────────────

export interface ServiceCategory {
  id: number;
  categoryName: string;
  isActive: boolean;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServicePackage {
  id: number;
  categoryId: number;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  imageUrl: string | null;
  benefits: string[];
  isActive: boolean;
  popularity: string;
  price: string;
  isFeatured: boolean;
  category: ServiceCategory;
  createdAt: string;
  updatedAt: string;
}

// ─── Image Gallery ──────────────────────────────────────────────────────────────

export interface ImageType {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  createdAt?: string;
}

export interface ImageGallery {
  id: number;
  image_type_id: number;
  image_name: string;
  description: string | null;
  upload_image: string | null;
  is_active: boolean;
  image_type: ImageType | null;
  created_at?: string;
  updated_at?: string;
}

// ─── Project building blocks ───────────────────────────────────────────────────

export interface ProjectType {
  id: number;
  name: string;
  slug: string;
  description: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface District {
  id: number;
  name: string;
  state?: string;
  country?: string;
  createdAt?: string;
}

export interface Amenity {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  createdAt?: string;
}

export interface OfficeBranch {
  id: number;
  name: string;
  image: string | null;
  image_url: string | null;
  location: string | null;
  address: string | null;
  email: string | null;
  phone: string | null;
  description: string | null;
  map_url: string | null;
  is_active: boolean;
  created_at?: string;
}

export interface ProjectImage {
  id: number;
  projectId: number;
  imageType?: { id: number; name: string } | null;
  fileUrl: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder?: number;
  createdAt?: string;
}

export interface ProjectRoomImage {
  id: number;
  project_room_id: number;
  image_name: string | null;
  fileUrl: string | null;
  altText: string | null;
  imageDetails: Record<string, string> | null;
  isPrimary: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoomType {
  id: number;
  roomTypeName: string;
  isActive?: boolean;
  primaryImage?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectRoom {
  id: number;
  projectId: number;
  roomTypeId: number;
  details: Record<string, string> | null;
  description: string | null;
  roomType: RoomType | null;
  images: ProjectRoomImage[];
  primaryImage: ProjectRoomImage | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectProgress {
  id: number;
  projectId: number;
  title: string;
  description: string | null;
  progressDate: string | null;
  status: string;
  createdAt?: string;
}

export interface ProjectVideo {
  id: number;
  videoUrl: string;
  title: string | null;
  platform: string;
  thumbnail: string | null;
  createdAt?: string;
}

export interface ProjectDocument {
  id: number;
  documentName: string;
  filePath: string;
  documentType: string;
  createdAt?: string;
}

export interface ProjectOwner {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  createdAt?: string;
}

// ─── Project ──────────────────────────────────────────────────────────────────

export interface Project {
  id: number;
  projectName: string;
  slug: string;
  description: string;
  projectLocation: string | null;
  address: string | null;
  latitude: string | null;
  longitude: string | null;
  projectStartDate: string | null;
  projectCompletionDate: string | null;
  numberOfRooms: number | null;
  numberOfFloors: number | null;
  numberOfWashrooms: number | null;
  totalArea: string | null;
  carpetArea: string | null;
  areaUnit: string | null;
  status: string;
  isActive: boolean;
  isFeatured: boolean;
  isCompleted: boolean;
  isWorking: boolean;
  createdAt: string;
  updatedAt?: string;
  // Relations
  projectType: ProjectType | null;
  district: District | null;
  serviceCategory: ServiceCategory | null;
  servicePackage: ServicePackage | null;
  primaryImage: ProjectImage | null;
  images: ProjectImage[];
  documents: ProjectDocument[];
  owners: ProjectOwner[];
  amenities: Amenity[];
  progress: ProjectProgress[];
  videos: ProjectVideo[];
  rooms: ProjectRoom[];
}

// ─── Shared ───────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: boolean;
  links?: Record<string, string | null>;
  meta?: Record<string, unknown>;
}
