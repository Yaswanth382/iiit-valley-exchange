
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span>Campus Market</span>
            </Link>
            <p className="mt-2 text-sm">The marketplace for IIIT RK Valley students</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-3">Marketplace</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/products" className="hover:text-white transition-colors">Browse Products</Link></li>
                <li><Link to="/create-listing" className="hover:text-white transition-colors">Sell an Item</Link></li>
                <li><Link to="/wishlist" className="hover:text-white transition-colors">My Wishlist</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><a href="mailto:contact@campusmarket.com" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Campus Market. All rights reserved.</p>
          <div className="mt-4 sm:mt-0">
            <ul className="flex space-x-4">
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
