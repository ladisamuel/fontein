import React from 'react';
import { 
  CheckCircle, ArrowRight, Shield, Car
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PasswordResetConfirmation: React.FC = () => {

  const navigate = useNavigate()



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Car className="w-8 h-8 text-green-600" />
              <span className="text-xl font-semibold text-gray-900">Auto Trade</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">About</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Features</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Contact Us</a>
            </nav>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
                Contact Us
              </a>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium">
                Register
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Password Reset Successfully!</h1>
              <p className="text-gray-600 mb-8">
                Your password has been reset successfully. You can now log in with your new password.
              </p>

              <button
                onClick={() => navigate('/login')}
                className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium transition mb-4"
              >
                <span>Go to Login</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate('/')}
                className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 font-medium transition"
              >
                <span>Return to Home</span>
              </button>

              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 mb-1">Security Tip</p>
                    <p className="text-sm text-gray-600">
                      Make sure to use a strong, unique password and enable two-factor authentication for added security.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Didn't request this change?{' '}
                  <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                    Contact Support
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">
                  1
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Sign in with your new password</p>
                  <p className="text-xs text-gray-600">Access your account using the password you just created</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">
                  2
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Enable two-factor authentication</p>
                  <p className="text-xs text-gray-600">Add an extra layer of security to your account</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold">
                  3
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Review your account activity</p>
                  <p className="text-xs text-gray-600">Check for any unauthorized access or changes</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Need help?{' '}
              <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetConfirmation;