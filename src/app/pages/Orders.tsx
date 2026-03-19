import { Search, Filter, MessageSquare, Eye } from 'lucide-react';
import { orders } from '../data/mockData';
import { format } from 'date-fns';
import { useState } from 'react';

export function Orders() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSource, setFilterSource] = useState<string>('all');

  const filteredOrders = orders.filter((order) => {
    if (filterStatus !== 'all' && order.status !== filterStatus) return false;
    if (filterSource !== 'all' && order.source !== filterSource) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">Manage all orders from WhatsApp and ERP.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        {/* Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Sources</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="erp">ERP</option>
                <option value="web">Web</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Products</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Source</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.customerName}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {order.products.length} item{order.products.length !== 1 ? 's' : ''}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        order.source === 'whatsapp'
                          ? 'bg-green-100 text-green-700'
                          : order.source === 'erp'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {order.source === 'whatsapp' && <MessageSquare className="w-3 h-3" />}
                      {order.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'delivered'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'confirmed'
                          ? 'bg-blue-100 text-blue-700'
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {order.total.toLocaleString()} DZD
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
