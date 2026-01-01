// app/providers/EmailJsProvider.tsx
'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import emailjs from '@emailjs/browser';

interface EmailJsContextType {
  sendOrderEmail: (orderData: any) => Promise<boolean>;
  sendContactEmail: (data: any) => Promise<boolean>;
}

const EmailJsContext = createContext<EmailJsContextType | null>(null);

export const useEmailJs = () => {
  const context = useContext(EmailJsContext);
  if (!context) {
    throw new Error('useEmailJs must be used within EmailJsProvider');
  }
  return context;
};

export function EmailJsProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize Email.js

    
    emailjs.init({
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
    });
  }, []);

  const sendOrderEmail = async (orderData: any): Promise<boolean> => {
    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          to_email: process.env.NEXT_PUBLIC_ADMIN_EMAIL!,
          to_name: 'Admin',
          from_name: orderData.customerName || 'Customer',
          from_email: orderData.customerEmail || '',
          order_number: orderData.orderNumber,
          customer_name: orderData.customerName,
          customer_email: orderData.customerEmail,
          customer_phone: orderData.customerPhone,
          customer_address: orderData.customerAddress,
          order_date: new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          order_time: new Date().toLocaleTimeString(),
          items: orderData.items.map((item: any) => 
            `${item.name} (x${item.quantity}) - Rs. ${item.price}`
          ).join('<br>'),
          subtotal: `Rs. ${orderData.subtotal}`,
          shipping: `Rs. ${orderData.shipping}`,
          tax: `Rs. ${orderData.tax}`,
          total: `Rs. ${orderData.total}`,
          payment_method: orderData.paymentMethod,
          shipping_method: orderData.shippingMethod,
          special_instructions: orderData.specialInstructions || 'None',
          order_status: orderData.status || 'pending',
          order_url: `${process.env.NEXT_PUBLIC_APP_URL}/admin/orders/${orderData.id}`,
        }
      );

      console.log('Order email sent successfully:', response);
      return true;
    } catch (error) {
      console.error('Failed to send order email:', error);
      return false;
    }
  };

  const sendContactEmail = async (data: any): Promise<boolean> => {
    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT!,
        {
          to_email: process.env.NEXT_PUBLIC_ADMIN_EMAIL!,
          to_name: 'Admin',
          from_name: data.name,
          from_email: data.email,
          subject: data.subject || 'New Contact Form Submission',
          message: data.message,
          phone: data.phone || 'Not provided',
          date: new Date().toLocaleString(),
        }
      );

      console.log('Contact email sent successfully:', response);
      return true;
    } catch (error) {
      console.error('Failed to send contact email:', error);
      return false;
    }
  };

  return (
    <EmailJsContext.Provider value={{ sendOrderEmail, sendContactEmail }}>
      {children}
    </EmailJsContext.Provider>
  );
}