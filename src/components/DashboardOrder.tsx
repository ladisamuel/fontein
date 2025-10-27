import React from 'react';
import { Car, Wrench, ShoppingCart, Search, Bookmark, Calendar, Package, Filter, MessageSquare } from 'lucide-react';

const DashboardOrder: React.FC = () => {
  return (
    <div className="">
 

        {/* Recent Orders and Upcoming Service */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <div className="flex gap-4 text-sm">
                <button className="text-blue-600 font-medium">All</button>
                <button className="text-gray-500 hover:text-gray-700">In transit</button>
                <button className="text-gray-500 hover:text-gray-700">Delivered</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Vehicle</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Order ID</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Total</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Car size={24} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">2021 Toyota</p>
                          <p className="text-sm text-gray-500">Camry SE</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-gray-700">#ORD-2193</td>
                    <td className="py-4 px-2">
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">In transit</span>
                    </td>
                    <td className="py-4 px-2 font-medium text-gray-900">$21,500</td>
                    <td className="py-4 px-2">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Track</button>
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Car size={24} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">2020 Mazda</p>
                          <p className="text-sm text-gray-500">CX-5 Grand Touring</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-gray-700">#ORD-2051</td>
                    <td className="py-4 px-2">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Delivered</span>
                    </td>
                    <td className="py-4 px-2 font-medium text-gray-900">$24,900</td>
                    <td className="py-4 px-2">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Invoice</button>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Car size={24} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">2019 Honda Fit</p>
                          <p className="text-sm text-gray-500">EX-L</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-gray-700">#ORD-1987</td>
                    <td className="py-4 px-2">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Processing</span>
                    </td>
                    <td className="py-4 px-2 font-medium text-gray-900">$13,200</td>
                    <td className="py-4 px-2">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Details</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Service */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Service</h2>
              <button className="text-sm text-gray-600 flex items-center gap-1 hover:text-gray-900">
                <Calendar size={16} />
                Schedule
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b">
                <Wrench size={20} className="text-gray-600 mt-1" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Oil Change - Camry SE</p>
                  <p className="text-sm text-gray-500 mt-1">12 Oct, 10:00</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-4 border-b">
                <div className="w-5 h-5 flex items-center justify-center mt-1">
                  <div className="w-4 h-0.5 bg-gray-600"></div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Brake Inspection - CX-5</p>
                  <p className="text-sm text-gray-500 mt-1">18 Oct, 14:30</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Tire Rotation - Honda Fit</p>
                  <p className="text-sm text-gray-500 mt-1">24 Oct, 09:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
    </div>
  );
};

export default DashboardOrder;