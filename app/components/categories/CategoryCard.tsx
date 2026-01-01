// components/categories/CategoryCard.tsx
'use client';

import Link from 'next/link';
import { ArrowUpRight, Star, Users, Sparkles, TrendingUp } from 'lucide-react';
import { Categories } from '../../types/category';

interface CategoryCardProps {
  category: Categories;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  // Helper function to get status icon
  const getStatusIcon = () => {
    switch (category.status) {
      case 'trending':
        return <TrendingUp className="w-3 h-3 text-orange-500" />;
      case 'new':
        return <Sparkles className="w-3 h-3 text-blue-500" />;
      case 'featured':
        return <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative block"
    >
      {/* Gradient border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
      
      <div className="relative bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 overflow-hidden group-hover:shadow-xl transition-all duration-300">
        {/* Category Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg"
              style={{
                background: category.colorScheme?.gradient || 
                  `linear-gradient(135deg, ${category.colorScheme?.primary || '#3B82F6'} 0%, ${category.colorScheme?.secondary || '#1E40AF'} 100%)`,
              }}
            >
              <span className="text-white">{category.emoji}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                  {category.name}
                </h3>
                {getStatusIcon()}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                  {category.tag}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold">{category.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Image (if available) */}
        {(category.imageUrl || category.coverImage) && (
          <div className="mb-4 rounded-xl overflow-hidden">
            <div className="relative h-32 sm:h-40 bg-gradient-to-br from-gray-200 to-gray-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl">{category.emoji}</span>
              </div>
              {/* You could also use actual images when available:
              <img 
                src={category.imageUrl} 
                alt={category.name}
                className="w-full h-full object-cover"
              />
              */}
            </div>
          </div>
        )}

        {/* Category Description */}
        <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2">
          {category.shortDescription || category.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-blue-50 rounded-lg">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
            </div>
            <span>{category.items.toLocaleString()} items</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-1 bg-green-50 rounded-lg">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
            </div>
            {/* <span>{category.curators.toLocaleString()} curators</span> */}
          </div>
        </div>

        {/* Popular Tags */}
        {category.popularTags && category.popularTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {category.popularTags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-0.5 bg-gray-50 text-gray-700 rounded-lg text-xs"
              >
                {tag}
              </span>
            ))}
            {category.popularTags.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded-lg text-xs">
                +{category.popularTags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="px-2 py-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <span className="text-xs font-bold text-green-600">+{category.growth}%</span>
            </div>
            <span className="text-xs text-gray-500">Growth</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm font-medium text-gray-600 group-hover:text-blue-600">
            <span className="hidden sm:inline">Explore</span>
            <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-500 group-hover:text-white transition-all duration-300">
              <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}