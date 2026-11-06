import { ThemeCustomizer } from '../components/theme-customizer';

interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  location: string;
  pincode: string;
  itemsCount: number;
  totalPaise: number;
  paymentMethod: 'UPI' | 'COD' | 'CARD';
  status: 'Confirmed' | 'Dispatched' | 'Delivered';
}

const RECENT_BOOK_ORDERS: RecentOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'ZW-2026-8901',
    customerName: 'Ananya Sharma',
    location: 'Indiranagar, Bengaluru, Karnataka',
    pincode: '560038',
    itemsCount: 2,
    totalPaise: 72800, // ₹728.00
    paymentMethod: 'UPI',
    status: 'Dispatched',
  },
  {
    id: 'ord-102',
    orderNumber: 'ZW-2026-8902',
    customerName: 'Vikramaditya Roy',
    location: 'Salt Lake, Kolkata, West Bengal',
    pincode: '700091',
    itemsCount: 1,
    totalPaise: 44900, // ₹449.00
    paymentMethod: 'COD',
    status: 'Confirmed',
  },
  {
    id: 'ord-103',
    orderNumber: 'ZW-2026-8903',
    customerName: 'Rohan Deshmukh',
    location: 'Bandra West, Mumbai, Maharashtra',
    pincode: '400050',
    itemsCount: 3,
    totalPaise: 131700, // ₹1,317.00
    paymentMethod: 'UPI',
    status: 'Delivered',
  },
  {
    id: 'ord-104',
    orderNumber: 'ZW-2026-8904',
    customerName: 'Meera Iyer',
    location: 'Alwarpet, Chennai, Tamil Nadu',
    pincode: '600018',
    itemsCount: 1,
    totalPaise: 27900, // ₹279.00
    paymentMethod: 'UPI',
    status: 'Dispatched',
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Top Banner & Title */}
      <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Merchant Operations &amp; Theme Engine
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Active Store: <span className="font-bold text-slate-800">Zwantum Books &amp; Commerce</span> &bull;
            Fulfillment: <span className="font-medium text-slate-700">Shiprocket Pan-India (19,000+ PIN Codes)</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-900 ring-1 ring-inset ring-amber-600/30">
            <span className="h-2 w-2 rounded-full bg-[#FFCC00] ring-1 ring-black/40" />
            Zwantum Brand Theme Active
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Active Titles (Catalog)
          </dt>
          <dd className="mt-2 text-2xl font-black text-slate-900">14,820</dd>
          <p className="mt-1 text-xs text-slate-500">Paperbacks, Hardcovers &amp; Box Sets</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Today&#39;s Book Sales
          </dt>
          <dd className="mt-2 text-2xl font-black text-slate-900">₹48,250.00</dd>
          <p className="mt-1 text-xs text-emerald-600 font-semibold">↑ 18.4% vs yesterday</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Shiprocket Logistics
          </dt>
          <dd className="mt-2 text-2xl font-black text-slate-900">92 Dispatches</dd>
          <p className="mt-1 text-xs text-slate-500">NDR Resolution Rate: 98.4%</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Tax Classification
          </dt>
          <dd className="mt-2 text-2xl font-black text-slate-900">HSN 4901</dd>
          <p className="mt-1 text-xs text-emerald-600 font-semibold">0% GST Exempt (Printed Books)</p>
        </div>
      </div>

      {/* Primary Feature: Theme & Branding Customizer */}
      <section>
        <ThemeCustomizer />
      </section>

      {/* Recent Orders Section */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Indian Customer Orders</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Multi-state orders processed with INR integer paise calculations &amp; Indian address validation.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-medium">Auto-synced</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Destination &amp; PIN</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Total (INR)</th>
                <th className="py-3 px-4">Fulfillment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {RECENT_BOOK_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {order.orderNumber}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {order.customerName}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="block text-slate-800">{order.location}</span>
                    <span className="text-[10px] text-slate-400 font-mono">PIN: {order.pincode}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        order.paymentMethod === 'UPI'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : order.paymentMethod === 'COD'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    ₹{(order.totalPaise / 100).toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700'
                          : order.status === 'Dispatched'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-500'
                            : order.status === 'Dispatched'
                              ? 'bg-blue-500 animate-pulse'
                              : 'bg-amber-500'
                        }`}
                      />
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
