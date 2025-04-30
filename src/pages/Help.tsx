
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface HelpTopicProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const HelpTopic: React.FC<HelpTopicProps> = ({ icon, title, description, link }) => {
  return (
    <Link to={link} className="group">
      <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        <div className="h-12 w-12 bg-campus-light rounded-full flex items-center justify-center mb-4 text-campus-primary">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-campus-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <div className="text-campus-primary text-sm font-medium flex items-center">
          Learn more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleContactClick = () => {
    window.open("https://wa.me/919014410240", "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-campus-primary text-white py-16">
          <div className="container px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">How can we help you?</h1>
              <p className="text-lg mb-8 text-white/90">
                Find answers to frequently asked questions or get in touch with our support team
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search for help articles..."
                  className="pl-10 h-12 text-black bg-white/90 border-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Help topics section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 sm:px-6">
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">Popular Help Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <HelpTopic
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="Getting Started"
                description="Learn how to create an account, browse listings, and make your first purchase or sale."
                link="/faq#getting-started"
              />
              <HelpTopic
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="Account Issues"
                description="Troubleshoot problems with logging in, account verification, or updating your profile information."
                link="/faq#account-issues"
              />
              <HelpTopic
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                }
                title="Buying Guide"
                description="Tips for finding the right products, contacting sellers, and completing transactions safely."
                link="/faq#buying-guide"
              />
              <HelpTopic
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
                title="Selling Guide"
                description="Learn how to create effective listings, price your items competitively, and manage buyer inquiries."
                link="/faq#selling-guide"
              />
              <HelpTopic
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                }
                title="Safety & Security"
                description="Tips for staying safe while buying and selling, and how to report issues or suspicious activity."
                link="/faq#safety-security"
              />
              <HelpTopic
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                }
                title="Contact Support"
                description="Need more help? Contact our support team directly for personalized assistance."
                link="#contact-form"
              />
            </div>
          </div>
        </section>

        {/* Contact form section */}
        <section id="contact-form" className="py-16">
          <div className="container px-4 sm:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Still Need Help?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Contact our support team and we'll get back to you as soon as possible
              </p>
              <div className="flex flex-col items-center space-y-4">
                <Button 
                  onClick={handleContactClick}
                  size="lg"
                  className="bg-campus-primary hover:bg-campus-dark"
                >
                  <svg 
                    width="20" 
                    height="20" 
                    className="mr-2" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.6 6.32C16.12 4.8 14.08 4 12 4C7.6 4 4 7.6 4 12C4 13.4 4.32 14.8 4.96 16L4 20L8.08 19.04C9.28 19.68 10.6 20 12 20C16.4 20 20 16.4 20 12C20 9.92 19.2 7.88 17.6 6.32ZM12 18.4C10.76 18.4 9.52 18.08 8.4 17.44L8.16 17.32L6 17.8L6.48 15.68L6.32 15.4C5.68 14.28 5.32 13.04 5.32 11.8C5.32 8.32 8.36 5.32 11.8 5.32C13.56 5.32 15.32 6.04 16.6 7.32C17.88 8.6 18.6 10.36 18.6 12.12C18.68 15.6 15.64 18.4 12 18.4ZM15.4 13.32C15.2 13.24 14.08 12.68 13.92 12.6C13.72 12.52 13.6 12.48 13.44 12.68C13.32 12.88 12.88 13.4 12.76 13.56C12.64 13.68 12.52 13.72 12.32 13.64C11.16 13.08 10.4 12.64 9.6 11.32C9.4 11 9.72 11.04 10 10.44C10.08 10.28 10.04 10.16 9.96 10.04C9.88 9.92 9.56 8.8 9.4 8.4C9.24 8 9.08 8.04 8.96 8.04C8.84 8.04 8.72 8.04 8.56 8.04C8.44 8.04 8.2 8.12 8.04 8.32C7.84 8.52 7.24 9.08 7.24 10.2C7.24 11.32 8.04 12.4 8.16 12.56C8.28 12.72 9.52 14.6 11.4 15.6C13 16.4 13.48 16.44 14.04 16.32C14.4 16.28 15.32 15.76 15.48 15.28C15.64 14.8 15.64 14.4 15.56 14.32C15.52 14.2 15.4 14.16 15.2 14.08L15.4 13.32Z"/>
                  </svg>
                  Contact Support on WhatsApp
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  Our support team is available Monday-Friday, 9am-5pm
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ teaser */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
              <p className="text-lg mb-8 text-gray-600">
                Browse our comprehensive FAQ section for quick answers to common questions
              </p>
              <Link to="/faq">
                <Button size="lg" className="bg-campus-primary hover:bg-campus-dark">
                  View All FAQs
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
