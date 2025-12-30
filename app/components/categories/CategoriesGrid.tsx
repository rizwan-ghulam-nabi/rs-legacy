// 'use client';

// import Link from 'next/link';
// import { Category } from '../../types/category';
// import { motion } from 'framer-motion';
// import { ArrowRight, ChevronRight } from 'lucide-react';

// interface CategoriesGridProps {
//   categories: Category[];
//   title?: string;
//   description?: string;
// }

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1
//     }
//   }
// };

// const itemVariants = {
//   hidden: { 
//     opacity: 0, 
//     y: 20 
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut"
//     }
//   }
// };

// export default function CategoriesGrid({ categories, title, description }: CategoriesGridProps) {
//   return (
//     <div className="max-w-7xl mx-auto">
//       {/* Header Section */}
//       {(title || description) && (
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           {title && (
//             <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
//               <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                 {title}
//               </span>
//             </h2>
//           )}
//           {description && (
//             <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
//               {description}
//             </p>
//           )}
//         </motion.div>
//       )}

//       {/* Categories Grid */}
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//       >
//         {categories.map((category, index) => (
//           <motion.div
//             key={category.id}
//             // variants={itemVariants}
//             whileHover={{ 
//               y: -8,
//               transition: { duration: 0.3 }
//             }}
//             className="group relative"
//           >
//             <Link href={`/categories/${category.slug}`}>
//               {/* Main Card */}
//               <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 h-full">
                
//                 {/* Background Glow Effect */}
//                 <div 
//                   className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                   style={{
//                     background: `radial-gradient(circle at center, ${category.color}15 0%, transparent 70%)`
//                   }}
//                 />
                
//                 {/* Image Section */}
//                 <div className="relative h-48 overflow-hidden">
//                   <motion.img
//                     src={category.image}
//                     alt={category.name}
//                     className="w-full h-full object-cover"
//                     whileHover={{ scale: 1.1 }}
//                     transition={{ duration: 0.6 }}
//                   />
                  
//                   {/* Gradient Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                  
//                   {/* Icon Badge */}
//                   <motion.div 
//                     className="absolute top-4 right-4 backdrop-blur-md bg-black/30 border border-gray-600/50 rounded-2xl w-14 h-14 flex items-center justify-center text-2xl shadow-2xl"
//                     whileHover={{ 
//                       scale: 1.1,
//                       rotate: 5 
//                     }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {category.icon}
//                   </motion.div>

//                   {/* Featured Badge */}
//                   {category.isFeatured && (
//                     <div className="absolute top-4 left-4 backdrop-blur-md bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full px-3 py-1">
//                       <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
//                         ⭐ Featured
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Content Section */}
//                 <div className="relative p-6">
//                   {/* Category Name */}
//                   <motion.h3 
//                     className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
//                     style={{
//                       background: category.gradient
//                     }}
//                   >
//                     {category.name}
//                   </motion.h3>

//                   {/* Description */}
//                   <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2 font-light">
//                     {category.description}
//                   </p>

//                   {/* Stats & CTA */}
//                   <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
//                     <div className="flex items-center gap-4">
//                       <span className="text-sm font-semibold text-cyan-400">
//                         {category.productCount}+ items
//                       </span>
                      
//                       {/* Tags */}
//                       {category.tags && category.tags.length > 0 && (
//                         <div className="hidden sm:flex gap-1">
//                           {category.tags.slice(0, 1).map((tag) => (
//                             <span
//                               key={tag}
//                               className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full border border-gray-600/50"
//                             >
//                               {tag}
//                             </span>
//                           ))}
//                         </div>
//                       )}
//                     </div>

//                     {/* CTA Arrow */}
//                     <motion.div
//                       className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-500 group-hover:text-white transition-all duration-300"
//                       whileHover={{ 
//                         scale: 1.1,
//                         x: 4 
//                       }}
//                     >
//                       <ChevronRight size={16} />
//                     </motion.div>
//                   </div>

//                   {/* Hover Border Effect */}
//                   <div 
//                     className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/10 transition-all duration-500 pointer-events-none"
//                   />
//                 </div>

//                 {/* Shine Effect */}
//                 <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
//                   <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
//                 </div>
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Empty State */}
//       {categories.length === 0 && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="text-center py-16"
//         >
//           <div className="text-6xl mb-4">🔍</div>
//           <h3 className="text-2xl font-semibold text-gray-300 mb-2">
//             No categories found
//           </h3>
//           <p className="text-gray-400 max-w-md mx-auto">
//             Try adjusting your search filters or browse our full collection.
//           </p>
//         </motion.div>
//       )}
//     </div>
//   );
// }


// components/categories/CategoriesGrid.tsx
'use client';

import { Category } from '../../types/category';
import  CategoryCard  from './CategoryCard';

interface CategoriesGridProps {
  categories: Category[];
  title?: string;
  description?: string;
}

export default function CategoriesGrid({ 
  categories, 
  title = "Our Collections",
  description = "Discover our carefully curated categories"
}: CategoriesGridProps) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
          {description}
        </p>
      </div>

      {/* Categories Grid - Full Width Responsive */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {categories.map((category) => (
          <CategoryCard 
            key={category.id} 
            category={category}
            // className="w-full h-full"
          />
        ))}
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💫</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            Coming Soon
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            We're working on bringing you amazing collections. Check back soon for updates!
          </p>
        </div>
      )}
    </div>
  );
}


