const http = require('http');

const payload = JSON.stringify({
  name: 'Test Customer',
  phone: '0412345678',
  email: 'test@example.com',
  suburb: 'Yamanto',
  serviceType: 'Automatic Sliding Gate',
  notes: 'Testing email notification integration'
});

const req = http.request({
  hostname: '127.0.0.1',
  port: 3000,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Contact API Status:', res.statusCode);
    console.log('Contact API Response:', body);
  });
});

req.on('error', (e) => {
  console.error('Contact API Error:', e.message);
});

req.write(payload);
req.end();
