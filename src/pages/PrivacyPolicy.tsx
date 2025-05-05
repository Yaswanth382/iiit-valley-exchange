
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-[#800000] hover:underline">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Privacy Policy</h1>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                Last Updated: May 5, 2025
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">1. Introduction</h2>
              <p className="mb-4">
                Welcome to Campus Market. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you how we look after your personal data when you visit our website 
                and tell you about your privacy rights and how the law protects you.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">2. Information We Collect</h2>
              <p className="mb-2">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Personal Information:</strong> Name, student ID, email address, phone number, and hostel details.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website and services.</li>
                <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform.</li>
                <li><strong>Product Listings:</strong> Information you provide when creating product listings, including descriptions, prices, images, and condition.</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">3. How We Use Your Information</h2>
              <p className="mb-2">We use your information for the following purposes:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>To facilitate transactions between buyers and sellers</li>
                <li>To manage your account and provide you with customer support</li>
                <li>To verify your identity and prevent fraud</li>
                <li>To improve our website and services</li>
                <li>To send you important notifications about your account or listings</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">4. Information Sharing</h2>
              <p className="mb-4">
                We share limited information between buyers and sellers to facilitate transactions. This includes your 
                name, student ID, and contact information. We do not sell or rent your personal information to third parties.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">5. Data Security</h2>
              <p className="mb-4">
                We have implemented appropriate security measures to prevent your personal data from being accidentally lost, 
                used, or accessed in an unauthorized way. We limit access to your personal data to those who have a genuine 
                business need to know it.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">6. Your Rights</h2>
              <p className="mb-2">Under data protection laws, you have rights including:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Your right of access</li>
                <li>Your right to rectification</li>
                <li>Your right to erasure</li>
                <li>Your right to restriction of processing</li>
                <li>Your right to data portability</li>
                <li>Your right to object</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">7. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
                <br />
                <a href="mailto:privacy@campusmarket.com" className="text-[#800000] hover:underline">privacy@campusmarket.com</a>
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">8. Changes to the Privacy Policy</h2>
              <p className="mb-4">
                We may update our privacy policy from time to time. We will notify you of any changes by posting the new 
                privacy policy on this page and updating the "Last Updated" date at the top of this privacy policy.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
