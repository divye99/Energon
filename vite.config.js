import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Inline metals handler for dev server (mirrors api/metals.js logic)
async function devMetalsHandler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  try {
    const yahooRes = await fetch(
      'https://query1.finance.yahoo.com/v8/finance/chart/HG%3DF?interval=1m&range=1d',
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    );
    const data = await yahooRes.json();
    const meta = data?.chart?.result?.[0]?.meta;
    const copperUsdPerLb = meta?.regularMarketPrice || 5.45;
    const prevPerLb = meta?.previousClose || copperUsdPerLb;
    const copperUsdPerMT = copperUsdPerLb * 2204.62;
    const prevMT = prevPerLb * 2204.62;
    const usdInr = 84.0;
    const lmeInrPerKg = copperUsdPerMT * usdInr / 1000;
    const mcxInrPerKg = copperUsdPerMT * usdInr * 1.034 / 1000;
    const changeUsd = copperUsdPerMT - prevMT;
    res.statusCode = 200;
    res.end(JSON.stringify({
      copper: {
        lme_usd_mt: Math.round(copperUsdPerMT),
        lme_inr_kg: Math.round(lmeInrPerKg * 100) / 100,
        mcx_inr_kg: Math.round(mcxInrPerKg * 100) / 100,
        change_usd: Math.round(changeUsd),
        change_pct: parseFloat(((changeUsd / prevMT) * 100).toFixed(2)),
        is_up: changeUsd >= 0,
        updated_at: new Date().toISOString(),
      },
      usd_inr: usdInr,
    }));
  } catch (err) {
    res.statusCode = 200;
    res.end(JSON.stringify({
      copper: { lme_usd_mt: 12000, lme_inr_kg: 1008, mcx_inr_kg: 1042, change_usd: 0, change_pct: 0, is_up: true, updated_at: new Date().toISOString(), error: err.message },
      usd_inr: 84.0,
    }));
  }
}

