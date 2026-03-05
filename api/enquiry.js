export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const { buyerName, buyerPhone, buyerCompany, buyerAddress, cartItems, cartTotal } = req.body;

  const itemsList = (cartItems || [])
    .map(item => `• ${item.name} (${item.brand}) × ${item.qty} ${item.unit} — ₹${(item.frozenPrice * item.qty).toLocaleString('en-IN')}`)
    .join('\n');

  const htmlItems = (cartItems || [])
    .map(item => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${item.name}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${item.brand}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">${item.qty} ${item.unit}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;text-align:right;">₹${(item.frozenPrice * item.qty).toLocaleString('en-IN')}</td>
      </tr>`)
    .join('');

  const html = `
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:24px;">
      <div style="background:#166534;padding:20px 24px;border-radius:8px 8px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:20px;">New Order Enquiry — Energon</h1>
      </div>
      <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0;">

        <h2 style="font-size:15px;color:#166534;margin:0 0 16px;">Buyer Information</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <tr><td style="padding:6px 0;color:#64748b;width:140px;">Name</td><td style="padding:6px 0;font-weight:600;">${buyerName || '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#64748b;">Phone</td><td style="padding:6px 0;font-weight:600;">${buyerPhone || '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#64748b;">Company</td><td style="padding:6px 0;font-weight:600;">${buyerCompany || '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#64748b;">Address</td><td style="padding:6px 0;font-weight:600;">${buyerAddress || '—'}</td></tr>
        </table>

        <h2 style="font-size:15px;color:#166534;margin:0 0 12px;">Order Items</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:14px;">
          <thead>
            <tr style="background:#f1f5f9;">
              <th style="padding:8px 12px;text-align:left;color:#64748b;font-weight:600;">Product</th>
              <th style="padding:8px 12px;text-align:left;color:#64748b;font-weight:600;">Brand</th>
              <th style="padding:8px 12px;text-align:center;color:#64748b;font-weight:600;">Qty</th>
              <th style="padding:8px 12px;text-align:right;color:#64748b;font-weight:600;">Amount</th>
            </tr>
          </thead>
          <tbody>${htmlItems}</tbody>
          <tfoot>
            <tr style="background:#f0fdf4;">
              <td colspan="3" style="padding:10px 12px;font-weight:700;color:#166534;">Total</td>
              <td style="padding:10px 12px;font-weight:700;color:#166534;text-align:right;">₹${Number(cartTotal || 0).toLocaleString('en-IN')}</td>
            </tr>
          </tfoot>
        </table>

        <p style="color:#64748b;font-size:13px;margin:0;">Reply directly to this email or call the buyer to confirm the enquiry.</p>
      </div>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: 'Energon Orders <onboarding@resend.dev>',
        to: ['divye2014@gmail.com'],
        subject: `New Enquiry: ₹${Number(cartTotal || 0).toLocaleString('en-IN')} from ${buyerName || 'a buyer'}`,
        html,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Resend error');
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Enquiry email error:', err.message);
    res.status(500).json({ error: err.message });
  }
}
