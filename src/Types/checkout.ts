export type CheckoutStep = 'shipping' | 'review' | 'payment' | 'success';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingFormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  saveAddress: boolean;
}

export type PaymentMethod = 'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Cash on Delivery';