import React from 'react';
import { LayoutDashboard, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MONTHLY_DATA = [
  { month: 'Oct', gmv: 18 }, { month: 'Nov', gmv: 24 },
  { month: 'Dec', gmv: 31 }, { month: 'Jan', gmv: 28 },
  { month: 'Feb', gmv: 39 }, { month: 'Mar', gmv: 52 },
];

const KPI_CARDS = [
  { label: 'Total Orders', value: '1,245', icon: ShoppingBag, color: 'text-blue-600 bg-blue-50' },
  { label: 'GMV (₹ Lakhs)', value: '₹84 L', icon: TrendingUp, color: 'text-brand-green bg-brand-green-light' },
  { label: 'Pending Approvals', value: '8', icon: LayoutDashboard, color: 'text-amber-600 bg-amber-50', alert: true },
  { label: 'Active Contractors', value: '450', icon: Users, color: 'text-purple-600 bg-purple-50' },
];

const AdminDashboard = ({ products = [] }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
    <div className="flex items-center gap-3 mb-8">
      <LayoutDashboard size={22} className="text-brand-green" />
      <h2 className="text-2xl font-bold text-slate-900">Admin Dashboard</h2>
    </div>

    {/* KPIs */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {KPI_CARDS.map(({ label, value, icon: Icon, color, alert }) => (
        <div key={label} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500 font-medium">{label}</span>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
              <Icon size={17} />
            </div>
          </div>
          <div className={`text-2xl font-bold ${alert ? 'text-amber-600' : 'text-slate-900'}`}>{value}</div>
        </div>
      ))}
    </div>

    {/* GMV Chart */}
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-8">
      <h3 className="font-semibold text-slate-900 mb-4">Monthly GMV (₹ Lakhs)</h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MONTHLY_DATA}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
            <Bar dataKey="gmv" fill="#16A34A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Products table */}
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Product Catalogue ({products.length})</h3>
        <span className="text-xs text-slate-400 font-medium">Supabase — live data</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Product</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Brand</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Category</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Rating</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3 font-medium text-slate-900 max-w-[220px] truncate">{p.name}</td>
                <td className="px-6 py-3 text-slate-500">{p.brand}</td>
                <td className="px-6 py-3">
                  <span className="inline-block text-xs font-semibold bg-brand-green-light text-brand-green-dark px-2 py-0.5 rounded-full">{p.category}</span>
                </td>
                <td className="px-6 py-3 text-slate-500">⭐ {p.rating}</td>
                <td className="px-6 py-3">
                  {p.isDynamic
                    ? <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">LME Linked</span>
                    : <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Fixed</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
