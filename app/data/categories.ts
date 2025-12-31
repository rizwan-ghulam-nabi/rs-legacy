// data/categories.ts
import { metadata } from '../layout';
import { Categories, Category, CategoryStats, FilterOptions } from '../types/category';

// Sample categories data with modern, diverse content
export const categories: Categories[] = [
  {
    id: 'cat_tech_gadgets',
    name: 'Tech Gadgets',
    slug: 'tech-gadgets',
    description: 'Cutting-edge technology and innovative gadgets that enhance your digital lifestyle. From smart home devices to wearable tech.',
    shortDescription: 'Latest tech innovations and smart devices',
    emoji: '📱',
    imageUrl: '/api/placeholder/400/300',
    coverImage: '/api/placeholder/1200/400',
    items: 248,
    curators: 42,
    rating: 4.8,
    growth: 24,
    tag: 'Trending',
    status: 'trending',
    colorScheme: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)'
    },
    featuredProducts: ['airpods-pro', 'smart-watch-pro', 'wireless-charger'],
    popularTags: ['Smart Home', 'Wearables', 'Wireless', 'AI', 'Portable'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-20'),
    metadata: {
      views: 12500,
      likes: 892,
      shares: 245,
      avgPrice: 299,
      minPrice: 49,
      maxPrice: 1299
    }
  },
  {
    id: 'cat_sustainable_fashion',
    name: 'Sustainable Fashion',
    slug: 'sustainable-fashion',
    description: 'Eco-friendly clothing and accessories made from sustainable materials. Ethical fashion that cares for the planet.',
    shortDescription: 'Eco-conscious fashion and accessories',
    emoji: '🌿',
    imageUrl: '/api/placeholder/400/300',
    coverImage: '/api/placeholder/1200/400',
    items: 156,
    curators: 28,
    rating: 4.7,
    growth: 18,
    tag: 'Sustainable',
    status: 'featured',
    colorScheme: {
      primary: '#10B981',
      secondary: '#059669',
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
    },
    featuredProducts: ['organic-cotton-tee', 'recycled-sneakers', 'bamboo-watch'],
    popularTags: ['Organic', 'Recycled', 'Ethical', 'Vegan', 'Biodegradable'],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-03-18'),
    metadata: {
      views: 8900,
      likes: 654,
      shares: 189,
      avgPrice: 89,
      minPrice: 25,
      maxPrice: 450
    }
  },
  {
    id: 'cat_home_decor',
    name: 'Home Decor',
    slug: 'home-decor',
    description: 'Transform your living space with beautiful and functional home decor items. From minimalist designs to cozy essentials.',
    shortDescription: 'Beautiful home furnishings and accents',
    emoji: '🏠',
    imageUrl: '/api/placeholder/400/300',
    coverImage: '/api/placeholder/1200/400',
    items: 312,
    curators: 56,
    rating: 4.6,
    growth: 15,
    tag: 'Popular',
    status: 'popular',
    colorScheme: {
      primary: '#F59E0B',
      secondary: '#D97706',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
    },
    featuredProducts: ['smart-lighting', 'cozy-blanket', 'art-prints'],
    popularTags: ['Minimalist', 'Cozy', 'Modern', 'Rustic', 'Smart Home'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-03-15'),
    metadata: {
      views: 15600,
      likes: 1102,
      shares: 312,
      avgPrice: 145,
      minPrice: 15,
      maxPrice: 1200
    }
  },
  {
    id: 'cat_fitness_gear',
    name: 'Fitness Gear',
    slug: 'fitness-gear',
    description: 'Premium fitness equipment and workout gear to elevate your exercise routine. From home gym essentials to outdoor training.',
    shortDescription: 'Workout equipment and athletic gear',
    emoji: '💪',
    imageUrl: '/api/placeholder/400/300',
    coverImage: '/api/placeholder/1200/400',
    items: 187,
    curators: 31,
    rating: 4.5,
    growth: 22,
    tag: 'New',
    status: 'new',
    colorScheme: {
      primary: '#EF4444',
      secondary: '#DC2626',
      gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
    },
    featuredProducts: ['smart-scale', 'resistance-bands', 'fitness-tracker'],
    popularTags: ['Home Gym', 'Cardio', 'Strength', 'Yoga', 'Outdoor'],
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-20'),
    metadata: {
      views: 7800,
      likes: 543,
      shares: 167,
      avgPrice: 125,
      minPrice: 20,
      maxPrice: 899
    }
  },
  {
    id: 'cat_gourmet_kitchen',
    name: 'Gourmet Kitchen',
    slug: 'gourmet-kitchen',
    description: 'Professional-grade kitchen tools and appliances for culinary enthusiasts. Elevate your cooking experience.',
    shortDescription: 'Premium kitchen tools and appliances',
    emoji: '👨‍🍳',
    imageUrl: '/api/placeholder/400/300',
    coverImage: '/api/placeholder/1200/400',
    items: 203,
    curators: 38,
    rating: 4.9,
    growth: 12,
    tag: 'Premium',
    status: 'featured',
    colorScheme: {
      primary: '#8B5CF6',
      secondary: '#7C3AED',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
    },
    featuredProducts: ['smart-oven', 'chef-knives', 'espresso-machine'],
    popularTags: ['Professional', 'Smart Kitchen', 'Baking', 'Coffee', 'Cookware'],
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-03-19'),
    metadata: {
      views: 9200,
      likes: 721,
      shares: 198,
      avgPrice: 210,
      minPrice: 35,
      maxPrice: 1500
    }
  },
  {
    id: 'cat_outdoor_adventure',
    name: 'Outdoor Adventure',
    slug: 'outdoor-adventure',
    description: 'Gear and equipment for outdoor enthusiasts. From camping essentials to hiking gear and adventure accessories.',
    shortDescription: 'Outdoor gear and adventure equipment',
    emoji: '⛰️',
    imageUrl: '/api/placeholder/400/300',
    coverImage: '/api/placeholder/1200/400',
    items: 165,
    curators: 27,
    rating: 4.7,
    growth: 19,
    tag: 'Limited',
    status: 'upcoming',
    colorScheme: {
      primary: '#059669',
      secondary: '#047857',
      gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)'
    },
    featuredProducts: ['camping-tent', 'hiking-backpack', 'portable-stove'],
    popularTags: ['Camping', 'Hiking', 'Travel', 'Durable', 'Waterproof'],
    createdAt: new Date('2024-02-28'),
    updatedAt: new Date('2024-03-18'),
    metadata: {
      views: 6700,
      likes: 489,
      shares: 156,
      avgPrice: 180,
      minPrice: 30,
      maxPrice: 850
    }
  },
  {
    id: 'cat_wellness_selfcare',
    name: 'Wellness & Self-Care',
    slug: 'wellness-selfcare',
    description: 'Products for mental and physical well-being. From meditation tools to skincare and relaxation essentials.',
    shortDescription: 'Self-care and wellness products',
    emoji: '🧘',
    imageUrl: '/api/placeholder/400/300',
    coverImage: '/api/placeholder/1200/400',
    items: 198,
    curators: 34,
    rating: 4.8,
    growth: 26,
    tag: 'Trending',
    status: 'trending',
    colorScheme: {
      primary: '#EC4899',
      secondary: '#DB2777',
      gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)'
    },
    featuredProducts: ['smart-massager', 'aroma-diffuser', 'skincare-kit'],
    popularTags: ['Meditation', 'Skincare', 'Relaxation', 'Aromatherapy', 'Mindfulness'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-03-20'),
    metadata: {
      views: 10500,
      likes: 832,
      shares: 287,
      avgPrice: 95,
      minPrice: 20,
      maxPrice: 450
    }
  },
  {
    id: 'cat_smart_office',
    name: 'Smart Office',
    slug: 'smart-office',
    description: 'Modern office equipment and productivity tools for remote work and home offices. Ergonomic and tech-forward solutions.',
    shortDescription: 'Modern office and productivity tools',
    emoji: '💼',
    imageUrl: '/api/placeholder/400/300',
    coverImage: '/api/placeholder/1200/400',
    items: 176,
    curators: 29,
    rating: 4.6,
    growth: 21,
    tag: 'New',
    status: 'new',
    colorScheme: {
      primary: '#6366F1',
      secondary: '#4F46E5',
      gradient: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)'
    },
    featuredProducts: ['ergonomic-chair', 'dual-monitor', 'noise-cancelling'],
    popularTags: ['Ergonomic', 'Productivity', 'Remote Work', 'Desk Setup', 'Organization'],
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-20'),
    metadata: {
      views: 8300,
      likes: 598,
      shares: 176,
      avgPrice: 320,
      minPrice: 45,
      maxPrice: 1200
    }
  },
  {
    id: 'cat_photography',
    name: 'Photography',
    slug: 'photography',
    description: 'Professional photography equipment and accessories. From cameras to lenses and studio lighting.',
    shortDescription: 'Camera gear and photography equipment',
    emoji: '📸',
    imageUrl: '/api/placeholder/400/300',
    coverImage: '/api/placeholder/1200/400',
    items: 134,
    curators: 23,
    rating: 4.9,
    growth: 14,
    tag: 'Premium',
    status: 'popular',
    colorScheme: {
      primary: '#000000',
      secondary: '#374151',
      gradient: 'linear-gradient(135deg, #000000 0%, #374151 100%)'
    },
    featuredProducts: ['mirrorless-camera', 'studio-lights', 'camera-lens'],
    popularTags: ['Professional', 'Mirrorless', 'DSLR', 'Lenses', 'Studio'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-03-17'),
    metadata: {
      views: 7200,
      likes: 654,
      shares: 143,
      avgPrice: 850,
      minPrice: 150,
      maxPrice: 3500
    }
  },
  {
    id: 'cat_gaming_esports',
    name: 'Gaming & eSports',
    slug: 'gaming-esports',
    description: 'High-performance gaming gear and accessories. From gaming PCs to peripherals and streaming equipment.',
    shortDescription: 'Gaming hardware and accessories',
    emoji: '🎮',
    imageUrl: '/api/placeholder/400/300',
    coverImage: '/api/placeholder/1200/400',
    items: 221,
    curators: 41,
    rating: 4.7,
    growth: 28,
    tag: 'Trending',
    status: 'trending',
    colorScheme: {
      primary: '#F97316',
      secondary: '#EA580C',
      gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)'
    },
    featuredProducts: ['gaming-pc', 'mechanical-keyboard', 'gaming-mouse'],
    popularTags: ['PC Gaming', 'Consoles', 'Streaming', 'Peripherals', 'RGB'],
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-03-20'),
    metadata: {
      views: 14800,
      likes: 987,
      shares: 321,
      avgPrice: 450,
      minPrice: 50,
      maxPrice: 2500
    }
  },
  {
    id: 'cat_pet_essentials',
    name: 'Pet Essentials',
    slug: 'pet-essentials',
    description: 'Premium products for your furry friends. From smart pet tech to comfortable beds and healthy treats.',
    shortDescription: 'Pet care products and accessories',
    emoji: '🐶',
    imageUrl: '/api/placeholder/400/300',
    coverImage: '/api/placeholder/1200/400',
    items: 189,
    curators: 32,
    rating: 4.8,
    growth: 17,
    tag: 'Popular',
    status: 'popular',
    colorScheme: {
      primary: '#F59E0B',
      secondary: '#D97706',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
    },
    featuredProducts: ['smart-feeder', 'pet-camera', 'orthopedic-bed'],
    popularTags: ['Smart Tech', 'Comfort', 'Toys', 'Health', 'Grooming'],
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-03-19'),
    metadata: {
      views: 6900,
      likes: 532,
      shares: 189,
      avgPrice: 85,
      minPrice: 15,
      maxPrice: 400
    }
  },
  {
    id: 'cat_artisan_crafts',
    name: 'Artisan Crafts',
    slug: 'artisan-crafts',
    description: 'Handcrafted goods from talented artisans worldwide. Unique pieces with traditional craftsmanship.',
    shortDescription: 'Handmade artisan goods and crafts',
    emoji: '🎨',
    imageUrl: '/api/placeholder/400/300',
    coverImage: '/api/placeholder/1200/400',
    items: 167,
    curators: 25,
    rating: 4.9,
    growth: 13,
    tag: 'Limited Edition',
    status: 'featured',
    colorScheme: {
      primary: '#A855F7',
      secondary: '#9333EA',
      gradient: 'linear-gradient(135deg, #A855F7 0%, #9333EA 100%)'
    },
    featuredProducts: ['handmade-pottery', 'artisan-jewelry', 'woven-basket'],
    popularTags: ['Handmade', 'Traditional', 'Unique', 'Cultural', 'Sustainable'],
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-03-18'),
    metadata: {
      views: 5800,
      likes: 432,
      shares: 156,
      avgPrice: 120,
      minPrice: 20,
      maxPrice: 600
    }
  }
];

