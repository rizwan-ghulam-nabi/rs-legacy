// // app/lib/order-context.tsx
// "use client";

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { Order, OrderItem, ShippingAddress, BillingAddress, PaymentMethod } from '../types/order';

// interface OrderContextType {
//   orders: Order[];
//   addOrder: (order: Order) => void;
//   getOrder: (orderId: string) => Order | undefined;
//   updateOrderStatus: (orderId: string, status: Order['status']) => void;
// }

// const OrderContext = createContext<OrderContextType | undefined>(undefined);

// export const useOrder = () => {
//   const context = useContext(OrderContext);
//   if (context === undefined) {
//     throw new Error('useOrder must be used within an OrderProvider');
//   }
//   return context;
// };

// export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [orders, setOrders] = useState<Order[]>([]);

//   // Load orders from localStorage on mount
//   useEffect(() => {
//     const savedOrders = localStorage.getItem('rs_legacy_orders');
//     if (savedOrders) {
//       try {
//         const parsedOrders: Order[] = JSON.parse(savedOrders);
//         setOrders(parsedOrders);
//       } catch (error) {
//         console.error('Error loading orders from localStorage:', error);
//         setOrders([]);
//       }
//     }
//   }, []);

//   // Save orders to localStorage whenever orders change
//   useEffect(() => {
//     localStorage.setItem('rs_legacy_orders', JSON.stringify(orders));
//   }, [orders]);

//   const addOrder = (order: Order) => {
//     setOrders(prev => {
//       const existingOrderIndex = prev.findIndex(o => o.id === order.id);
//       if (existingOrderIndex >= 0) {
//         // Update existing order
//         const updated = [...prev];
//         updated[existingOrderIndex] = order;
//         return updated;
//       } else {
//         // Add new order
//         return [order, ...prev];
//       }
//     });
//   };

//   const getOrder = (orderId: string): Order | undefined => {
//     return orders.find(order => order.id === orderId);
//   };

//   const updateOrderStatus = (orderId: string, status: Order['status']) => {
//     setOrders(prev => prev.map(order => 
//       order.id === orderId ? { ...order, status } : order
//     ));
//   };

//   return (
//     <OrderContext.Provider value={{ orders, addOrder, getOrder, updateOrderStatus }}>
//       {children}
//     </OrderContext.Provider>
//   );
// };




// app/lib/order-context.tsx (update existing or create new)
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useEmailJs } from '../providers/EmailJsProvider';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: string;
  paymentMethod: string;
  shippingMethod: string;
  specialInstructions?: string;
  date: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status'>) => Promise<string>;
  getOrderById: (id: string) => Order | undefined;
  clearOrders: () => void;
  getOrder: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const { sendOrderEmail } = useEmailJs();

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const generateOrderNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD-${timestamp}${random}`;
  };

  const addOrder = async (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status'>): Promise<string> => {
    const newOrder: Order = {
      ...orderData,
      id: `order_${Date.now()}`,
      orderNumber: generateOrderNumber(),
      date: new Date().toISOString(),
      status: 'pending',
    };

    setOrders(prev => [newOrder, ...prev]);

    // Send email notification
    const emailSent = await sendOrderEmail(newOrder);
    
    if (emailSent) {
      console.log('Order confirmation email sent to admin');
      // You can also send a confirmation email to customer here
    }

    return newOrder.orderNumber;
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  const clearOrders = () => {
    setOrders([]);
    localStorage.removeItem('orders');
  };
  const getOrder = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  }

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrderById, clearOrders, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};