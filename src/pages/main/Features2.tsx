import React from 'react';
import { 
  Search, 
  PlusCircle, 
  Shield, 
  Wrench, 
  DollarSign, 
  FileText, 
  List, 
  Users, 
  TrendingUp,
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

// cld
const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen mt-[12vh] bg-gray-50">
      
            {/* Header */}
            <Header />
            

      {/* Hero Section */}
      <div className="main_paddin">
      <section style={{
        backgroundBlendMode: "multiply"
      }} className="bg-[#00000096] rounded4xl  bg-gradient-to-r from-green-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover Fontein Resource Trade's Powerful Features
          </h1>
          <p className="text-lg text-green-100 leading-relaxed max-w-3xl mx-auto">
            From seamless buying and selling to comprehensive repair management and robust 
            admin, we've got you covered.
          </p>
        </div>
      </section>
      </div>

      {/* Effortless Buying & Selling Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto main_padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Effortless Buying & Selling</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes vehicle transactions simple and secure, with opportunities both at ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Extensive Inventory */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Extensive Inventory</h3>
              <p className="text-gray-600">
                Browse thousands of verified listings from trusted dealers with detailed vehicle information.
              </p>
            </div>

            {/* Easy Listing */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <PlusCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Easy Listing</h3>
              <p className="text-gray-600">
                Sell your car in a few simple steps with our intuitive listing process and reach a wider audience.
              </p>
            </div>

            {/* Secure Transactions */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secure Transactions</h3>
              <p className="text-gray-600">
                Benefit from our built-in payment and escrow services for safe and reliable transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reliable Repair & Maintenance Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto main_padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Reliable Repair & Maintenance</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Keep your vehicle in top condition with our network of trusted comprehensive service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Certified Mechanics */}
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wrench className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Certified Mechanics</h3>
              <p className="text-gray-600">
                Access a network of qualified and experienced professionals for all your repair.
              </p>
            </div>

            {/* Transparent Pricing */}
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparent Pricing</h3>
              <p className="text-gray-600">
                Get upfront quotes and detailed breakdowns of services, ensuring no hidden costs.
              </p>
            </div>

            {/* Service History Tracking */}
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Service History Tracking</h3>
              <p className="text-gray-600">
                Keep a digital record of all your vehicle's services and maintenance for easy reference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Powerful Admin & Management Tools Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto main_padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Admin & Management Tools</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Easily engage management and gain full control with accounting's auto-friendly dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Listing Management */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <List className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Listing Management</h3>
              <p className="text-gray-600">
                Easily add, edit, and remove vehicle listings with a user-friendly dashboard.
              </p>
            </div>

            {/* User Management */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">User Management</h3>
              <p className="text-gray-600">
                Oversee user accounts, manage permissions, and ensure a secure community.
              </p>
            </div>

            {/* Transaction Tracking */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transaction Tracking</h3>
              <p className="text-gray-600">
                Monitor all sales, purchases, and service bookings with easily detailed reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-600 text-white py-16 mx-4 rounded-lg mb-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8">
            Experience the power of our comprehensive auto trading platform today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to='/search' className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold">
              Request Test Drive
            </Link>
            <Link to='/repair' className="border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-blue-600 transition-colors font-semibold">
              Repair Your Vehicle
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      {/* <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto main_padding py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">FR</span>
                </div>
                <span className="text-xl font-semibold">Firma Auto Trade</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner in automotive trading and services.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Buy Cars</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Sell Cars</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Maintenance</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>+1 (555) 123-4567</p>
                <p>info@firmaautotrade.com</p>
                <p>123 Auto Street, City, State</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 Firma Auto Trade. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default FeaturesPage;