// Additional categories for variety
export const additionalCategories: Categories[] = [
  {
    id: 'cat_audio_equipment',
    name: 'Audio Equipment',
    slug: 'audio-equipment',
    description: 'High-fidelity audio gear for music lovers and audiophiles. From headphones to speakers and recording equipment.',
    shortDescription: 'Premium audio gear and equipment',
    emoji: '🎧',
    imageUrl: '/api/placeholder/400/300',
    coverImage: '/api/placeholder/1200/400',
    items: 154,
    curators: 26,
    rating: 4.7,
    growth: 16,
    tag: 'Premium',
    status: 'popular',
    colorScheme: {
      primary: '#6B7280',
      secondary: '#4B5563',
      gradient: 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)'
    },
    featuredProducts: ['wireless-headphones', 'studio-monitors', 'turntable'],
    popularTags: ['Hi-Fi', 'Wireless', 'Studio', 'Portable', 'Noise-Cancelling'],
    createdAt: new Date('2024-02-12'),
    updatedAt: new Date('2024-03-19'),
    metadata: {
      views: 7400,
      likes: 587,
      shares: 167,
      avgPrice: 280,
      minPrice: 40,
      maxPrice: 1500
    }
  },
  {
    id: 'cat_travel_essentials',
    name: 'Travel Essentials',
    slug: 'travel-essentials',
    description: 'Smart travel gear and accessories for modern travelers. Lightweight, durable, and innovative solutions.',
    shortDescription: 'Travel gear and smart accessories',
    emoji: '✈️',
    imageUrl: '/api/placeholder/400/300',
    coverImage: '/api/placeholder/1200/400',
    items: 142,
    curators: 24,
    rating: 4.6,
    growth: 20,
    tag: 'New',
    status: 'new',
    colorScheme: {
      primary: '#0EA5E9',
      secondary: '#0284C7',
      gradient: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)'
    },
    featuredProducts: ['smart-luggage', 'travel-adapter', 'neck-pillow'],
    popularTags: ['Smart Travel', 'Compact', 'Durable', 'Organized', 'Multifunctional'],
    createdAt: new Date('2024-03-08'),
    updatedAt: new Date('2024-03-20'),
    metadata: {
      views: 6100,
      likes: 456,
      shares: 143,
      avgPrice: 110,
      minPrice: 25,
      maxPrice: 700
    }
  }
];

