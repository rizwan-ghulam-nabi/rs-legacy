// products sections
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  brand: string;
  sku: string;
  inStock: boolean;
  features: string[];
  specifications: Record<string, string>;
  rating: number;
  reviewCount: number;
  colors?: string[];
  sizes?: string[];
  image?:string,
  reviews:number,

}

export interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface CartItem {
  productId: number;
  quantity: number;
  color?: string;
  size?: string;
 
}



// categories section
// types/product.ts
export interface Products {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  categoryIds: string[];
  tags: string[];
  status: 'in-stock' | 'out-of-stock' | 'limited' | 'pre-order';
  metadata: {
    weight?: number;
    dimensions?: string;
    color?: string;
    material?: string;
    brand?: string;
    sku: string;
  };
  features: string[];
  specifications: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
  relatedProducts: string[];
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  stock: number;
  attributes: Record<string, string>;
  sku: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title?: string;
  comment: string;
  verifiedPurchase: boolean;
  helpful: number;
  images?: string[];
  createdAt: Date;
}