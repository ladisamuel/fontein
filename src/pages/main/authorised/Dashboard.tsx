import React from 'react';
import { Car, Wrench, ShoppingCart, Search, Bookmark, Package, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { cartState } from '../../../utils/atom/cartAtom';
import { repairRequestState } from '../../../utils/atom/repairAtom';

const Dashboard: React.FC = () => {
  const cart = useRecoilValue(cartState)
  const repairData = useRecoilValue(repairRequestState)

  return (
    <div className="min-h-screen bg-gray-50 mt-[12vh]">
      <main className="px-6 lg:px-[150px] py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex</h1>
            <p className="text-gray-600 mb-6">Track your orders, manage services, and continue shopping.</p>
            <div className="flex gap-3">
              <Link to='/search' className="bg-green-600 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-green-700 transition">
                <Car size={20} />
                Browse Cars
              </Link>
              <Link to="/repair" className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition">
                <Wrench size={20} />
                Request Service
              </Link>
              <Link to='/cart' className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition">
                <ShoppingCart size={20} />
                View Cart
              </Link>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&h=120&fit=crop" alt="Car" className="hidden lg:block rounded-lg w-52 h-24 object-cover" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link to='/cart' className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm">Vehicles in cart</h3>
              <ShoppingCart size={20} className="text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{cart.length}</p>
            <p className="text-sm text-gray-500 mt-1">+1 new</p>
          </Link>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm">Active orders</h3>
              <Package size={20} className="text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-500 mt-1">2 shipping</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm">Service requests</h3>
              <Wrench size={20} className="text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{repairData? '0': <span className='text-sm font-bold text-gray-900'>No request</span>}</p>
            <p className="text-sm text-gray-500 mt-1">Scheduled</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm">Saved searches</h3>
              <Bookmark size={20} className="text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900">5</p>
            <p className="text-sm text-gray-500 mt-1">Updated</p>
          </div>
        </div>

        {/* Recent Orders and Upcoming Service */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <div className="flex gap-4 text-sm">
                <button className="text-green-600 font-medium">All</button>
                <button className="text-gray-500 hover:text-gray-700">In transit</button>
                <button className="text-gray-500 hover:text-gray-700">Delivered</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Vehicle</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Order ID</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Total</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b  border-gray-100">
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
                      <button className="text-green-600 hover:text-green-700 font-medium text-sm">Track</button>
                    </td>
                  </tr>

                  <tr className="border-b  border-gray-100">
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
                      <button className="text-green-600 hover:text-green-700 font-medium text-sm">Invoice</button>
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
                      <button className="text-green-600 hover:text-green-700 font-medium text-sm">Details</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">
            <button className='btn_primary transition-all duration-300 py-1 px-4 text-white rounded-lg text-sm'>View All</button>

            </div>
          </div>

          {/* Upcoming Service */}
          {/* <div className="bg-white rounded-lg shadow-sm p-6">
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
          </div> */}

          
          {/* Support Messages */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Support Messages</h2>
              <button className="text-sm text-gray-600 flex items-center gap-1 hover:text-gray-900">
                <MessageSquare size={16} />
                New Ticket
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-medium text-sm">A</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">Order #2193 shipping ETA?</p>
                  <p className="text-xs text-gray-500 mt-1">2h ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-4 border-b">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-medium text-sm">S</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">Service estimate for Camry</p>
                  <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-medium text-sm">P</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">Payment confirmation received</p>
                  <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Vehicles and Support Messages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
 
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to='/search' className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <Car size={20} className="text-gray-600" />
              <span className="font-medium text-gray-700">Browse Cars</span>
            </Link>
            <Link to='/checkout' className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <ShoppingCart size={20} className="text-gray-600" />
              <span className="font-medium text-gray-700">View Cart</span>
            </Link>
            <Link to='/repair' className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <Wrench size={20} className="text-gray-600" />
              <span className="font-medium text-gray-700">Request Service</span>
            </Link>
            <Link to='/user/settings' className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <Search size={20} className="text-gray-600" />
              <span className="font-medium text-gray-700">Account Settings</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;