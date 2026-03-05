import React, { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Info } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { CHART_DATA, NEWS_UPDATES } from '../data/constants';

const MarketHub = ({ lmeUsd = 12000, lmeInrKg = 1008 }) => {
  const [activeMetal, setActiveMetal] = useState('copper');

  // Update last copper data point with live simulated price
  const liveChartData = {
    ...CHART_DATA,
    copper: [
      ...CHART_DATA.copper.slice(0, -1),
      { name: 'Live', price: Math.round(lmeUsd) },
    ],
  };

  const CHART_CONFIG = {
    copper: {
      title: 'Copper (LME)', unit: 'USD/MT', color: '#16A34A',
      data: liveChartData.copper, change: '+2.4%', positive: true,
      livePrice: Math.round(lmeUsd),
    },
    steel: {
      title: 'Steel (TMT)', unit: 'INR/Ton', color: '#64748b',
      data: CHART_DATA.steel, change: '-0.5%', positive: false,
      livePrice: CHART_DATA.steel[CHART_DATA.steel.length - 1].price,
    },
    aluminum: {
      title: 'Aluminum', unit: 'USD/MT', color: '#3b82f6',
      data: CHART_DATA.aluminum, change: '+1.1%', positive: true,
      livePrice: CHART_DATA.aluminum[CHART_DATA.aluminum.length - 1].price,
    },
    pvc: {
      title: 'PVC Resin', unit: 'INR/Kg', color: '#f59e0b',
      data: CHART_DATA.pvc, change: '+0.2%', positive: true,
      livePrice: CHART_DATA.pvc[CHART_DATA.pvc.length - 1].price,
    },
  };

  const current = CHART_CONFIG[activeMetal];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">

      {/* Public access banner */}
      <div className="bg-brand-green-light border border-brand-green/20 rounded-xl p-4 mb-8 flex items-start gap-3">
        <Info size={18} className="text-brand-green shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-brand-green-dark">Free Market Intelligence — No Account Required</p>
          <p className="text-xs text-green-700 mt-0.5">Live commodity price data to help you plan procurement and lock tender margins.</p>
        </div>
      </div>

      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Market Intelligence Hub</h1>
          <p className="text-slate-500 text-sm mt-1">Live commodity prices · Updated every 5 seconds</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-brand-green font-semibold bg-brand-green-light px-3 py-1.5 rounded-full border border-brand-green/20">
          <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
          LME Live: ${lmeUsd.toFixed(0)}/MT · ₹{lmeInrKg.toFixed(0)}/kg
        </div>
      </div>

      {/* Price summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.entries(CHART_CONFIG).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => setActiveMetal(key)}
            className={`text-left p-4 rounded-xl border transition-all ${
              activeMetal === key
                ? 'border-brand-green bg-brand-green-light shadow-sm'
                : 'border-slate-200 bg-white hover:border-brand-green/40 hover:shadow-sm'
            }`}
          >
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{cfg.title}</div>
            <div className="text-lg font-bold text-slate-900">
              {cfg.livePrice.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 mb-2">{cfg.unit}</div>
            <div className={`flex items-center gap-1 text-xs font-semibold ${cfg.positive ? 'text-brand-green' : 'text-red-500'}`}>
              {cfg.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {cfg.change} this week
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-bold text-slate-900">{current.title}</h2>
              <span className={`text-xs font-semibold ${current.positive ? 'text-brand-green' : 'text-red-500'}`}>
                {current.change} · 7-day trend
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 font-medium">{current.unit}</span>
              {activeMetal === 'copper' && (
                <div className="text-xs text-brand-green font-semibold mt-0.5 flex items-center gap-1 justify-end">
                  <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" /> Live
                </div>
              )}
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={current.data}>
                <defs>
                  <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={current.color} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={current.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={current.color}
                  strokeWidth={2.5}
                  fill="url(#colorGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* News */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BarChart3 size={17} className="text-brand-green" /> Market News
          </h3>
          <div className="space-y-4">
            {NEWS_UPDATES.map(news => (
              <div key={news.id} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <p className="text-sm font-medium text-slate-800 leading-snug mb-1">{news.title}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-brand-green font-medium">{news.source}</span>
                  <span className="text-xs text-slate-400">{news.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-brand-green-light border border-brand-green/20 rounded-lg">
            <p className="text-xs font-semibold text-brand-green-dark mb-1">Procurement Tip</p>
            <p className="text-xs text-green-800 leading-relaxed">
              Copper is at ${lmeUsd.toFixed(0)}/MT live. Consider locking prices now for pending tenders before further movement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketHub;
