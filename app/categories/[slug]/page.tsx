// app/categories/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getCategoryBySlug, getRelatedCategories } from '../../data/categories';
import { Categories } from '../../types/category';
import { 
  ArrowLeft, 
  Star, 
  Users, 
  TrendingUp, 
  ShoppingBag, 
  Calendar,
  Tag,
  Sparkles,
  ChevronRight,
  Heart,
  Share2,
  Filter,
  Grid,
  List,
  ChevronLeft,
  Clock,
  Package,
  Shield,
  Truck,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import ProductGrid from '../../components/categories/CategoriesGrid';
import CategorySkeleton from '../../components/categories/CategorySkeleton';

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [category, setCategory] = useState<Categories | null>(null);
  const [relatedCategories, setRelatedCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const data = await getCategoryBySlug(slug);
        setCategory(data);
        
        if (data) {
          const related = await getRelatedCategories(data.id);
          setRelatedCategories(related);
        }
      } catch (error) {
        console.error('Error fetching category:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <CategorySkeleton />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section with Gradient Background */}
      <div 
        className="relative py-12 sm:py-16 md:py-20"
        style={{
          background: `linear-gradient(135deg, ${category.colorScheme.primary}20 0%, ${category.colorScheme.secondary}20 100%)`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Back Button */}
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Categories
          </Link>

          {/* Category Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${category.colorScheme.primary} 0%, ${category.colorScheme.secondary} 100%)`,
                  }}
                >
                  <span className="text-white">{category.emoji}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-2 mb-2">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                      {category.name}
                    </h1>
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-bold rounded-full flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {category.tag}
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 max-w-3xl">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{category.items}</div>
                  <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                    <Package className="w-4 h-4" />
                    Products
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{category.curators}</div>
                  <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                    <Users className="w-4 h-4" />
                    Curators
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{category.rating}</div>
                  <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    Rating
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">+{category.growth}%</div>
                  <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    Growth
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 font-medium rounded-t-lg transition-colors ${
                activeTab === 'products'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Products ({category.items})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-3 font-medium rounded-t-lg transition-colors ${
                activeTab === 'details'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Details
              </div>
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`px-6 py-3 font-medium rounded-t-lg transition-colors ${
                activeTab === 'community'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Community
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'products' && (
              <div>
                {/* Filter Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div>
                    <h3 className="font-bold text-gray-900">Available Products</h3>
                    <p className="text-sm text-gray-600">Browse through {category.items} products</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex bg-gray-100 rounded-xl p-1">
                      <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                        <Grid className="w-4 h-4" />
                        Grid
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 text-gray-600">
                        <List className="w-4 h-4" />
                        List
                      </button>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
                      <Filter className="w-4 h-4" />
                      Filter
                    </button>
                  </div>
                </div>

                {/* Products Grid */}
                {/* <ProductGrid 
                  categoryId={category.id}
                  limit={6}
                /> */}

                {/* View All Button */}
                <div className="text-center mt-8">
                  <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-2xl hover:shadow-lg transition-all">
                    View All {category.items} Products
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Category Details</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">About This Category</h4>
                    <p className="text-gray-600">{category.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Shield className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-medium">Quality Assurance</p>
                          <p className="text-sm text-gray-600">Verified products only</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Truck className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium">Fast Shipping</p>
                          <p className="text-sm text-gray-600">Worldwide delivery</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <RefreshCw className="w-5 h-5 text-purple-500" />
                        <div>
                          <p className="font-medium">Easy Returns</p>
                          <p className="text-sm text-gray-600">30-day return policy</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Sparkles className="w-5 h-5 text-amber-500" />
                        <div>
                          <p className="font-medium">Trending Now</p>
                          <p className="text-sm text-gray-600">+{category.growth}% growth</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Popular Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.popularTags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Created: {new Date(category.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Updated: {new Date(category.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'community' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Community</h3>
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Community features coming soon!</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Categories */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                Related Categories
              </h3>
              <div className="space-y-3">
                {relatedCategories.map((relatedCat) => (
                  <Link
                    key={relatedCat.id}
                    href={`/categories/${relatedCat.slug}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                      style={{
                        background: `linear-gradient(135deg, ${relatedCat.colorScheme.primary} 0%, ${relatedCat.colorScheme.secondary} 100%)`,
                      }}
                    >
                      <span className="text-white">{relatedCat.emoji}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                        {relatedCat.name}
                      </h4>
                      <p className="text-xs text-gray-500">{relatedCat.items} products</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4" />
                    <span>Save Category</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-white/20 rounded">❤️</span>
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-white/20 rounded">↗️</span>
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Shop All</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-white/20 rounded">{category.items}</span>
                </button>
              </div>
            </div>

            {/* Category Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Category Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avg. Price</span>
                  <span className="font-bold">${category.metadata.avgPrice}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Price Range</span>
                  <span className="font-bold">${category.metadata.minPrice} - ${category.metadata.maxPrice}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Views</span>
                  <span className="font-bold">{category.metadata.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Community Likes</span>
                  <span className="font-bold">{category.metadata.likes.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        {category.featuredProducts && category.featuredProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Featured Products</h3>
                <p className="text-gray-600">Top picks from this category</p>
              </div>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.featuredProducts.map((productId, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                      <Package className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Product {index + 1}</h4>
                      <p className="text-sm text-gray-600 mt-1">Featured item</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                          Featured
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to explore {category.name}?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join {category.curators.toLocaleString()} curators and discover the best products in {category.name}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-100 transition-all">
              Start Shopping
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-2xl hover:bg-white/10 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}