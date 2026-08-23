const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    const titleMatch = data.match(/<title>(.*?)<\/title>/);
    const themeMatch = data.match(/data-theme="([^"]+)"/);
    console.log('Title:', titleMatch ? titleMatch[1] : 'N/A');
    console.log('Default Theme:', themeMatch ? themeMatch[1] : 'N/A');
    console.log('HTML Length:', data.length);
  });
}).on('error', (err) => {
  console.error('Error fetching localhost:3000:', err.message);
});
