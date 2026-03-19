import { Database, Wifi, Globe, Lock, RefreshCw } from 'lucide-react';

export function ERPConnectionSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">ERP Connection</h2>
            <p className="text-sm text-gray-600">Connect to your ERP system</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ERP Platform
            </label>
            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Odoo</option>
              <option>SAP ERP</option>
              <option>Microsoft Dynamics 365</option>
              <option>Custom API</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              API Endpoint
            </label>
            <input
              type="text"
              defaultValue="https://your-erp.example.com/api"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              API Key
            </label>
            <input
              type="password"
              defaultValue="••••••••••••••••••••••••••••••••"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Remote Access Configuration */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Remote Access</h2>
            <p className="text-sm text-gray-600">Configure secure remote connection to ERP</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Connection Method
            </label>
            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>VPN Connection</option>
              <option>Port Forwarding</option>
              <option>Direct Connection</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4" />
                  <span>VPN Server</span>
                </div>
              </label>
              <input
                type="text"
                placeholder="vpn.yourcompany.com"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Port Number
              </label>
              <input
                type="text"
                placeholder="8069"
                defaultValue="8069"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>VPN Credentials</span>
              </div>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Username"
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="ssl-enabled" defaultChecked className="rounded" />
            <label htmlFor="ssl-enabled" className="text-sm text-gray-700">
              Enable SSL/TLS encryption
            </label>
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-semibold text-blue-900">Connected via VPN</span>
              </div>
              <span className="text-xs text-blue-700">Last connection: 2 minutes ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Synchronization Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Synchronization</h2>
            <p className="text-sm text-gray-600">Configure data sync options</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Sync Mode</p>
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <input type="radio" name="syncMode" id="instant-sync" className="mt-1" />
                  <div className="flex-1">
                    <label htmlFor="instant-sync" className="text-sm font-semibold text-gray-900 cursor-pointer">
                      Instant Sync (Real-time)
                    </label>
                    <p className="text-xs text-gray-600 mt-1">
                      Every change is synchronized immediately. Recommended for high-priority data.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-green-500 bg-green-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <input type="radio" name="syncMode" id="scheduled-sync" defaultChecked className="mt-1" />
                  <div className="flex-1">
                    <label htmlFor="scheduled-sync" className="text-sm font-semibold text-gray-900 cursor-pointer">
                      Scheduled Sync (Auto)
                    </label>
                    <p className="text-xs text-gray-600 mt-1">
                      Sync at specific times. Balanced performance and data freshness.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <input type="radio" name="syncMode" id="manual-sync" className="mt-1" />
                  <div className="flex-1">
                    <label htmlFor="manual-sync" className="text-sm font-semibold text-gray-900 cursor-pointer">
                      Manual Sync Only
                    </label>
                    <p className="text-xs text-gray-600 mt-1">
                      Sync only when triggered manually. Full control over data synchronization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">Scheduled Sync Time</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Hour</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i} selected={i === 2}>
                      {i.toString().padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Frequency</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Every Hour</option>
                  <option>Every 2 Hours</option>
                  <option>Every 4 Hours</option>
                  <option>Every 6 Hours</option>
                  <option selected>Every 12 Hours</option>
                  <option>Daily</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-gray-600 mb-1">Next Sync</label>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                  <RefreshCw className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Today at 14:00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">Data to Synchronize</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="sync-products" className="text-sm text-gray-700">
                  Products & Inventory
                </label>
                <input type="checkbox" id="sync-products" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="sync-customers" className="text-sm text-gray-700">
                  Customers
                </label>
                <input type="checkbox" id="sync-customers" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="sync-orders" className="text-sm text-gray-700">
                  Orders
                </label>
                <input type="checkbox" id="sync-orders" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="sync-invoices" className="text-sm text-gray-700">
                  Invoices
                </label>
                <input type="checkbox" id="sync-invoices" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="sync-payments" className="text-sm text-gray-700">
                  Payments
                </label>
                <input type="checkbox" id="sync-payments" defaultChecked className="rounded" />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-green-900">Last Sync: 5 minutes ago</p>
                <p className="text-xs text-green-700 mt-1">All data up to date • 1,247 records synced</p>
              </div>
              <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition-colors">
                Sync Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
