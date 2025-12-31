// // components/categories/HeroSection.tsx
// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// export function HeroSection() {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // Modern gradient animation data
//   const gradients = [
//     'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
//     'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
//     'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
//     'linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)',
//     'linear-gradient(45deg, #fa709a 0%, #fee140 100%)',
//   ];

//   if (!isMounted) {
//     return (
//       <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//         <div className="relative container mx-auto px-4 py-24 lg:py-32">
//           <div className="max-w-4xl mx-auto text-center space-y-8">
//             <div className="space-y-4">
//               <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                 Discover
//               </h1>
//               <p className="text-2xl md:text-3xl text-gray-300 font-light leading-relaxed">
//                 Collections curated with precision and passion
//               </p>
//             </div>
//             <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
//               Explore innovative products designed to elevate your everyday experience.
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="relative overflow-hidden bg-slate-900 min-h-[80vh] flex items-center">
//       {/* Modern Animated Background */}
//       <div className="absolute inset-0">
//         {/* Animated gradient orbs */}
//         <motion.div
//           className="absolute top-1/4 -left-10 w-72 h-72 rounded-full blur-3xl opacity-30"
//           animate={{
//             background: gradients,
//             x: [0, 100, 0],
//             y: [0, -50, 0],
//             scale: [1, 1.2, 1],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             repeatType: "reverse",
//           }}
//         />
        
//         <motion.div
//           className="absolute bottom-1/4 -right-10 w-96 h-96 rounded-full blur-3xl opacity-40"
//           animate={{
//             background: gradients,
//             x: [0, -80, 0],
//             y: [0, 60, 0],
//             scale: [1, 1.3, 1],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             repeatType: "reverse",
//             delay: 1,
//           }}
//         />

//         <motion.div
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-20"
//           animate={{
//             background: gradients,
//             scale: [1, 1.5, 1],
//           }}
//           transition={{
//             duration: 6,
//             repeat: Infinity,
//             repeatType: "reverse",
//           }}
//         />

//         {/* Grid pattern overlay */}
//         <div 
//           className="absolute inset-0 opacity-20"
//           style={{
//             backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
//                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
//             backgroundSize: '50px 50px',
//           }}
//         />

//         {/* Animated lines */}
//         <motion.div
//           className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"
//           initial={{ opacity: 0, x: -100 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//         />
//         <motion.div
//           className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"
//           initial={{ opacity: 0, x: 100 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//         />
//       </div>

//       {/* Floating particles */}
//       <div className="absolute inset-0 overflow-hidden">
//         {Array.from({ length: 20 }).map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 bg-white rounded-full"
//             initial={{
//               x: Math.random() * 100 + 'vw',
//               y: Math.random() * 100 + 'vh',
//             }}
//             animate={{
//               y: [0, -30, 0],
//               opacity: [0, 1, 0],
//             }}
//             transition={{
//               duration: 3 + Math.random() * 2,
//               repeat: Infinity,
//               delay: Math.random() * 2,
//             }}
//           />
//         ))}
//       </div>

//       {/* Content */}
//       <div className="relative container mx-auto px-4 py-24 lg:py-32">
//         <div className="max-w-4xl mx-auto text-center space-y-12">
//           {/* Main Title */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="space-y-6"
//           >
//             <motion.h1
//               className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
//                 DISCOVER
//               </span>
//             </motion.h1>

//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="space-y-4"
//             >
//               <p className="text-2xl md:text-4xl text-gray-300 font-light leading-tight tracking-wide">
//                 Collections curated with
//                 <motion.span
//                   className="inline-block ml-3 font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
//                   animate={{ 
//                     backgroundPosition: ['0%', '100%', '0%'],
//                   }}
//                   transition={{
//                     duration: 3,
//                     repeat: Infinity,
//                   }}
//                   style={{
//                     backgroundSize: '200% 100%',
//                   }}
//                 >
//                   precision and passion
//                 </motion.span>
//               </p>
//             </motion.div>
//           </motion.div>

//           {/* Subtitle */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//             className="space-y-6"
//           >
//             <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
//               Explore innovative products designed to elevate your everyday experience. 
//               Where technology meets elegance.
//             </p>

//             {/* CTA Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.8 }}
//               className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-2xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
//               >
          
//            <Link href={"/categories#collections-section"}>
//            <span>Explore Collections</span>
//            </Link> 
//               </motion.button>
              
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-2xl hover:bg-white/5 backdrop-blur-sm transition-all duration-300"
//               >
//                 View Featured
//               </motion.button>
//             </motion.div>
//           </motion.div>

//           {/* Stats */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 1 }}
//             className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto"
//           >
//             {[
//               { number: '500+', label: 'Products' },
//               { number: '50+', label: 'Brands' },
//               { number: '24/7', label: 'Support' },
//             ].map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
//                 className="text-center"
//               >
//                 <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//                   {stat.number}
//                 </div>
//                 <div className="text-sm text-gray-400 font-light mt-2 tracking-wide">
//                   {stat.label}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Scroll indicator */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 1.5 }}
//             className="pt-16"
//           >
//             <motion.div
//               animate={{ y: [0, 10, 0] }}
//               transition={{ duration: 2, repeat: Infinity }}
//               className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto flex justify-center"
//             >
//               <motion.div
//                 animate={{ y: [0, 12, 0] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//                 className="w-1 h-3 bg-gray-400 rounded-full mt-2"
//               />
//             </motion.div>
//             <p className="text-gray-500 text-sm mt-4 tracking-wide">Scroll to explore</p>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }




// components/categories/HeroSection.tsx
import { Search, Sparkles, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium text-white">New Collections Added Weekly</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Amazing</span> Categories
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore hand-picked collections curated by experts and enthusiasts. 
            Find exactly what inspires you.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for categories, products, or collections..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all">
              Search
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Trending: Home Decor, Tech Gadgets, Sustainable Fashion
            </span>
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20 text-gray-50" viewBox="0 0 1440 120" fill="currentColor">
          <path d="M0,96L48,90.7C96,85,192,75,288,69.3C384,64,480,64,576,74.7C672,85,768,107,864,112C960,117,1056,107,1152,96C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
}