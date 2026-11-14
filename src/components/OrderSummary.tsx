import React from 'react';
import { useCheckout } from '../context/CheckoutContext';
import { Package } from 'lucide-react';

export const OrderSummary: React.FC = () => {
  const { cart, subtotal, shippingFee, total } = useCheckout();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-6">
      <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Package className="w-5 h-5 text-indigo-600" />
        Order Summary
      </h2>

      <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto mb-4">
        {cart.map(item => (
          <div key={item.id} className="py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl bg-slate-100 p-2 rounded-lg">{item.image}</span>
              <div>
                <h4 className="text-sm font-medium text-slate-800">{item.name}</h4>
                <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-slate-900">
              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-2.5 pt-4 border-t border-slate-200 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span className="font-medium text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Shipping</span>
          <span className="font-medium text-emerald-600">
            {shippingFee === 0 ? 'Free' : `₹${shippingFee}`}
          </span>
        </div>
        <div className="flex justify-between text-base font-bold text-slate-900 pt-3 border-t border-slate-100">
          <span>Total</span>
          <span className="text-indigo-600">₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-xs text-indigo-700 flex items-center gap-2">
        <span>🎉</span>
        <span>Free shipping on orders above ₹5,000</span>
      </div>
    </div>
  );
};