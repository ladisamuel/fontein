import { Link } from "react-router-dom";

export default function Footer() {
  const footerLinks = {
    quickLinks: [
      { name: "Home", to: "/" },
      { name: "About", to: "/about" },
      { name: "Contact Us", to: "/contact-us" },
      { name: "Features", to: "/features" },
    ],
    support: [
      { name: "Help Center", to: "#" },
      { name: "Live Chat", to: "#" },
    ],
    contact: [
      {
        name: "support@fonteingroup.com",
        to: "mailto:support@fonteingroup.com",
      },
      { name: "+234-813-757-9041", to: "tel:+2348137579041" },
    ],
  };
  return (
    <footer className="bg-gray-900 text-white">
      {/* Footer */}
      <div className="max-w-7xl mx-auto main_padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <ul className="space-y-2">
              {footerLinks.contact.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                    {link.name}
                  </Link>
                </li>
              ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 Fontein Resource Trade. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
