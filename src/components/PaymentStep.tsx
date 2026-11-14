import React from 'react';
import { useCheckout } from '../context/CheckoutContext';
import type { PaymentMethod } from '../Types/checkout';
import { ArrowLeft, CreditCard, ShieldCheck, Wallet, Landmark, Banknote, Loader2 } from 'lucide-react';

export const PaymentStep: React.FC = () => {
  const { paymentMethod, setPaymentMethod, processPayment, isProcessing, paymentError, setStep, total } = useCheckout();

  const methods: { id: PaymentMethod; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'UPI', label: 'UPI (Google Pay, PhonePe, Paytm)', icon: <Wallet className="w-5 h-5 text-indigo-600" />, desc: 'Instant & secure UPI transfer' },
    { id: 'Credit/Debit Card', label: 'Credit / Debit Card', icon: <CreditCard className="w-5 h-5 text-indigo-600" />, desc: 'Visa, Mastercard, RuPay & more' },
    { id: 'Net Banking', label: 'Net Banking', icon: <Landmark className="w-5 h-5 text-indigo-600" />, desc: 'All major Indian banks supported' },
    { id: 'Cash on Delivery', label: 'Cash on Delivery (COD)', icon: <Banknote className="w-5 h-5 text-indigo-600" />, desc: 'Pay with cash upon delivery' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Payment Method</h2>
        <p className="text-sm text-slate-500 mt-1">Choose a secure payment method to complete your purchase.</p>
      </div>

      {paymentError && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-sm text-red-600 flex items-center gap-2">
          <span>⚠️</span>
          <span>{paymentError}</span>
        </div>
      )}

      <div className="space-y-3">
        {methods.map(m => (
          <label
            key={m.id}
            onClick={() => setPaymentMethod(m.id)}
            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
              paymentMethod === m.id
                ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-100'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                checked={paymentMethod === m.id}
                onChange={() => setPaymentMethod(m.id)}
                className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
              />
              <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">{m.icon}</div>
              <div>
                <span className="text-sm font-semibold text-slate-900 block">{m.label}</span>
                <span className="text-xs text-slate-500">{m.desc}</span>
              </div>
            </div>
            <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2.5 py-1 rounded-full">Secure</span>
          </label>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-3 text-xs text-slate-600">
        <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
        <span>Transactions are 256-bit encrypted. Simulated checkout gateway compliant with safety requirements.</span>
      </div>

      {/* Action Buttons */}
      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => setStep('review')}
          disabled={isProcessing}
          className="text-slate-600 hover:text-slate-900 font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm transition-all disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={processPayment}
          disabled={isProcessing}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-100 transition-all text-sm disabled:opacity-70"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <span>Place Order • ₹{total.toLocaleString('en-IN')}</span>
          )}
        </button>
      </div>
    </div>
  );
};