import { Search, Package, AlertCircle, CheckCircle } from 'lucide-react';
import { products } from '../data/mockData';

export function Products() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your inventory synchronized with ERP.</p>
        </div>
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm font-semibold">
          Sync with ERP
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Package className="w-16 h-16 text-gray-400" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.sku}</p>
                    </div>
                    {product.stock > 0 ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Price</span>
                      <span className="font-semibold text-gray-900">{product.price.toLocaleString()} DZD</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Stock</span>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          product.stock > 20
                            ? 'bg-green-100 text-green-700'
                            : product.stock > 0
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