// Function to get all categories
export async function getCategories(filters?: FilterOptions): Promise<Categories[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredCategories = [...categories, ...additionalCategories];
  
  if (filters) {
    // Apply filters
    if (filters.priceRange) {
      filteredCategories = filteredCategories.filter(cat => 
        cat.metadata.avgPrice >= filters.priceRange![0] && 
        cat.metadata.avgPrice <= filters.priceRange![1]
      );
    }
    
    if (filters.rating > 0) {
      filteredCategories = filteredCategories.filter(cat => cat.rating >= filters.rating!);
    }
    
    if (filters.status && filters.status.length > 0) {
      filteredCategories = filteredCategories.filter(cat => 
        filters.status!.includes(cat.status)
      );
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'newest':
        filteredCategories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        filteredCategories.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filteredCategories.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'growth':
        filteredCategories.sort((a, b) => b.growth - a.growth);
        break;
      case 'popularity':
      default:
        filteredCategories.sort((a, b) => b.metadata.views - a.metadata.views);
        break;
    }
  }
  return filteredCategories;
  
}

// Function to get trending categories
export async function getTrendingCategories(): Promise<Categories[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return [...categories]
    .filter(cat => cat.status === 'trending' || cat.growth > 20)
    .sort((a, b) => b.growth - a.growth)
    .slice(0, 6);
}

