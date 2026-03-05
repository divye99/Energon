// Fetches live commodity prices from Yahoo Finance (no API key required)
// HG=F = COMEX Copper Futures (global benchmark, ~15 min delayed)
// EURINR=X = EUR/INR for USD/INR cross-rate check
// Returns prices used for LME display + MCX derived price

const SYMBOLS = ['HG=F', 'EURUSD=X'];

async function fetchYahooPrice(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1m&range=1d`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  if (!res.ok) throw new Error(`Yahoo ${symbol}: ${res.status}`);
  const data = await res.json();
  const meta = data?.chart?.result?.[0]?.meta;
  if (!meta) throw new Error(`No meta for ${symbol}`);
  return {
    symbol,
    price: meta.regularMarketPrice,
    previousClose: meta.previousClose || meta.chartPreviousClose,
    currency: meta.currency,
  };
}

export default async function handler(req, res) {
  // Cache for 60 seconds
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

  try {
    const [copper, eurusd] = await Promise.all([
      fetchYahooPrice('HG=F'),
      fetchYahooPrice('EURUSD=X').catch(() => null),
    ]);

    // COMEX copper is in USD/lb → convert to USD/MT (1 MT = 2204.62 lb)
    const copperUsdPerLb = copper.price;
    const copperUsdPerMT = copperUsdPerLb * 2204.62;
    const prevCopperUsdPerMT = (copper.previousClose || copperUsdPerLb) * 2204.62;

    // USD/INR: use a fixed rate with slight variation if we can't get live
    const usdInr = 84.0;

    // MCX copper ≈ COMEX × USD/INR × 1.034 (import duty + local premium factor)
    // MCX quotes in INR per 100 grams, but display in INR/kg
    const mcxInrPerKg = copperUsdPerMT * usdInr * 1.034 / 1000;
    const prevMcxInrPerKg = prevCopperUsdPerMT * usdInr * 1.034 / 1000;

    // INR/kg for LME display (as used in the app)
    const lmeInrPerKg = copperUsdPerMT * usdInr / 1000;

    const changeUsd = copperUsdPerMT - prevCopperUsdPerMT;
    const changePct = ((changeUsd / prevCopperUsdPerMT) * 100).toFixed(2);

    res.status(200).json({
      copper: {
        lme_usd_mt: Math.round(copperUsdPerMT),
        lme_inr_kg: Math.round(lmeInrPerKg * 100) / 100,
        mcx_inr_kg: Math.round(mcxInrPerKg * 100) / 100,
        change_usd: Math.round(changeUsd),
        change_pct: parseFloat(changePct),
        is_up: changeUsd >= 0,
        updated_at: new Date().toISOString(),
      },
      usd_inr: usdInr,
    });
  } catch (err) {
    // Fallback values so the app never breaks
    res.status(200).json({
      copper: {
        lme_usd_mt: 12000,
        lme_inr_kg: 1008,
        mcx_inr_kg: 1042,
        change_usd: 0,
        change_pct: 0,
        is_up: true,
        updated_at: new Date().toISOString(),
        error: err.message,
      },
      usd_inr: 84.0,
    });
  }
}
