// Fetches commodity/market news from RSS feeds — no API key required
// Sources: Economic Times Markets, Business Standard Commodities, Mint

const FEEDS = [
  { url: 'https://economictimes.indiatimes.com/markets/commodities/rssfeeds/1808152121.cms', source: 'Economic Times' },
  { url: 'https://www.business-standard.com/rss/markets/commodities-113.rss', source: 'Business Standard' },
  { url: 'https://www.livemint.com/rss/markets', source: 'Mint' },
];

function stripCdata(str) {
  return (str || '').replace(/^[\s]*<!\[CDATA\[/, '').replace(/\]\]>[\s]*$/, '').replace(/<[^>]+>/g, '').trim();
}

function parseItems(xml, source) {
  const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
  return items.slice(0, 6).map(item => {
    const title = stripCdata(item.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '');

    const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1]?.trim() || '';

    const link = stripCdata(
      item.match(/<link>([\s\S]*?)<\/link>/)?.[1] ||
      item.match(/<guid[^>]*>(https?:\/\/[\s\S]*?)<\/guid>/)?.[1] || ''
    );

    const description = stripCdata(
      item.match(/<description>([\s\S]*?)<\/description>/)?.[1] || ''
    ).slice(0, 120);

    // Parse a readable relative time
    let timeLabel = '';
    if (pubDate) {
      const d = new Date(pubDate);
      if (!isNaN(d)) {
        const diffMs = Date.now() - d.getTime();
        const diffHrs = Math.floor(diffMs / 3600000);
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 60) timeLabel = `${diffMins}m ago`;
        else if (diffHrs < 24) timeLabel = `${diffHrs}h ago`;
        else timeLabel = `${Math.floor(diffHrs / 24)}d ago`;
      }
    }

    return { title, source, pubDate, timeLabel, link, description };
  }).filter(a => a.title);
}

export default async function handler(req, res) {
  // Cache for 15 minutes
  res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=1800');
  res.setHeader('Content-Type', 'application/json');

  const results = await Promise.allSettled(
    FEEDS.map(({ url, source }) =>
      fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Energon/1.0)' },
        signal: AbortSignal.timeout(5000),
      })
        .then(r => r.text())
        .then(xml => parseItems(xml, source))
    )
  );

  const articles = results
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value);

  // Sort by pubDate descending
  articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  res.status(200).json({ articles: articles.slice(0, 10), fetchedAt: new Date().toISOString() });
}
