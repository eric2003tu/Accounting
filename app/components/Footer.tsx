import Link from 'next/link';
import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Modern gradient border top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Accounting
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Modern financial solutions for tomorrow's businesses. Secure, transparent, and innovative.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110">
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Services', 'Pricing', 'Blog'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(' ', '')}`}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm group flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-blue-400 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
            <p className="text-gray-300 text-sm">Get the latest insights and news</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors text-sm"
              />
              <button className="px-4 py-2 bg-green-900 rounded-lg text-white text-sm font-medium cursor-pointer transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-700/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {year} Accounting. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/accessibility" className="text-gray-400 hover:text-blue-400 text-xs transition-colors">
                Accessibility
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-blue-400 text-xs transition-colors">
                Cookie Settings
              </Link>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <FaEnvelope size={12} />
                <span>erictuyishime574@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;