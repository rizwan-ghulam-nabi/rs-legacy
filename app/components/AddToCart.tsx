// // components/AddToCart.tsx
// "use client";

// import { useState } from "react";
// import { ShoppingBag, Minus, Plus } from "lucide-react";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   currency: string,
//     size: "sm" | "md" | "lg";

// }

// interface AddToCartProps {
//   product: Product;
//   size: "sm" | "md" | "lg";
//   showQuantity?: boolean;
// }

// export default function AddToCart({ product, size = "md", showQuantity = false }: AddToCartProps) {
//   const [quantity, setQuantity] = useState(1);

//   const sizeClasses = {
//     sm: "px-3 py-1.5 text-sm",
//     md: "px-4 py-2 text-base",
//     lg: "px-6 py-3 text-lg"
//   };

//   const handleAddToCart = () => {
//     console.log("Added to cart:", { ...product, quantity });
//     // Add your cart logic here
//   };

//   return (
//     <div className="flex items-center gap-2">
//       {showQuantity && (
//         <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg">
//           <button
//             onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
//             className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-lg transition-colors"
//           >
//             <Minus className="w-4 h-4" />
//           </button>
//           <span className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium">
//             {quantity}
//           </span>
//           <button
//             onClick={() => setQuantity(prev => prev + 1)}
//             className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-lg transition-colors"
//           >
//             <Plus className="w-4 h-4" />
//           </button>
//         </div>
//       )}
//       <button
//         onClick={handleAddToCart}
//         className={`${sizeClasses[size]} flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105 flex-1`}
//       >
//         <ShoppingBag className="w-4 h-4" />
//         Add to Cart
//       </button>
//     </div>
//   );
// }




// components/AddToCart.tsx
"use client";

import { useState } from "react";
import { ShoppingBag, Minus, Plus, Check } from "lucide-react";
import { useCart } from "../lib/cart-context"; // Import your cart context
import { motion } from "framer-motion";

interface Product {
  id: number; // Note: Your cart context expects string, but product.id is number
  name: string;
  price: number;
  image: string;
  currency: string;
  size?: "sm" | "md" | "lg"; // Make optional
}

interface AddToCartProps {
  product: Product;
  size?: "sm" | "md" | "lg";
  showQuantity?: boolean;
  variant?: "default" | "icon" | "minimal";
}

export default function AddToCart({ 
  product, 
  size = "md", 
  showQuantity = false,
  variant = "default"
}: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  const handleAddToCart = () => {
    console.log("Adding to cart:", { 
      ...product, 
      quantity: showQuantity ? quantity : 1 
    });
    
    // Convert product.id to string for cart context
    const cartProduct = {
      id: String(product.id), // Convert to string
      name: product.name,
      price: product.price,
      image: product.image,
      currency: product.currency || "PKR"
    };
    
    // Add to cart using your cart context
    addToCart(cartProduct);
    
    // Show success feedback
    setIsAdded(true);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
      setQuantity(1); // Reset quantity
    }, 2000);
    
    // Optional: Trigger a custom event to update cart indicators
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Icon variant for product cards
  if (variant === "icon") {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToCart}
        className={`
          p-2 rounded-full 
          bg-gradient-to-r from-gray-900 to-gray-700 
          dark:from-white dark:to-gray-300
          text-white dark:text-gray-900 
          hover:opacity-90 
          transition-all 
          shadow-lg hover:shadow-xl
          ${size === "sm" ? "p-1.5" : size === "lg" ? "p-3" : "p-2"}
        `}
        aria-label="Add to cart"
      >
        {isAdded ? (
          <Check className={size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5"} />
        ) : (
          <ShoppingBag className={size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5"} />
        )}
      </motion.button>
    );
  }

  // Minimal variant for product listings
  if (variant === "minimal") {
    return (
      <button
        onClick={handleAddToCart}
        className={`
          ${sizeClasses[size]} 
          flex items-center justify-center gap-2 
          bg-gradient-to-r from-gray-900 to-gray-700 
          dark:from-white dark:to-gray-300
          text-white dark:text-gray-900 
          font-semibold 
          rounded-lg 
          hover:opacity-90 
          transition-all duration-300 
          hover:shadow-lg hover:scale-105 
          w-full
        `}
      >
        {isAdded ? (
          <>
            <Check className="w-4 h-4" />
            <span>Added!</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart</span>
          </>
        )}
      </button>
    );
  }

  // Default variant with quantity controls
  return (
    <div className="flex items-center gap-2 w-full">
      {showQuantity && (
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg">
          <button
            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-lg transition-colors"
            disabled={quantity <= 1}
          >
            <Minus className={`w-4 h-4 ${quantity <= 1 ? "text-gray-400" : "text-gray-700 dark:text-gray-300"}`} />
          </button>
          <span className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(prev => prev + 1)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-lg transition-colors"
          >
            <Plus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      )}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleAddToCart}
        className={`
          ${sizeClasses[size]} 
          flex items-center justify-center gap-2 
          bg-gradient-to-r from-gray-900 to-gray-700 
          dark:from-white dark:to-gray-300
          text-white dark:text-gray-900 
          font-semibold 
          rounded-lg 
          hover:opacity-90 
          transition-all duration-300 
          hover:shadow-lg 
          flex-1
          ${isAdded ? "bg-gradient-to-r from-green-600 to-emerald-600" : ""}
        `}
      >
        {isAdded ? (
          <>
            <Check className="w-4 h-4" />
            <span>Added!</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart</span>
          </>
        )}
      </motion.button>
    </div>
  );
}



