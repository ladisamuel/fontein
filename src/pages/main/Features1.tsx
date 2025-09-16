// src/pages/FeaturesPage.tsx
import React from "react";
import Header from "../../components/Header";


// cht
const FeaturesPage: React.FC = () => {
  return (
    <div className="font-inter text-[rgb(64,64,64)]">
          {/* Header */}
          <Header />
          


      {/* Hero Section */}
      <section className="bg-[rgb(17,128,183)] text-white text-center px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Discover AutoTradePro&apos;s Powerful Features
        </h2>
        <p className="max-w-2xl mx-auto">
          From seamless buying and selling to comprehensive repair management and robust admin tools, we&apos;ve got you covered.
        </p>
      </section>

      {/* Features Sections */}
      <section className="px-6 py-12 space-y-12">
        {/* Buying & Selling */}
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-2">Effortless Buying &amp; Selling</h3>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Our platform makes vehicle transactions simple and secure, connecting buyers and sellers with ease.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Extensive Inventory", desc: "Browse thousands of verified listings from trusted sellers, with detailed vehicle information." },
              { title: "Easy Listing", desc: "Sell your car in a few simple steps with our intuitive listing process and reach a wide audience." },
              { title: "Secure Transactions", desc: "Benefit from our built-in payment and escrow services for safe and reliable transactions." },
            ].map((item, idx) => (
              <div key={idx} className="bg-[rgb(255,255,255)] shadow rounded-lg p-6">
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Repair & Maintenance */}
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-2">Reliable Repair &amp; Maintenance</h3>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Keep your vehicle in top condition with our network of trusted mechanics and comprehensive service options.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Certified Mechanics", desc: "Access a network of qualified and experienced professionals for all your repair needs." },
              { title: "Transparent Pricing", desc: "Get upfront quotes and detailed breakdowns of services, ensuring no hidden costs." },
              { title: "Service History Tracking", desc: "Keep a digital record of all your vehicle's services and maintenance for easy reference." },
            ].map((item, idx) => (
              <div key={idx} className="bg-[rgb(255,255,255)] shadow rounded-lg p-6">
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Tools */}
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-2">Powerful Admin &amp; Management Tools</h3>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Streamline your operations and gain full control with our comprehensive administrative interface.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Listing Management", desc: "Easily add, edit, and remove vehicle listings with a user-friendly dashboard." },
              { title: "User Management", desc: "Oversee user accounts, manage permissions, and ensure a secure community." },
              { title: "Transaction Tracking", desc: "Monitor all sales, purchases, and service bookings with detailed reports." },
            ].map((item, idx) => (
              <div key={idx} className="bg-[rgb(255,255,255)] shadow rounded-lg p-6">
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[rgb(17,128,183)] text-white text-center px-6 py-12">
        <h3 className="text-xl md:text-2xl font-bold mb-2">Ready to Get Started?</h3>
        <p className="max-w-2xl mx-auto mb-6">
          Explore our features and see how AutoTradePro can simplify your automotive journey.
        </p>
        <button className="bg-white text-[rgb(17,128,183)] font-semibold px-6 py-2 rounded-full hover:bg-gray-100">
          Sign Up Now
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-[rgb(64,64,64)] text-white px-6 py-12 grid md:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li>Home</li>
            <li>About</li>
            <li>Features</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="space-y-1">
            <li>Help Center</li>
            <li>Live Chat</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Legal</h4>
          <ul className="space-y-1">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <ul className="space-y-1">
            <li>info@autotradepro.com</li>
            <li>+1 (555) 123-4567</li>
          </ul>
        </div>
      </footer>
      <div className="bg-[rgb(64,64,64)] text-center text-xs text-gray-400 py-4 border-t border-gray-600">
        © 2024 AutoTradePro. All rights reserved.
      </div>
    </div>
  );
};

export default FeaturesPage;