// Function to get category stats
export async function getCategoryStats(): Promise<CategoryStats> {
  await new Promise(resolve => setTimeout(resolve, 150));
  
  const allCategories = [...categories, ...additionalCategories];
  
  return {
    total: allCategories.length,
    trending: allCategories.filter(cat => cat.status === 'trending').length,
    new: allCategories.filter(cat => cat.status === 'new').length,
    users: allCategories.reduce((sum, cat) => sum + cat.curators, 0),
    growthRate: Math.round(allCategories.reduce((sum, cat) => sum + cat.growth, 0) / allCategories.length),
    avgRating: Number((allCategories.reduce((sum, cat) => sum + cat.rating, 0) / allCategories.length).toFixed(1)),
    totalProducts: allCategories.reduce((sum, cat) => sum + cat.items, 0),
    topCategories: allCategories
      .sort((a, b) => b.metadata.views - a.metadata.views)
      .slice(0, 3)
      .map(cat => cat.name)
  };
}

// Function to get single category by slug
export async function getCategoryBySlug(slug: string): Promise<Categories | null> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const allCategories = [...categories, ...additionalCategories];
  return allCategories.find(cat => cat.slug === slug) || null;
}

// Function to get related categories
export async function getRelatedCategories(categoryId: string): Promise<Categories[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const allCategories = [...categories, ...additionalCategories];
  const currentCategory = allCategories.find(cat => cat.id === categoryId);
  
  if (!currentCategory) return [];
  
  return allCategories
    .filter(cat => 
      cat.id !== categoryId && 
      (cat.status === currentCategory.status || 
       cat.popularTags.some(tag => currentCategory.popularTags.includes(tag)))
    )
    .slice(0, 4);
}

// Function to search categories
export async function searchCategories(query: string): Promise<Categories[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const allCategories = [...categories, ...additionalCategories];
  const searchTerm = query.toLowerCase();
  
  return allCategories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm) ||
    cat.description.toLowerCase().includes(searchTerm) ||
    cat.shortDescription.toLowerCase().includes(searchTerm) ||
    cat.popularTags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

// Function to get categories by tag
export async function getCategoriesByTag(tag: string): Promise<Categories[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const allCategories = [...categories, ...additionalCategories];
  return allCategories.filter(cat => 
    cat.tag.toLowerCase() === tag.toLowerCase() ||
    cat.popularTags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

// Function to get popular tags
export async function getPopularTags(): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 150));
  
  const allCategories = [...categories, ...additionalCategories];
  const tagCount: Record<string, number> = {};
  
  allCategories.forEach(cat => {
    cat.popularTags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([tag]) => tag);
}