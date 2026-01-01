// components/categories/CategoriesGrid.tsx
'use client';

import { useState } from 'react';
import CategoryCard from './CategoryCard';
import { Filter } from 'lucide-react';
import { Category } from '../../types/category';

interface CategoriesGridProps {
  initialCategories: Category[];
}

export default function CategoriesGrid({ initialCategories }: CategoriesGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <>
      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'space-y-4'} gap-6`}>
        {/* {initialCategories.map((category: Category) => (
          // <CategoryCard 
          //   key={category.id} 
          //   category={category} 
          // />
        ))} */}
      </div>

      {initialCategories.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl shadow-lg border border-gray-100">
          <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No categories found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Try adjusting your filters or search term to find what you're looking for.
          </p>
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all">
            Clear All Filters
          </button>
        </div>
      )}
    </>
  );
}