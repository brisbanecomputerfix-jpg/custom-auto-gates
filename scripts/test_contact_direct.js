import app from '../server/index.js';
import http from 'http';

console.log('Testing full contact and email handler...');

const payload = JSON.stringify({
  name: 'John Test',
  phone: '0400111222',
  email: 'john@example.com',
  suburb: 'New Farm',
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
    process.exit(0);
  });
});

req.on('error', (e) => {
  console.error('Contact API Error:', e.message);
  process.exit(1);
});

req.write(payload);
req.end();
