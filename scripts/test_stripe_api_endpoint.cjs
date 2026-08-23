const http = require('http');

function testEndpoint() {
  const postData = JSON.stringify({
    amount: 189,
    title: 'Emergency Gate Diagnostics',
    description: 'Call-out fee test',
    customerEmail: 'office@customautogates.com.au',
    customerName: 'Test Customer',
    customerPhone: '0400000000',
    metadata: { test: true }
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/create-checkout-session',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('Content-Type:', res.headers['content-type']);
    let responseBody = '';
    res.on('data', (chunk) => { responseBody += chunk; });
    res.on('end', () => {
      try {
        const parsed = JSON.parse(responseBody);
        console.log('✅ Response is Valid JSON!');
        console.log('Success:', parsed.success);
        console.log('Session ID:', parsed.sessionId);
        console.log('Stripe Checkout URL:', parsed.url ? 'Generated successfully!' : 'No URL');
      } catch (err) {
        console.error('❌ Failed to parse JSON:', err.message);
        console.log('Raw output:', responseBody.substring(0, 200));
      }
    });
  });

  req.on('error', (e) => {
    console.error('Problem with request:', e.message);
  });

  req.write(postData);
  req.end();
}

setTimeout(testEndpoint, 1500);
