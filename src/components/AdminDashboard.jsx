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

const AdminDashboard = () => (
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

    {/* Products table placeholder */}
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="font-semibold text-slate-900 mb-4">Product Management</h3>
      <div className="text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
        <p className="text-sm">Product management table coming soon</p>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
