import { Search, Phone, Mail, DollarSign } from 'lucide-react';
import { customers } from '../data/mockData';
import { format } from 'date-fns';

export function Customers() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage customer information and balances.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Customers Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Total Orders</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Last Contact</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{customer.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {customer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        customer.type === 'wholesale'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {customer.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-semibold ${
                        customer.balance > 0 ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {customer.balance > 0 ? '-' : ''}{customer.balance.toLocaleString()} DZD
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{customer.totalOrders}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {format(new Date(customer.lastContact), 'MMM dd, yyyy HH:mm')}
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors font-semibold">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{customers.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Outstanding Balance</p>
              <p className="text-2xl font-semibold text-red-600 mt-1">
                {customers.reduce((sum, c) => sum + c.balance, 0).toLocaleString()} DZD
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
