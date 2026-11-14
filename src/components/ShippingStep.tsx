import React from 'react';
import { useCheckout } from '../context/CheckoutContext';
import { ArrowRight, MapPin } from 'lucide-react';

export const ShippingStep: React.FC = () => {
  const { shippingData, updateShippingData, shippingErrors, validateShipping, setStep } = useCheckout();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep('review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-indigo-600" />
          Shipping Details
        </h2>
        <p className="text-sm text-slate-500 mt-1">Enter your shipping address to continue</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={shippingData.fullName}
            onChange={e => updateShippingData({ fullName: e.target.value })}
            placeholder="Chaitanya Agarkar"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
              shippingErrors.fullName
                ? 'border-red-300 focus:ring-red-100'
                : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-100'
            }`}
          />
          {shippingErrors.fullName && <p className="text-xs text-red-500 mt-1">{shippingErrors.fullName}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Email Address *
          </label>
          <input
            type="email"
            value={shippingData.email}
            onChange={e => updateShippingData({ email: e.target.value })}
            placeholder="chaitanya@example.com"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
              shippingErrors.email
                ? 'border-red-300 focus:ring-red-100'
                : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-100'
            }`}
          />
          {shippingErrors.email && <p className="text-xs text-red-500 mt-1">{shippingErrors.email}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Address *
          </label>
          <input
            type="text"
            value={shippingData.address}
            onChange={e => updateShippingData({ address: e.target.value })}
            placeholder="123 Tech Park, Kharadi"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
              shippingErrors.address
                ? 'border-red-300 focus:ring-red-100'
                : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-100'
            }`}
          />
          {shippingErrors.address && <p className="text-xs text-red-500 mt-1">{shippingErrors.address}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            City *
          </label>
          <input
            type="text"
            value={shippingData.city}
            onChange={e => updateShippingData({ city: e.target.value })}
            placeholder="Pune"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
              shippingErrors.city
                ? 'border-red-300 focus:ring-red-100'
                : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-100'
            }`}
          />
          {shippingErrors.city && <p className="text-xs text-red-500 mt-1">{shippingErrors.city}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            State *
          </label>
          <select
            value={shippingData.state}
            onChange={e => updateShippingData({ state: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Delhi">Delhi</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            PIN Code *
          </label>
          <input
            type="text"
            maxLength={6}
            value={shippingData.pinCode}
            onChange={e => updateShippingData({ pinCode: e.target.value })}
            placeholder="411014"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
              shippingErrors.pinCode
                ? 'border-red-300 focus:ring-red-100'
                : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-100'
            }`}
          />
          {shippingErrors.pinCode && <p className="text-xs text-red-500 mt-1">{shippingErrors.pinCode}</p>}
        </div>
      </div>

      <div className="mt-6 flex items-center">
        <input
          type="checkbox"
          id="saveAddress"
          checked={shippingData.saveAddress}
          onChange={e => updateShippingData({ saveAddress: e.target.checked })}
          className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor="saveAddress" className="ml-2 text-sm text-slate-600 font-medium">
          Save this address for future orders
        </label>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-100 transition-all text-sm"
        >
          <span>Continue to Review</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};