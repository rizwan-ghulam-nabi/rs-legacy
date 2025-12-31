// // components/categories/WarmWelcome.tsx
// 'use client';

// import { motion } from 'framer-motion';
// import { Shield, Zap, Sparkles, ArrowRight } from 'lucide-react';

// export function WarmWelcome() {
//   const features = [
//     {
//       icon: <Zap className="w-6 h-6" />,
//       title: "Lightning Fast",
//       description: "Instant access to curated collections with optimized performance",
//       gradient: "from-cyan-500 to-blue-500",
//       bgGradient: "from-cyan-500/10 to-blue-500/10",
//       borderColor: "border-cyan-500/20",
//       delay: 0.1
//     },
//     {
//       icon: <Shield className="w-6 h-6" />,
//       title: "Premium Quality",
//       description: "Expertly curated products with uncompromising quality standards",
//       gradient: "from-purple-500 to-pink-500",
//       bgGradient: "from-purple-500/10 to-pink-500/10",
//       borderColor: "border-purple-500/20",
//       delay: 0.2
//     },
//     {
//       icon: <Sparkles className="w-6 h-6" />,
//       title: "Smart Curation",
//       description: "AI-powered recommendations tailored to your preferences",
//       gradient: "from-orange-500 to-amber-500",
//       bgGradient: "from-orange-500/10 to-amber-500/10",
//       borderColor: "border-orange-500/20",
//       delay: 0.3
//     }
//   ];

//   return (
//     <motion.section
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       className="relative container mx-auto px-4 mb-16"
//     >
//       {/* Background Effects */}
//       <div className="absolute inset-0 -top-8">
//         <motion.div
//           className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.5, 0.3],
//           }}
//           transition={{
//             duration: 4,
//             repeat: Infinity,
//             repeatType: "reverse",
//           }}
//         />
//         <motion.div
//           className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"
//           animate={{
//             scale: [1.2, 1, 1.2],
//             opacity: [0.4, 0.2, 0.4],
//           }}
//           transition={{
//             duration: 3,
//             repeat: Infinity,
//             repeatType: "reverse",
//             delay: 1,
//           }}
//         />
//       </div>

//       {/* Main Card */}
//       <div className="relative mt-2 w-screen  left-1/2 right-1/2 -mx-[50vw]">
//         {/* Glass Morphism Container */}
//         <div className="bg-gray-900/60 backdrop-blur-2xl rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
//           {/* Header Section */}
//           <div className="text-center px-8 pt-12 pb-8 border-b border-gray-700/50">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gray-800/50 border border-gray-700/50 mb-6"
//             >
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
//                 <span className="text-sm font-semibold text-cyan-400">WHY CHOOSE US</span>
//               </div>
//             </motion.div>
            
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="text-4xl md:text-5xl font-black tracking-tight mb-4"
//             >
//               <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//                 Experience The
//               </span>
//               <br />
//               <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
//                 Difference
//               </span>
//             </motion.h2>
            
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
//             >
//               Discover why thousands of customers trust us for their essential needs. 
//               We combine cutting-edge technology with uncompromising quality.
//             </motion.p>
//           </div>

//           {/* Features Grid */}
//           <div className="grid md:grid-cols-3 gap-8 p-8 lg:p-12">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={feature.title}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: feature.delay }}
//                 whileHover={{ 
//                   y: -8,
//                   transition: { duration: 0.3 }
//                 }}
//                 className="group relative"
//               >
//                 {/* Feature Card */}
//                 <div className={`relative bg-gradient-to-br ${feature.bgGradient} backdrop-blur-lg rounded-2xl border ${feature.borderColor} p-8 h-full transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-cyan-500/10`}>
                  
//                   {/* Icon Container */}
//                   <motion.div
//                     whileHover={{ 
//                       scale: 1.1,
//                       rotate: 5 
//                     }}
//                     className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white shadow-lg mb-6`}
//                   >
//                     {feature.icon}
//                   </motion.div>

//                   {/* Content */}
//                   <h3 className={`text-xl font-bold mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
//                     {feature.title}
//                   </h3>
                  
//                   <p className="text-gray-400 leading-relaxed font-light mb-6">
//                     {feature.description}
//                   </p>

//                   {/* CTA Arrow */}
//                   <motion.div
//                     className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 group-hover:text-cyan-400 transition-colors duration-300"
//                     whileHover={{ x: 5 }}
//                   >
//                     Learn more
//                     <ArrowRight className="w-4 h-4" />
//                   </motion.div>

//                   {/* Hover Effect */}
//                   <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/5 transition-all duration-500 pointer-events-none" />
                  
//                   {/* Shine Effect */}
//                   <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
//                     <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
//                   </div>
//                 </div>

//                 {/* Connecting Line (Desktop only) */}
//                 {index < features.length - 1 && (
//                   <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-600 to-gray-700 z-0" />
//                 )}
//               </motion.div>
//             ))}
//           </div>

//           {/* Footer CTA */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.6 }}
//             className="px-8 pb-12 text-center border-t border-gray-700/50 pt-8"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-2xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 inline-flex items-center gap-3"
//             >
//               <span>Start Exploring</span>
//               <ArrowRight className="w-5 h-5" />
//             </motion.button>
            
//             <p className="text-gray-500 text-sm mt-4 font-light">
//               Join 50,000+ satisfied customers worldwide
//             </p>
//           </motion.div>
//         </div>

//         {/* Floating Elements */}
//         <motion.div
//           className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400/20 rounded-full blur-sm"
//           animate={{
//             scale: [1, 1.5, 1],
//             opacity: [0.5, 0.8, 0.5],
//           }}
//           transition={{
//             duration: 3,
//             repeat: Infinity,
//           }}
//         />
//         <motion.div
//           className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400/20 rounded-full blur-sm"
//           animate={{
//             scale: [1.5, 1, 1.5],
//             opacity: [0.6, 0.3, 0.6],
//           }}
//           transition={{
//             duration: 4,
//             repeat: Infinity,
//             delay: 1,
//           }}
//         />
//       </div>
//     </motion.section>
//   );
// }



// components/categories/WarmWelcome.tsx
import { Sparkles, Heart, Users } from 'lucide-react';

export default function WarmWelcome() {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 mb-8 border border-blue-100">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome to Our Curated Collections! 👋</h2>
          </div>
          <p className="text-gray-700 mb-4">
            We've carefully organized thousands of products into beautiful categories to help you 
            discover exactly what you're looking for. Each collection is hand-picked by our 
            expert curators.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <Heart className="w-4 h-4 text-pink-500" />
              <span className="text-gray-700">Hand-picked by experts</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-gray-700">Community verified</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-gray-700">Updated daily</span>
            </div>
          </div>
        </div>
        
        <button className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 whitespace-nowrap">
          Start Exploring
        </button>
      </div>
    </div>
  );
}