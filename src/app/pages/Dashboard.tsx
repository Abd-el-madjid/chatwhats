import { TrendingUp, MessageSquare, ShoppingCart, DollarSign, Clock, Users, RefreshCw } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { orders, conversations, analyticsData } from '../data/mockData';
import { useState } from 'react';

export function Dashboard() {
  const [syncing, setSyncing] = useState(false);

  const totalOrders = orders.length;
  const whatsappOrders = orders.filter(o => o.source === 'whatsapp').length;
  const activeConversations = conversations.filter(c => c.status === 'active').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  const handleSync = () => {
    setSyncing(true);
    // Simulate sync process
    setTimeout(() => {
      setSyncing(false);
      alert('ERP synchronization completed successfully!');
    }, 2000);
  };

  const stats = [
    {
      name: 'WhatsApp Orders',
      value: whatsappOrders,
      total: totalOrders,
      icon: MessageSquare,
      color: 'bg-green-500',
      trend: '+12%',
    },
    {
      name: 'Total Revenue',
      value: `${(totalRevenue / 1000).toFixed(0)}K DZD`,
      icon: DollarSign,
      color: 'bg-blue-500',
      trend: '+8%',
    },
    {
      name: 'Active Chats',
      value: activeConversations,
      icon: Users,
      color: 'bg-purple-500',
      trend: '+5%',
    },
    {
      name: 'Avg Response Time',
      value: '9.8s',
      icon: Clock,
      color: 'bg-orange-500',
      trend: '-15%',
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your business overview.</p>
        </div>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors font-semibold"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing...' : 'Sync ERP'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-green-600 font-semibold">{stat.trend}</span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">{stat.name}</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {stat.value}
                {stat.total && <span className="text-sm text-gray-500 ml-1">/ {stat.total}</span>}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Orders Overview</h2>
            <ShoppingCart className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="period" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="whatsappOrders" fill="#10b981" name="WhatsApp Orders" />
              <Bar dataKey="totalOrders" fill="#6366f1" name="Total Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="period" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue (DZD)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Source</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.customerName}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        order.source === 'whatsapp'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}