import React from 'react';
import { CheckoutProvider, useCheckout } from './context/CheckoutContext';
import { Header } from './components/Header';
import { Stepper } from './components/Stepper';
import { OrderSummary } from './components/OrderSummary';
import { ShippingStep } from './components/ShippingStep';
import { ReviewStep } from './components/ReviewStep';
import { PaymentStep } from './components/PaymentStep';
import { SuccessStep } from './components/SuccessStep';

const CheckoutFlow: React.FC = () => {
  const { step } = useCheckout();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <Stepper />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 'success' ? (
          <SuccessStep />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              {step === 'shipping' && <ShippingStep />}
              {step === 'review' && <ReviewStep />}
              {step === 'payment' && <PaymentStep />}
            </div>
            <div className="lg:col-span-5">
              <OrderSummary />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export function App() {
  return (
    <CheckoutProvider>
      <CheckoutFlow />
    </CheckoutProvider>
  );
}

export default App;