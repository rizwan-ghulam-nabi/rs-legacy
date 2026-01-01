// app/components/OrderDetails.tsx - Updated with real address data
"use client";

import { useState, useEffect } from 'react';
import { useOrder } from '../../lib/order-context';
// import './OrderDetails.css';
import Link from 'next/link';

interface OrderDetailsProps {
  orderId: string;
}

interface Address {
  id: string;
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
  addressType?: 'home' | 'work' | 'other';
}

const OrderDetails = ({ orderId }: OrderDetailsProps) => {
  const { getOrder } = useOrder();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to get saved addresses from localStorage
  const getSavedAddresses = (): Address[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const savedAddresses = localStorage.getItem('userAddresses');
      if (savedAddresses) {
        return JSON.parse(savedAddresses);
      }
      
      // Fallback to checkout address if no saved addresses
      const checkoutAddress = localStorage.getItem('checkoutAddress');
      if (checkoutAddress) {
        const address = JSON.parse(checkoutAddress);
        return [address];
      }
      
      return [];
    } catch (error) {
      console.error('Error loading addresses:', error);
      return [];
    }
  };

  // Function to get the most recent shipping address
  const getRecentShippingAddress = (): Address | null => {
    const addresses = getSavedAddresses();
    if (addresses.length === 0) return null;

    // Try to get default address first
    const defaultAddress = addresses.find(addr => addr.isDefault);
    if (defaultAddress) return defaultAddress;

    // Otherwise return the most recently used (first in array)
    return addresses[0];
  };

  // Function to get address from order context or user's saved addresses
  const getOrderWithRealAddress = (orderData: any) => {
    const recentAddress = getRecentShippingAddress();
    
    if (!recentAddress) {
      return orderData; // Return original order data if no address found
    }

    // Merge real address data with order data
    return {
      ...orderData,
      shippingAddress: {
        name: recentAddress.name,
        street: recentAddress.street,
        city: recentAddress.city,
        state: recentAddress.state,
        zipCode: recentAddress.zipCode,
        country: recentAddress.country,
        phone: recentAddress.phone,
        email: recentAddress.email,
        addressType: recentAddress.addressType || 'home'
      },
      billingAddress: {
        name: recentAddress.name,
        street: recentAddress.street,
        city: recentAddress.city,
        state: recentAddress.state,
        zipCode: recentAddress.zipCode,
        country: recentAddress.country,
        addressType: recentAddress.addressType || 'home'
      }
    };
  };

  // Simulate real-time status updates
  useEffect(() => {
    if (!orderId) return;

    const loadOrder = () => {
      try {
        setLoading(true);
        
        // First try to get from order context (real order)
        const realOrder = getOrder(orderId);
        
        if (realOrder) {
          const orderWithRealAddress = getOrderWithRealAddress(realOrder);
          setOrder(orderWithRealAddress);
          setLoading(false);
          return;
        }

        // If no real order found, use mock data with real addresses
        const mockOrder = {
          id: orderId,
          orderNumber: orderId.startsWith('ORD-') ? orderId : `RS-${orderId}`,
          date: new Date().toISOString(),
          status: 'pending',
          total: 149.97,
          subtotal: 129.97,
          shipping: 15.00,
          tax: 5.00,
          paymentMethod: {
            type: 'jazzcash',
            brand: 'jazzcash'
          },
          items: [
            {
              id: '1',
              name: 'Vintage Racing Jacket',
              price: 89.99,
              quantity: 1,
              image: '/images/jacket.jpg',
              size: 'M',
              color: 'Red'
            },
            {
              id: '2',
              name: 'Performance Racing Gloves',
              price: 39.98,
              quantity: 2,
              image: '/images/gloves.jpg',
              size: 'L',
              color: 'Black'
            }
          ],
          tracking: {
            carrier: 'UPS',
            trackingNumber: `1Z${Date.now().toString().slice(-16)}`,
            status: 'pending',
            estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            history: [
              {
                date: new Date().toISOString(),
                status: 'Order Placed',
                location: 'Warehouse',
                description: 'Order received and being processed'
              }
            ]
          }
        };

        const orderWithRealAddress = getOrderWithRealAddress(mockOrder);
        setOrder(orderWithRealAddress);
        setLoading(false);
      } catch (err) {
        setError('Failed to load order details');
        setLoading(false);
      }
    };

    loadOrder();

    // Simulate real-time status updates
    const statusUpdates = [
      { status: 'confirmed', after: 10000, message: 'Order confirmed' },
      { status: 'processing', after: 30000, message: 'Processing order' },
      { status: 'shipped', after: 60000, message: 'Order shipped' },
    ];

    const timeouts: NodeJS.Timeout[] = [];

    statusUpdates.forEach((update, index) => {
      const timeout = setTimeout(() => {
        setOrder((prevOrder: any) => {
          if (!prevOrder) return prevOrder;
          
          const newHistory = {
            date: new Date().toISOString(),
            status: update.message,
            location: 'Processing Center',
            description: `Order ${update.message.toLowerCase()}`
          };

          return {
            ...prevOrder,
            status: update.status,
            tracking: prevOrder.tracking ? {
              ...prevOrder.tracking,
              status: update.status,
              history: [newHistory, ...prevOrder.tracking.history]
            } : undefined
          };
        });
      }, update.after);

      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [orderId, getOrder]);

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      pending: '#f39c12',
      confirmed: '#3498db',
      processing: '#9b59b6',
      shipped: '#27ae60',
      delivered: '#2ecc71',
      cancelled: '#e74c3c'
    };
    return statusColors[status] || '#95a5a6';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PKR'
    }).format(amount);
  };

  const getAddressTypeBadge = (addressType?: string) => {
    if (!addressType) return null;
    
    const typeConfig: { [key: string]: { label: string; color: string } } = {
      home: { label: 'Home', color: '#3498db' },
      work: { label: 'Work', color: '#27ae60' },
      other: { label: 'Other', color: '#95a5a6' }
    };
    
    const config = typeConfig[addressType] || typeConfig.other;
    
    return (
      <span 
        className="inline-block px-2 py-1 text-xs font-semibold text-white rounded-full"
        style={{ backgroundColor: config.color }}
      >
        {config.label}
      </span>
    );
  };

  // Function to handle address editing
  const handleEditAddress = () => {
    // Redirect to address management page or open address modal
    window.location.href = '/checkout/address';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600">Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-red-600">Error</h2>
        <p className="mb-6 text-gray-700">{error}</p>
        <button 
          onClick={() => window.history.back()}
          className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Order Not Found</h2>
        <p className="mb-6 text-gray-700">The order you're looking for doesn't exist.</p>
        <button 
          onClick={() => window.history.back()}
          className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl p-6 mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
        <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
          <div className="text-lg font-semibold text-gray-700">Order #: {order.orderNumber}</div>
          <div className="text-gray-600">Placed on: {formatDate(order.date)}</div>
        </div>
      </div>

      {/* Order Status */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div 
          className="inline-block px-4 py-2 mb-4 text-white rounded-full"
          style={{ backgroundColor: getStatusColor(order.status) }}
        >
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </div>
        <p className="text-gray-700">
          {order.status === 'pending' && 'Your order has been received and is being processed.'}
          {order.status === 'confirmed' && 'Your order has been confirmed and is being prepared.'}
          {order.status === 'processing' && 'Your order is being processed and will ship soon.'}
          {order.status === 'shipped' && 'Your order has been shipped and is on its way.'}
          {order.status === 'delivered' && 'Your order has been delivered.'}
          {order.status === 'cancelled' && 'Your order has been cancelled.'}
        </p>
      </div>

      {/* Order Items */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">Order Items</h2>
        <div className="space-y-6">
          {order.items.map((item: any) => (
            <div key={item.id} className="flex items-center p-4 border rounded-lg">
              <div className="w-24 h-24 mr-6 overflow-hidden rounded-lg">
                <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                <div className="mt-2 space-x-4 text-sm text-gray-600">
                  {item.size && <span>Size: {item.size}</span>}
                  {item.color && <span>Color: {item.color}</span>}
                </div>
                <div className="mt-2 text-gray-600">Quantity: {item.quantity}</div>
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {formatCurrency(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Information */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Shipping Information</h2>
          <button 
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
            onClick={handleEditAddress}
          >
            Edit Address
          </button>
        </div>
        <div className="p-6 border rounded-lg">
          <div className="flex items-center mb-4 space-x-3">
            <strong className="text-lg text-gray-900">{order.shippingAddress.name}</strong>
            {getAddressTypeBadge(order.shippingAddress.addressType)}
            {order.shippingAddress.isDefault && (
              <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">Default</span>
            )}
          </div>
          <p className="text-gray-700">{order.shippingAddress.street}</p>
          <p className="text-gray-700">
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
          </p>
          <p className="text-gray-700">{order.shippingAddress.country}</p>
          {order.shippingAddress.phone && (
            <p className="mt-2 text-gray-700">
              <span className="font-medium">Phone:</span> {order.shippingAddress.phone}
            </p>
          )}
          {order.shippingAddress.email && (
            <p className="text-gray-700">
              <span className="font-medium">Email:</span> {order.shippingAddress.email}
            </p>
          )}
        </div>
      </div>

      {/* Billing Information */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">Billing Information</h2>
        <div className="p-6 border rounded-lg">
          <div className="flex items-center mb-4 space-x-3">
            <strong className="text-lg text-gray-900">{order.billingAddress.name}</strong>
            {getAddressTypeBadge(order.billingAddress.addressType)}
          </div>
          <p className="text-gray-700">{order.billingAddress.street}</p>
          <p className="text-gray-700">
            {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}
          </p>
          <p className="text-gray-700">{order.billingAddress.country}</p>
          <div className="mt-4 text-gray-500">
            <small>Same as shipping address</small>
          </div>
        </div>
      </div>

      {/* Tracking Information */}
      {order.tracking && (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">Tracking Information</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 p-4 border rounded-lg md:grid-cols-2 lg:grid-cols-4">
              <span><strong className="font-medium">Carrier:</strong> {order.tracking.carrier}</span>
              <span><strong className="font-medium">Tracking #:</strong> {order.tracking.trackingNumber}</span>
              <span><strong className="font-medium">Status:</strong> {order.tracking.status}</span>
              <span><strong className="font-medium">Estimated Delivery:</strong> {formatDate(order.tracking.estimatedDelivery)}</span>
            </div>
            <div className="p-6 border rounded-lg">
              <h4 className="mb-6 text-xl font-semibold text-gray-900">Tracking History</h4>
              <div className="space-y-8">
                {order.tracking.history.map((event: any, index: number) => (
                  <div key={index} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      {index < order.tracking.history.length - 1 && (
                        <div className="flex-1 w-0.5 bg-gray-300"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="font-medium text-gray-900">{event.status}</div>
                      <div className="text-sm text-gray-600">{formatDate(event.date)}</div>
                      <div className="mt-1 text-gray-700">{event.location}</div>
                      <div className="mt-1 text-gray-600">{event.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Information */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">Payment Information</h2>
        <div className="grid grid-cols-1 gap-6 p-6 border rounded-lg md:grid-cols-2">
          <div>
            <strong className="font-medium">Payment Method:</strong>
            <div className="mt-2 text-gray-700">
              {order.paymentMethod.type === 'jazzcash' && 'JazzCash'}
              {order.paymentMethod.type === 'easypaisa' && 'EasyPaisa'}
              {order.paymentMethod.type === 'card' && `Credit Card ending in ${order.paymentMethod.lastFour}`}
              {!['jazzcash', 'easypaisa', 'card'].includes(order.paymentMethod.type) && 
                order.paymentMethod.type.charAt(0).toUpperCase() + order.paymentMethod.type.slice(1)
              }
            </div>
          </div>
          <div>
            <strong className="font-medium">Payment Status:</strong>
            <div className="inline-block px-3 py-1 mt-2 text-white bg-green-500 rounded-full">Paid</div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">Order Summary</h2>
        <div className="p-6 border rounded-lg">
          <div className="flex justify-between py-3 border-b">
            <span>Subtotal ({order.items.length} items):</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span>Shipping:</span>
            <span>{formatCurrency(order.shipping)}</span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span>Tax:</span>
            <span>{formatCurrency(order.tax)}</span>
          </div>
          <div className="flex justify-between py-3 text-xl font-bold">
            <span>Total:</span>
            <span>{formatCurrency(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button 
          className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          onClick={() => window.print()}
        >
          Print Order
        </button>
        <button className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
          <Link href="/checkout/payment" className="text-inherit no-underline hover:text-inherit">
            Back to Orders
          </Link>
        </button>
        {order.status === 'delivered' && (
          <button className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Request Return
          </button>
        )}
        {order.status === 'pending' && (
          <button className="px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700">
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;

// // app/components/OrderDetails.tsx - With Tailwind CSS
// "use client";

// import { useState, useEffect } from 'react';
// import { useOrder } from '../../lib/order-context';
// import Link from 'next/link';
// import { 
//   Package, 
//   Truck, 
//   CheckCircle, 
//   Clock, 
//   MapPin, 
//   CreditCard,
//   Printer,
//   ArrowLeft,
//   Home,
//   Building,
//   Navigation,
//   Phone,
//   Mail,
//   Calendar,
//   User,
//   DollarSign,
//   ShoppingBag,
//   RefreshCw,
//   XCircle
// } from 'lucide-react';

// interface OrderDetailsProps {
//   orderId: string;
// }

// interface Address {
//   id: string;
//   name: string;
//   phone: string;
//   email: string;
//   street: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   country: string;
//   isDefault?: boolean;
//   addressType?: 'home' | 'work' | 'other';
// }

// const OrderDetails = ({ orderId }: OrderDetailsProps) => {
//   const { getOrder } = useOrder();
//   const [order, setOrder] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Function to get saved addresses from localStorage
//   const getSavedAddresses = (): Address[] => {
//     if (typeof window === 'undefined') return [];
    
//     try {
//       const savedAddresses = localStorage.getItem('userAddresses');
//       if (savedAddresses) {
//         return JSON.parse(savedAddresses);
//       }
      
//       // Fallback to checkout address if no saved addresses
//       const checkoutAddress = localStorage.getItem('checkoutAddress');
//       if (checkoutAddress) {
//         const address = JSON.parse(checkoutAddress);
//         return [address];
//       }
      
//       return [];
//     } catch (error) {
//       console.error('Error loading addresses:', error);
//       return [];
//     }
//   };

//   // Function to get the most recent shipping address
//   const getRecentShippingAddress = (): Address | null => {
//     const addresses = getSavedAddresses();
//     if (addresses.length === 0) return null;

//     // Try to get default address first
//     const defaultAddress = addresses.find(addr => addr.isDefault);
//     if (defaultAddress) return defaultAddress;

//     // Otherwise return the most recently used (first in array)
//     return addresses[0];
//   };

//   // Function to get address from order context or user's saved addresses
//   const getOrderWithRealAddress = (orderData: any) => {
//     const recentAddress = getRecentShippingAddress();
    
//     if (!recentAddress) {
//       return orderData; // Return original order data if no address found
//     }

//     // Merge real address data with order data
//     return {
//       ...orderData,
//       shippingAddress: {
//         name: recentAddress.name,
//         street: recentAddress.street,
//         city: recentAddress.city,
//         state: recentAddress.state,
//         zipCode: recentAddress.zipCode,
//         country: recentAddress.country,
//         phone: recentAddress.phone,
//         email: recentAddress.email,
//         addressType: recentAddress.addressType || 'home'
//       },
//       billingAddress: {
//         name: recentAddress.name,
//         street: recentAddress.street,
//         city: recentAddress.city,
//         state: recentAddress.state,
//         zipCode: recentAddress.zipCode,
//         country: recentAddress.country,
//         addressType: recentAddress.addressType || 'home'
//       }
//     };
//   };

//   // Simulate real-time status updates
//   useEffect(() => {
//     if (!orderId) return;

//     const loadOrder = () => {
//       try {
//         setLoading(true);
        
//         // First try to get from order context (real order)
//         const realOrder = getOrder(orderId);
        
//         if (realOrder) {
//           const orderWithRealAddress = getOrderWithRealAddress(realOrder);
//           setOrder(orderWithRealAddress);
//           setLoading(false);
//           return;
//         }

//         // If no real order found, use mock data with real addresses
//         const mockOrder = {
//           id: orderId,
//           orderNumber: orderId.startsWith('ORD-') ? orderId : `RS-${orderId}`,
//           date: new Date().toISOString(),
//           status: 'pending',
//           total: 149.97,
//           subtotal: 129.97,
//           shipping: 15.00,
//           tax: 5.00,
//           paymentMethod: {
//             type: 'jazzcash',
//             brand: 'jazzcash'
//           },
//           items: [
//             {
//               id: '1',
//               name: 'Vintage Racing Jacket',
//               price: 89.99,
//               quantity: 1,
//               image: '/images/jacket.jpg',
//               size: 'M',
//               color: 'Red'
//             },
//             {
//               id: '2',
//               name: 'Performance Racing Gloves',
//               price: 39.98,
//               quantity: 2,
//               image: '/images/gloves.jpg',
//               size: 'L',
//               color: 'Black'
//             }
//           ],
//           tracking: {
//             carrier: 'UPS',
//             trackingNumber: `1Z${Date.now().toString().slice(-16)}`,
//             status: 'pending',
//             estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
//             history: [
//               {
//                 date: new Date().toISOString(),
//                 status: 'Order Placed',
//                 location: 'Warehouse',
//                 description: 'Order received and being processed'
//               }
//             ]
//           }
//         };

//         const orderWithRealAddress = getOrderWithRealAddress(mockOrder);
//         setOrder(orderWithRealAddress);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load order details');
//         setLoading(false);
//       }
//     };

//     loadOrder();

//     // Simulate real-time status updates
//     const statusUpdates = [
//       { status: 'confirmed', after: 10000, message: 'Order confirmed' },
//       { status: 'processing', after: 30000, message: 'Processing order' },
//       { status: 'shipped', after: 60000, message: 'Order shipped' },
//     ];

//     const timeouts: NodeJS.Timeout[] = [];

//     statusUpdates.forEach((update, index) => {
//       const timeout = setTimeout(() => {
//         setOrder((prevOrder: any) => {
//           if (!prevOrder) return prevOrder;
          
//           const newHistory = {
//             date: new Date().toISOString(),
//             status: update.message,
//             location: 'Processing Center',
//             description: `Order ${update.message.toLowerCase()}`
//           };

//           return {
//             ...prevOrder,
//             status: update.status,
//             tracking: prevOrder.tracking ? {
//               ...prevOrder.tracking,
//               status: update.status,
//               history: [newHistory, ...prevOrder.tracking.history]
//             } : undefined
//           };
//         });
//       }, update.after);

//       timeouts.push(timeout);
//     });

//     return () => {
//       timeouts.forEach(timeout => clearTimeout(timeout));
//     };
//   }, [orderId, getOrder]);

//   const getStatusColor = (status: string) => {
//     const statusColors: { [key: string]: string } = {
//       pending: 'bg-yellow-100 text-yellow-800',
//       confirmed: 'bg-blue-100 text-blue-800',
//       processing: 'bg-purple-100 text-purple-800',
//       shipped: 'bg-green-100 text-green-800',
//       delivered: 'bg-emerald-100 text-emerald-800',
//       cancelled: 'bg-red-100 text-red-800'
//     };
//     return statusColors[status] || 'bg-gray-100 text-gray-800';
//   };

//   const getStatusIcon = (status: string) => {
//     const icons: { [key: string]: any } = {
//       pending: Clock,
//       confirmed: CheckCircle,
//       processing: RefreshCw,
//       shipped: Truck,
//       delivered: CheckCircle,
//       cancelled: XCircle
//     };
//     return icons[status] || Package;
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'PKR'
//     }).format(amount);
//   };

//   const getAddressTypeIcon = (addressType?: string) => {
//     const icons: { [key: string]: any } = {
//       home: Home,
//       work: Building,
//       other: Navigation
//     };
//     const Icon = addressType ? icons[addressType] || Home : Home;
//     return <Icon className="w-4 h-4" />;
//   };

//   const getAddressTypeColor = (addressType?: string) => {
//     const colors: { [key: string]: string } = {
//       home: 'bg-blue-100 text-blue-800',
//       work: 'bg-green-100 text-green-800',
//       other: 'bg-gray-100 text-gray-800'
//     };
//     return colors[addressType || 'home'];
//   };

//   // Function to handle address editing
//   const handleEditAddress = () => {
//     // Redirect to address management page or open address modal
//     window.location.href = '/checkout/address';
//   };

//   if (loading) {
//     return (
//       <div className="min-h-[400px] flex flex-col items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
//         <p className="text-gray-600">Loading order details...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
//         <XCircle className="w-16 h-16 text-red-500 mb-4" />
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
//         <p className="text-gray-600 mb-6">{error}</p>
//         <button 
//           onClick={() => window.history.back()}
//           className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
//         <Package className="w-16 h-16 text-gray-400 mb-4" />
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
//         <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
//         <button 
//           onClick={() => window.history.back()}
//           className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const StatusIcon = getStatusIcon(order.status);

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//       {/* Order Header */}
//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
//           <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
//           <div className="flex items-center gap-2">
//             <button 
//               onClick={() => window.print()}
//               className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <Printer className="w-4 h-4" />
//               Print
//             </button>
//             <Link
//               href="/orders"
//               className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               Back to Orders
//             </Link>
//           </div>
//         </div>
//         <div className="flex flex-wrap items-center gap-4 text-gray-600">
//           <div className="flex items-center gap-2">
//             <span className="font-semibold">Order #:</span>
//             <span className="font-mono bg-gray-100 px-3 py-1 rounded">{order.orderNumber}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Calendar className="w-4 h-4" />
//             <span>Placed on: {formatDate(order.date)}</span>
//           </div>
//         </div>
//       </div>

//       {/* Order Status */}
//       <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
//         <div className="flex items-center gap-4 mb-4">
//           <div className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 ${getStatusColor(order.status)}`}>
//             <StatusIcon className="w-4 h-4" />
//             {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//           </div>
//         </div>
//         <p className="text-gray-700">
//           {order.status === 'pending' && 'Your order has been received and is being processed.'}
//           {order.status === 'confirmed' && 'Your order has been confirmed and is being prepared.'}
//           {order.status === 'processing' && 'Your order is being processed and will ship soon.'}
//           {order.status === 'shipped' && 'Your order has been shipped and is on its way.'}
//           {order.status === 'delivered' && 'Your order has been delivered.'}
//           {order.status === 'cancelled' && 'Your order has been cancelled.'}
//         </p>
//       </div>

//       {/* Order Items */}
//       <div className="mb-8">
//         <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//           <ShoppingBag className="w-5 h-5" />
//           Order Items
//         </h2>
//         <div className="space-y-4">
//           {order.items.map((item: any) => (
//             <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
//               <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
//                 <Package className="w-8 h-8 text-purple-600" />
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
//                 <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
//                   {item.size && <span className="bg-gray-100 px-2 py-1 rounded">Size: {item.size}</span>}
//                   {item.color && <span className="bg-gray-100 px-2 py-1 rounded">Color: {item.color}</span>}
//                   <span className="bg-gray-100 px-2 py-1 rounded">Quantity: {item.quantity}</span>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="text-lg font-bold text-gray-900">{formatCurrency(item.price * item.quantity)}</p>
//                 <p className="text-sm text-gray-500">Unit: {formatCurrency(item.price)}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Shipping Information */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//             <MapPin className="w-5 h-5" />
//             Shipping Information
//           </h2>
//           <button 
//             onClick={handleEditAddress}
//             className="text-purple-600 hover:text-purple-800 font-medium"
//           >
//             Edit Address
//           </button>
//         </div>
//         <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
//           <div className="flex items-center gap-3 mb-4">
//             <User className="w-5 h-5 text-gray-600" />
//             <strong className="text-lg">{order.shippingAddress.name}</strong>
//             <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getAddressTypeColor(order.shippingAddress.addressType)}`}>
//               {getAddressTypeIcon(order.shippingAddress.addressType)}
//               {order.shippingAddress.addressType?.charAt(0).toUpperCase() + order.shippingAddress.addressType?.slice(1)}
//             </span>
//             {order.shippingAddress.isDefault && (
//               <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
//                 Default
//               </span>
//             )}
//           </div>
//           <div className="space-y-2 text-gray-700">
//             <p>{order.shippingAddress.street}</p>
//             <p>
//               {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
//             </p>
//             <p>{order.shippingAddress.country}</p>
//             {order.shippingAddress.phone && (
//               <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
//                 <Phone className="w-4 h-4 text-gray-500" />
//                 <span className="font-medium">Phone:</span>
//                 <span>{order.shippingAddress.phone}</span>
//               </div>
//             )}
//             {order.shippingAddress.email && (
//               <div className="flex items-center gap-2">
//                 <Mail className="w-4 h-4 text-gray-500" />
//                 <span className="font-medium">Email:</span>
//                 <span>{order.shippingAddress.email}</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Billing Information */}
//       <div className="mb-8">
//         <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//           <CreditCard className="w-5 h-5" />
//           Billing Information
//         </h2>
//         <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
//           <div className="flex items-center gap-3 mb-4">
//             <User className="w-5 h-5 text-gray-600" />
//             <strong className="text-lg">{order.billingAddress.name}</strong>
//             <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getAddressTypeColor(order.billingAddress.addressType)}`}>
//               {getAddressTypeIcon(order.billingAddress.addressType)}
//               {order.billingAddress.addressType?.charAt(0).toUpperCase() + order.billingAddress.addressType?.slice(1)}
//             </span>
//           </div>
//           <div className="space-y-2 text-gray-700">
//             <p>{order.billingAddress.street}</p>
//             <p>
//               {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}
//             </p>
//             <p>{order.billingAddress.country}</p>
//           </div>
//           <div className="mt-4 pt-4 border-t border-gray-200">
//             <p className="text-sm text-gray-500">Same as shipping address</p>
//           </div>
//         </div>
//       </div>

//       {/* Tracking Information */}
//       {order.tracking && (
//         <div className="mb-8">
//           <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//             <Truck className="w-5 h-5" />
//             Tracking Information
//           </h2>
//           <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-gray-200">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               <div className="space-y-2">
//                 <p className="text-gray-700">
//                   <strong className="text-gray-900">Carrier:</strong> {order.tracking.carrier}
//                 </p>
//                 <p className="text-gray-700">
//                   <strong className="text-gray-900">Status:</strong> 
//                   <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                     {order.tracking.status}
//                   </span>
//                 </p>
//               </div>
//               <div className="space-y-2">
//                 <p className="text-gray-700">
//                   <strong className="text-gray-900">Tracking #:</strong> 
//                   <span className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded">
//                     {order.tracking.trackingNumber}
//                   </span>
//                 </p>
//                 <p className="text-gray-700">
//                   <strong className="text-gray-900">Est. Delivery:</strong> 
//                   <span className="ml-2">{formatDate(order.tracking.estimatedDelivery)}</span>
//                 </p>
//               </div>
//             </div>
            
//             <div className="border-t border-gray-200 pt-6">
//               <h4 className="font-semibold text-gray-900 mb-4">Tracking History</h4>
//               <div className="space-y-4">
//                 {order.tracking.history.map((event: any, index: number) => (
//                   <div key={index} className="flex gap-4">
//                     <div className="relative">
//                       <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
//                       {index < order.tracking.history.length - 1 && (
//                         <div className="absolute top-3 left-1.5 w-0.5 h-8 bg-gray-300"></div>
//                       )}
//                     </div>
//                     <div className="flex-1 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
//                       <div className="font-medium text-gray-900">{event.status}</div>
//                       <div className="text-sm text-gray-600 mb-1">{formatDate(event.date)}</div>
//                       <div className="text-sm text-gray-700">{event.location}</div>
//                       <div className="text-sm text-gray-500">{event.description}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Payment Information */}
//       <div className="mb-8">
//         <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//           <DollarSign className="w-5 h-5" />
//           Payment Information
//         </h2>
//         <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-gray-200">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <p className="text-gray-700 mb-2">
//                 <strong className="text-gray-900">Payment Method:</strong>
//               </p>
//               <div className="flex items-center gap-2">
//                 {order.paymentMethod.type === 'jazzcash' && (
//                   <span className="px-3 py-1.5 bg-orange-100 text-orange-800 rounded-lg font-medium">
//                     JazzCash
//                   </span>
//                 )}
//                 {order.paymentMethod.type === 'easypaisa' && (
//                   <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg font-medium">
//                     EasyPaisa
//                   </span>
//                 )}
//                 {order.paymentMethod.type === 'card' && (
//                   <span className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-lg font-medium">
//                     Credit Card ending in {order.paymentMethod.lastFour}
//                   </span>
//                 )}
//                 {!['jazzcash', 'easypaisa', 'card'].includes(order.paymentMethod.type) && (
//                   <span className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-lg font-medium">
//                     {order.paymentMethod.type.charAt(0).toUpperCase() + order.paymentMethod.type.slice(1)}
//                   </span>
//                 )}
//               </div>
//             </div>
//             <div>
//               <p className="text-gray-700 mb-2">
//                 <strong className="text-gray-900">Payment Status:</strong>
//               </p>
//               <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg font-medium">
//                 <CheckCircle className="w-4 h-4" />
//                 Paid
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Order Summary */}
//       <div className="mb-8">
//         <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
//         <div className="bg-gray-50 rounded-xl p-6">
//           <div className="space-y-3 max-w-md ml-auto">
//             <div className="flex justify-between text-gray-700">
//               <span>Subtotal ({order.items.length} items):</span>
//               <span className="font-medium">{formatCurrency(order.subtotal)}</span>
//             </div>
//             <div className="flex justify-between text-gray-700">
//               <span>Shipping:</span>
//               <span className="font-medium">{formatCurrency(order.shipping)}</span>
//             </div>
//             <div className="flex justify-between text-gray-700">
//               <span>Tax:</span>
//               <span className="font-medium">{formatCurrency(order.tax)}</span>
//             </div>
//             <div className="pt-3 border-t border-gray-300">
//               <div className="flex justify-between text-lg font-bold text-gray-900">
//                 <span>Total:</span>
//                 <span>{formatCurrency(order.total)}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex flex-wrap gap-4">
//         <button 
//           onClick={() => window.print()}
//           className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//         >
//           <Printer className="w-4 h-4" />
//           Print Order
//         </button>
//         <Link
//           href="/orders"
//           className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Back to Orders
//         </Link>
//         {order.status === 'delivered' && (
//           <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
//             Request Return
//           </button>
//         )}
//         {order.status === 'pending' && (
//           <button className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
//             Cancel Order
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;