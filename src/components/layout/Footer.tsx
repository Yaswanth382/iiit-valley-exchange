
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-campus-dark text-white">
      <div className="container py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
              Campus Market
            </h3>
            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/" className="hover:text-campus-accent transition-colors">Home</Link>
              <Link to="/products" className="hover:text-campus-accent transition-colors">Products</Link>
              <Link to="/sell" className="hover:text-campus-accent transition-colors">Sell</Link>
              <Link to="/about" className="hover:text-campus-accent transition-colors">About Us</Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
              Support
            </h3>
            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/help" className="hover:text-campus-accent transition-colors">Help Center</Link>
              <Link to="/faq" className="hover:text-campus-accent transition-colors">FAQ</Link>
              <a 
                href="https://wa.me/919014410240" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-campus-accent transition-colors"
              >
                Contact Us
              </a>
              <Link to="/terms" className="hover:text-campus-accent transition-colors">Terms of Service</Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
              Categories
            </h3>
            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/products?category=books" className="hover:text-campus-accent transition-colors">Books</Link>
              <Link to="/products?category=electronics" className="hover:text-campus-accent transition-colors">Electronics</Link>
              <Link to="/products?category=clothing" className="hover:text-campus-accent transition-colors">Clothing</Link>
              <Link to="/products?category=furniture" className="hover:text-campus-accent transition-colors">Furniture</Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
              Connect
            </h3>
            <div className="flex flex-col space-y-2 text-sm">
              <a 
                href="https://instagram.com/campusmarket1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-campus-accent transition-colors flex items-center"
              >
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </span>
                @campusmarket1
              </a>
              <a 
                href="https://twitter.com/campus43281" 
                target="_blank"
                rel="noopener noreferrer" 
                className="hover:text-campus-accent transition-colors flex items-center"
              >
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </span>
                @campus43281
              </a>
              <a 
                href="mailto:support@campusmarket.com" 
                className="hover:text-campus-accent transition-colors flex items-center"
              >
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                Email Us
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">
            &copy; {currentYear} Campus Market. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-sm text-gray-300 hover:text-campus-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-300 hover:text-campus-accent transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
