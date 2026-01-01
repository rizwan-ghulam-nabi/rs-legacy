// app/categories/page.tsx
import { Suspense } from 'react';
import { getCategories, getTrendingCategories, getCategoryStats } from '../data/categories';
import CategoriesGrid from '../components/categories/CategoriesGrid';
import CategoryFilter from '../components/categories/CategoryFilter';
import HeroSection from '../components/categories/HeroSection';
import WarmWelcome from '../components/categories/WarmWelcome';
import CategorySkeleton from '../components/categories/CategorySkeleton';
import { 
  TrendingUp, 
  Sparkles, 
  Filter, 
  Grid, 
  List, 
  ChevronLeft, 
  ChevronRight,
  Star,
  Zap,
  Clock,
  Users
} from 'lucide-react';
import { Category } from '../types/category';

// Stats Section Component
async function CategoryStats() {
  const stats = await getCategoryStats();
  
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-4 sm:p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl sm:text-3xl font-bold">{stats.total}</span>
          <Grid className="w-5 h-5 sm:w-6 sm:h-6 opacity-80" />
        </div>
        <p className="text-xs sm:text-sm font-medium text-blue-100">Total Categories</p>
        <div className="flex items-center gap-1 mt-2">
          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-xs">+12% this month</span>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 sm:p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl sm:text-3xl font-bold">{stats.trending}</span>
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 opacity-80" />
        </div>
        <p className="text-xs sm:text-sm font-medium text-purple-100">Trending Now</p>
        <div className="flex items-center gap-1 mt-2">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-xs">Most popular</span>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-4 sm:p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl sm:text-3xl font-bold">{stats.new}</span>
          <Clock className="w-5 h-5 sm:w-6 sm:h-6 opacity-80" />
        </div>
        <p className="text-xs sm:text-sm font-medium text-amber-100">New This Week</p>
        <div className="flex items-center gap-1 mt-2">
          <Star className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-xs">Fresh collections</span>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-4 sm:p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl sm:text-3xl font-bold">{stats.users}</span>
          <Users className="w-5 h-5 sm:w-6 sm:h-6 opacity-80" />
        </div>
        <p className="text-xs sm:text-sm font-medium text-emerald-100">Active Curators</p>
        <div className="flex items-center gap-1 mt-2">
          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-xs">Growing community</span>
        </div>
      </div>
    </div>
  );
}

