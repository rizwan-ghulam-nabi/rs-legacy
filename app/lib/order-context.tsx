// app/lib/order-context.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderItem, ShippingAddress, BillingAddress, PaymentMethod } from '../types/order';

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrder: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('rs_legacy_orders');
    if (savedOrders) {
      try {
        const parsedOrders: Order[] = JSON.parse(savedOrders);
        setOrders(parsedOrders);
      } catch (error) {
        console.error('Error loading orders from localStorage:', error);
        setOrders([]);
      }
    }
  }, []);

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem('rs_legacy_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: Order) => {
    setOrders(prev => {
      const existingOrderIndex = prev.findIndex(o => o.id === order.id);
      if (existingOrderIndex >= 0) {
        // Update existing order
        const updated = [...prev];
        updated[existingOrderIndex] = order;
        return updated;
      } else {
        // Add new order
        return [order, ...prev];
      }
    });
  };

  const getOrder = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};