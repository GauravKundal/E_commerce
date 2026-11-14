import React from 'react';
import { useCheckout } from '../context/CheckoutContext';
import { Check } from 'lucide-react';

export const Stepper: React.FC = () => {
  const { step, setStep, validateShipping } = useCheckout();

  const steps = [
    { id: 'shipping', label: 'Shipping', number: 1 },
    { id: 'review', label: 'Review', number: 2 },
    { id: 'payment', label: 'Payment', number: 3 },
  ];

  const getStepIndex = (s: string) => {
    if (s === 'shipping') return 1;
    if (s === 'review') return 2;
    if (s === 'payment') return 3;
    if (s === 'success') return 4;
    return 1;
  };

  const currentIdx = getStepIndex(step);

  const handleStepClick = (targetStep: 'shipping' | 'review' | 'payment') => {
    if (targetStep === 'shipping') {
      setStep('shipping');
    } else if (targetStep === 'review' && currentIdx > 1) {
      if (validateShipping()) setStep('review');
    } else if (targetStep === 'payment' && currentIdx > 2) {
      setStep('payment');
    }
  };

  if (step === 'success') return null;

  return (
    <div className="bg-white border-b border-slate-200 py-6 px-4">
      <div className="max-w-xl mx-auto flex items-center justify-between relative">
        {/* Progress Line Background */}
        <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-slate-200 -z-0" />
        
        {steps.map((s, idx) => {
          const isCompleted = currentIdx > s.number;
          const isCurrent = step === s.id;
          const isClickable = s.number < currentIdx;

          return (
            <div
              key={s.id}
              onClick={() => isClickable && handleStepClick(s.id as any)}
              className={`flex flex-col items-center relative z-10 ${
                isClickable ? 'cursor-pointer group' : ''
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200 ${
                  isCompleted
                    ? 'bg-indigo-600 text-white shadow-md'
                    : isCurrent
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-lg'
                    : 'bg-slate-200 text-slate-600 group-hover:bg-slate-300'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : s.number}
              </div>
              <span
                className={`text-xs mt-2 font-medium ${
                  isCurrent ? 'text-indigo-600 font-bold' : 'text-slate-500'
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};