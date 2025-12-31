// // components/categories/FiltersClient.tsx
// 'use client';

// import { useState } from 'react';
// import { Category, CategoryFilters } from '../../types/category';
// import CategoryFiltersComponent from './CategoryFilters';

// interface FiltersClientProps {
//   categories: Category[];
//   className?: string;
// }

// export function FiltersClient({ categories, className }: FiltersClientProps) {
//   const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories);

//   const handleFiltersChange = (filters: CategoryFilters) => {
//     // Filter logic here
//     let filtered = [...categories];

//     // Search filter
//     if (filters.search) {
//       filtered = filtered.filter(category =>
//         category.name.toLowerCase().includes(filters.search.toLowerCase()) ||
//         category.description?.toLowerCase().includes(filters.search.toLowerCase())
//       );
//     }

//     // Featured filter
//     if (filters.isFeatured !== null) {
//       filtered = filtered.filter(category => category.isFeatured === filters.isFeatured);
//     }

//     // Tags filter
//     if (filters.tags.length > 0) {
//       filtered = filtered.filter(category =>
//         filters.tags.some(tag => category.tags.includes(tag))
//       );
//     }

//     // Sort
//     filtered.sort((a, b) => {
//       switch (filters.sortBy) {
//         case 'productCount':
//           return b.productCount - a.productCount;
//         case 'newest':
//           return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//         default:
//           return a.name.localeCompare(b.name);
//       }
//     });

//     setFilteredCategories(filtered);
//   };

//   return (
//     <CategoryFiltersComponent
//       categories={categories}
//       onFiltersChange={handleFiltersChange}
//       className={className}
//     />
//   );
// }


// components/categories/FilterClient.tsx
'use client';

import { Star } from 'lucide-react';
import { FilterState } from './CategoryFilter';
import { memo, useCallback } from 'react';

interface FilterClientProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  isLoading?: boolean;
}

// Static arrays (no need to recreate on every render)
const PRICE_RANGES = [
  { label: 'Under PKR500', value: [0, 50] as [number, number] },
  { label: 'PKR500 - PKR2000', value: [50, 200] as [number, number] },
  { label: 'PKR2000 - PKR5000', value: [200, 500] as [number, number] },
  { label: 'Over PKR5000', value: [500, 1000] as [number, number] },
];

const CATEGORY_OPTIONS = [
  'Tech Gadgets', 'Sustainable Fashion', 'Home Decor', 'Fitness Gear',
  'Gourmet Kitchen', 'Outdoor Adventure', 'Wellness & Self-Care',
  'Smart Office', 'Photography', 'Gaming & eSports', 'Pet Essentials'
];

const TAG_OPTIONS = [
  'Trending', 'New Arrivals', 'Best Sellers', 'Limited Edition',
  'Sustainable', 'Premium', 'Budget Friendly', 'Staff Picks',
  'Smart Tech', 'Eco-Friendly', 'Handmade', 'Professional Grade'
];

const STATUS_OPTIONS = [
  { label: 'Trending', value: 'trending' },
  { label: 'New', value: 'new' },
  { label: 'Popular', value: 'popular' },
  { label: 'Featured', value: 'featured' },
  { label: 'Upcoming', value: 'upcoming' },
];

