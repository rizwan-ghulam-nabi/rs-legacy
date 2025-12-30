// app/checkout/success/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useCart } from '../../lib/cart-context';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, Home, Mail, Package } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccess() {
  const { clearCart, state } = useCart();
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isCartCleared, setIsCartCleared] = useState(false);

  useEffect(() => {
    console.log('PaymentSuccess mounted - current cart state:', state);
    
    // Get order details from sessionStorage
    const checkoutData = sessionStorage.getItem('checkoutData');
    
    if (checkoutData) {
      const data = JSON.parse(checkoutData);
      setOrderDetails(data);
      
      // Clear cart only after successful payment
      if (!isCartCleared) {
        console.log('Clearing cart now...');
        clearCart();
        setIsCartCleared(true);
        
        // Clear session storage
        sessionStorage.removeItem('checkoutData');
        
        console.log("Cart cleared after successful payment");
        console.log("Order details:", data);
      }
    } else {
      console.log('No checkout data found, redirecting to cart');
      // If no checkout data, redirect to cart
      router.push('/cart');
    }
  }, [clearCart, router, isCartCleared, state]);

  // Debug: Log when component re-renders
  useEffect(() => {
    console.log('PaymentSuccess re-rendered, cart cleared:', isCartCleared);
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-32 h-32 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Payment Successful!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto"
          >
            Thank you for your purchase! Your order has been confirmed and will be shipped soon.
          </motion.p>

          {/* Order Summary */}
          {orderDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 max-w-md mx-auto border border-green-200 dark:border-green-800"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
                <Package className="w-5 h-5" />
                Order Confirmation
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Items:</span>
                  <span className="font-semibold">{orderDetails.itemCount} item(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
                  <span className="font-semibold text-green-600">Rs {orderDetails.total?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Order Date:</span>
                  <span className="font-semibold">
                    {new Date(orderDetails.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Order Status:</span>
                  <span className="font-semibold text-green-600">Confirmed</span>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/Product"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </Link>
            
            <Link
              href="/"
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-500 dark:text-gray-400 mt-8 text-sm"
          >
            A confirmation email has been sent to your email address.
          </motion.p>

          {/* Debug info - remove in production */}
          <div className="mt-8 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Debug Info:</strong> Cart cleared: {isCartCleared ? 'Yes' : 'No'} | 
              Items in cart: {state.items?.length || 0}
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}