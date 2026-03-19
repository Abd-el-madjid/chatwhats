import { TrendingUp, MessageSquare, Clock, Star } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { analyticsData, orders } from '../data/mockData';

export function Analytics() {
  const whatsappOrders = orders.filter(o => o.source === 'whatsapp').length;
  const erpOrders = orders.filter(o => o.source === 'erp').length;
  const webOrders = orders.filter(o => o.source === 'web').length;

  const sourceData = [
    { name: 'WhatsApp', value: whatsappOrders },
    { name: 'ERP', value: erpOrders },
    { name: 'Web', value: webOrders },
  ];

  const COLORS = ['#10b981', '#6366f1', '#8b5cf6'];

  const stats = [
    {
      name: 'WhatsApp Conversion',
      value: '78%',
      icon: MessageSquare,
      color: 'bg-green-500',
      trend: '+5%',
    },
    {
      name: 'Revenue Growth',
      value: '+24%',
      icon: TrendingUp,
      color: 'bg-blue-500',
      trend: '+12%',
    },
    {
      name: 'Avg Response Time',
      value: '9.8s',
      icon: Clock,
      color: 'bg-orange-500',
      trend: '-15%',
    },
    {
      name: 'Customer Satisfaction',
      value: '4.7/5',
      icon: Star,
      color: 'bg-yellow-500',
      trend: '+0.2',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Track your WhatsApp-ERP integration performance.</p>
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
              <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Time Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Response Time Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="period" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgResponseTime" stroke="#f97316" strokeWidth={2} name="Avg Response Time (s)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Satisfaction */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Customer Satisfaction</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="period" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="customerSatisfaction" stroke="#eab308" strokeWidth={2} name="Rating" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Orders by Source */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Orders by Source</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* WhatsApp vs Total Orders */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">WhatsApp Impact</h2>
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
      </div>

      {/* Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">WhatsApp orders are growing</p>
              <p className="text-sm text-gray-600 mt-1">
                WhatsApp accounts for {((whatsappOrders / orders.length) * 100).toFixed(0)}% of all orders, showing strong customer adoption.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Response times improving</p>
              <p className="text-sm text-gray-600 mt-1">
                Average response time has decreased by 15%, leading to better customer experience.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">High customer satisfaction</p>
              <p className="text-sm text-gray-600 mt-1">
                Customer satisfaction rating of 4.7/5 shows excellent service quality through WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
