// app/checkout/payment/page.tsx - COMPLETE SIMPLE VERSION
"use client";

import { useState, useEffect } from 'react';
import { useCart } from '../../lib/cart-context';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  CreditCard, 
  Lock, 
  Shield, 
  CheckCircle,
  Smartphone,
  Mail,
  Send
} from 'lucide-react';
import Link from 'next/link';
import Header from '../../components/Header';
import { useOrder } from '@/app/lib/order-context';
import { Order } from '../../types/order';
import emailjs from '@emailjs/browser';

// Your EmailJS credentials - GET THESE FROM EMAILJS.COM
const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id', 
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key',
};

// Your personal email for testing
const YOUR_EMAIL = "your-real-email@gmail.com"; // ⬅️ CHANGE THIS TO YOUR EMAIL

interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}

export default function PaymentPage() {
  const { state: cartState, clearCart } = useCart();
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState("jazzcash");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  const { addOrder } = useOrder();

  const [orderSummary, setOrderSummary] = useState<OrderSummary>({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
    itemCount: 0
  });

  // Simple form state
  const [formData, setFormData] = useState({
    phoneNumber: '03001234567',
    email: YOUR_EMAIL, // Your email pre-filled
  });

  // Calculate order summary
  useEffect(() => {
    if (cartState.items && cartState.items.length > 0) {
      const subtotal = cartState.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      const shipping = subtotal >= 50 ? 0 : 9.99;
      const tax = subtotal * 0.1;
      const total = subtotal + shipping + tax;

      setOrderSummary({
        subtotal,
        shipping,
        tax,
        total,
        itemCount: cartState.itemCount
      });
    }
  }, [cartState]);

  // SIMPLE Email sending function
  const sendOrderEmail = async (order: Order) => {
    setEmailStatus('sending');
    
    try {
      // Prepare email data
      const emailData = {
        to_email: formData.email,
        to_name: 'Valued Customer',
        from_name: 'Your Store',
        order_id: order.id,
        order_date: new Date().toLocaleDateString(),
        order_total: `Rs. ${order.total.toFixed(2)}`,
        order_items: order.items.map(item => 
          `• ${item.name} x ${item.quantity} - Rs. ${(item.price * item.quantity).toFixed(2)}`
        ).join('\\n'),
        customer_email: formData.email,
        customer_phone: formData.phoneNumber,
        shipping_address: '123 Main Street, Karachi, Pakistan',
        payment_method: 'JazzCash'
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        emailData,
        EMAILJS_CONFIG.publicKey
      );

      console.log('✅ Email sent successfully!', result);
      setEmailStatus('sent');
      return true;

    } catch (error) {
      console.error('❌ Email failed:', error);
      setEmailStatus('failed');
      
      // Fallback: Log email content to console
      console.log('📧 EMAIL CONTENT (Fallback):', {
        to: formData.email,
        subject: `Order Confirmation #${order.id}`,
        body: `
          ORDER CONFIRMATION #${order.id}
          
          Thank you for your purchase!
          
          ORDER TOTAL: Rs. ${order.total.toFixed(2)}
          ITEMS: ${order.items.length}
          PAYMENT: JazzCash
          STATUS: Confirmed
          
          We'll ship your items soon!
        `
      });
      
      return false;
    }
  };

  // SIMPLE Payment handler
  const handlePayment = async () => {
    if (!formData.phoneNumber || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing (3 seconds)
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Create order ID
      const newOrderId = `ORD${Date.now().toString().slice(-6)}`;
      setOrderId(newOrderId);
      
      // Create order object
      const newOrder: Order = {
        id: newOrderId,
        orderNumber: newOrderId,
        date: new Date().toISOString(),
        status: 'confirmed',
        total: orderSummary.total,
        subtotal: orderSummary.subtotal,
        shipping: orderSummary.shipping,
        tax: orderSummary.tax,
        items: cartState.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        // customerEmail: formData.email,
        // customerPhone: formData.phoneNumber,
        shippingAddress: {
          name: 'Customer',
          street: '123 Main Street',
          city: 'Karachi',
          state: 'Sindh',
          zipCode: '75500',
          country: 'Pakistan',
          phone: formData.phoneNumber,
          email: formData.email
        },
        paymentMethod: {
          type: 'jazzcash',
          // transactionId: `TXN${Date.now().toString().slice(-8)}`,
          brand: 'JazzCash'
        }
      };

      // Save order
      addOrder(newOrder);
      
      // Send email
      await sendOrderEmail(newOrder);
      
      // Clear cart
      clearCart();
      
      // Show success
      setIsSuccess(true);
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Empty cart handling
  if (cartState.items.length === 0 && !isSuccess) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-2xl mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <Link
              href="/Product"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Success page
  if (isSuccess) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-green-50 pt-20">
          <div className="max-w-2xl mx-auto px-4 py-16">
            <div className="text-center bg-white rounded-2xl shadow-lg p-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Payment Successful!
              </h1>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Send className="w-6 h-6 text-green-600" />
                  <h3 className="font-semibold text-green-800">Order Confirmed</h3>
                </div>
                <div className="text-green-700 text-sm space-y-1">
                  <p>✅ Order #<strong>{orderId}</strong> confirmed</p>
                  <p>✅ Payment processed via JazzCash</p>
                  <p>
                    {emailStatus === 'sent' ? '✅' : '📧'} 
                    Email {emailStatus === 'sent' ? 'sent to:' : 'sending to:'} <strong>{formData.email}</strong>
                  </p>
                  {emailStatus === 'failed' && (
                    <p className="text-yellow-700">⚠️ Check console for order details</p>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Paid:</span>
                    <span className="font-bold text-green-600">Rs. {orderSummary.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Items:</span>
                    <span>{orderSummary.itemCount} products</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span>JazzCash</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => router.push(`/order/${orderId}`)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View Order Details
                </button>
                <button
                  onClick={() => router.push('/Product')}
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Main payment page
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                  1
                </div>
                <span className="text-sm">Cart</span>
              </div>
              <div className="flex-1 h-1 bg-green-500 mx-2"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                  2
                </div>
                <span className="text-sm font-semibold">Payment</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Payment Form */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Details</h2>
                <p className="text-gray-600 mb-6">Complete your purchase with JazzCash</p>

                {/* JazzCash Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">+92</span>
                      </div>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="3XX XXXXXXX"
                        className="w-full pl-12 rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Use test number: 03001234567
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Order confirmation will be sent here
                    </p>
                  </div>

                  {/* Demo Info */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Demo Instructions:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Mobile number: 03001234567 (test)</li>
                      <li>• Email: {YOUR_EMAIL} (your real email)</li>
                      <li>• Click "Pay Now" to simulate payment</li>
                      <li>• Real email will be sent via EmailJS</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 p-4 bg-green-50 rounded-2xl border border-green-200">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-700">
                  Secure payment encrypted
                </span>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h3>

                {/* Pricing */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({orderSummary.itemCount} items)</span>
                    <span>Rs. {orderSummary.subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>
                      {orderSummary.shipping === 0 ? (
                        <span className="text-green-600 font-semibold">FREE</span>
                      ) : (
                        `Rs. ${orderSummary.shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>Rs. {orderSummary.tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>Rs. {orderSummary.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Pay Rs. {orderSummary.total.toFixed(2)}
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
                  <Shield className="w-4 h-4" />
                  Secure SSL encryption
                </div>
              </div>

              {/* Support Info */}
              <div className="bg-blue-50 rounded-2xl p-6 mt-6">
                <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
                <p className="text-sm text-blue-800">
                  Email support: support@yourstore.com<br/>
                  Phone: 021-111-123-456
                </p>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center mt-8">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}