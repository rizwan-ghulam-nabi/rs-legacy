// types/order.ts
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  category?: string;
}

export interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
}

export interface BillingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentMethod {
 type: 'jazzcash' | 'easypaisa' | 'card' | 'wallet' | string;
  lastFour?: string;
  brand?: string;
}

export interface TrackingEvent {
  date: string;
  status: string;
  location: string;
  description: string;
}

export interface TrackingInfo {
  carrier: string;
  trackingNumber: string;
  status: string;
  estimatedDelivery: string;
  history: TrackingEvent[];
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  billingAddress?: BillingAddress;
  paymentMethod: PaymentMethod;
  tracking?: TrackingInfo;
}