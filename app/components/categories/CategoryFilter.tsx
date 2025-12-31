
// 'use client';

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, Filter, X, Star } from 'lucide-react';
// import { Category } from '../../types/category';
// import type { CategoryFilters } from '../../types/category';

// interface CategoryFiltersProps {
//   categories: Category[];
//   onFiltersChange: (filters: CategoryFilters) => void;
//   className?: string;
// }

// const allTags = ['Trending', 'New', 'Popular', 'Limited', 'Sustainable'];

// export default function CategoryFilter({ 
//   categories, 
//   onFiltersChange, 
//   className = '' 
// }: CategoryFiltersProps) {
//   const [filters, setFilters] = useState<CategoryFilters>({
//     search: '',
//     isFeatured: null,
//     sortBy: 'name',
//     tags: []
//   });

//   const [isFiltersOpen, setIsFiltersOpen] = useState(false);

//   const updateFilters = (newFilters: Partial<CategoryFilters>) => {
//     const updated = { ...filters, ...newFilters };
//     setFilters(updated);
//     onFiltersChange(updated);
//   };

//   const toggleTag = (tag: string) => {
//     const updatedTags = filters.tags.includes(tag)
//       ? filters.tags.filter(t => t !== tag)
//       : [...filters.tags, tag];
    
//     updateFilters({ tags: updatedTags });
//   };

//   const clearFilters = () => {
//     const cleared: CategoryFilters = {
//       search: '',
//       isFeatured: null,
//       sortBy: 'name', // explicitly typed as CategoryFilters['sortBy']
//       tags: []
//     };
//     setFilters(cleared);
//     onFiltersChange(cleared);
//   };

//   const hasActiveFilters = filters.search || filters.isFeatured !== null || filters.tags.length > 0;

//   return (
//     <div className={`space-y-4 ${className}`}>
//       {/* Main Search and Filter Bar */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         {/* Search Input */}
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Search categories..."
//             value={filters.search}
//             onChange={(e) => updateFilters({ search: e.target.value })}
//             className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//           />
//         </div>

//         {/* Filter Toggle Button */}
//         <button
//           onClick={() => setIsFiltersOpen(!isFiltersOpen)}
//           className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all duration-300 ${
//             hasActiveFilters 
//               ? 'bg-blue-500 text-white border-blue-500' 
//               : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:border-gray-300'
//           }`}
//         >
//           <Filter size={20} />
//           Filters
//           {hasActiveFilters && (
//             <span className="bg-white text-blue-500 text-xs px-2 py-1 rounded-full">
//               {filters.tags.length + (filters.isFeatured !== null ? 1 : 0)}
//             </span>
//           )}
//         </button>
//       </div>

//       {/* Advanced Filters */}
//       <AnimatePresence>
//         {isFiltersOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 space-y-6"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between">
//               <h3 className="font-semibold text-gray-900">Filters</h3>
//               {hasActiveFilters && (
//                 <button
//                   onClick={clearFilters}
//                   className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
//                 >
//                   <X size={16} />
//                   Clear all
//                 </button>
//               )}
//             </div>

//             {/* Featured Filter */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 Featured Status
//               </label>
//               <div className="flex gap-3">
//                 {[
//                   { value: null, label: 'All' },
//                   { value: true, label: 'Featured' },
//                   { value: false, label: 'Regular' }
//                 ].map((option) => (
//                   <button
//                     key={String(option.value)}
//                     onClick={() => updateFilters({ isFeatured: option.value })}
//                     className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
//                       filters.isFeatured === option.value
//                         ? 'bg-blue-500 text-white border-blue-500'
//                         : 'bg-white border-gray-300 hover:border-gray-400'
//                     }`}
//                   >
//                     {option.value && <Star size={16} />}
//                     {option.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Tags Filter */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 Popular Tags
//               </label>
//               <div className="flex flex-wrap gap-2">
//                 {allTags.map((tag) => (
//                   <button
//                     key={tag}
//                     onClick={() => toggleTag(tag)}
//                     className={`px-4 py-2 rounded-full border transition-all duration-300 ${
//                       filters.tags.includes(tag)
//                         ? 'bg-blue-500 text-white border-blue-500'
//                         : 'bg-white border-gray-300 hover:border-gray-400'
//                     }`}
//                   >
//                     {tag}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Sort Options */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 Sort By
//               </label>
//               <select
//                 value={filters.sortBy}
//                 onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
//                 className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//               >
//                 <option value="name">Alphabetical</option>
//                 <option value="productCount">Product Count</option>
//                 <option value="newest">Newest First</option>
//               </select>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


