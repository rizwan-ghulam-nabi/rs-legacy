// // app/components/ProductCard.tsx
// 'use client';
// import { useState } from 'react';
// import { Product } from '../../types/wishlist';
// import { Star, Heart, ShoppingCart, Eye, Check } from 'lucide-react';
// import Link from 'next/link';
// import { useCart } from "../../lib/cart-context";
// import { useWishlist } from '../../lib/wishlist-context';

// interface Products {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   rating: number;
//   inStock: boolean;
// }
// interface ProductCardProps {
//   product: Product;
  
// }




// export default function ProductCard({ product  }: ProductCardProps) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const { addToCart, state: cartState } = useCart();
//   const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

//   const isProductInWishlist = isInWishlist(product.id);
//   const isProductInCart = cartState.items.some(item => item.id === product.id);

//   const handleAddToCart = async () => {
//     setIsAddingToCart(true);
//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 500));
    
//     addToCart({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       image: product.image,
//       originalPrice: product.originalPrice,
//       category: product.category,
//       currency:product.currency
//     });
    
//     setIsAddingToCart(false);
//   };

//   const handleWishlistToggle = () => {
//     if (isProductInWishlist) {
//       removeFromWishlist(product.id);
//     } else {
//       addToWishlist({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         originalPrice: product.originalPrice,
//         category: product.category
//       });
//     }
//   };

//   const discount = product.originalPrice 
//     ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//     : 0;

//   return (
//     <div 
//       className="card p-4 sm:p-6 group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Discount Badge */}
//       {discount > 0 && (
//         <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
//           -{discount}%
//         </div>
//       )}

//       {/* Wishlist Button */}
//       <button
//         onClick={handleWishlistToggle}
//         className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10 ${
//           isProductInWishlist
//             ? 'bg-red-500 text-white'
//             : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
//         }`}
//       >
//         <Heart 
//           className={`w-4 h-4 ${isProductInWishlist ? 'fill-current' : ''}`} 
//         />
//       </button>

//       {/* Product Image */}
//       <div className="relative overflow-hidden rounded-xl mb-4 bg-gray-100">
//         <Link href={`/Product/${product.id}`}>
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
//           />
//         </Link>
        
//         {/* Quick Actions Overlay */}
//         <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300 ${
//           isHovered ? 'opacity-100' : 'opacity-0'
//         }`}>
//           <button
//             onClick={handleAddToCart}
//             disabled={isAddingToCart || !product.inStock}
//             className={`p-3 rounded-full text-white transition-all duration-300 transform hover:scale-110 ${
//               isProductInCart 
//                 ? 'bg-green-500' 
//                 : isAddingToCart 
//                 ? 'bg-blue-500' 
//                 : 'bg-primary-600 hover:bg-primary-700'
//             } ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {isProductInCart ? (
//               <Check className="w-5 h-5" />
//             ) : isAddingToCart ? (
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//             ) : (
//               <ShoppingCart className="w-5 h-5" />
//             )}
//           </button>
          
//           <Link
//             href={`/product/${product.id}`}
//             className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
//           >
//             <Eye className="w-5 h-5" />
//           </Link>
//         </div>
//       </div>

//       {/* Product Info */}
//       <div className="space-y-2">
//         <Link href={`/product/${product.id}`}>
//           <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 hover:text-primary-600 transition-colors">
//             {product.name}
//           </h3>
//         </Link>
        
//         <div className="flex items-center gap-2">
//           <div className="flex items-center">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <Star
//                 key={star}
//                 className={`w-3 h-3 sm:w-4 sm:h-4 ${
//                   star <= Math.floor(Number(product.rating))
//                     ? 'fill-yellow-400 text-yellow-400'
//                     : 'text-gray-300'
//                 }`}
//               />
//             ))}
//             {/* <span className="text-xs text-gray-600 ml-1">({product.reviewCount})</span> */}
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <span className="text-lg sm:text-xl font-bold text-primary-600">
//               ${product.price.toFixed(2)}
//             </span>
//             {product.originalPrice && product.originalPrice > product.price && (
//               <span className="text-sm text-gray-500 line-through">
//                 ${product.originalPrice.toFixed(2)}
//               </span>
//             )}
//           </div>
          
//           {!product.inStock && (
//             <span className="text-xs text-red-600 font-semibold bg-red-50 px-2 py-1 rounded">
//               Out of Stock
//             </span>
//           )}
//         </div>

//         {/* Add to Cart Button - Mobile */}
//         <button
//           onClick={handleAddToCart}
//           disabled={isAddingToCart || !product.inStock}
//           className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
//             isProductInCart
//               ? 'bg-green-500 text-white hover:bg-green-600'
//               : isAddingToCart
//               ? 'bg-blue-500 text-white'
//               : 'bg-primary-600 text-white hover:bg-primary-700'
//           } ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
//         >
//           {isProductInCart ? (
//             <>
//               <Check className="w-4 h-4" />
//               Added to Cart
//             </>
//           ) : isAddingToCart ? (
//             <>
//               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               Adding...
//             </>
//           ) : (
//             <>
//               <ShoppingCart className="w-4 h-4" />
//               Add to Cart
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }




// app/components/products/ProductGrid.tsx
'use client';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            {!product.inStock && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                Out of Stock
              </div>
            )}
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
            
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-rose-600">${product.price}</span>
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
              </div>
            </div>
            
            <button className="w-full mt-4 bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={!product.inStock}>
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}