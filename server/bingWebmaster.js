import dotenv from 'dotenv';
dotenv.config();

export const BING_API_KEY = process.env.BING_WEBMASTER_API_KEY || 'e03d2af542ca4ff89b26e2d3a81b2d23';
export const SITE_URL = process.env.SITE_URL || 'https://customautogates.com.au/';
export const DEFAULT_SITEMAP = 'https://customautogates.com.au/sitemap.xml';

export const CANONICAL_ROUTES = [
  'https://customautogates.com.au/',
  'https://customautogates.com.au/driveway-gates',
  'https://customautogates.com.au/automatic-sliding-gates',
  'https://customautogates.com.au/swing-gates',
  'https://customautogates.com.au/solar-gates',
  'https://customautogates.com.au/commercial-gates',
  'https://customautogates.com.au/service',
  'https://customautogates.com.au/pricing-guide',
  'https://customautogates.com.au/council-guide',
  'https://customautogates.com.au/gates-brisbane',
  'https://customautogates.com.au/gates-ipswich',
  'https://customautogates.com.au/gates-logan',
  'https://customautogates.com.au/gates-gold-coast',
  'https://customautogates.com.au/about-us',
  'https://customautogates.com.au/testimonials',
  'https://customautogates.com.au/contact-us',
  'https://customautogates.com.au/privacy-policy'
];

/**
 * Submit sitemap feed to Bing Webmaster Tools
 */
export async function submitSitemap(feedUrl = DEFAULT_SITEMAP, siteUrl = SITE_URL, apiKey = BING_API_KEY) {
  const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/SubmitFeed?apikey=${apiKey}`;
  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ siteUrl, feedUrl })
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Bing SubmitFeed failed: ${resp.status} ${text}`);
  }
  return { success: true, feedUrl, siteUrl };
}

/**
 * Submit batch of URLs for real-time indexing in Bing
 */
export async function submitUrlBatch(urlList = CANONICAL_ROUTES, siteUrl = SITE_URL, apiKey = BING_API_KEY) {
  const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch?apikey=${apiKey}`;
  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ siteUrl, urlList })
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Bing SubmitUrlBatch failed: ${resp.status} ${text}`);
  }
  return { success: true, submittedCount: urlList.length, urlList };
}

/**
 * Retrieve User Sites from Bing Webmaster Tools
 */
export async function getUserSites(apiKey = BING_API_KEY) {
  const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/GetUserSites?apikey=${apiKey}`;
  const resp = await fetch(endpoint);
  if (!resp.ok) throw new Error(`Bing GetUserSites failed: ${resp.status}`);
  const json = await resp.json();
  return json.d || [];
}

/**
 * Retrieve submitted feeds (sitemaps) status
 */
export async function getFeeds(siteUrl = SITE_URL, apiKey = BING_API_KEY) {
  const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/GetFeeds?siteUrl=${encodeURIComponent(siteUrl)}&apikey=${apiKey}`;
  const resp = await fetch(endpoint);
  if (!resp.ok) throw new Error(`Bing GetFeeds failed: ${resp.status}`);
  const json = await resp.json();
  return json.d || [];
}

/**
 * Retrieve submission quota (daily & monthly)
 */
export async function getSubmissionQuota(siteUrl = SITE_URL, apiKey = BING_API_KEY) {
  const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/GetUrlSubmissionQuota?siteUrl=${encodeURIComponent(siteUrl)}&apikey=${apiKey}`;
  const resp = await fetch(endpoint);
  if (!resp.ok) throw new Error(`Bing GetUrlSubmissionQuota failed: ${resp.status}`);
  const json = await resp.json();
  return json.d || {};
}

/**
 * Retrieve search queries & traffic stats
 */
export async function getQueryStats(siteUrl = SITE_URL, apiKey = BING_API_KEY) {
  const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/GetQueryStats?siteUrl=${encodeURIComponent(siteUrl)}&apikey=${apiKey}`;
  const resp = await fetch(endpoint);
  if (!resp.ok) throw new Error(`Bing GetQueryStats failed: ${resp.status}`);
  const json = await resp.json();
  return json.d || [];
}

/**
 * Retrieve page performance stats (impressions, clicks, rankings per URL)
 */
export async function getPageStats(siteUrl = SITE_URL, apiKey = BING_API_KEY) {
  const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/GetPageStats?siteUrl=${encodeURIComponent(siteUrl)}&apikey=${apiKey}`;
  const resp = await fetch(endpoint);
  if (!resp.ok) throw new Error(`Bing GetPageStats failed: ${resp.status}`);
  const json = await resp.json();
  return json.d || [];
}

/**
 * Retrieve crawl stats & error reports
 */
export async function getCrawlStats(siteUrl = SITE_URL, apiKey = BING_API_KEY) {
  const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/GetCrawlStats?siteUrl=${encodeURIComponent(siteUrl)}&apikey=${apiKey}`;
  const resp = await fetch(endpoint);
  if (!resp.ok) throw new Error(`Bing GetCrawlStats failed: ${resp.status}`);
  const json = await resp.json();
  return json.d || [];
}

/**
 * Push to IndexNow (Bing, Yandex, Seznam real-time indexing)
 */
export async function submitIndexNow(urlList = CANONICAL_ROUTES, host = 'customautogates.com.au', key = BING_API_KEY) {
  const endpoint = 'https://api.indexnow.org/IndexNow';
  try {
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key,
        keyLocation: `https://${host}/${key}.txt`,
        urlList
      })
    });
    return { status: resp.status, ok: resp.ok };
  } catch (err) {
    return { status: 500, ok: false, error: err.message };
  }
}
