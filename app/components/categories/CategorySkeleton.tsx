"use client"
// components/categories/CategorySkeleton.tsx
interface CategorySkeletonProps {
  viewMode?: 'grid' | 'list';
  variant?: 'default' | 'trending' | 'compact';
  count?: number;
}

export default function CategorySkeleton({
  viewMode = 'grid',
  variant = 'default',
  count = 1
}: CategorySkeletonProps) {
  if (variant === 'trending') {
    return (
      <div className="space-y-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="group relative animate-pulse">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                  <div>
                    <div className="h-5 bg-gray-200 rounded-lg w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded-lg w-24"></div>
                  </div>
                </div>
                <div className="h-8 w-16 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded-lg w-full"></div>
                <div className="h-3 bg-gray-200 rounded-lg w-2/3"></div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div className="h-4 bg-gray-200 rounded-lg w-20"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="flex items-center p-6">
                {/* Image Skeleton */}
                <div className="w-24 h-24 rounded-xl bg-gray-200 flex-shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
                
                <div className="flex-1 ml-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="space-y-2 flex-1">
                      <div className="h-6 bg-gray-200 rounded-lg w-1/3"></div>
                      <div className="space-y-1">
                        <div className="h-3 bg-gray-200 rounded-lg w-full"></div>
                        <div className="h-3 bg-gray-200 rounded-lg w-2/3"></div>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-4">
                      <div className="h-5 bg-gray-200 rounded-lg w-20"></div>
                      <div className="h-5 bg-gray-200 rounded-lg w-16"></div>
                      <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded-xl w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default grid view
  return (
    <div className={`grid ${variant === 'compact' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="group relative animate-pulse">
          {/* Shimmer Background Effect */}
          <div className={`absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl blur opacity-30 ${variant === 'compact' ? 'hidden' : ''}`}></div>
          
          <div className={`relative bg-white ${variant === 'compact' ? 'rounded-xl shadow-sm border' : 'rounded-2xl shadow-lg border border-gray-100'} overflow-hidden`}>
            {/* Image/Header Section */}
            <div className={`${variant === 'compact' ? 'h-32' : 'h-48'} relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200`}>
              {/* Animated shimmer overlay */}
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              {/* Top right button skeleton */}
              {variant !== 'compact' && (
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-lg"></div>
                </div>
              )}
              
              {/* Bottom tag skeleton */}
              {variant !== 'compact' && (
                <div className="absolute bottom-4 left-4">
                  <div className="w-16 h-6 bg-white/30 backdrop-blur-sm rounded-full"></div>
                </div>
              )}
              
              {/* Center emoji skeleton */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`${variant === 'compact' ? 'text-4xl' : 'text-6xl'} text-gray-300`}>
                  📦
                </div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className={`${variant === 'compact' ? 'p-4' : 'p-6'}`}>
              {/* Title and Rating */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  {/* Category Name */}
                  <div className={`${variant === 'compact' ? 'h-5' : 'h-6'} bg-gray-200 rounded-lg ${variant === 'compact' ? 'w-3/4' : 'w-2/3'} mb-2`}></div>
                  
                  {/* Description - multiple lines */}
                  <div className="space-y-1">
                    <div className={`${variant === 'compact' ? 'h-2' : 'h-3'} bg-gray-200 rounded-lg w-full`}></div>
                    <div className={`${variant === 'compact' ? 'h-2' : 'h-3'} bg-gray-200 rounded-lg ${variant === 'compact' ? 'w-2/3' : 'w-3/4'}`}></div>
                  </div>
                </div>
                
                {/* Rating skeleton */}
                {variant !== 'compact' && (
                  <div className="w-16 h-6 bg-gray-200 rounded-lg ml-2"></div>
                )}
              </div>
              
              {/* Stats and CTA */}
              <div className={`flex items-center justify-between ${variant === 'compact' ? 'mt-3' : 'mt-6'}`}>
                {/* Stats */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className={`${variant === 'compact' ? 'w-3 h-3' : 'w-4 h-4'} bg-gray-200 rounded`}></div>
                    <div className={`${variant === 'compact' ? 'h-3' : 'h-4'} bg-gray-200 rounded-lg w-8`}></div>
                  </div>
                  {variant !== 'compact' && (
                    <>
                      <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
                      <div className="h-4 bg-gray-200 rounded-lg w-12"></div>
                    </>
                  )}
                </div>
                
                {/* CTA Button */}
                <div className={`${variant === 'compact' ? 'h-8' : 'h-10'} bg-gray-200 rounded-xl w-16`}></div>
              </div>
              
              {/* Additional info for compact view */}
              {variant === 'compact' && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-5 bg-gray-200 rounded-full w-12"></div>
                  <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                </div>
              )}
            </div>
            
            {/* Progress bar for loading effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Stylesheet to add the shimmer animation keyframes
export function CategorySkeletonStyles() {
  return (
    <style jsx global>{`
      @keyframes shimmer {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
      
      .animate-shimmer {
        animation: shimmer 2s infinite;
      }
    `}</style>
  );
}

// Alternative: Skeleton with pulse animation only (simpler)
export function SimpleCategorySkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
          {/* Image placeholder */}
          <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer"></div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-2 flex-1">
                <div className="h-6 bg-gray-200 rounded-lg w-2/3"></div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-200 rounded-lg w-full"></div>
                  <div className="h-3 bg-gray-200 rounded-lg w-3/4"></div>
                </div>
              </div>
              <div className="w-16 h-6 bg-gray-200 rounded-lg ml-2"></div>
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded-lg w-8"></div>
                </div>
                <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-12"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded-xl w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Skeleton for stats cards
export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="h-8 bg-gray-300 rounded-lg w-12"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded-lg w-24 mb-2"></div>
            <div className="flex items-center gap-1 mt-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded-lg w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Skeleton for filter sidebar
export function FilterSkeleton() {
  return (
    <div className="sticky top-8 space-y-6 animate-pulse">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-lg w-32"></div>
            <div className="h-3 bg-gray-200 rounded-lg w-24"></div>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Price Filter */}
          <div>
            <div className="h-4 bg-gray-200 rounded-lg w-24 mb-3"></div>
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded-lg w-32"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tags Filter */}
          <div>
            <div className="h-4 bg-gray-200 rounded-lg w-32 mb-3"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded-full w-20"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Card Skeleton */}
      <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl shadow-xl p-6">
        <div className="space-y-4">
          <div className="h-5 bg-gray-300 rounded-lg w-32"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-3 bg-gray-300 rounded-lg w-24"></div>
              <div className="h-4 bg-gray-300 rounded-lg w-8"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}