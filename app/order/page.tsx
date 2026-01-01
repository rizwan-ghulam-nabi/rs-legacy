"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Package, 
  Search,
  Filter,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Truck,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import Header from '../components/Header';
import { useOrder } from '../lib/order-context';

export default function OrdersPage() {
  const router = useRouter();
  const { orders } = useOrder();
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    let filtered = [...orders];

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(order => 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Newest first
    });

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  // Calculate days since order
  const getDaysSinceOrder = (orderDate: string) => {
    const orderDateObj = new Date(orderDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - orderDateObj.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'pending':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '✓';
      case 'shipped':
        return '🚚';
      case 'processing':
        return '⏳';
      case 'pending':
        return '⏱️';
      case 'cancelled':
        return '✕';
      default:
        return '📦';
    }
  };

  if (orders.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="relative inline-block mb-8">
                <div className="w-40 h-40 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto">
                  <Package className="w-20 h-20 text-blue-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">0</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">No Orders Yet</h1>
              <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto">
                Start your shopping journey and your first order will appear here!
              </p>
              <Link
                href="/products"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
              >
                <span>Browse Products</span>
                <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
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
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                  My Orders
                </h1>
                <p className="text-slate-600 text-lg">
                  Track and manage your purchases
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl">
                  <Package className="w-5 h-5 text-slate-600" />
                  <span className="font-semibold text-slate-900">{orders.length}</span>
                  <span className="text-slate-600">orders</span>
                </div>
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-3 text-slate-700 hover:text-slate-900 font-semibold transition-all duration-300 hover:scale-105 transform"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total Spent</p>
                    <p className="text-2xl font-bold text-slate-900">
                      Rs. {orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Active Orders</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500/10 to-orange-400/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Items Ordered</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {orders.reduce((sum, order) => sum + order.items.length, 0)}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500/10 to-teal-400/10 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-emerald-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Latest Order</p>
                    <p className="text-lg font-bold text-slate-900 truncate">
                      {orders.length > 0 ? orders[0].orderNumber : 'N/A'}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500/10 to-pink-400/10 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-purple-500" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Filters Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-200"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by order number, customer name, or item..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all text-base"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-slate-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-slate-300 rounded-xl px-4 py-3.5 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all bg-white min-w-[180px]"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                {(searchTerm || statusFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                    }}
                    className="px-4 py-3.5 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 flex items-center justify-between"
          >
            <p className="text-slate-600">
              Showing <span className="font-semibold text-slate-900">{filteredOrders.length}</span> of{' '}
              <span className="font-semibold text-slate-900">{orders.length}</span> orders
            </p>
            {filteredOrders.length > 0 && (
              <button
                onClick={() => window.print()}
                className="text-sm text-slate-600 hover:text-slate-900 font-medium"
              >
                Print Orders
              </button>
            )}
          </motion.div>

          {/* Orders List */}
          <div className="space-y-6">
            {filteredOrders.map((order, index) => {
              const daysSince = getDaysSinceOrder(order.date);
              
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.005, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-300 cursor-pointer group"
                  onClick={() => router.push(`/order/${order.id}`)}
                >
                  <div className="p-6">
                    {/* Order Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Order #{order.orderNumber}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}>
                              <span className="mr-1.5">{getStatusIcon(order.status)}</span>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                            {daysSince === 0 && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                                Today
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-slate-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(order.date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            <span>{order.paymentMethod}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="lg:text-right">
                        <div className="text-2xl font-bold text-slate-900 mb-2">
                          Rs. {order.total.toFixed(2)}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/order/${order.id}`);
                          }}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 transform group-hover:from-blue-700 group-hover:to-cyan-600"
                        >
                          <span>View Details</span>
                          <ArrowLeft className="w-4 h-4 rotate-180" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Order Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Customer Info */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Customer Information
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-700">{order.customerName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-700">{order.customerEmail}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-700">{order.customerPhone}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Shipping Info */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Shipping Details
                        </h4>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                          <span className="text-slate-700 line-clamp-2">{order.customerAddress}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-700">{order.shippingMethod}</span>
                        </div>
                      </div>
                      
                      {/* Items Preview */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          Items Ordered
                        </h4>
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-3">
                            {order.items.slice(0, 4).map((item, idx) => (
                              <div 
                                key={idx} 
                                className="w-12 h-12 rounded-xl border-2 border-white shadow-sm overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200"
                                title={item.name}
                              >
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="w-5 h-5 text-slate-500" />
                                </div>
                              </div>
                            ))}
                            {order.items.length > 4 && (
                              <div className="w-12 h-12 rounded-xl border-2 border-white shadow-sm bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                                <span className="text-xs font-bold text-white">
                                  +{order.items.length - 4}
                                </span>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {order.items[0]?.name}
                              {order.items.length > 1 && ` + ${order.items.length - 1} more`}
                            </p>
                            <p className="text-sm text-slate-600">
                              Total: Rs. {order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Special Instructions */}
                    {order.specialInstructions && (
                      <div className="mt-6 pt-6 border-t border-slate-100">
                        <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Special Instructions
                        </h4>
                        <p className="text-slate-700 bg-slate-50 rounded-lg p-3 italic">
                          "{order.specialInstructions}"
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Empty Results */}
          {filteredOrders.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-200"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                No orders found
              </h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                {searchTerm.trim() 
                  ? `We couldn't find any orders matching "${searchTerm}"`
                  : `No orders found with status "${statusFilter}"`
                }
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg"
              >
                <RotateCcw className="w-5 h-5" />
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

// Add missing icon components
const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const User = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MessageSquare = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const RotateCcw = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);