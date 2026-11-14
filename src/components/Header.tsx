import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCheckout } from '../context/CheckoutContext';

export const Header: React.FC = () => {
  const { cart, step } = useCheckout();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">NovaMart</span>
        </div>
        {step !== 'success' && (
          <div className="flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-full text-sm">
            <ShoppingBag className="w-4 h-4 text-indigo-400" />
            <span>{totalItems} items</span>
          </div>
        )}
      </div>
    </header>
  );
};