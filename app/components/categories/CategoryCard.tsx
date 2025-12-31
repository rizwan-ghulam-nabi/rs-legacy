// components/CategoryCard.tsx (updated)
'use client';

import { Category } from '../../types/category';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../CategoryCard.module.css';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    router.push(`/categories/${category.slug}`);
  };

  return (
    <div 
      className={`${styles.categoryCard} ${isHovered ? styles.hovered : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.cardImage}>
        <img 
          src={category.image} 
          alt={category.name}
          className={`${styles.image} ${isHovered ? styles.zoomed : ''}`}
        />
        <div 
          className={styles.gradientOverlay}
          style={{ background: category.gradient }}
        />
        <div className={styles.iconBadge}>
          <span className={styles.icon}>{category.icon}</span>
        </div>
        {category.isFeatured && (
          <div className={styles.featuredBadge}>
            <span>Featured</span>
          </div>
        )}
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.categoryName}>{category.name}</h3>
        <p className={styles.categoryDescription}>{category.description}</p>
        
        <div className={styles.categoryStats}>
          <span className={styles.productCount}>
            {category.productCount} products
          </span>
        </div>

        <div className={styles.tagsContainer}>
          {category.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className={`${styles.actionButton} ${isHovered ? styles.active : ''}`}>
          <span>Explore Category</span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  );
}


// // components/categories/CategoryCard.tsx
// import { Heart, Star, ShoppingBag, ArrowRight } from 'lucide-react';
// import { Category } from '../../types/category';

// interface CategoryCardProps {
//   category: Category;
//   viewMode?: 'grid' | 'list';
// }

// export default function CategoryCard({ category, viewMode = 'grid' }: CategoryCardProps) {
//   if (viewMode === 'list') {
//     return (
//       <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
//         <div className="flex items-center p-6">
//           <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
//             <div className="text-2xl">{category.emoji}</div>
//           </div>
          
//           <div className="flex-1 ml-6">
//             <div className="flex items-start justify-between mb-2">
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//                   {category.name}
//                 </h3>
//                 <p className="text-gray-600 mt-1 line-clamp-2">{category.description}</p>
//               </div>
//               <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                 <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
//               </button>
//             </div>
            
//             <div className="flex items-center justify-between mt-4">
//               <div className="flex items-center gap-4">
//                 <span className="flex items-center gap-1 text-sm text-gray-600">
//                   <ShoppingBag className="w-4 h-4" />
//                   {category.items} items
//                 </span>
//                 <span className="flex items-center gap-1 text-sm text-gray-600">
//                   <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                   {category.rating}
//                 </span>
//                 <span className="text-sm px-3 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-full">
//                   {category.tag}
//                 </span>
//               </div>
              
//               <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all transform group-hover:-translate-x-1">
//                 Explore
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Grid View (default)
//   return (
//     <div className="group relative">
//       <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
      
//       <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
//         {/* Card Header with Image */}
//         <div className="relative h-48 overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-6xl transform group-hover:scale-110 transition-transform duration-300">
//               {category.emoji}
//             </div>
//           </div>
//           <div className="absolute top-4 right-4">
//             <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
//               <Heart className="w-5 h-5 text-white" />
//             </button>
//           </div>
//           <div className="absolute bottom-4 left-4">
//             <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
//               {category.tag}
//             </span>
//           </div>
//         </div>
        
//         {/* Card Content */}
//         <div className="p-6">
//           <div className="flex items-start justify-between mb-3">
//             <div>
//               <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//                 {category.name}
//               </h3>
//               <p className="text-gray-600 mt-1 text-sm line-clamp-2">{category.description}</p>
//             </div>
//             <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-lg">
//               <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//               <span className="font-bold text-amber-700">{category.rating}</span>
//             </div>
//           </div>
          
//           <div className="flex items-center justify-between mt-6">
//             <div className="flex items-center gap-4 text-sm text-gray-600">
//               <span className="flex items-center gap-1">
//                 <ShoppingBag className="w-4 h-4" />
//                 {category.items}
//               </span>
//               <span>•</span>
//               <span>{category.curators} curators</span>
//             </div>
            
//             <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all transform group-hover:-translate-x-1">
//               View
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }