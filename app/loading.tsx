// app/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo Skeleton */}
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gray-300 rounded"></div>
              <div className="ml-3 h-6 w-24 bg-gray-300 rounded"></div>
            </div>
            
            {/* Navigation Skeleton */}
            <div className="hidden md:block">
              <div className="flex space-x-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-6 w-16 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
            
            {/* User Menu Skeleton */}
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section Skeleton */}
        <div className="mb-12">
          <div className="h-8 w-3/4 bg-gray-300 rounded mb-4 max-w-md"></div>
          <div className="h-4 w-1/2 bg-gray-300 rounded mb-6 max-w-sm"></div>
          <div className="flex space-x-4">
            <div className="h-10 w-32 bg-gray-300 rounded"></div>
            <div className="h-10 w-32 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Grid Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-6">
              <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
                <div className="h-4 w-4/6 bg-gray-300 rounded"></div>
              </div>
              <div className="mt-4 flex space-x-2">
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section Skeleton */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-6">
              <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
              <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}