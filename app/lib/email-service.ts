// app/lib/email-service.ts
'use client';

import emailjs from '@emailjs/browser';

// Initialize Email.js once
let isInitialized = false;

const initEmailJs = () => {
  if (typeof window !== 'undefined' && !isInitialized) {
    try {
      emailjs.init({
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
      });
      isInitialized = true;
      console.log('✅ Email.js initialized');
    } catch (error) {
      console.error('❌ Failed to initialize Email.js:', error);
    }
  }
};

export interface OrderEmailData {
  to_email: string;
  to_name: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  order_date: string;
  order_time: string;
  items: string;
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
  payment_method: string;
  order_stage: string;
  order_status: string;
}

export async function sendOrderEmail(data: OrderEmailData): Promise<boolean> {
  try {
    // Initialize Email.js
    initEmailJs();
    
    // Send email
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
    
    );
    
    console.log('✅ Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return false;
  }
}

// Helper to create email data
export function createOrderEmailData(
  stage: 'address' | 'payment',
  orderNumber: string,
  address: any,
  cartItems: any[],
  totals: any,
  paymentMethod?: string
): OrderEmailData {
  const now = new Date();
  
  return {
    to_email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@example.com',
    to_name: 'Admin',
    order_number: orderNumber,
    customer_name: `${address.firstName} ${address.lastName}`,
    customer_email: address.email,
    customer_phone: address.phone,
    customer_address: `${address.addressLine1}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`,
    order_date: now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    order_time: now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    items: cartItems.map(item => 
      `${item.name} (x${item.quantity}) - Rs. ${item.price}`
    ).join('<br>'),
    subtotal: `Rs. ${totals.subtotal.toFixed(2)}`,
    shipping: `Rs. ${totals.shippingCost.toFixed(2)}`,
    tax: `Rs. ${totals.tax.toFixed(2)}`,
    total: `Rs. ${totals.finalTotal.toFixed(2)}`,
    payment_method: paymentMethod || (stage === 'address' ? 'Pending' : 'Not specified'),
    order_stage: stage === 'address' ? 'Order Placed - Pending Payment' : 'Payment Confirmed',
    order_status: stage === 'address' ? '🟡 Pending Payment' : '🟢 Paid & Confirmed',
  };
}

// Generate order number
export function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ORD-${year}${month}${day}-${random}`;
}