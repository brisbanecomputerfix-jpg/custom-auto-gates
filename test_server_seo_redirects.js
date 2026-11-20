import app from './server/index.js';
import http from 'http';

console.log('=== STARTING EXPRESS SERVER SEO & REDIRECT INTEGRITY TEST ===');

const server = http.createServer(app);

server.listen(0, '127.0.0.1', async () => {
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;
  let passedCount = 0;
  let failedCount = 0;

  async function testReq(name, path, headers = {}) {
    return new Promise((resolve) => {
      const parsedUrl = new URL(path, baseUrl);
      const req = http.request({
        hostname: '127.0.0.1',
        port,
        path: parsedUrl.pathname + parsedUrl.search,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
          ...headers
        }
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          resolve({
            name,
            statusCode: res.statusCode,
            headers: res.headers,
            body
          });
        });
      });
      req.on('error', (err) => resolve({ name, error: err }));
      req.end();
    });
  }

  function assert(testName, condition, details) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passedCount++;
    } else {
      console.error(`[FAIL] ${testName}:`, details);
      failedCount++;
    }
  }

  try {
    // 1. WWW to Non-WWW 301 Redirect Tests
    const t1 = await testReq('WWW Homepage', '/', { 'host': 'www.customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('1a. https://www.customautogates.com.au/ -> 301 to https://customautogates.com.au/', 
      t1.statusCode === 301 && t1.headers.location === 'https://customautogates.com.au/',
      `got status ${t1.statusCode}, location ${t1.headers.location}`);

    const t2 = await testReq('WWW Subpage with Query', '/driveway-gates?utm_source=google', { 'host': 'www.customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('1b. https://www.customautogates.com.au/driveway-gates?utm_source=google -> 301 to non-www', 
      t2.statusCode === 301 && t2.headers.location === 'https://customautogates.com.au/driveway-gates?utm_source=google',
      `got status ${t2.statusCode}, location ${t2.headers.location}`);

    // 2. HTTP to HTTPS 301 Redirect Tests
    const t3 = await testReq('HTTP Non-WWW', '/', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'http' });
    assert('2a. http://customautogates.com.au/ -> 301 to https://customautogates.com.au/', 
      t3.statusCode === 301 && t3.headers.location === 'https://customautogates.com.au/',
      `got status ${t3.statusCode}, location ${t3.headers.location}`);

    const t4 = await testReq('HTTP WWW with Subpath', '/service', { 'host': 'www.customautogates.com.au', 'x-forwarded-proto': 'http' });
    assert('2b. http://www.customautogates.com.au/service -> 301 to https://customautogates.com.au/service', 
      t4.statusCode === 301 && t4.headers.location === 'https://customautogates.com.au/service',
      `got status ${t4.statusCode}, location ${t4.headers.location}`);

    // 3. Old URLs 301 Redirects (User-Requested)
    const t5 = await testReq('Redirect /gates/', '/gates/', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('3a. /gates/ -> 301 to /driveway-gates', 
      t5.statusCode === 301 && t5.headers.location === '/driveway-gates',
      `got status ${t5.statusCode}, location ${t5.headers.location}`);

    const t5b = await testReq('Redirect /gates', '/gates', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('3b. /gates -> 301 to /driveway-gates', 
      t5b.statusCode === 301 && t5b.headers.location === '/driveway-gates',
      `got status ${t5b.statusCode}, location ${t5b.headers.location}`);

    const t6 = await testReq('Redirect /gates/sliding-gates/', '/gates/sliding-gates/', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('3c. /gates/sliding-gates/ -> 301 to /sliding-gates', 
      t6.statusCode === 301 && t6.headers.location === '/sliding-gates',
      `got status ${t6.statusCode}, location ${t6.headers.location}`);

    const t7 = await testReq('Redirect /gate-automation/automation-accessories/', '/gate-automation/automation-accessories/', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('3d. /gate-automation/automation-accessories/ -> 301 to /#motor-showcase', 
      t7.statusCode === 301 && t7.headers.location === '/#motor-showcase',
      `got status ${t7.statusCode}, location ${t7.headers.location}`);

    const t8 = await testReq('Redirect /lp/balustrade/', '/lp/balustrade/', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('3e. /lp/balustrade/ -> 301 to /gates/gallery-gates', 
      t8.statusCode === 301 && t8.headers.location === '/gates/gallery-gates',
      `got status ${t8.statusCode}, location ${t8.headers.location}`);

    const t9 = await testReq('Redirect /gallery-and-design/fencing/', '/gallery-and-design/fencing/', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('3f. /gallery-and-design/fencing/ -> 301 to /#fencing', 
      t9.statusCode === 301 && t9.headers.location === '/#fencing',
      `got status ${t9.statusCode}, location ${t9.headers.location}`);

    const t10 = await testReq('Redirect with Query params preservation', '/gates/?gclid=test1234&utm_source=adwords', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('3g. /gates/?gclid=test1234&utm_source=adwords preserves query', 
      t10.statusCode === 301 && t10.headers.location === '/driveway-gates?gclid=test1234&utm_source=adwords',
      `got status ${t10.statusCode}, location ${t10.headers.location}`);

    // 4. Unknown Pages 404 Tests
    const t11 = await testReq('Unknown Page', '/some-random-unknown-page', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('4a. /some-random-unknown-page returns 404 status', 
      t11.statusCode === 404,
      `got status ${t11.statusCode}`);
    assert('4b. /some-random-unknown-page has X-Robots-Tag: noindex, nofollow', 
      t11.headers['x-robots-tag'] === 'noindex, nofollow',
      `got ${t11.headers['x-robots-tag']}`);
    assert('4c. /some-random-unknown-page returns branded 404 content', 
      t11.body.includes('404') && t11.body.includes('Page Not Found') && t11.body.includes('(07) 3102 1801'),
      `missing expected 404 text`);

    const t12 = await testReq('Missing Asset', '/assets/nonexistent-bundle.js', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('4d. /assets/nonexistent-bundle.js returns 404 without HTML payload', 
      t12.statusCode === 404 && t12.body === 'Asset not found',
      `got status ${t12.statusCode}, body: ${t12.body}`);

    // 5. Canonical Tag Pre-rendering & Trailing Slash Normalization
    const t13 = await testReq('Valid Homepage', '/', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('5a. Homepage returns 200 with canonical tag https://customautogates.com.au', 
      t13.statusCode === 200 && t13.body.includes('<link rel="canonical" href="https://customautogates.com.au" />'),
      `canonical tag missing or mismatched`);

    const t14 = await testReq('Valid Subpage /driveway-gates', '/driveway-gates', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('5b. /driveway-gates returns 200 with server-rendered canonical tag https://customautogates.com.au/driveway-gates', 
      t14.statusCode === 200 && t14.body.includes('<link rel="canonical" href="https://customautogates.com.au/driveway-gates" />'),
      `canonical tag missing or mismatched`);

    const t15 = await testReq('Valid Subpage /sliding-gates', '/sliding-gates', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('5c. /sliding-gates returns 200 with canonical tag https://customautogates.com.au/automatic-sliding-gates', 
      t15.statusCode === 200 && t15.body.includes('<link rel="canonical" href="https://customautogates.com.au/automatic-sliding-gates" />'),
      `canonical tag missing or mismatched`);

    const t16 = await testReq('Trailing Slash Normalization', '/driveway-gates/', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('5d. /driveway-gates/ -> 301 to /driveway-gates (no trailing slash)', 
      t16.statusCode === 301 && t16.headers.location === '/driveway-gates',
      `got status ${t16.statusCode}, location ${t16.headers.location}`);

    console.log(`\n=== RESULTS: ${passedCount} PASSED, ${failedCount} FAILED ===`);
  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    server.close();
    process.exit(failedCount === 0 ? 0 : 1);
  }
});
