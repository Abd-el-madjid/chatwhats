import { Check, X, ChevronRight, AlertCircle, CreditCard, Copy, DollarSign } from 'lucide-react';

type PlanType = 'starter' | 'professional' | 'enterprise';
type PaymentMethod = 'card' | 'cash';

interface Plan {
  name: string;
  price: number;
  features: string[];
}

interface ModalsProps {
  showUpgradeModal: boolean;
  showActivateModal: boolean;
  showToken: boolean;
  selectedPlan: PlanType;
  upgradeStep: number;
  paymentMethod: PaymentMethod;
  activationToken: string;
  plans: Record<PlanType, Plan>;
  setShowUpgradeModal: (show: boolean) => void;
  setShowActivateModal: (show: boolean) => void;
  setUpgradeStep: (step: number) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  confirmUpgrade: () => void;
  confirmActivation: () => void;
  copyToken: () => void;
  closeTokenModal: () => void;
}

export function SettingsModals({
  showUpgradeModal,
  showActivateModal,
  showToken,
  selectedPlan,
  upgradeStep,
  paymentMethod,
  activationToken,
  plans,
  setShowUpgradeModal,
  setShowActivateModal,
  setUpgradeStep,
  setPaymentMethod,
  confirmUpgrade,
  confirmActivation,
  copyToken,
  closeTokenModal,
}: ModalsProps) {
  return (
    <>
      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold text-gray-900">Upgrade to {plans[selectedPlan].name}</h2>
              <button onClick={() => setShowUpgradeModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((step, index) => (
                  <div key={step} className="flex items-center flex-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${upgradeStep >= step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                        {step}
                      </div>
                      <span className="text-sm font-semibold text-gray-700 hidden sm:inline">
                        {step === 1 ? 'Review Plan' : step === 2 ? 'Payment' : 'Confirm'}
                      </span>
                    </div>
                    {index < 2 && <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>}
                  </div>
                ))}
              </div>

              {/* Step 1: Review Plan */}
              {upgradeStep === 1 && (
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-bold text-gray-900">${plans[selectedPlan].price}</span>
                      <span className="text-gray-600">/ month</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{plans[selectedPlan].name} Plan</h3>
                    <div className="space-y-2">
                      {plans[selectedPlan].features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-600" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-blue-900">Immediate Upgrade</p>
                        <p className="text-sm text-blue-700 mt-1">
                          You'll be charged ${plans[selectedPlan].price - 60} (prorated) today, and ${plans[selectedPlan].price}/month starting next billing cycle.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowUpgradeModal(false)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setUpgradeStep(2)}
                      className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Method */}
              {upgradeStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
                    
                    {/* Card Payment */}
                    <div 
                      onClick={() => setPaymentMethod('card')}
                      className={`border-2 rounded-lg p-4 mb-3 cursor-pointer transition-all ${
                        paymentMethod === 'card' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => {}} className="w-4 h-4" />
                          <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Credit/Debit Card</p>
                            <p className="text-xs text-gray-600">•••• •••• •••• 4242 (Expires 12/2027)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cash Payment */}
                    <div 
                      onClick={() => setPaymentMethod('cash')}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === 'cash' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input type="radio" name="payment" checked={paymentMethod === 'cash'} onChange={() => {}} className="w-4 h-4" />
                          <div className="w-12 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Cash Payment</p>
                            <p className="text-xs text-gray-600">Receive activation token after payment</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Summary</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{plans[selectedPlan].name} Plan</span>
                        <span className="text-sm font-semibold text-gray-900">${plans[selectedPlan].price}/month</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">
                          {paymentMethod === 'cash' ? 'Cash payment' : 'Prorated charge (today)'}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">${plans[selectedPlan].price - 60}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                        <span className="font-semibold text-gray-900">Total due today</span>
                        <span className="text-xl font-bold text-gray-900">${plans[selectedPlan].price - 60}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setUpgradeStep(1)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setUpgradeStep(3)}
                      className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirm */}
              {upgradeStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Confirm Upgrade</h3>
                    <p className="text-gray-600">You're about to upgrade to the {plans[selectedPlan].name} plan</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">New Plan</span>
                        <span className="text-sm font-semibold text-gray-900">{plans[selectedPlan].name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Monthly Price</span>
                        <span className="text-sm font-semibold text-gray-900">${plans[selectedPlan].price}/month</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Payment Method</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {paymentMethod === 'card' ? '•••• 4242' : 'Cash'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                        <span className="text-sm text-gray-700">Charge Today</span>
                        <span className="text-lg font-bold text-gray-900">${plans[selectedPlan].price - 60}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-yellow-900">Important</p>
                        <p className="text-sm text-yellow-700 mt-1">
                          {paymentMethod === 'cash' 
                            ? 'You will receive a 32-character activation token after payment confirmation.'
                            : 'Your upgrade will take effect immediately. You\'ll have access to all features right away.'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setUpgradeStep(2)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                      Back
                    </button>
                    <button
                      onClick={confirmUpgrade}
                      className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-semibold"
                    >
                      Confirm Upgrade
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Activate Plan Modal */}
      {showActivateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold text-gray-900">Activate {plans[selectedPlan].name} Plan</h2>
              <button onClick={() => setShowActivateModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-gray-900">${plans[selectedPlan].price}</span>
                  <span className="text-gray-600">/ month</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{plans[selectedPlan].name} Plan</h3>
                <div className="space-y-2">
                  {plans[selectedPlan].features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Payment Method</h3>
                <div className="space-y-3">
                  {/* Card Option */}
                  <div 
                    onClick={() => setPaymentMethod('card')}
                    className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" name="activatePayment" checked={paymentMethod === 'card'} onChange={() => {}} className="w-4 h-4" />
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-semibold text-gray-900">Credit/Debit Card</span>
                    </div>
                  </div>

                  {/* Cash Option */}
                  <div 
                    onClick={() => setPaymentMethod('cash')}
                    className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                      paymentMethod === 'cash' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" name="activatePayment" checked={paymentMethod === 'cash'} onChange={() => {}} className="w-4 h-4" />
                      <DollarSign className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-semibold text-gray-900">Cash Payment</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900">
                      {paymentMethod === 'cash' ? 'Activation Token' : 'First Month Free'}
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      {paymentMethod === 'cash' 
                        ? `You'll receive a 32-character activation token after payment. Use it in Settings to activate your plan.`
                        : `Start your free trial today. You'll be charged $${plans[selectedPlan].price} on ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.`
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowActivateModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmActivation}
                  className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-semibold"
                >
                  {paymentMethod === 'cash' ? 'Generate Token' : 'Activate Plan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activation Token Modal */}
      {showToken && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Activation Token Generated</h2>
              <button onClick={closeTokenModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Confirmed</h3>
                <p className="text-sm text-gray-600">{plans[selectedPlan].name} Plan - ${plans[selectedPlan].price}/month</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-green-600" />
                  <p className="text-sm font-semibold text-green-900">Your Activation Token</p>
                </div>
                <p className="text-xs text-green-700 mb-3">
                  Use this token in Settings → Plan & Billing to activate your subscription
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={activationToken}
                    readOnly
                    className="flex-1 px-4 py-3 bg-white border border-green-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={copyToken}
                    className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-900">Important</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Save this token securely. You'll need it to activate your plan. This token will expire in 30 days.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={closeTokenModal}
                className="w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-semibold"
              >
                Got it, Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
