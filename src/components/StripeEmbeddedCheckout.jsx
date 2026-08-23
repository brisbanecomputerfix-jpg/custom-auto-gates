import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { ShieldCheck, Lock, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createPaymentIntent } from '../utils/stripeClient';

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_live_51TGtCm29bFBh5Ig30Sd0C1BCS3YicxNwSrEyCPwB3kuSrI3z6DAJrul3pvzbsCB0rWngD4igTzLRhB2MByHYsCpE00QYX5JoJD';
const stripePromise = loadStripe(publishableKey);

function CheckoutForm({ amount, customerName, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/#payment-success`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message || 'An unexpected error occurred during payment.');
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setIsProcessing(false);
      if (onSuccess) {
        onSuccess(paymentIntent);
      } else {
        window.location.hash = `#payment-success?session_id=${paymentIntent.id}`;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {errorMessage && (
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#991b1b',
          padding: '0.75rem 1rem',
          borderRadius: '0.65rem',
          fontSize: '0.85rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Stripe Payment Element (Cards, Apple Pay, Google Pay, Link) */}
      <div style={{
        marginBottom: '1.25rem',
        minHeight: '180px',
        padding: '0.5rem 0',
      }}>
        <PaymentElement />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        style={{
          width: '100%',
          padding: '0.95rem',
          backgroundColor: '#eab308',
          color: '#0f172a',
          border: 'none',
          borderRadius: '0.75rem',
          fontWeight: '800',
          fontSize: '1rem',
          cursor: (!stripe || isProcessing) ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          boxShadow: '0 4px 12px rgba(234, 179, 8, 0.3)',
          opacity: (!stripe || isProcessing) ? 0.75 : 1,
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => { if (stripe && !isProcessing) e.currentTarget.style.backgroundColor = '#ca8a04'; }}
        onMouseLeave={(e) => { if (stripe && !isProcessing) e.currentTarget.style.backgroundColor = '#eab308'; }}
      >
        {isProcessing ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Authorizing Payment...
          </>
        ) : (
          <>
            <Lock size={16} /> Authorize & Pay ${Number(amount).toFixed(2)} AUD
          </>
        )}
      </button>

      <div style={{
        marginTop: '0.85rem',
        textAlign: 'center',
        fontSize: '0.72rem',
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.35rem',
      }}>
        <ShieldCheck size={14} style={{ color: '#16a34a' }} />
        <span>256-Bit SSL Encrypted • PCI-DSS Compliant • Powered by Stripe</span>
      </div>
    </form>
  );
}

export default function StripeEmbeddedCheckout({
  amount,
  description,
  customerEmail,
  customerName,
  metadata = {},
  isDark = false,
  onSuccess,
}) {
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [initError, setInitError] = useState('');

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setInitError('');

    createPaymentIntent({
      amount,
      description,
      customerEmail,
      metadata: {
        customerName: customerName || '',
        ...metadata,
      },
    })
      .then((data) => {
        if (isMounted) {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            setInitError('Failed to initialize payment session with Stripe.');
          }
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setInitError(err.message || 'Unable to connect to Stripe.');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [amount, customerEmail]);

  const appearance = {
    theme: isDark ? 'night' : 'stripe',
    variables: {
      colorPrimary: '#eab308',
      colorBackground: isDark ? '#1e293b' : '#ffffff',
      colorText: isDark ? '#f8fafc' : '#0f172a',
      colorDanger: '#ef4444',
      fontFamily: 'Outfit, system-ui, sans-serif',
      borderRadius: '8px',
    },
  };

  if (isLoading) {
    return (
      <div style={{
        padding: '2.5rem 1rem',
        textAlign: 'center',
        color: '#64748b',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
      }}>
        <Loader2 size={28} className="animate-spin" style={{ color: '#eab308' }} />
        <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>Initializing Secure Stripe Gateway...</span>
      </div>
    );
  }

  if (initError) {
    return (
      <div style={{
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        color: '#991b1b',
        padding: '1rem',
        borderRadius: '0.75rem',
        fontSize: '0.88rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <AlertCircle size={18} style={{ flexShrink: 0 }} />
        <span>{initError}</span>
      </div>
    );
  }

  if (!clientSecret) {
    return null;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      <CheckoutForm amount={amount} customerName={customerName} onSuccess={onSuccess} />
    </Elements>
  );
}
