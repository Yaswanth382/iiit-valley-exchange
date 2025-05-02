
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Terms of Service</h1>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing or using the Campus Market platform, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our services.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">2. Eligibility</h2>
                <p className="text-gray-700 mb-4">
                  Campus Market is exclusively available to current students, faculty, and staff of IIIT RK Valley. 
                  By using this platform, you represent and warrant that you are a current member of the IIIT RK Valley community.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
                <p className="text-gray-700 mb-4">
                  To use certain features of Campus Market, you must create an account. You are responsible for 
                  maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
                <p className="text-gray-700 mb-4">
                  You agree to provide accurate and complete information when creating your account and to update 
                  your information as necessary to keep it current.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">4. Listing and Selling</h2>
                <p className="text-gray-700 mb-4">
                  When listing items for sale on Campus Market, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li>Provide accurate descriptions and images of the items</li>
                  <li>Set fair and transparent prices</li>
                  <li>Only list items that you legally own and have the right to sell</li>
                  <li>Not list prohibited items (see section 5)</li>
                  <li>Fulfill the transactions as described in your listings</li>
                  <li>Communicate promptly with potential buyers</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">5. Prohibited Items</h2>
                <p className="text-gray-700 mb-4">
                  The following items are not permitted to be listed or sold on Campus Market:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li>Illegal goods or services</li>
                  <li>Counterfeit or stolen items</li>
                  <li>Weapons, ammunition, or explosives</li>
                  <li>Alcohol, tobacco, or drugs</li>
                  <li>Adult content or services</li>
                  <li>Personal information or data</li>
                  <li>Items that infringe on intellectual property rights</li>
                  <li>Academic work for the purpose of plagiarism</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">6. Buying</h2>
                <p className="text-gray-700 mb-4">
                  When purchasing items on Campus Market, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li>Pay the agreed-upon price in full</li>
                  <li>Complete transactions in a timely manner</li>
                  <li>Communicate respectfully with sellers</li>
                  <li>Meet in safe, public locations for exchanges</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">7. User Conduct</h2>
                <p className="text-gray-700 mb-4">
                  You agree not to use Campus Market to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li>Harass, threaten, or intimidate other users</li>
                  <li>Post false, misleading, or deceptive content</li>
                  <li>Engage in fraudulent activities</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Interfere with the proper functioning of the platform</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">8. Privacy</h2>
                <p className="text-gray-700 mb-4">
                  Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
                  use, and protect your personal information.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right to modify these Terms of Service at any time. We will notify users of 
                  significant changes through the platform or via email. Your continued use of Campus Market 
                  after such modifications constitutes your acceptance of the updated terms.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">10. Contact</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us at campusmarket@iiitrkv.ac.in.
                </p>
              </CardContent>
            </Card>
            
            <p className="text-center text-gray-500 text-sm mt-8">
              Last Updated: May 1, 2025
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
