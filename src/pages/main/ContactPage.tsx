import React, { useState } from 'react';
import { Phone, Wrench, HelpCircle, MapPin, Clock, MessageSquare, Send, Car } from 'lucide-react';


const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
  };

  const handleClear = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      topic: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

          {/* Hero Section */}
          <section
            style={{
              backgroundBlendMode: "multiply",
            }}
            className="bg-[#00000096] mt-[12vh] bg-gradient-to-r from-green-600 to-purple-600 text-white py-20"
    
            //  className="bg-black text-white py-16 rounded-lg mx-4 mt-8 mb-8"
          >
            <div className="max-w-4xl mx-auto text-center px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Contact Us at Fontein Resource
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Your trusted partner in the automotive trade. We connect buyers and
                sellers with ease, offering a seamless experience for vehicle
                transactions and comprehensive services
              </p>
            </div>
          </section> 

      {/* Main Content */}
      <div className="px-6 lg:px-[150px] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="John Carter"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="+1 555 0123"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Topic
                    </label>
                    <input
                      type="text"
                      value={formData.topic}
                      onChange={(e) => setFormData({...formData, topic: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="Sales Inquiry"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={6}
                    aria-placeholder='I would like to know more about importing vehicles and pricing.'
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="I would like to know more about importing vehicles and pricing."
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-6 py-2 text-gray-700 hover:text-gray-900 transition"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Call Us */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Phone className="w-5 h-5 text-gray-900" />
                <h3 className="font-bold text-gray-900">Call us</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Car className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Sales & Vehicle Orders</p>
                    <p className="text-sm text-gray-600">+1 (555) 100-2000 • Mon-Fri 9am-6pm</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Wrench className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Service & Repairs</p>
                    <p className="text-sm text-gray-600">+1 (555) 300-4000 • Daily 8am-8pm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-2">
                <HelpCircle className="w-5 h-5 text-gray-900" />
                <h3 className="font-bold text-gray-900">Support</h3>
              </div>
              <p className="text-sm text-gray-600">help@autotradepro.com</p>
            </div>

            {/* Visit Us */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="w-5 h-5 text-gray-900" />
                <h3 className="font-bold text-gray-900">Visit us</h3>
              </div>
              <div className="mb-4 h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-blue-600 opacity-50" />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                101 Market Street, Suite 500, San Francisco, CA 94103
              </p>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-5 h-5 text-gray-900" />
                <h3 className="font-bold text-gray-900">Business hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mon-Fri</span>
                  <span className="text-gray-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sat</span>
                  <span className="text-gray-900">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sun</span>
                  <span className="text-gray-900">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
            <h2 className="text-2xl font-bold text-gray-900">Frequently asked questions</h2>
            <span className="text-sm text-gray-500">Updated weekly</span>
          </div>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-start space-x-3">
                <Car className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">How long does vehicle import take?</h3>
                  <p className="text-sm text-gray-600">Typically 2-6 weeks depending on origin and documentation.</p>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-start space-x-3">
                <MessageSquare className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">What payment methods are supported?</h3>
                  <p className="text-sm text-gray-600">All major cards, wire transfer, and financing partners.</p>
                </div>
              </div>
            </div>
            <div className="pb-4">
              <div className="flex items-start space-x-3">
                <Wrench className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Can I request repairs without an account?</h3>
                  <p className="text-sm text-gray-600">Yes, anonymous requests are supported on our Services screen.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Still Need Help */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Still need help?</h2>
              <p className="text-gray-600">Reach out and our team will get back within 24 hours.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition">
                <Phone className="w-5 h-5" />
                <span>Schedule a Call</span>
              </button>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                <Send className="w-5 h-5" />
                <span>Submit Request</span>
              </button>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default ContactPage;