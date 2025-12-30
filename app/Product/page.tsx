// app/products/page.tsx
"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Filter, Grid, List, Heart, 
  Star, ChevronDown, X, SlidersHorizontal,
  Menu
} from "lucide-react";
import Image from "next/image";
import AddToCart from "../components/AddToCart";
import { productService, Product } from "../services/productService";
import { useRouter, useSearchParams } from "next/navigation";

// Currency conversion utility
const USD_TO_PKR = 280;

const convertToPKR = (usdPrice: number): number => {
  return Math.round(usdPrice * USD_TO_PKR);
};

const formatPKR = (amount: number): string => {
  return `Rs ${amount.toLocaleString('en-PK')}`;
};

// Memoize static data with PKR prices
const filters = {
  price: [
    { label: "Under Rs 7,000", value: "0-7000" },
    { label: "Rs 7,000 - Rs 14,000", value: "7000-14000" },
    { label: "Rs 14,000 - Rs 28,000", value: "14000-28000" },
    { label: "Over Rs 28,000", value: "28000-280000" }
  ],
  rating: [
    { label: "4+ Stars", value: "4" },
    { label: "3+ Stars", value: "3" },
    { label: "2+ Stars", value: "2" }
  ]
} as const;

// Debounce hook for search
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Optimized product card component with improved responsive design
const ProductCard = React.memo(({ 
  product, 
  viewMode, 
  index,
  isFavorite,
  onToggleFavorite,
  onProductClick
}: { 
  product: Product;
  viewMode: "grid" | "list";
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onProductClick: (product: Product) => void;
}) => {
  const handleFavorite = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
  }, [product.id, onToggleFavorite]);

  const handleClick = useCallback(() => {
    onProductClick(product);
  }, [product, onProductClick]);

  // Convert prices to PKR
  const pricePKR = convertToPKR(product.price);
  const originalPricePKR = convertToPKR(product.originalPrice);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`
        group bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 
        hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer
        ${viewMode === "list" ? "lg:flex-row lg:gap-4" : ""}
        w-full h-full
      `}
      onClick={handleClick}
    >
      {/* Image Container - Improved responsive design */}
      <div className={`
        relative overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0
        ${viewMode === "list" 
          ? "lg:w-48 lg:h-48 xl:w-56 xl:h-56 w-full aspect-square" 
          : "w-full aspect-square"
        }
      `}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className="w-full h-full object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-700"
          priority={index < 8}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk8eDdGW4PwswwS2MpICcnNcbSM1CI9kHq6r+9Bw5IeiMjCwugjHn//Z"
        />
        
        {/* Favorite Button - Responsive sizing */}
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white/90 dark:bg-gray-800/90 rounded-full backdrop-blur-sm hover:scale-110 transition-transform shadow-lg"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-600 hover:text-red-500"
            }`}
          />
        </button>

        {/* Badges - Responsive sizing */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 sm:gap-2">
          {product.isNew && (
            <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
              New
            </span>
          )}
          {product.isFeatured && (
            <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-purple-500 text-white text-xs font-semibold rounded-full shadow-lg">
              Featured
            </span>
          )}
          {product.originalPrice > product.price && (
            <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-red-500 text-white text-xs font-semibold rounded-full shadow-lg">
              Sale
            </span>
          )}
        </div>

        {/* Overlay Add to Cart - Improved mobile visibility */}
        <div 
          className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 opacity-0 lg:group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <AddToCart 
            product={{
              id: product.id,
              name: product.name,
              price: pricePKR,
              image: product.image,
              currency: "PKR",
              size:"sm"
            }}
            size="sm"
          />
        </div>
      </div>

      {/* Content - Improved responsive spacing */}
      <div className={`flex-1 flex flex-col ${viewMode === "list" ? "lg:p-4 p-3" : "p-3 sm:p-4"}`}>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base line-clamp-2 mb-2 leading-tight">
            {product.name}
          </h3>

          {/* Rating - Responsive sizing */}
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <div className="flex items-center gap-0.5 sm:gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              ({product.reviews > 1000 ? `${(product.reviews/1000).toFixed(1)}k` : product.reviews})
            </span>
          </div>
        </div>

        {/* Price & Bottom CTA - Improved mobile layout */}
        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              {formatPKR(pricePKR)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-500 line-through">
                {formatPKR(originalPricePKR)}
              </span>
            )}
          </div>
          
          {/* Default Add to Cart - Always visible on mobile */}
          <div 
            className="lg:group-hover:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <AddToCart 
              product={{
                id: product.id,
                name: product.name,
                price: pricePKR,
                image: product.image,
                currency: "PKR",
                size:"sm"
              }}
              size="md"
              // variant="icon"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

// Optimized filter components
const PriceFilter = React.memo(({ 
  selectedFilters, 
  onToggleFilter 
}: { 
  selectedFilters: string[];
  onToggleFilter: (type: 'price', value: string) => void;
}) => (
  <div>
    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">Price Range</h3>
    <div className="space-y-2">
      {filters.price.map(option => (
        <label key={option.value} className="flex items-center gap-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
          <input
            type="checkbox"
            checked={selectedFilters.includes(option.value)}
            onChange={() => onToggleFilter('price', option.value)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 sm:w-5 sm:h-5"
          />
          {option.label}
        </label>
      ))}
    </div>
  </div>
));

PriceFilter.displayName = 'PriceFilter';

const RatingFilter = React.memo(({ 
  selectedFilters, 
  onToggleFilter 
}: { 
  selectedFilters: string[];
  onToggleFilter: (type: 'rating', value: string) => void;
}) => (
  <div>
    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">Rating</h3>
    <div className="space-y-2">
      {filters.rating.map(option => (
        <label key={option.value} className="flex items-center gap-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
          <input
            type="checkbox"
            checked={selectedFilters.includes(option.value)}
            onChange={() => onToggleFilter('rating', option.value)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 sm:w-5 sm:h-5"
          />
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < parseInt(option.value)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span>& up</span>
          </div>
        </label>
      ))}
    </div>
  </div>
));

RatingFilter.displayName = 'RatingFilter';

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{id: string, name: string, count: number}[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    price: [] as string[],
    rating: [] as string[]
  });
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle URL parameters
  useEffect(() => {
    const categoryParam = searchParams?.get('category');
    
    if (categoryParam) {
      switch (categoryParam) {
        case 'new-arrivals':
          setSelectedCategory('new-arrivals');
          break;
        case 'best-sellers':
          setSelectedCategory('best-sellers');
          break;
        case 'sale':
          setSelectedCategory('sale');
          break;
        default:
          setSelectedCategory('all');
      }
    }
  }, [searchParams]);

  // Load data
  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productService.getProducts(),
          productService.getCategories()
        ]);
        
        if (mounted) {
          setProducts(productsData);
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  // Update URL when category changes
  useEffect(() => {
    if (selectedCategory !== 'all') {
      let categoryParam = '';
      
      switch (selectedCategory) {
        case 'new-arrivals':
          categoryParam = 'new-arrivals';
          break;
        case 'best-sellers':
          categoryParam = 'best-sellers';
          break;
        case 'sale':
          categoryParam = 'sale';
          break;
        default:
          categoryParam = selectedCategory;
      }
      
      if (categoryParam) {
        const newUrl = `/Product?category=${categoryParam}`;
        window.history.replaceState(null, '', newUrl);
      }
    } else {
      window.history.replaceState(null, '', '/Product');
    }
  }, [selectedCategory]);

  // Product click handler
  const handleProductClick = useCallback((product: Product) => {
    router.push(`/products/${product.id}`);
  }, [router]);

  // Memoized filtered products with special category handling
  const filteredProducts = useMemo(() => {
    if (isLoading) return [];

    let filtered = products;

    // Special category filters
    if (selectedCategory === "new-arrivals") {
      filtered = filtered.filter(product => product.isNew);
    } else if (selectedCategory === "best-sellers") {
      filtered = filtered.filter(product => product.rating >= 4.5 && product.reviews > 100);
    } else if (selectedCategory === "sale") {
      filtered = filtered.filter(product => product.originalPrice > product.price);
    } 
    // Regular category filter
    else if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Search filter
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query)
      );
    }

    // Price filter
    if (selectedFilters.price.length > 0) {
      filtered = filtered.filter(product => {
        const pricePKR = convertToPKR(product.price);
        return selectedFilters.price.some(priceRange => {
          const [min, max] = priceRange.split('-').map(Number);
          return pricePKR >= min && pricePKR <= max;
        });
      });
    }

    // Rating filter
    if (selectedFilters.rating.length > 0) {
      filtered = filtered.filter(product => {
        return selectedFilters.rating.some(rating => 
          product.rating >= parseInt(rating)
        );
      });
    }

    // Sorting
    return filtered.sort((a, b) => {
      const priceAPKR = convertToPKR(a.price);
      const priceBPKR = convertToPKR(b.price);
      
      switch (sortBy) {
        case "price-low": return priceAPKR - priceBPKR;
        case "price-high": return priceBPKR - priceAPKR;
        case "rating": return b.rating - a.rating;
        default: return a.id - b.id;
      }
    });
  }, [products, selectedCategory, debouncedSearchQuery, selectedFilters, sortBy, isLoading]);

  // Group products by category
  const groupedProducts = useMemo(() => {
    if (selectedCategory !== "all" && selectedCategory !== "new-arrivals" && 
        selectedCategory !== "best-sellers" && selectedCategory !== "sale") {
      return [{ category: selectedCategory, products: filteredProducts }];
    }

    // For special categories
    if (selectedCategory === "new-arrivals" || selectedCategory === "best-sellers" || selectedCategory === "sale") {
      let categoryName = "";
      switch (selectedCategory) {
        case "new-arrivals":
          categoryName = "New Arrivals";
          break;
        case "best-sellers":
          categoryName = "Best Sellers";
          break;
        case "sale":
          categoryName = "Sale Items";
          break;
        default:
          categoryName = "Products";
      }
      return [{ category: categoryName, products: filteredProducts }];
    }

    // Default: group by category when showing all products
    const groups = filteredProducts.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);

    return Object.entries(groups).map(([category, products]) => ({
      category,
      products
    }));
  }, [filteredProducts, selectedCategory]);

  // Optimized event handlers
  const toggleFavorite = useCallback((productId: number) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const toggleFilter = useCallback((type: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedFilters({ price: [], rating: [] });
    setSearchQuery("");
    setSelectedCategory("all");
  }, []);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  const activeFilterCount = selectedFilters.price.length + selectedFilters.rating.length;

  // Get display name for current category
  const getCurrentCategoryName = useCallback(() => {
    switch (selectedCategory) {
      case 'new-arrivals':
        return 'New Arrivals';
      case 'best-sellers':
        return 'Best Sellers';
      case 'sale':
        return 'Sale Items';
      case 'all':
        return 'All Products';
      default:
        return categories.find(c => c.id === selectedCategory)?.name || 'Products';
    }
  }, [selectedCategory, categories]);

  // Get product counts for special categories
  const getCategoryCounts = useCallback(() => {
    return {
      newArrivals: products.filter(p => p.isNew).length,
      bestSellers: products.filter(p => p.rating >= 4.5 && p.reviews > 100).length,
      saleItems: products.filter(p => p.originalPrice > p.price).length
    };
  }, [products]);

  const categoryCounts = getCategoryCounts();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header - Improved mobile responsiveness */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(true)}
                className="lg:hidden p-2 text-gray-600 dark:text-gray-400"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {getCurrentCategoryName()}
              </h1>
              
              {/* Categories - Hidden on mobile */}
              <div className="hidden lg:flex items-center gap-4 lg:gap-6">
                {/* All Products */}
                <button
                  onClick={() => handleCategorySelect("all")}
                  className={`relative py-2 text-sm font-medium transition-colors ${
                    selectedCategory === "all"
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  All Products
                  {selectedCategory === "all" && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white"
                    />
                  )}
                </button>

                {/* New Arrivals */}
                <button
                  onClick={() => handleCategorySelect("new-arrivals")}
                  className={`relative py-2 text-sm font-medium transition-colors ${
                    selectedCategory === "new-arrivals"
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  New Arrivals
                  <span className="ml-1 text-xs text-gray-400">
                    ({categoryCounts.newArrivals})
                  </span>
                  {selectedCategory === "new-arrivals" && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white"
                    />
                  )}
                </button>

                {/* Best Sellers */}
                <button
                  onClick={() => handleCategorySelect("best-sellers")}
                  className={`relative py-2 text-sm font-medium transition-colors ${
                    selectedCategory === "best-sellers"
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Best Sellers
                  <span className="ml-1 text-xs text-gray-400">
                    ({categoryCounts.bestSellers})
                  </span>
                  {selectedCategory === "best-sellers" && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white"
                    />
                  )}
                </button>

                {/* Sale Items */}
                <button
                  onClick={() => handleCategorySelect("sale")}
                  className={`relative py-2 text-sm font-medium transition-colors ${
                    selectedCategory === "sale"
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Sale
                  <span className="ml-1 text-xs text-gray-400">
                    ({categoryCounts.saleItems})
                  </span>
                  {selectedCategory === "sale" && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white"
                    />
                  )}
                </button>

                {/* Regular categories */}
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`relative py-2 text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    {category.name}
                    {category.count > 0 && (
                      <span className="ml-1 text-xs text-gray-400">
                        ({category.count})
                      </span>
                    )}
                    {selectedCategory === category.id && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls - Improved mobile layout */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Search */}
              <div className="lg:hidden relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-28 sm:w-32 pl-9 pr-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-1.5 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 sm:p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 sm:p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
              </div>

              {/* Filters */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="space-y-6">
                  <PriceFilter 
                    selectedFilters={selectedFilters.price}
                    onToggleFilter={toggleFilter}
                  />
                  <RatingFilter 
                    selectedFilters={selectedFilters.rating}
                    onToggleFilter={toggleFilter}
                  />

                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Categories - Improved scrolling */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 lg:mb-6 lg:hidden scrollbar-hide">
              {/* All Products */}
              <button
                onClick={() => handleCategorySelect("all")}
                className={`flex-shrink-0 px-3 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === "all"
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md"
                    : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 shadow-sm hover:shadow-md"
                }`}
              >
                All
              </button>

              {/* New Arrivals */}
              <button
                onClick={() => handleCategorySelect("new-arrivals")}
                className={`flex-shrink-0 px-3 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === "new-arrivals"
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md"
                    : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 shadow-sm hover:shadow-md"
                }`}
              >
                New
                <span className="ml-1 text-xs opacity-75">
                  {categoryCounts.newArrivals}
                </span>
              </button>

              {/* Best Sellers */}
              <button
                onClick={() => handleCategorySelect("best-sellers")}
                className={`flex-shrink-0 px-3 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === "best-sellers"
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md"
                    : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 shadow-sm hover:shadow-md"
                }`}
              >
                Best
                <span className="ml-1 text-xs opacity-75">
                  {categoryCounts.bestSellers}
                </span>
              </button>

              {/* Sale Items */}
              <button
                onClick={() => handleCategorySelect("sale")}
                className={`flex-shrink-0 px-3 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === "sale"
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md"
                    : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 shadow-sm hover:shadow-md"
                }`}
              >
                Sale
                <span className="ml-1 text-xs opacity-75">
                  {categoryCounts.saleItems}
                </span>
              </button>

              {/* Regular categories */}
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`flex-shrink-0 px-3 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md"
                      : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 shadow-sm hover:shadow-md"
                  }`}
                >
                  {category.name.length > 12 ? `${category.name.substring(0, 12)}...` : category.name}
                  {category.count > 0 && (
                    <span className="ml-1 text-xs opacity-75">
                      {category.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Sort Bar - Improved mobile layout */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 lg:mb-6">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                {selectedCategory !== "all" && ` in ${getCurrentCategoryName()}`}
              </p>
              
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 w-full sm:w-auto">
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs sm:text-sm border-0 bg-transparent focus:ring-0 text-gray-900 dark:text-blue-400 font-medium w-full"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Products by Category */}
            <div className="space-y-6 lg:space-y-8">
              {groupedProducts.map((group, groupIndex) => (
                <motion.section
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: groupIndex * 0.1 }}
                >
                  {/* Category Header */}
                  {(selectedCategory === "all" || selectedCategory === "new-arrivals" || selectedCategory === "best-sellers" || selectedCategory === "sale") && (
                    <div className="mb-4 lg:mb-6">
                      <div className="flex items-center gap-3 lg:gap-4">
                        <div className="w-1 h-5 lg:h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                        <div>
                          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white capitalize">
                            {group.category}
                          </h2>
                          <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {group.products.length} product{group.products.length !== 1 ? 's' : ''} available
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Products Grid - Improved responsive grid */}
                  <div className={`
                    ${viewMode === "grid" 
                      ? "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6" 
                      : "space-y-4 lg:space-y-6"
                    }
                  `}>
                    <AnimatePresence mode="popLayout">
                      {group.products.map((product, index) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          viewMode={viewMode}
                          index={index}
                          isFavorite={favorites.includes(product.id)}
                          onToggleFavorite={toggleFavorite}
                          onProductClick={handleProductClick}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.section>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8 lg:py-12"
              >
                <div className="w-14 h-14 lg:w-20 lg:h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Search className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" />
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto px-4">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 lg:px-6 lg:py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl text-sm lg:text-base"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Mobile Filters */}
                <div className="space-y-6">
                  <PriceFilter 
                    selectedFilters={selectedFilters.price}
                    onToggleFilter={toggleFilter}
                  />
                  <RatingFilter 
                    selectedFilters={selectedFilters.rating}
                    onToggleFilter={toggleFilter}
                  />
                </div>

                {/* Apply Filters */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu Sheet */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setShowMobileMenu(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed top-0 left-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Categories</h2>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Categories */}
                <div className="space-y-2">
                  {/* All Products */}
                  <button
                    onClick={() => {
                      handleCategorySelect("all");
                      setShowMobileMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === "all"
                        ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>All Products</span>
                    </div>
                  </button>

                  {/* New Arrivals */}
                  <button
                    onClick={() => {
                      handleCategorySelect("new-arrivals");
                      setShowMobileMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === "new-arrivals"
                        ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>New Arrivals</span>
                      <span className="text-xs opacity-75">
                        {categoryCounts.newArrivals}
                      </span>
                    </div>
                  </button>

                  {/* Best Sellers */}
                  <button
                    onClick={() => {
                      handleCategorySelect("best-sellers");
                      setShowMobileMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === "best-sellers"
                        ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>Best Sellers</span>
                      <span className="text-xs opacity-75">
                        {categoryCounts.bestSellers}
                      </span>
                    </div>
                  </button>

                  {/* Sale Items */}
                  <button
                    onClick={() => {
                      handleCategorySelect("sale");
                      setShowMobileMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === "sale"
                        ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>Sale Items</span>
                      <span className="text-xs opacity-75">
                        {categoryCounts.saleItems}
                      </span>
                    </div>
                  </button>

                  {/* Regular categories */}
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => {
                        handleCategorySelect(category.id);
                        setShowMobileMenu(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        {category.count > 0 && (
                          <span className="text-xs opacity-75">
                            {category.count}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductsPage() {
  return <ProductsContent />;
}