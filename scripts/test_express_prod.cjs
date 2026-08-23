const http = require('http');

http.get('http://localhost:3000/api/health', (res) => {
  let body = '';
  res.on('data', c => { body += c; });
  res.on('end', () => {
    console.log('Health Check Status:', res.statusCode);
    console.log('Response:', body);
  });
});
