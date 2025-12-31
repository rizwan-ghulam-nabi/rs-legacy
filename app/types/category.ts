// types/category.ts
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  coverImage?: string;
  icon?: string;
  color?: string;
  gradient?: string;
  parentId?: string | null;
  subcategories?: Category[];
  productCount: number;
  isFeatured: boolean;
  isActive: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
 
}

export interface CategoryFilters {
  search: string;
  isFeatured: boolean | null;
  sortBy: 'name' | 'productCount' | 'newest';
  tags: string[];
}


//  for categories 
// types/category.ts
export interface Categories {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  emoji: string;
  imageUrl: string;
  coverImage: string;
  items: number;
  curators: number;
  rating: number;
  growth: number; // percentage growth
  tag: string;
  status: 'trending' | 'new' | 'popular' | 'featured' | 'upcoming';
  colorScheme: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  featuredProducts: string[];
  popularTags: string[];
  createdAt: Date;
  updatedAt: Date;
  metadata: {
    views: number;
    likes: number;
    shares: number;
    avgPrice: number;
    minPrice: number;
    maxPrice: number;
  };
}

export interface CategoryStats {
  total: number;
  trending: number;
  new: number;
  users: number;
  growthRate: number;
  avgRating: number;
  totalProducts: number;
  topCategories: string[];
}

export interface FilterOptions {
  priceRange: [number, number];
  tags: string[];
  rating: number;
  status: string[];
  sortBy: 'popularity' | 'newest' | 'rating' | 'name' | 'growth';
}


