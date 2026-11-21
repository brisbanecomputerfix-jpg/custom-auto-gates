#!/usr/bin/env node

/**
 * Bing Webmaster Tools & IndexNow CLI Tool for Custom Auto Gates
 * Usage:
 *   node scripts/bingSync.js sync    -> Submits sitemap + all canonical URLs to Bing & IndexNow
 *   node scripts/bingSync.js stats   -> Fetches live queries, crawl stats & submission quotas
 */

import {
  submitSitemap,
  submitUrlBatch,
  submitIndexNow,
  getSubmissionQuota,
  getQueryStats,
  getPageStats,
  getCrawlStats,
  getFeeds,
  CANONICAL_ROUTES
} from '../server/bingWebmaster.js';

const action = process.argv[2] || 'sync';

async function run() {
  console.log(`\n==================================================`);
  console.log(`  Custom Auto Gates - Bing Webmaster Tools API`);
  console.log(`==================================================\n`);

  if (action === 'sync' || action === 'submit') {
    console.log(`1. Submitting sitemap to Bing Webmaster Tools...`);
    try {
      const sitemapResult = await submitSitemap();
      console.log(`   [SUCCESS] Sitemap submitted: ${sitemapResult.feedUrl}`);
    } catch (err) {
      console.error(`   [ERROR] Sitemap submission failed:`, err.message);
    }

    console.log(`\n2. Submitting ${CANONICAL_ROUTES.length} canonical URLs via SubmitUrlBatch...`);
    try {
      const batchResult = await submitUrlBatch();
      console.log(`   [SUCCESS] ${batchResult.submittedCount} URLs submitted to Bing index queue!`);
    } catch (err) {
      console.error(`   [ERROR] URL batch submission failed:`, err.message);
    }

    console.log(`\n3. Notifying IndexNow network (Bing, Yandex, Seznam)...`);
    try {
      const indexNowResult = await submitIndexNow();
      console.log(`   [SUCCESS] IndexNow response status: ${indexNowResult.status} (ok: ${indexNowResult.ok})`);
    } catch (err) {
      console.error(`   [ERROR] IndexNow failed:`, err.message);
    }

    console.log(`\n4. Checking remaining submission quota...`);
    try {
      const quota = await getSubmissionQuota();
      console.log(`   Daily Quota: ${quota.DailyQuota} | Monthly Quota: ${quota.MonthlyQuota}`);
    } catch (err) {
      console.error(`   [ERROR] Quota check failed:`, err.message);
    }

  } else if (action === 'stats') {
    console.log(`1. Fetching Top Search Queries from Bing...`);
    try {
      const queries = await getQueryStats();
      if (queries.length === 0) {
        console.log(`   No query data returned for current window.`);
      } else {
        console.table(queries.slice(0, 10).map(q => ({
          Query: q.Query,
          Impressions: q.Impressions,
          Clicks: q.Clicks,
          AvgPos: q.AvgImpressionPosition
        })));
      }
    } catch (err) {
      console.error(`   [ERROR] Fetching queries failed:`, err.message);
    }

    console.log(`\n2. Fetching Top Pages Performance...`);
    try {
      const pages = await getPageStats();
      if (pages.length === 0) {
        console.log(`   No page data returned.`);
      } else {
        console.table(pages.slice(0, 10).map(p => ({
          URL: p.Query,
          Impressions: p.Impressions,
          Clicks: p.Clicks,
          AvgPos: p.AvgImpressionPosition
        })));
      }
    } catch (err) {
      console.error(`   [ERROR] Fetching pages failed:`, err.message);
    }

    console.log(`\n3. Fetching Crawl & Indexing Stats...`);
    try {
      const crawl = await getCrawlStats();
      if (crawl.length === 0) {
        console.log(`   No crawl stats available.`);
      } else {
        const latest = crawl[0];
        console.log(`   In Index: ${latest.InIndex} pages | Crawled: ${latest.CrawledPages} | 2xx: ${latest.Code2xx} | 301: ${latest.Code301}`);
      }
    } catch (err) {
      console.error(`   [ERROR] Fetching crawl stats failed:`, err.message);
    }

    console.log(`\n4. Active Sitemaps / Feeds...`);
    try {
      const feeds = await getFeeds();
      console.table(feeds.map(f => ({
        URL: f.Url,
        Status: f.Status,
        UrlCount: f.UrlCount
      })));
    } catch (err) {
      console.error(`   [ERROR] Fetching feeds failed:`, err.message);
    }
  } else {
    console.log(`Unknown action: "${action}". Use "sync" or "stats".`);
  }

  console.log(`\nDone.`);
}

run();