// components/categories/CategoryFilter.tsx
'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import FilterClient from './FiltersClient';
import { Sliders, X, Search, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

// Simple debounce implementation
function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
  let timeout: NodeJS.Timeout | null = null;
  const debounced = (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
  debounced.cancel = () => {
    if (timeout) clearTimeout(timeout);
  };
  return debounced as T & { cancel: () => void };
}

export interface FilterState {
  priceRange: [number, number];
  categories: string[];
  rating: number;
  sortBy: string;
  tags: string[];
  status: string[];
}

interface CategoryFilterProps {
  initialFilters?: Partial<FilterState>;
  onFiltersChange?: (filters: FilterState) => void;
  isLoading?: boolean;
}

export default function CategoryFilter({ 
  initialFilters, 
  onFiltersChange,
  isLoading = false
}: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Use refs to prevent unnecessary re-renders
  const isInitialMount = useRef(true);
  const filterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize filters with memoization
  const initialFiltersFromURL = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    return {
      priceRange: initialFilters?.priceRange || [0, 1000],
      categories: initialFilters?.categories || [],
      rating: initialFilters?.rating || 0,
      sortBy: initialFilters?.sortBy || 'popularity',
      tags: initialFilters?.tags || [],
      status: initialFilters?.status || []
    };
  }, [searchParams, initialFilters]);

  const [filters, setFilters] = useState<FilterState>(initialFiltersFromURL);
  const [localFilters, setLocalFilters] = useState<FilterState>(initialFiltersFromURL);
  const [isDebouncing, setIsDebouncing] = useState(false);

  // Debounced update to URL and parent
  const debouncedUpdate = useCallback(
    debounce((newFilters: FilterState) => {
      const params = new URLSearchParams();
      
      // Only add non-default values to URL
      if (newFilters.priceRange[0] > 0 || newFilters.priceRange[1] < 1000) {
        params.set('price', `${newFilters.priceRange[0]}-${newFilters.priceRange[1]}`);
      }
      
      if (newFilters.categories.length > 0) {
        params.set('categories', newFilters.categories.join(','));
      }
      
      if (newFilters.rating > 0) {
        params.set('rating', newFilters.rating.toString());
      }
      
      if (newFilters.sortBy !== 'popularity') {
        params.set('sort', newFilters.sortBy);
      }
      
      if (newFilters.tags.length > 0) {
        params.set('tags', newFilters.tags.join(','));
      }
      
      if (newFilters.status.length > 0) {
        params.set('status', newFilters.status.join(','));
      }
      
      // Update URL without scroll
      const newUrl = params.toString() ? `?${params.toString()}` : '';
      router.push(`${pathname}${newUrl}`, { scroll: false });
      
      // Update main filters state
      setFilters(newFilters);
      
      // Notify parent component
      if (onFiltersChange) {
        onFiltersChange(newFilters);
      }
      
      setIsDebouncing(false);
    }, 500),
    [router, pathname, onFiltersChange]
  );

  // Handle local filter changes
  const handleLocalFilterChange = useCallback((newFilters: Partial<FilterState>) => {
    setLocalFilters(prev => {
      const updated = { ...prev, ...newFilters };
      
      // Debounce the update
      setIsDebouncing(true);
      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }
      
      filterTimeoutRef.current = setTimeout(() => {
        debouncedUpdate(updated);
      }, 300);
      
      return updated;
    });
  }, [debouncedUpdate]);

  // Parse URL on initial load (only once)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      
      const params = new URLSearchParams(searchParams.toString());
      const urlFilters: Partial<FilterState> = {};
      
      // Parse URL params
      const priceParam = params.get('price');
      if (priceParam) {
        const [min, max] = priceParam.split('-').map(Number);
        if (!isNaN(min) && !isNaN(max)) {
          urlFilters.priceRange = [min, max] as [number, number];
        }
      }
      
      const categoriesParam = params.get('categories');
      if (categoriesParam) {
        urlFilters.categories = categoriesParam.split(',').filter(Boolean);
      }
      
      const ratingParam = params.get('rating');
      if (ratingParam) {
        urlFilters.rating = parseInt(ratingParam, 10);
      }
      
      const sortParam = params.get('sort');
      if (sortParam) {
        urlFilters.sortBy = sortParam;
      }
      
      const tagsParam = params.get('tags');
      if (tagsParam) {
        urlFilters.tags = tagsParam.split(',').filter(Boolean);
      }
      
      const statusParam = params.get('status');
      if (statusParam) {
        urlFilters.status = statusParam.split(',').filter(Boolean);
      }
      
      // Update if URL params exist
      if (Object.keys(urlFilters).length > 0) {
        const updatedFilters = { ...localFilters, ...urlFilters };
        setLocalFilters(updatedFilters);
        setFilters(updatedFilters);
        
        if (onFiltersChange) {
          onFiltersChange(updatedFilters);
        }
      }
    }
  }, [searchParams]); // Only depends on searchParams

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const handleReset = useCallback(() => {
    const defaultFilters: FilterState = {
      priceRange: [0, 1000],
      categories: [],
      rating: 0,
      sortBy: 'popularity',
      tags: [],
      status: []
    };
    
    setLocalFilters(defaultFilters);
    setFilters(defaultFilters);
    router.push(pathname, { scroll: false });
    
    if (onFiltersChange) {
      onFiltersChange(defaultFilters);
    }
  }, [router, pathname, onFiltersChange]);

  // Memoized active filters calculation
  const activeFilters = useMemo(() => [
    ...localFilters.categories.map(cat => ({ type: 'categories' as const, label: cat })),
    ...localFilters.tags.map(tag => ({ type: 'tags' as const, label: tag })),
    ...localFilters.status.map(status => ({ type: 'status' as const, label: status })),
    ...(localFilters.rating > 0 ? [{ type: 'rating' as const, label: `${localFilters.rating}+ stars` }] : []),
    ...(localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 1000 
      ? [{ type: 'priceRange' as const, label: `$${localFilters.priceRange[0]} - $${localFilters.priceRange[1]}` }] 
      : []),
    ...(localFilters.sortBy !== 'popularity' 
      ? [{ type: 'sortBy' as const, label: `Sort: ${localFilters.sortBy}` }] 
      : [])
  ], [localFilters]);

  const removeFilter = useCallback((type: keyof FilterState, value: string) => {
    let newFilters: Partial<FilterState> = {};
    
    switch (type) {
      case 'categories':
      case 'tags':
      case 'status':
        newFilters[type] = localFilters[type].filter(item => item !== value);
        break;
      case 'priceRange':
        newFilters.priceRange = [0, 1000];
        break;
      case 'rating':
        newFilters.rating = 0;
        break;
      case 'sortBy':
        newFilters.sortBy = 'popularity';
        break;
    }
    
    handleLocalFilterChange(newFilters);
  }, [localFilters, handleLocalFilterChange]);

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
            {isLoading || isDebouncing ? (
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            ) : (
              <Sliders className="w-5 h-5 text-blue-600" />
            )}
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Filter & Sort</h4>
            <p className="text-sm text-gray-600">
              {isDebouncing ? 'Applying filters...' : 'Refine your search'}
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          disabled={isLoading}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset All
        </button>
      </div>

      {/* Search within filters */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search filters..."
          disabled={isLoading}
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
          onChange={(e) => {
            // Optional: Implement filter search
          }}
        />
      </div>

      {/* Filter Controls */}
      <FilterClient 
        filters={localFilters} 
        onFilterChange={handleLocalFilterChange}
        isLoading={isLoading || isDebouncing}
      />
      
      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-900">Active Filters</span>
            <span className="text-xs text-gray-500">
              {activeFilters.length} filter{activeFilters.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <span
                key={`${filter.type}-${filter.label}-${index}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-sm rounded-full hover:from-blue-100 hover:to-cyan-100 transition-colors"
              >
                {filter.label}
                <button
                  onClick={() => removeFilter(filter.type, filter.label)}
                  disabled={isLoading}
                  className="hover:text-blue-900 transition-colors disabled:opacity-50"
                  aria-label={`Remove ${filter.label} filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Apply Button for Mobile */}
      <div className="lg:hidden">
        <button
          onClick={() => {
            // Apply filters immediately on mobile
            handleLocalFilterChange(localFilters);
          }}
          disabled={isLoading || isDebouncing}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {(isLoading || isDebouncing) && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          Apply Filters ({activeFilters.length})
        </button>
      </div>

      {/* Filter Stats */}
      <div className="hidden lg:block pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {localFilters.categories.length + localFilters.tags.length + localFilters.status.length}
            </div>
            <div className="text-gray-600">Active Filters</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {localFilters.rating > 0 ? `${localFilters.rating}+` : 'Any'}
            </div>
            <div className="text-gray-600">Min Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}