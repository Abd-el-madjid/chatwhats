import { Save, Zap, Database, Bell, Shield, CreditCard, Clock, Check } from 'lucide-react';
import { useState } from 'react';
import { SettingsModals } from '../components/SettingsModals';
import { ERPConnectionSettings } from '../components/ERPConnectionSettings';

type PlanType = 'starter' | 'professional' | 'enterprise';
type PaymentMethod = 'card' | 'cash';

export function Settings() {
  const [activeSection, setActiveSection] = useState('plan');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('professional');
  const [upgradeStep, setUpgradeStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [activationToken, setActivationToken] = useState('');
  const [showToken, setShowToken] = useState(false);

  const subscriptionEndDate = new Date('2026-04-18');
  const today = new Date();
  const daysRemaining = Math.ceil((subscriptionEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const plans = {
    starter: { name: 'Starter', price: 25, features: ['Up to 500 messages/month', 'Basic ERP integration', 'Email support'] },
    professional: { name: 'Professional', price: 60, features: ['Unlimited messages', 'Advanced ERP integration', 'Priority support', 'AI assistant', 'Analytics & reporting'] },
    enterprise: { name: 'Enterprise', price: 120, features: ['Everything in Pro', 'Multi-location support', 'Dedicated account manager', 'Custom integrations', 'White-label option'] },
  };

  const generateActivationToken = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < 32; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  };

  const handleUpgrade = (plan: PlanType) => {
    setSelectedPlan(plan);
    setShowUpgradeModal(true);
    setUpgradeStep(1);
    setPaymentMethod('card');
  };

  const handleActivate = (plan: PlanType) => {
    setSelectedPlan(plan);
    setShowActivateModal(true);
    setPaymentMethod('card');
  };

  const confirmUpgrade = () => {
    if (paymentMethod === 'cash') {
      const token = generateActivationToken();
      setActivationToken(token);
      setShowToken(true);
    } else {
      setShowUpgradeModal(false);
      setUpgradeStep(1);
      alert(`Successfully upgraded to ${plans[selectedPlan].name} plan!`);
    }
  };

  const confirmActivation = () => {
    if (paymentMethod === 'cash') {
      const token = generateActivationToken();
      setActivationToken(token);
      setShowToken(true);
    } else {
      setShowActivateModal(false);
      alert(`Successfully activated ${plans[selectedPlan].name} plan!`);
    }
  };

  const copyToken = () => {
    navigator.clipboard.writeText(activationToken);
    alert('Activation token copied to clipboard!');
  };

  const closeTokenModal = () => {
    setShowToken(false);
    setShowUpgradeModal(false);
    setShowActivateModal(false);
    setUpgradeStep(1);
  };

  return (
    <div className="space-y-6">
      <SettingsModals
        showUpgradeModal={showUpgradeModal}
        showActivateModal={showActivateModal}
        showToken={showToken}
        selectedPlan={selectedPlan}
        upgradeStep={upgradeStep}
        paymentMethod={paymentMethod}
        activationToken={activationToken}
        plans={plans}
        setShowUpgradeModal={setShowUpgradeModal}
        setShowActivateModal={setShowActivateModal}
        setUpgradeStep={setUpgradeStep}
        setPaymentMethod={setPaymentMethod}
        confirmUpgrade={confirmUpgrade}
        confirmActivation={confirmActivation}
        copyToken={copyToken}
        closeTokenModal={closeTokenModal}
      />

      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Configure your ERPChat integration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        {/* Navigation */}
        <div className="lg:col-span-1 " >
          <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-[70px]">
            <nav className="space-y-1">
              {[
                { id: 'whatsapp', name: 'WhatsApp API', icon: Zap },
                { id: 'erp', name: 'ERP Connection', icon: Database },
                { id: 'notifications', name: 'Notifications', icon: Bell },
                { id: 'security', name: 'Security', icon: Shield },
                { id: 'plan', name: 'Plan & Billing', icon: CreditCard },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    activeSection === item.id ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-6"  >
          {/* WhatsApp API Settings */}
          {activeSection === 'whatsapp' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">WhatsApp API</h2>
                  <p className="text-sm text-gray-600">Configure your WhatsApp Business API connection</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number ID
                  </label>
                  <input
                    type="text"
                    defaultValue="123456789012345"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Access Token
                  </label>
                  <input
                    type="password"
                    defaultValue="••••••••••••••••••••••••••••••••"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Webhook Verify Token
                  </label>
                  <input
                    type="text"
                    defaultValue="YOUR_VERIFY_TOKEN"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-green-900">Connected</span>
                    </div>
                    <span className="text-xs text-green-700">Last sync: 2 minutes ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ERP Connection */}
          {activeSection === 'erp' && <ERPConnectionSettings />}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                  <p className="text-sm text-gray-600">Configure automated notification settings</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">Order Notifications</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label htmlFor="notify-new-order" className="text-sm text-gray-700">
                        Send confirmation for new orders
                      </label>
                      <input type="checkbox" id="notify-new-order" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="notify-order-confirmed" className="text-sm text-gray-700">
                        Notify when order is confirmed
                      </label>
                      <input type="checkbox" id="notify-order-confirmed" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="notify-order-shipped" className="text-sm text-gray-700">
                        Notify when order is shipped
                      </label>
                      <input type="checkbox" id="notify-order-shipped" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="notify-order-delivered" className="text-sm text-gray-700">
                        Notify when order is delivered
                      </label>
                      <input type="checkbox" id="notify-order-delivered" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Payment Notifications</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label htmlFor="notify-invoice" className="text-sm text-gray-700">
                        Send invoice automatically
                      </label>
                      <input type="checkbox" id="notify-invoice" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="notify-payment" className="text-sm text-gray-700">
                        Confirm payment received
                      </label>
                      <input type="checkbox" id="notify-payment" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="notify-balance" className="text-sm text-gray-700">
                        Send balance reminders
                      </label>
                      <input type="checkbox" id="notify-balance" className="rounded" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Inventory Alerts</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label htmlFor="notify-low-stock" className="text-sm text-gray-700">
                        Alert when stock is low
                      </label>
                      <input type="checkbox" id="notify-low-stock" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="notify-out-stock" className="text-sm text-gray-700">
                        Alert when out of stock
                      </label>
                      <input type="checkbox" id="notify-out-stock" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeSection === 'security' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Security</h2>
                  <p className="text-sm text-gray-600">Manage security and access controls</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">Authentication</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label htmlFor="two-factor" className="text-sm text-gray-700">
                        Enable two-factor authentication
                      </label>
                      <input type="checkbox" id="two-factor" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="session-timeout" className="text-sm text-gray-700">
                        Auto-logout after inactivity
                      </label>
                      <input type="checkbox" id="session-timeout" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Data Access</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label htmlFor="customer-data" className="text-sm text-gray-700">
                        Encrypt customer data
                      </label>
                      <input type="checkbox" id="customer-data" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="message-encryption" className="text-sm text-gray-700">
                        End-to-end message encryption
                      </label>
                      <input type="checkbox" id="message-encryption" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="audit-logs" className="text-sm text-gray-700">
                        Enable audit logs
                      </label>
                      <input type="checkbox" id="audit-logs" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm font-semibold text-gray-700 mb-3">API Security</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        IP Whitelist
                      </label>
                      <input
                        type="text"
                        placeholder="Enter IP addresses (comma separated)"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="rate-limiting" className="text-sm text-gray-700">
                        Enable API rate limiting
                      </label>
                      <input type="checkbox" id="rate-limiting" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Plan & Billing */}
          {activeSection === 'plan' && (
            <>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
                    <p className="text-sm text-gray-600">Manage your subscription and billing</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900">Professional Plan</h3>
                      <p className="text-gray-600 mt-1">Full access to all features</p>
                    </div>
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                      Active
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold text-gray-900">$60</span>
                    <span className="text-gray-600">/ month</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">Unlimited WhatsApp conversations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">Advanced ERP integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">AI-powered chat assistant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">Priority support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">Analytics & reporting</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/70 rounded-lg">
                    <Clock className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {daysRemaining} days remaining
                      </p>
                      <p className="text-xs text-gray-600">
                        Next billing date: {subscriptionEndDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Plans</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Starter Plan */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Starter</h4>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-2xl font-bold text-gray-900">$25</span>
                      <span className="text-sm text-gray-600">/month</span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 mb-4">
                      <li>• Up to 500 messages/month</li>
                      <li>• Basic ERP integration</li>
                      <li>• Email support</li>
                    </ul>
                    <button 
                      onClick={() => handleActivate('starter')}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                    >
                      Downgrade
                    </button>
                  </div>

                  {/* Professional Plan */}
                  <div className="border-2 border-green-500 rounded-lg p-4 relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">
                        Current
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Professional</h4>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-2xl font-bold text-gray-900">$60</span>
                      <span className="text-sm text-gray-600">/month</span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 mb-4">
                      <li>• Unlimited messages</li>
                      <li>• Advanced ERP integration</li>
                      <li>• Priority support</li>
                      <li>• AI assistant</li>
                    </ul>
                    <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors">
                      Active
                    </button>
                  </div>

                  {/* Enterprise Plan */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Enterprise</h4>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-2xl font-bold text-gray-900">$120</span>
                      <span className="text-sm text-gray-600">/month</span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 mb-4">
                      <li>• Everything in Pro</li>
                      <li>• Multi-location support</li>
                      <li>• Dedicated account manager</li>
                      <li>• Custom integrations</li>
                    </ul>
                    <button 
                      onClick={() => handleUpgrade('enterprise')}
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
                    >
                      Upgrade
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">•••• •••• •••• 4242</p>
                      <p className="text-xs text-gray-600">Expires 12/2027</p>
                    </div>
                  </div>
                  <button className="text-sm text-green-600 hover:text-green-700 font-semibold">
                    Update
                  </button>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    Cancel Subscription
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors font-semibold">
                    Billing History
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Save Button */}
          {activeSection !== 'plan' && (
            <div className="flex justify-end">
              <button className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-semibold">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