// Trending Categories Component
async function TrendingCategories() {
  const trendingCategories = await getTrendingCategories();
  
  return (
    <div className="mb-8 sm:mb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
            Trending Collections
          </h2>
          <p className="text-sm sm:text-base text-gray-600">Most popular categories this week</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-50 to-amber-50 rounded-full">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-medium text-amber-700">Hot Right Now</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {trendingCategories.slice(0, 3).map((category, index) => (
          <div key={category.id} className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' : 'bg-gradient-to-br from-amber-600 to-amber-800'}`}>
                      <span className="text-white text-sm sm:text-base font-bold">{index + 1}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">{category.name}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{category.description}</p>
                </div>
                <div className="px-2 sm:px-3 py-1 bg-gradient-to-r from-orange-50 to-amber-50 rounded-full flex-shrink-0 ml-2">
                  <span className="text-xs sm:text-sm font-bold text-amber-600">+{category.growth}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-gray-500">{category.items} items</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />
                  {category.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Page Component
export default async function CategoriesPage() {
  const categoriesRaw = await getCategories();
  // Convert or map categoriesRaw to Category[] if needed
  const categories: Category[] = categoriesRaw.map((cat: any) => ({
    id: cat.id,
    name: cat.name,
    description: cat.description,
    image: cat.image,
    productCount: cat.productCount,
    isFeatured: cat.isFeatured,
    isActive: cat.isActive,
    tags: cat.tags,
    rating: cat.rating, // include any other fields required by Category
    items: cat.items,
    growth: cat.growth,
    slug: cat.slug,
    createdAt: cat.createdAt,
    updatedAt: cat.updatedAt
  }));
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <HeroSection />
      
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        {/* Warm Welcome Section */}
        <WarmWelcome />
        
        {/* Stats Section */}
        <Suspense fallback={
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl p-4 sm:p-6 animate-pulse h-24 sm:h-32"></div>
            ))}
          </div>
        }>
          <CategoryStats />
        </Suspense>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar with Filter */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-6 lg:top-8 space-y-6">
              <div className="bg-white rounded-2xl lg:rounded-3xl shadow-lg lg:shadow-xl border border-gray-100 p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="p-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                    <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">Refine Your Search</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Filter by preferences</p>
                  </div>
                </div>
                <CategoryFilter />
              </div>
              
              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl lg:rounded-3xl shadow-lg lg:shadow-xl p-4 sm:p-6 text-white">
                <h4 className="font-bold text-base sm:text-lg mb-4">Quick Stats</h4>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Active Filters</span>
                    <span className="font-bold text-sm sm:text-base">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Results Found</span>
                    <span className="font-bold text-sm sm:text-base">{categories.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Last Updated</span>
                    <span className="font-bold text-sm sm:text-base">Just now</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 sm:pt-6 border-t border-white/10">
                  <button className="w-full px-4 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all text-sm sm:text-base">
                    Apply All Filters
                  </button>
                </div>
              </div>
            </div>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1">
            {/* Trending Categories */}
            <Suspense fallback={
              <div className="mb-8 sm:mb-12">
                <div className="h-6 sm:h-8 bg-gray-200 rounded-lg w-48 mb-4 animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-200 rounded-2xl p-4 sm:p-6 animate-pulse h-24 sm:h-32"></div>
                  ))}
                </div>
              </div>
            }>
              <TrendingCategories />
            </Suspense>
            
            {/* Categories Grid Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">All Categories</h2>
                <p className="text-sm sm:text-base text-gray-600">Browse through our complete collection</p>
              </div>
              
              <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 w-full xs:w-auto">
                <div className="flex bg-gray-100 rounded-xl sm:rounded-2xl p-1 w-full xs:w-auto">
                  <button className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-white rounded-lg sm:rounded-xl shadow-sm text-gray-900 font-medium text-sm sm:text-base flex-1 xs:flex-none">
                    <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Grid</span>
                  </button>
                  <button className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-900 font-medium text-sm sm:text-base flex-1 xs:flex-none">
                    <List className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">List</span>
                  </button>
                </div>
                
                <select className="w-full xs:w-auto bg-gray-100 border-0 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 text-gray-900 font-medium text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option>Popularity</option>
                  <option>Newest</option>
                  <option>Name (A-Z)</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>
            
            {/* Categories Grid - PASS THE CATEGORIES AS PROPS */}
            <CategoriesGrid initialCategories={categories} />
            
            {/* Pagination */}
            <div className="mt-8 sm:mt-12">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100 p-4 sm:p-6">
                <div className="text-xs sm:text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">1-12</span> of <span className="font-semibold text-gray-900">{categories.length}</span> categories
                </div>
                
                <div className="flex flex-col xs:flex-row items-center gap-3 w-full xs:w-auto">
                  <button className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-xl sm:rounded-2xl transition-colors text-sm w-full xs:w-auto">
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-1 justify-center">
                    <button className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg sm:rounded-xl shadow text-sm sm:text-base">
                      1
                    </button>
                    <button className="w-8 h-8 sm:w-10 sm:h-10 text-gray-700 hover:bg-gray-100 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base">
                      2
                    </button>
                    <button className="w-8 h-8 sm:w-10 sm:h-10 text-gray-700 hover:bg-gray-100 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base">
                      3
                    </button>
                    <span className="px-1 sm:px-2 text-gray-400 text-sm">...</span>
                    <button className="w-8 h-8 sm:w-10 sm:h-10 text-gray-700 hover:bg-gray-100 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base">
                      8
                    </button>
                  </div>
                  
                  <button className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl sm:rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all text-sm w-full xs:w-auto">
                    Next
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="mt-12 sm:mt-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
              Ready to Explore More?
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-blue-100 mb-6 sm:mb-8">
              Join thousands of users discovering amazing products every day. 
              Start your collection today!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="px-6 py-2 sm:px-8 sm:py-3 bg-white text-blue-600 font-bold rounded-xl sm:rounded-2xl hover:bg-gray-100 transition-all text-sm sm:text-base">
                Get Started Free
              </button>
              <button className="px-6 py-2 sm:px-8 sm:py-3 bg-transparent border border-white sm:border-2 text-white font-bold rounded-xl sm:rounded-2xl hover:bg-white/10 transition-all text-sm sm:text-base">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}