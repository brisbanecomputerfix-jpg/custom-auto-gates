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
    // 1. WWW to Non-WWW 301 Redirect Tests (Item 2)
    const t1 = await testReq('WWW Homepage', '/', { 'host': 'www.customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('1a. https://www.customautogates.com.au/ -> 301 to https://customautogates.com.au/', 
      t1.statusCode === 301 && t1.headers.location === 'https://customautogates.com.au/',
      `got status ${t1.statusCode}, location ${t1.headers.location}`);

    const t2 = await testReq('WWW Subpage with Query', '/driveway-gates?utm_source=google', { 'host': 'www.customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('1b. https://www.customautogates.com.au/driveway-gates?utm_source=google -> 301 to non-www', 
      t2.statusCode === 301 && t2.headers.location === 'https://customautogates.com.au/driveway-gates?utm_source=google',
      `got status ${t2.statusCode}, location ${t2.headers.location}`);

    // 2. HTTP to HTTPS 301 Redirect Tests (Item 3)
    const t3 = await testReq('HTTP Non-WWW', '/', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'http' });
    assert('2a. http://customautogates.com.au/ -> 301 to https://customautogates.com.au/', 
      t3.statusCode === 301 && t3.headers.location === 'https://customautogates.com.au/',
      `got status ${t3.statusCode}, location ${t3.headers.location}`);

    const t4 = await testReq('HTTP WWW with Subpath', '/service', { 'host': 'www.customautogates.com.au', 'x-forwarded-proto': 'http' });
    assert('2b. http://www.customautogates.com.au/service -> 301 to https://customautogates.com.au/service', 
      t4.statusCode === 301 && t4.headers.location === 'https://customautogates.com.au/service',
      `got status ${t4.statusCode}, location ${t4.headers.location}`);

    // 2c. Subdomain Redirect: brisbane.customautogates.com.au -> /gates-brisbane (Item 3)
    const tBris = await testReq('Subdomain brisbane.', '/', { 'host': 'brisbane.customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('2c. brisbane.customautogates.com.au -> 301 to https://customautogates.com.au/gates-brisbane',
      tBris.statusCode === 301 && tBris.headers.location === 'https://customautogates.com.au/gates-brisbane',
      `got status ${tBris.statusCode}, location ${tBris.headers.location}`);

    // 2d. Spam query parameter strip & 301 redirect (Item 3)
    const tSpam = await testReq('Spam parameter ?h=', '/?h=12345678', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('2d. /?h=12345678 -> 301 to clean URL /',
      tSpam.statusCode === 301 && tSpam.headers.location === '/',
      `got status ${tSpam.statusCode}, location ${tSpam.headers.location}`);

    const tSpam2 = await testReq('Spam parameter ?y=', '/driveway-gates?y=abcd', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('2e. /driveway-gates?y=abcd -> 301 to clean URL /driveway-gates',
      tSpam2.statusCode === 301 && tSpam2.headers.location === '/driveway-gates',
      `got status ${tSpam2.statusCode}, location ${tSpam2.headers.location}`);

    // 3. Old URLs 301 Redirects (Item 4)
    const t5 = await testReq('Redirect /gates/', '/gates/', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('3a. /gates/ -> 301 to /driveway-gates', 
      t5.statusCode === 301 && t5.headers.location === '/driveway-gates',
      `got status ${t5.statusCode}, location ${t5.headers.location}`);

    const t6 = await testReq('Redirect /gates/sliding-gates/', '/gates/sliding-gates/', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('3b. /gates/sliding-gates/ -> 301 to /automatic-sliding-gates', 
      t6.statusCode === 301 && t6.headers.location === '/automatic-sliding-gates',
      `got status ${t6.statusCode}, location ${t6.headers.location}`);

    const t7 = await testReq('Redirect /gate-automation/automation-accessories/', '/gate-automation/automation-accessories/', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('3c. /gate-automation/automation-accessories/ -> 301 to /service', 
      t7.statusCode === 301 && t7.headers.location === '/service',
      `got status ${t7.statusCode}, location ${t7.headers.location}`);

    const t8 = await testReq('Redirect /lp/balustrade/', '/lp/balustrade/', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('3d. /lp/balustrade/ -> 301 to /fencing', 
      t8.statusCode === 301 && t8.headers.location === '/fencing',
      `got status ${t8.statusCode}, location ${t8.headers.location}`);

    const t9 = await testReq('Redirect /gallery-and-design/fencing/', '/gallery-and-design/fencing/', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('3e. /gallery-and-design/fencing/ -> 301 to /fencing', 
      t9.statusCode === 301 && t9.headers.location === '/fencing',
      `got status ${t9.statusCode}, location ${t9.headers.location}`);

    const tQuote = await testReq('Redirect /instant-online-quote/', '/instant-online-quote/', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('3f. /instant-online-quote/ -> 301 to /#quote', 
      tQuote.statusCode === 301 && tQuote.headers.location === '/#quote',
      `got status ${tQuote.statusCode}, location ${tQuote.headers.location}`);

    const tAutoGates = await testReq('Redirect /gates/automatic-gates/', '/gates/automatic-gates/', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('3g. /gates/automatic-gates/ -> 301 to /driveway-gates', 
      tAutoGates.statusCode === 301 && tAutoGates.headers.location === '/driveway-gates',
      `got status ${tAutoGates.statusCode}, location ${tAutoGates.headers.location}`);

    const tAutoSliding = await testReq('Redirect /gates/automatic-gates/sliding-gates/', '/gates/automatic-gates/sliding-gates/', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('3h. /gates/automatic-gates/sliding-gates/ -> 301 to /automatic-sliding-gates', 
      tAutoSliding.statusCode === 301 && tAutoSliding.headers.location === '/automatic-sliding-gates',
      `got status ${tAutoSliding.statusCode}, location ${tAutoSliding.headers.location}`);

    const tServ = await testReq('Redirect /service/', '/service/', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('3i. /service/ -> 301 to /service (trailing slash strip)', 
      tServ.statusCode === 301 && tServ.headers.location === '/service',
      `got status ${tServ.statusCode}, location ${tServ.headers.location}`);

    // 4. Unknown Pages 404 Tests (Item 5)
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

    // 5. Server-Side Pre-Rendering & Initial HTML Body (Item 1 & Item 6)
    const tHome = await testReq('Homepage Initial HTML', '/', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('5a. Homepage returns 200 with canonical tag https://customautogates.com.au', 
      tHome.statusCode === 200 && tHome.body.includes('<link rel="canonical" href="https://customautogates.com.au" />'),
      `canonical tag missing or mismatched`);
    assert('5b. Homepage initial HTML contains pre-rendered H1 headline',
      tHome.body.includes('<h1') && (tHome.body.includes('Automatic &amp; Electric Gates Brisbane') || tHome.body.includes('Automatic & Electric Gates Brisbane')),
      'missing pre-rendered H1 in initial HTML');
    assert('5c. Homepage initial HTML contains pre-rendered fold-out accordions (<details>)',
      tHome.body.includes('<details class="seo-accordion"') && tHome.body.includes('<summary'),
      'missing pre-rendered details/summary accordions in initial HTML');

    const tDriveway = await testReq('/driveway-gates Initial HTML', '/driveway-gates', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('5d. /driveway-gates returns 200 with server-rendered canonical tag', 
      tDriveway.statusCode === 200 && tDriveway.body.includes('<link rel="canonical" href="https://customautogates.com.au/driveway-gates" />'),
      `canonical tag missing or mismatched`);
    assert('5e. /driveway-gates initial HTML contains pre-rendered H1 & full body text',
      tDriveway.body.includes('Automatic Driveway Gates Brisbane') &&
      tDriveway.body.includes('Engineering Specifications') &&
      tDriveway.body.includes('Queensland Council Fence'),
      'missing pre-rendered rich content in /driveway-gates initial HTML');
    assert('5f. /driveway-gates has server-rendered JSON-LD schema with Service & FAQPage',
      (tDriveway.body.includes('id="master-schema-graph"') || tDriveway.body.includes('id="dynamic-route-schema"')) && tDriveway.body.includes('"@type": "Service"') && tDriveway.body.includes('"@type": "FAQPage"'),
      'missing expected dynamic route schema in HTML');

    const tSliding = await testReq('/automatic-sliding-gates Initial HTML', '/automatic-sliding-gates', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('5g. /automatic-sliding-gates has pre-rendered H1 & FAQ accordions in HTML',
      tSliding.body.includes('Automatic Sliding Gates Brisbane') &&
      tSliding.body.includes('Can a sliding gate be installed on a driveway that slopes sideways?'),
      'missing sliding gates pre-rendered content');

    const tBrisbanePage = await testReq('/gates-brisbane Initial HTML', '/gates-brisbane', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('5h. /gates-brisbane has pre-rendered local Brisbane content & suburbs',
      tBrisbanePage.body.includes('Custom Automatic Gates') &&
      tBrisbanePage.body.includes('Ascot') && tBrisbanePage.body.includes('Hamilton'),
      'missing Brisbane regional pre-rendered content');

    const tQuoteConfirm = await testReq('/quote-confirmation Initial HTML', '/quote-confirmation', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('5i. /quote-confirmation returns 200 with confirmation message & phone pill',
      tQuoteConfirm.statusCode === 200 && tQuoteConfirm.body.includes('Quote Request Received') && tQuoteConfirm.body.includes('(07) 3102 1801'),
      'missing quote-confirmation page content');

    // 6. Dedicated Fencing & 9 Residential Suburbs
    const tFencing = await testReq('/fencing Initial HTML', '/fencing', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('6a. /fencing returns 200 with pre-rendered H1 & canonical',
      tFencing.statusCode === 200 && tFencing.body.includes('Architectural Fencing Brisbane') && tFencing.body.includes('canonical" href="https://customautogates.com.au/fencing"'),
      'missing fencing page content');

    const tSecFencing = await testReq('/security-fencing 301', '/security-fencing', { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
    assert('6b. /security-fencing 301 redirects to /fencing',
      tSecFencing.statusCode === 301 && tSecFencing.headers.location === '/fencing',
      `got status ${tSecFencing.statusCode}, location ${tSecFencing.headers.location}`);

    const resSuburbs = [
      ['carindale', 'Gates and Fencing Carindale | Custom Auto Gates', 'Carindale'],
      ['camp-hill', 'Gates and Fencing Camp Hill | Custom Auto Gates', 'Camp Hill'],
      ['rochedale', 'Gates and Fencing Rochedale | Custom Auto Gates', 'Rochedale'],
      ['wishart', 'Gates and Fencing Wishart | Custom Auto Gates', 'Wishart'],
      ['mansfield', 'Gates and Fencing Mansfield | Custom Auto Gates', 'Mansfield'],
      ['capalaba', 'Gates and Fencing Capalaba | Custom Auto Gates', 'Capalaba'],
      ['gumdale', 'Gates and Fencing Gumdale | Custom Auto Gates', 'Gumdale'],
      ['wavell-heights', 'Gates and Fencing Wavell Heights | Custom Auto Gates', 'Wavell Heights'],
      ['pullenvale', 'Gates and Fencing Pullenvale | Custom Auto Gates', 'Pullenvale']
    ];

    for (let i = 0; i < resSuburbs.length; i++) {
      const [slug, h1, name] = resSuburbs[i];
      const tSub = await testReq(`/gates-fencing-${slug}`, `/gates-fencing-${slug}`, { 'host': 'customautogates.com.au', 'x-forwarded-proto': 'https' });
      assert(`6c.${i+1} /gates-fencing-${slug} returns 200 with full HTML & schema`,
        tSub.statusCode === 200 && tSub.body.includes(h1) && tSub.body.includes(`canonical" href="https://customautogates.com.au/gates-fencing-${slug}"`) && tSub.body.includes('LocalBusiness'),
        `failed verification for ${slug}`);
    }

    console.log(`\n=== RESULTS: ${passedCount} PASSED, ${failedCount} FAILED ===`);
  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    server.close();
    process.exit(failedCount === 0 ? 0 : 1);
  }
});
