// // app/orders/page.tsx
// "use client";

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   Package, 
//   Truck, 
//   CheckCircle, 
//   Clock,
//   Search,
//   Filter
// } from 'lucide-react';
// import Link from 'next/link';
// import Header from '../components/Header';

// // This would be a simplified version of the orders list
// // You can expand it with the full features from the previous implementation

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Mock data - replace with actual API call
//     const mockOrders = [
//       {
//         id: 'ORD-12345678',
//         date: new Date().toISOString(),
//         status: 'confirmed',
//         total: 149.97,
//         itemCount: 3
//       }
//       // Add more mock orders as needed
//     ];
    
//     setOrders(mockOrders);
//     setLoading(false);
//   }, []);

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-gray-50 pt-20">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
          
//           {orders.map((order) => (
//             <Link key={order.id} href={`/order/${order.id}`}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-white rounded-lg shadow p-6 mb-4 hover:shadow-md transition-shadow cursor-pointer"
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h3 className="font-semibold text-gray-900">Order {order.id}</h3>
//                     <p className="text-gray-600 text-sm">
//                       Placed on {new Date(order.date).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-bold text-gray-900">Rs. {order.total.toFixed(2)}</p>
//                     <p className="text-gray-600 text-sm">{order.itemCount} items</p>
//                   </div>
//                 </div>
//               </motion.div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// app/orders/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Package, 
  Search,
  Filter
} from 'lucide-react';
import Link from 'next/link';
import Header from '../components/Header';
import { useOrder } from '../lib/order-context';
import { Order } from '../types/order';

export default function OrdersPage() {
  const router = useRouter();
  const { orders } = useOrder();
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    let filtered = orders;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Sort by date (newest first)
    filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  if (orders.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Package className="w-32 h-32 text-gray-300 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">No Orders Yet</h1>
              <p className="text-gray-600 mb-8">You haven't placed any orders yet.</p>
              <Link
                href="/Product"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
              >
                Start Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600">View your order history and track shipments</p>
            </div>
            <Link
              href="/Product"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-xl px-4 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => router.push(`/order/${order.id}`)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.orderNumber}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-1">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''} • 
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Total: <span className="font-semibold text-gray-900">Rs. {order.total.toFixed(2)}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/order/${order.id}`);
                      }}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No orders found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}