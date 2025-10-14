import React, { useState } from 'react';
import { 
  User, Lock, Bell, CreditCard, Wrench, AlertTriangle, 
  Upload, RotateCcw, MapPin, Mail, Shield, 
  Save, X, Plus, Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AccountSettingsPage: React.FC = () => {
  const [profile, setProfile] = useState({
    firstName: 'Ava',
    lastName: 'Johnson',
    email: 'ava.johnson@example.com',
    phone: '+1 (555) 014-2244',
    location: 'Austin, TX',
    preferredContact: 'Email'
  });

  const [security, setSecurity] = useState({
    currentPassword: '••••••••',
    newPassword: '••••••••',
    confirmPassword: '••••••••',
    twoFactor: 'Authenticator App'
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    priceAlerts: true,
    billingReceipts: 'email'
  });

  const [billing, setBilling] = useState({
    cardNumber: '•••• 4242',
    cardExpiry: 'Exp 12/27',
    billingEmail: 'billing@autouser.com',
    billingAddress: '500 Market St, Austin, TX 78701',
    deliveryAddress: '742 Evergreen Terrace, Springfield, IL 62701'
  });

  const [preferences, setPreferences] = useState({
    dealership: 'Downtown Service Center',
    loaner: 'When Available',
    maintenance: 'Standard 24 mo',
    communicationWindow: '8am - 6pm (Local)'
  });

  return (
    <div className="min-h-screen mt-[12vh] bg-gray-50">
 

      {/* Main Content */}
      <div className="px-6 lg:px-[150px] py-8">
        {/* Page Header */}
        <div className="mb-8">
            <Link to='/user/dashboard' className=" flex gap-2 items-center mb-5 text-gray-400 border-l border-gray-200 pl-2 cursor-pointer w-fit">
                <i className="pi pi-arrow-left"></i>
                <p>Dashboard</p>
            </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
              <p className="text-gray-600">Manage your profile, security, notifications, and billing</p>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center space-x-1 text-green-600">
                <Shield className="w-4 h-4" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-1 text-blue-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Changes auto-saved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-2 mb-6">
            <User className="w-5 h-5 text-gray-900" />
            <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
          </div>

          <div className="flex items-start space-x-6 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 flex items-center justify-center text-white text-2xl font-bold">
                AJ
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact</label>
              <input
                type="text"
                value={profile.preferredContact}
                onChange={(e) => setProfile({...profile, preferredContact: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-4">Your profile details are used for orders and service bookings.</p>

          <div className="flex justify-end space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <X className="w-4 h-4" />
              <span>Discard</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-2 mb-6">
            <Lock className="w-5 h-5 text-gray-900" />
            <h2 className="text-lg font-semibold text-gray-900">Security</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                value={security.currentPassword}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={security.newPassword}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                value={security.confirmPassword}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Two-Factor Authentication</label>
              <input
                type="text"
                value={security.twoFactor}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Enable 2FA to add an additional layer of security to your account.</p>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
              <Shield className="w-4 h-4" />
              <span>Manage 2FA</span>
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-2 mb-6">
            <Bell className="w-5 h-5 text-gray-900" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Order and Service Updates</span>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Enabled</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Price Alerts & New Listings</span>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Enabled</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Billing & Receipts</span>
              </div>
              <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">Email Only</span>
            </div>
          </div>
        </div>

        {/* Billing & Addresses Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-2 mb-6">
            <CreditCard className="w-5 h-5 text-gray-900" />
            <h2 className="text-lg font-semibold text-gray-900">Billing & Addresses</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Card</label>
              <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{billing.cardNumber}</span>
                <span className="text-gray-500">{billing.cardExpiry}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Billing Email</label>
              <input
                type="email"
                value={billing.billingEmail}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Billing Address</label>
              <input
                type="text"
                value={billing.billingAddress}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
              <input
                type="text"
                value={billing.deliveryAddress}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Manage saved cards and addresses used during checkout.</p>
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                <Plus className="w-4 h-4" />
                <span>Add Card</span>
              </button>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                <MapPin className="w-4 h-4" />
                <span>Add Address</span>
              </button>
            </div>
          </div>
        </div>

        {/* Service Preferences Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-2 mb-6">
            <Wrench className="w-5 h-5 text-gray-900" />
            <h2 className="text-lg font-semibold text-gray-900">Service Preferences</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Dealership</label>
              <input
                type="text"
                value={preferences.dealership}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loaner Vehicle</label>
              <input
                type="text"
                value={preferences.loaner}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Plan</label>
              <input
                type="text"
                value={preferences.maintenance}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Communication Window</label>
              <input
                type="text"
                value={preferences.communicationWindow}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Danger Zone Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-red-200">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-semibold text-gray-900">Danger Zone</h2>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Delete Account</h3>
              <p className="text-sm text-gray-600">This action is permanent and will remove all your data, orders, and services.</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
              <Trash2 className="w-4 h-4" />
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;