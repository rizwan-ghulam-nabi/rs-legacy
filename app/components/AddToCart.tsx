// components/AddToCart.tsx
"use client";

import { useState } from "react";
import { ShoppingBag, Minus, Plus } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  currency: string,
    size: "sm" | "md" | "lg";

}

interface AddToCartProps {
  product: Product;
  size: "sm" | "md" | "lg";
  showQuantity?: boolean;
}

export default function AddToCart({ product, size = "md", showQuantity = false }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  const handleAddToCart = () => {
    console.log("Added to cart:", { ...product, quantity });
    // Add your cart logic here
  };

  return (
    <div className="flex items-center gap-2">
      {showQuantity && (
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg">
          <button
            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-lg transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(prev => prev + 1)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}
      <button
        onClick={handleAddToCart}
        className={`${sizeClasses[size]} flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105 flex-1`}
      >
        <ShoppingBag className="w-4 h-4" />
        Add to Cart
      </button>
    </div>
  );
}