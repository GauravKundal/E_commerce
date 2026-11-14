import React from 'react';
import { useCheckout } from '../context/CheckoutContext';
import { Check, ShoppingBag } from 'lucide-react';

export const SuccessStep: React.FC = () => {
  const { orderId, shippingData, resetCheckout } = useCheckout();

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 p-8 text-center space-y-6 my-12">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
        <Check className="w-10 h-10 text-emerald-600" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Order Placed Successfully!</h2>
        <p className="text-sm text-slate-500">
          Thank you for shopping with <span className="font-semibold text-slate-800">NovaMart</span>. Your order confirmation has been sent to <span className="font-semibold text-slate-800">{shippingData.email}</span>.
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
          Order Reference
        </span>
        <span className="text-lg font-mono font-bold text-indigo-600">{orderId}</span>
      </div>

      <button
        onClick={resetCheckout}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all text-sm flex items-center justify-center gap-2"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>Continue Shopping</span>
      </button>
    </div>
  );
};