// Inline enquiry handler for dev server (mirrors api/enquiry.js logic)
async function devEnquiryHandler(req, res, env) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }
  const resendKey = env.RESEND_API_KEY;
  if (!resendKey) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: 'Email service not configured' }));
  }
  let body = '';
  for await (const chunk of req) body += chunk;
  const { buyerName, buyerPhone, buyerCompany, buyerAddress, cartItems, cartTotal } = JSON.parse(body || '{}');
  const htmlItems = (cartItems || [])
    .map(item => `<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${item.name}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${item.brand}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">${item.qty} ${item.unit}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;text-align:right;">₹${(item.frozenPrice * item.qty).toLocaleString('en-IN')}</td></tr>`)
    .join('');
  const html = `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:24px;"><div style="background:#166534;padding:20px 24px;border-radius:8px 8px 0 0;"><h1 style="color:#fff;margin:0;font-size:20px;">New Order Enquiry — Energon</h1></div><div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0;"><h2 style="font-size:15px;color:#166534;margin:0 0 16px;">Buyer Information</h2><table style="width:100%;border-collapse:collapse;margin-bottom:24px;"><tr><td style="padding:6px 0;color:#64748b;width:140px;">Name</td><td style="padding:6px 0;font-weight:600;">${buyerName||'—'}</td></tr><tr><td style="padding:6px 0;color:#64748b;">Phone</td><td style="padding:6px 0;font-weight:600;">${buyerPhone||'—'}</td></tr><tr><td style="padding:6px 0;color:#64748b;">Company</td><td style="padding:6px 0;font-weight:600;">${buyerCompany||'—'}</td></tr><tr><td style="padding:6px 0;color:#64748b;">Address</td><td style="padding:6px 0;font-weight:600;">${buyerAddress||'—'}</td></tr></table><h2 style="font-size:15px;color:#166534;margin:0 0 12px;">Order Items</h2><table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px;"><thead><tr style="background:#f1f5f9;"><th style="padding:8px 12px;text-align:left;color:#64748b;">Product</th><th style="padding:8px 12px;text-align:left;color:#64748b;">Brand</th><th style="padding:8px 12px;text-align:center;color:#64748b;">Qty</th><th style="padding:8px 12px;text-align:right;color:#64748b;">Amount</th></tr></thead><tbody>${htmlItems}</tbody><tfoot><tr style="background:#f0fdf4;"><td colspan="3" style="padding:10px 12px;font-weight:700;color:#166534;">Total</td><td style="padding:10px 12px;font-weight:700;color:#166534;text-align:right;">₹${Number(cartTotal||0).toLocaleString('en-IN')}</td></tr></tfoot></table></div></div>`;
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${resendKey}` },
      body: JSON.stringify({ from: 'Energon Orders <onboarding@resend.dev>', to: ['divye2014@gmail.com'], subject: `New Enquiry: ₹${Number(cartTotal||0).toLocaleString('en-IN')} from ${buyerName||'a buyer'}`, html }),
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e.message || 'Resend error'); }
    res.statusCode = 200;
    res.end(JSON.stringify({ ok: true }));
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: err.message }));
  }
}

// Inline news handler for dev server (mirrors api/news.js logic)
async function devNewsHandler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  try {
    const feeds = [
      'https://economictimes.indiatimes.com/markets/commodities/rssfeeds/1808152121.cms',
      'https://www.business-standard.com/rss/markets/commodities-113.rss',
    ];
    const results = await Promise.allSettled(feeds.map(url =>
      fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
        .then(r => r.text())
    ));
    const articles = [];
    for (const r of results) {
      if (r.status !== 'fulfilled') continue;
      const xml = r.value;
      const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
      const stripCdata = s => (s||'').replace(/^[\s]*<!\[CDATA\[/,'').replace(/\]\]>[\s]*$/,'').replace(/<[^>]+>/g,'').trim();
      for (const item of items.slice(0, 5)) {
        const title = stripCdata(item.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '');
        const pubDate = (item.match(/<pubDate>(.*?)<\/pubDate>/) || [])[1] || '';
        const link = stripCdata(item.match(/<link>([\s\S]*?)<\/link>/)?.[1] || '');
        const source = link.includes('economictimes') ? 'Economic Times' : link.includes('business-standard') ? 'Business Standard' : 'Mint';
        let timeLabel = '';
        if (pubDate) {
          const d = new Date(pubDate);
          if (!isNaN(d)) {
            const diffMins = Math.floor((Date.now() - d) / 60000);
            const diffHrs = Math.floor(diffMins / 60);
            timeLabel = diffMins < 60 ? `${diffMins}m ago` : diffHrs < 24 ? `${diffHrs}h ago` : `${Math.floor(diffHrs/24)}d ago`;
          }
        }
        if (title) articles.push({ title, source, pubDate, timeLabel, link });
      }
    }
    articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    res.statusCode = 200;
    res.end(JSON.stringify({ articles: articles.slice(0, 8), fetchedAt: new Date().toISOString() }));
  } catch (err) {
    res.statusCode = 200;
    res.end(JSON.stringify({ articles: [], error: err.message }));
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'api-dev-handlers',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/metals' || req.url?.startsWith('/api/metals?')) {
              return devMetalsHandler(req, res);
            }
            if (req.url === '/api/news' || req.url?.startsWith('/api/news?')) {
              return devNewsHandler(req, res);
            }
            if (req.url === '/api/enquiry') {
              return devEnquiryHandler(req, res, env);
            }
            next();
          });
        },
      },
    ],
    server: {
      proxy: {
        '/api/volt': {
          target: 'https://api.anthropic.com',
          changeOrigin: true,
          rewrite: () => '/v1/messages',
          headers: {
            'x-api-key': env.VITE_ANTHROPIC_API_KEY || '',
            'anthropic-version': '2023-06-01',
          },
        },
      },
    },
  }
})
