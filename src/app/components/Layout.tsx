import { Link, Outlet, useLocation } from 'react-router';
import {
  LayoutDashboard,
  MessageSquare,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  Bell,
  User,
  LogOut,
  UserCircle,
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Conversations', href: '/conversations', icon: MessageSquare },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const notifications = [
  { id: 1, message: 'New order #452 received from Ahmed Benali', time: '2 min ago', unread: true },
  { id: 2, message: 'Product A stock is running low (8 units)', time: '15 min ago', unread: true },
  { id: 3, message: 'Payment received for order #449', time: '1 hour ago', unread: false },
  { id: 4, message: 'New customer registered: Samira Boudiaf', time: '2 hours ago', unread: false },
];

export function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">ERPChat</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="px-4 py-3 bg-green-50 rounded-lg">
            <p className="text-xs text-green-800">Professional Plan</p>
            <p className="text-sm font-semibold text-green-900">$60/month</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 ml-auto">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowProfileMenu(false);
                  }}
                  className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 max-h-96 overflow-y-auto">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                            notif.unread ? 'bg-blue-50' : ''
                          }`}
                        >
                          <p className="text-sm text-gray-900">{notif.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200">
                      <button className="text-sm text-green-600 hover:text-green-700 font-semibold">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm text-gray-600">Manager</p>
                    <p className="text-sm font-semibold text-gray-900">Admin User</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfileMenu(!showProfileMenu);
                      setShowNotifications(false);
                    }}
                    className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center hover:ring-2 hover:ring-green-300 transition-all"
                  >
                    <span className="text-white font-semibold">AU</span>
                  </button>
                </div>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">Admin User</p>
                      <p className="text-xs text-gray-600">admin@erpchat.com</p>
                      <p className="text-xs text-gray-500 mt-1">Manager • Professional Plan</p>
                    </div>
                    <div className="py-2">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <UserCircle className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                      <Link
                        to="/settings"
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}