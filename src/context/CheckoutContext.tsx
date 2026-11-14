import React, { createContext, useContext, useState, useEffect } from 'react';
// import { CheckoutStep, CartItem, ShippingFormData, PaymentMethod } from '../types/checkout';
import type { CheckoutStep, CartItem, ShippingFormData, PaymentMethod } from '../Types/checkout'

interface CheckoutContextType {
  step: CheckoutStep;
  setStep: (step: CheckoutStep) => void;
  cart: CartItem[];
  shippingData: ShippingFormData;
  updateShippingData: (data: Partial<ShippingFormData>) => void;
  shippingErrors: Record<string, string>;
  validateShipping: () => boolean;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  isProcessing: boolean;
  paymentError: string | null;
  orderId: string;
  processPayment: () => void;
  resetCheckout: () => void;
  subtotal: number;
  shippingFee: number;
  total: number;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

const INITIAL_CART: CartItem[] = [
  { id: '1', name: 'Wireless Earbuds', price: 4999, quantity: 1, image: '🎧' },
  { id: '2', name: 'Smartwatch Pro', price: 9999, quantity: 1, image: '⌚' },
];

const INITIAL_SHIPPING: ShippingFormData = {
  fullName: 'Chaitanya Agarkar',
  email: 'chaitanya@example.com',
  address: '123 Tech Park, Kharadi',
  city: 'Pune',
  state: 'Maharashtra',
  pinCode: '411014',
  saveAddress: true,
};

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<CheckoutStep>(() => {
    return (localStorage.getItem('novamart_step') as CheckoutStep) || 'shipping';
  });

  const [cart] = useState<CartItem[]>(INITIAL_CART);

  const [shippingData, setShippingData] = useState<ShippingFormData>(() => {
    const saved = localStorage.getItem('novamart_shipping');
    return saved ? JSON.parse(saved) : INITIAL_SHIPPING;
  });

  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string>(() => {
    return localStorage.getItem('novamart_orderId') || '#NM' + Math.floor(100000 + Math.random() * 900000);
  });

  // Save states to LocalStorage for persistence requirement
  useEffect(() => {
    localStorage.setItem('novamart_step', step);
  }, [step]);

  useEffect(() => {
    localStorage.setItem('novamart_shipping', JSON.stringify(shippingData));
  }, [shippingData]);

  useEffect(() => {
    localStorage.setItem('novamart_orderId', orderId);
  }, [orderId]);

  const updateShippingData = (data: Partial<ShippingFormData>) => {
    setShippingData(prev => ({ ...prev, ...data }));
    // Clear error for updated field
    Object.keys(data).forEach(key => {
      if (shippingErrors[key]) {
        setShippingErrors(prev => ({ ...prev, [key]: '' }));
      }
    });
  };

  const validateShipping = (): boolean => {
    const errors: Record<string, string> = {};
    if (!shippingData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!shippingData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(shippingData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!shippingData.address.trim()) errors.address = 'Address is required';
    if (!shippingData.city.trim()) errors.city = 'City is required';
    if (!shippingData.state.trim()) errors.state = 'State is required';
    if (!shippingData.pinCode.trim()) {
      errors.pinCode = 'PIN code is required';
    } else if (!/^\d{6}$/.test(shippingData.pinCode)) {
      errors.pinCode = 'PIN code must be 6 digits';
    }

    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 5000 ? 0 : 500; // Free above 5000
  const total = subtotal + (shippingFee === 0 ? 0 : shippingFee);

  const processPayment = () => {
    setIsProcessing(true);
    setPaymentError(null);

    setTimeout(() => {
      setIsProcessing(false);
      // Simulate 10% random payment failure edge-case handling demonstration
      if (Math.random() < 0.05) {
        setPaymentError('Payment gateway timeout. Please try again.');
      } else {
        setStep('success');
      }
    }, 1500);
  };

  const resetCheckout = () => {
    localStorage.clear();
    setStep('shipping');
    setOrderId('#NM' + Math.floor(100000 + Math.random() * 900000));
  };

  return (
    <CheckoutContext.Provider
      value={{
        step,
        setStep,
        cart,
        shippingData,
        updateShippingData,
        shippingErrors,
        validateShipping,
        paymentMethod,
        setPaymentMethod,
        isProcessing,
        paymentError,
        orderId,
        processPayment,
        resetCheckout,
        subtotal,
        shippingFee,
        total,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error('useCheckout must be used within a CheckoutProvider');
  return context;
};