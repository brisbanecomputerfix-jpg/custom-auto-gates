import app from '../server/index.js';
import http from 'http';

console.log('Testing server module import and route execution...');

const req = http.request({
  hostname: '127.0.0.1',
  port: 3000,
  path: '/api/health',
  method: 'GET'
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Direct test status:', res.statusCode);
    console.log('Direct test body:', body);
    process.exit(0);
  });
});

req.on('error', (e) => {
  console.log('Direct test connection error:', e.message);
  process.exit(0);
});

req.end();
