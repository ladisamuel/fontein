import React from 'react';
import { CheckCircle, Eye, Heart } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <Header />
          


      {/* Hero Section */}
      <section
      
      style={{
        backgroundBlendMode: "multiply"
      }} className="bg-[#00000096] mt-[12vh] bg-gradient-to-r from-green-600 to-purple-600 text-white py-20"

      //  className="bg-black text-white py-16 rounded-lg mx-4 mt-8 mb-8"
       >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About AutoTradePro</h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Your trusted partner in the automotive trade. We connect buyers and sellers with ease, 
            offering a seamless experience for vehicle transactions and comprehensive services
          </p>
        </div>
      </section>

      {/* Mission, Vision & Values Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto main_padding">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Mission, Vision & Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Our Mission */}
            <div className="bg-white rounded-lg p-8 shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To revolutionize the auto trade industry by providing a transparent, efficient, and user-friendly platform that empowers individuals and businesses to buy, sell, and manage vehicles with confidence
              </p>
            </div>

            {/* Our Vision */}
            <div className="bg-white rounded-lg p-8 shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To revolutionize the auto trade industry by providing a transparent, efficient, and user-friendly platform that empowers individuals and businesses to buy, sell, and manage vehicles with confidence
              </p>
            </div>

            {/* Our Values */}
            <div className="bg-white rounded-lg p-8 shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Value</h3>
              <p className="text-gray-600 leading-relaxed">
                To revolutionize the auto trade industry by providing a transparent, efficient, and user-friendly platform that empowers individuals and businesses to buy, sell, and manage vehicles with confidence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto main_padding">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Story</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Modern car showroom with white SUV"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Founded in 2020, FR Auto Trade began with a simple but powerful mission: to transform the car buying and selling experience with trust, transparency, and top-tier service.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                What started as a modest venture with a passion for automobiles has grown into a reputable and fast-rising name in the auto trade industry. From day one, we've been committed to helping individuals and businesses find the right vehicles at the right price — whether new, used, or imported.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Backed by a dedicated team of automotive professionals, we've built a brand rooted in integrity, customer satisfaction, and innovation. Our journey has been driven by one goal: to make automotive transactions smoother, smarter, and more reliable for everyone.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                At FR Auto Trade, every car has a story — and so do we. As we continue to grow, we remain grounded in our founding values and focused on delivering excellence in every key turn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-16 rounded-lg mx-4 mb-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Future of Auto Trade?</h2>
          <p className="text-gray-300 mb-8">
            Explore our extensive listings or get in touch with our expert team today!
          </p>
          <Link to='/search' className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors font-semibold">
            Browse Vehicles
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;