const SORT_OPTIONS = [
  { label: 'Popularity', value: 'popularity' },
  { label: 'Rating: High to Low', value: 'rating-desc' },
  { label: 'Rating: Low to High', value: 'rating-asc' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name: A to Z', value: 'name-asc' },
  { label: 'Name: Z to A', value: 'name-desc' },
  { label: 'Newest First', value: 'newest' },
  { label: 'Growth Rate', value: 'growth' },
];

// Memoized component to prevent unnecessary re-renders
const FilterClient = memo(function FilterClient({ 
  filters, 
  onFilterChange,
  isLoading = false
}: FilterClientProps) {
  
  // Memoized handlers
  const handlePriceRangeSelect = useCallback((range: typeof PRICE_RANGES[number]['value']) => {
    onFilterChange({ priceRange: range });
  }, [onFilterChange]);

  const handleCategorySelect = useCallback((category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFilterChange({ categories: newCategories });
  }, [filters.categories, onFilterChange]);

  const handleTagSelect = useCallback((tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFilterChange({ tags: newTags });
  }, [filters.tags, onFilterChange]);

  const handleStatusSelect = useCallback((status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    onFilterChange({ status: newStatus });
  }, [filters.status, onFilterChange]);

  const handleRatingChange = useCallback((rating: number) => {
    onFilterChange({ rating });
  }, [onFilterChange]);

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ sortBy: e.target.value });
  }, [onFilterChange]);

  const handlePriceSliderChange = useCallback((type: 'min' | 'max', value: number) => {
    const newRange = type === 'min' 
      ? [value, filters.priceRange[1]] as [number, number]
      : [filters.priceRange[0], value] as [number, number];
    onFilterChange({ priceRange: newRange });
  }, [filters.priceRange, onFilterChange]);

  // Check if price range is active (memoized)
  const isPriceRangeActive = useCallback((range: typeof PRICE_RANGES[number]['value']) => {
    return filters.priceRange[0] === range[0] && filters.priceRange[1] === range[1];
  }, [filters.priceRange]);

  return (
    <div className="space-y-6">
      {/* Price Range Section */}
      <div>
        <h5 className="font-semibold text-gray-900 mb-3">Price Range</h5>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() => handlePriceRangeSelect(range.value)}
              disabled={isLoading}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                isPriceRangeActive(range.value)
                  ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="font-medium">{range.label}</span>
              {isPriceRangeActive(range.value) && (
                <span className="text-blue-600 font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
        
        {/* Custom price range slider */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Custom Range</span>
            <span className="text-sm font-semibold text-gray-900">
              PKR{filters.priceRange[0]} - PKR{filters.priceRange[1]}
            </span>
          </div>
          <div className="relative h-8">
            <div className="absolute top-3 left-0 right-0 h-2 bg-gray-300 rounded-lg">
              <div 
                className="absolute h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg"
                style={{
                  left: `${(filters.priceRange[0] / 1000) * 100}%`,
                  right: `${100 - (filters.priceRange[1] / 1000) * 100}%`
                }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={filters.priceRange[0]}
              disabled={isLoading}
              onChange={(e) => handlePriceSliderChange('min', parseInt(e.target.value))}
              className="absolute top-0 w-full h-2 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
            />
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={filters.priceRange[1]}
              disabled={isLoading}
              onChange={(e) => handlePriceSliderChange('max', parseInt(e.target.value))}
              className="absolute top-0 w-full h-2 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div>
        <h5 className="font-semibold text-gray-900 mb-3">Categories</h5>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {CATEGORY_OPTIONS.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <input
                type="checkbox"
                disabled={isLoading}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 disabled:opacity-50"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategorySelect(category)}
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags Section */}
      <div>
        <h5 className="font-semibold text-gray-900 mb-3">Popular Tags</h5>
        <div className="flex flex-wrap gap-2">
          {TAG_OPTIONS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagSelect(tag)}
              disabled={isLoading}
              className={`px-3 py-1.5 text-sm rounded-full transition-all disabled:opacity-50 ${
                filters.tags.includes(tag)
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Status Section */}
      <div>
        <h5 className="font-semibold text-gray-900 mb-3">Collection Status</h5>
        <div className="grid grid-cols-2 gap-2">
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status.value}
              onClick={() => handleStatusSelect(status.value)}
              disabled={isLoading}
              className={`p-2 text-sm rounded-lg border transition-all disabled:opacity-50 ${
                filters.status.includes(status.value)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h5 className="font-semibold text-gray-900 mb-3">Minimum Rating</h5>
        <div className="flex items-center gap-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingChange(star)}
                disabled={isLoading}
                className="p-1 transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                aria-label={`${star} star${star > 1 ? 's' : ''} and up`}
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= filters.rating
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-300 hover:text-yellow-400'
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-sm font-medium text-gray-900">
            {filters.rating > 0 ? `${filters.rating}+ stars` : 'Any rating'}
          </span>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h5 className="font-semibold text-gray-900 mb-3">Sort By</h5>
        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          disabled={isLoading}
          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none appearance-none cursor-pointer disabled:opacity-50"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

export default FilterClient;