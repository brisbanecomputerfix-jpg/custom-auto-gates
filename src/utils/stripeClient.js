/**
 * Custom Auto Gates - Stripe Client Helper
 * Securely communicates with backend Stripe API endpoints
 */

export async function createStripeCheckout({
  amount,
  title,
  description,
  customerEmail,
  customerName,
  customerPhone,
  metadata = {},
}) {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Number(amount),
        title,
        description,
        customerEmail,
        customerName,
        customerPhone,
        metadata: {
          business: 'Custom Auto Gates Pty Ltd',
          ...metadata,
        },
      }),
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const rawText = await response.text();
      console.error('Non-JSON response received from server:', rawText.substring(0, 150));
      throw new Error('Payment gateway is currently initializing. Please try again in a moment or call (07) 3102 1801.');
    }

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to initiate secure Stripe checkout.');
    }

    // Redirect to official Stripe Checkout page
    if (data.url) {
      window.location.href = data.url;
      return { success: true, url: data.url };
    }

    return data;
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    throw error;
  }
}

export async function createPaymentIntent({
  amount,
  description,
  customerEmail,
  metadata = {},
}) {
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Number(amount),
        description,
        customerEmail,
        metadata,
      }),
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const rawText = await response.text();
      console.error('Non-JSON response received from server:', rawText.substring(0, 150));
      throw new Error('Payment gateway is currently initializing. Please try again in a moment or call (07) 3102 1801.');
    }

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to create payment intent.');
    }

    return data;
  } catch (error) {
    console.error('PaymentIntent Error:', error);
    throw error;
  }
}
