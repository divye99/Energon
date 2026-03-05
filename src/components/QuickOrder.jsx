import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const QuickOrder = ({ setCart, setIsCartOpen, products = [], getPrice }) => {
  const [rows, setRows] = useState([{ id: 1, sku: '', qty: 1 }]);

  const addRow = () => setRows(prev => [...prev, { id: Date.now(), sku: '', qty: 1 }]);
  const updateRow = (id, field, value) => setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  const removeRow = (id) => setRows(rows.filter(r => r.id !== id));

  const findProduct = (sku) => {
    const q = sku.trim().toLowerCase();
    return products.find(p =>
      p.id.toLowerCase() === q ||
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
    );
  };

  const handleQuickAdd = () => {
    const validRows = rows.filter(r => r.sku.trim());
    if (validRows.length === 0) return alert('Please enter at least one SKU or product name');
    const items = validRows.map(r => {
      const match = findProduct(r.sku);
      return {
        id: match ? match.id : `quick_${r.id}`,
        name: match ? match.name : `Custom SKU: ${r.sku}`,
        qty: parseInt(r.qty) || 1,
        frozenPrice: match && getPrice ? getPrice(match, 'wholesale') : 0,
        images: match ? match.images : [''],
        cartId: `quick_${r.id}`,
        brand: match ? match.brand : '',
        unit: match ? match.unit : 'Unit',
      };
    });
    setCart(prev => [...prev, ...items]);
    setIsCartOpen(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Quick Order Pad</h1>
        <p className="text-slate-500 text-sm">Enter SKUs directly for fast bulk ordering. Ideal for returning contractors with known part numbers.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="grid grid-cols-12 gap-3 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 px-1">
          <div className="col-span-8">SKU / Product Code</div>
          <div className="col-span-3">Qty</div>
          <div className="col-span-1" />
        </div>

        {rows.map((row, index) => (
          <div key={row.id} className="grid grid-cols-12 gap-3 mb-3">
            <div className="col-span-8">
              <input
                type="text"
                placeholder="e.g. CMI-FR-1.5-RED-90M"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-slate-800"
                value={row.sku}
                onChange={(e) => updateRow(row.id, 'sku', e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <input
                type="number"
                min="1"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-slate-800"
                value={row.qty}
                onChange={(e) => updateRow(row.id, 'qty', e.target.value)}
              />
            </div>
            <div className="col-span-1 flex items-center justify-center">
              {index > 0 && (
                <button onClick={() => removeRow(row.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-5 pt-4 border-t border-slate-100">
          <button onClick={addRow} className="flex items-center gap-2 text-brand-green font-semibold text-sm hover:text-brand-green-dark transition-colors">
            <Plus size={16} /> Add Row
          </button>
          <button onClick={handleQuickAdd} className="btn-primary text-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickOrder;
