import React from 'react';
import { useCheckout } from '../context/CheckoutContext';
import { ArrowLeft, ArrowRight, Edit2 } from 'lucide-react';

export const ReviewStep: React.FC = () => {
  const { shippingData, cart, setStep } = useCheckout();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Review Your Order</h2>
        <p className="text-sm text-slate-500 mt-1">Please review your details before proceeding to payment.</p>
      </div>

      {/* Shipping Address Review Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 relative">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Shipping Address</h3>
          <button
            onClick={() => setStep('shipping')}
            className="text-indigo-600 hover:text-indigo-700 text-xs font-semibold flex items-center gap-1"
          >
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </button>
        </div>
        <div className="mt-2 text-sm text-slate-600 space-y-0.5">
          <p className="font-semibold text-slate-900">{shippingData.fullName}</p>
          <p>{shippingData.address}, {shippingData.city} - {shippingData.pinCode}</p>
          <p>{shippingData.state}</p>
          <p className="text-xs text-slate-500 mt-1">{shippingData.email}</p>
        </div>
      </div>

      {/* Order Items Review Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Order Items</h3>
          <button
            onClick={() => setStep('shipping')}
            className="text-indigo-600 hover:text-indigo-700 text-xs font-semibold flex items-center gap-1"
          >
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </button>
        </div>
        <div className="divide-y divide-slate-200">
          {cart.map(item => (
            <div key={item.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
              <div className="flex items-center space-x-3">
                <span className="text-xl bg-white p-2 rounded-lg border border-slate-200">{item.image}</span>
                <div>
                  <h4 className="text-sm font-medium text-slate-800">{item.name}</h4>
                  <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-slate-900">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => setStep('shipping')}
          className="text-slate-600 hover:text-slate-900 font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={() => setStep('payment')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-100 transition-all text-sm"
        >
          <span>Proceed to Payment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};