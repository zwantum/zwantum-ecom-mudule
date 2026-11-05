export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl">
            Bookstore Merchant Operations
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Store: <span className="font-semibold text-slate-800">Granth & Quill Books</span> •
            Category: Books & Publishing • Pan-India Fulfillment
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Bookstore Theme Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-slate-200 p-5">
          <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Active Titles (Catalog)
          </dt>
          <dd className="mt-2 text-2xl font-bold text-slate-900">14,820</dd>
          <p className="mt-1 text-xs text-slate-500">Paperback, Hardcover &amp; Box Sets</p>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-slate-200 p-5">
          <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Today&#39;s Book Orders
          </dt>
          <dd className="mt-2 text-2xl font-bold text-slate-900">₹48,250</dd>
          <p className="mt-1 text-xs text-emerald-600 font-medium">↑ 18% vs yesterday</p>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-slate-200 p-5">
          <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Shiprocket Logistics
          </dt>
          <dd className="mt-2 text-2xl font-bold text-slate-900">92 Dispatched</dd>
          <p className="mt-1 text-xs text-slate-500">NDR Resolution Rate: 98.4%</p>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-slate-200 p-5">
          <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Tax Classification
          </dt>
          <dd className="mt-2 text-2xl font-bold text-slate-900">HSN 4901</dd>
          <p className="mt-1 text-xs text-emerald-600 font-medium">0% GST Exempt (Printed Books)</p>
        </div>
      </div>
    </div>
  );
}
