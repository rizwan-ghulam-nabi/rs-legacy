// app/orders/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock,
  Search,
  Filter
} from 'lucide-react';
import Link from 'next/link';
import Header from '../components/Header';

// This would be a simplified version of the orders list
// You can expand it with the full features from the previous implementation

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockOrders = [
      {
        id: 'ORD-12345678',
        date: new Date().toISOString(),
        status: 'confirmed',
        total: 149.97,
        itemCount: 3
      }
      // Add more mock orders as needed
    ];
    
    setOrders(mockOrders);
    setLoading(false);
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
          
          {orders.map((order) => (
            <Link key={order.id} href={`/order/${order.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow p-6 mb-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900">Order {order.id}</h3>
                    <p className="text-gray-600 text-sm">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">Rs. {order.total.toFixed(2)}</p>
                    <p className="text-gray-600 text-sm">{order.itemCount} items</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}