// app/components/ProductCard.tsx
'use client';

import { useState } from 'react';
import { Star, Heart, ShoppingCart, Eye, Check } from 'lucide-react';
import Link from 'next/link';
import { useCart } from "../../lib/cart-context";
import { useWishlist } from '../../lib/wishlist-context';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
  currency?: string;
  reviewCount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  index?: number;
}

export default function ProductCard({ product, viewMode = 'grid', index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart, state: cartState } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const isProductInWishlist = isInWishlist(product.id);
  const isProductInCart = cartState.items.some(item => item.id === product.id);
  const cartItemQuantity = cartState.items.find(item => item.id === product.id)?.quantity || 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    setIsAddingToCart(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log("Adding to cart from ProductCard:", {
        id: product.id,
        name: product.name,
        price: product.price
      });
      
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        originalPrice: product.originalPrice,
        category: product.category,
        currency: product.currency || "USD"
      });
      
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (isProductInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        originalPrice: product.originalPrice,
        category: product.category
      });
    }
  };

  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // List view layout
  if (viewMode === 'list') {
    return (
      <div 
        className="flex flex-col lg:flex-row gap-4 p-4 sm:p-6 group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div className="relative w-full lg:w-48 h-48 lg:h-auto flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
          <Link href={`/products/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </Link>
          
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
              -{discount}%
            </div>
          )}
          
          {/* New Badge */}
          {product.isNew && (
            <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
              NEW
            </div>
          )}
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10 ${
              isProductInWishlist
                ? 'bg-red-500 text-white'
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart 
              className={`w-4 h-4 ${isProductInWishlist ? 'fill-current' : ''}`} 
            />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <Link href={`/products/${product.id}`}>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                {product.name}
              </h3>
            </Link>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
              {product.description || "No description available"}
            </p>
            
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.floor(Number(product.rating))
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {product.rating.toFixed(1)} ({product.reviewCount || 0} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="text-xl font-bold text-primary-600 dark:text-primary-400">
                ${product.price.toFixed(2)}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/products/${product.id}`}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Eye className="w-5 h-5" />
              </Link>
              
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || !product.inStock}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isProductInCart
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : isAddingToCart
                    ? 'bg-blue-500 text-white'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                } ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isProductInCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    {cartItemQuantity > 0 && `(${cartItemQuantity})`}
                  </>
                ) : isAddingToCart ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid view
  return (
    <div 
      className="p-4 sm:p-6 group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
          -{discount}%
        </div>
      )}
      
      {/* New Badge */}
      {product.isNew && (
        <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
          NEW
        </div>
      )}
      
      {/* Featured Badge */}
      {product.isFeatured && (
        <div className="absolute top-3 right-3 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
          FEATURED
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10 ${
          isProductInWishlist
            ? 'bg-red-500 text-white'
            : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white'
        }`}
      >
        <Heart 
          className={`w-4 h-4 ${isProductInWishlist ? 'fill-current' : ''}`} 
        />
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden rounded-xl mb-4 bg-gray-100 dark:bg-gray-700">
        <Link href={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        
        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center gap-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || !product.inStock}
            className={`p-3 rounded-full text-white transition-all duration-300 transform hover:scale-110 ${
              isProductInCart 
                ? 'bg-green-500' 
                : isAddingToCart 
                ? 'bg-blue-500' 
                : 'bg-primary-600 hover:bg-primary-700'
            } ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isProductInCart ? (
              <Check className="w-5 h-5" />
            ) : isAddingToCart ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </button>
          
          <Link
            href={`/products/${product.id}`}
            className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div className="space-y-1">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-gray-900 dark:text-white text-base line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              {product.name}
            </h3>
          </Link>
          
          {product.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
              {product.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.floor(Number(product.rating))
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {product.rating.toFixed(1)} ({product.reviewCount || 0})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-bold text-primary-600 dark:text-primary-400">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {!product.inStock && (
            <span className="text-xs text-red-600 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>

        {/* Add to Cart Button - Mobile */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart || !product.inStock}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            isProductInCart
              ? 'bg-green-500 text-white hover:bg-green-600'
              : isAddingToCart
              ? 'bg-blue-500 text-white'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          } ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isProductInCart ? (
            <>
              <Check className="w-4 h-4" />
              Added to Cart {cartItemQuantity > 0 && `(${cartItemQuantity})`}
            </>
          ) : isAddingToCart ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}