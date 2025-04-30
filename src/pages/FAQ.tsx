
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface FAQCategory {
  id: string;
  title: string;
  faqs: Array<{
    question: string;
    answer: React.ReactNode;
  }>;
}

const faqCategories: FAQCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    faqs: [
      {
        question: "How do I create an account?",
        answer: (
          <div className="space-y-2">
            <p>
              To create an account on Campus Market, you need to:
            </p>
            <ol className="list-decimal list-inside space-y-1 pl-4">
              <li>Click on the "Register" button in the top navigation</li>
              <li>Enter your IIIT RK Valley email address (must end with @iiitrkvalley.ac.in)</li>
              <li>Fill in your personal details and create a password</li>
              <li>Verify your email by clicking the link sent to your inbox</li>
              <li>Complete your profile with additional information</li>
            </ol>
            <p>
              Once your account is verified, you can start browsing, buying, and selling products!
            </p>
          </div>
        ),
      },
      {
        question: "Who can use Campus Market?",
        answer: (
          <p>
            Campus Market is exclusively for students of IIIT RK Valley. We verify this through your college email address during registration. This ensures that all transactions happen within the trusted campus community, creating a safer environment for buying and selling.
          </p>
        ),
      },
      {
        question: "Is Campus Market free to use?",
        answer: (
          <p>
            Yes, Campus Market is completely free for IIIT RK Valley students. There are no listing fees, transaction fees, or subscription costs. We aim to provide a simple platform for students to connect and trade items without any additional expenses.
          </p>
        ),
      }
    ],
  },
  {
    id: "account-issues",
    title: "Account Issues",
    faqs: [
      {
        question: "I didn't receive my verification email. What should I do?",
        answer: (
          <div className="space-y-2">
            <p>
              If you haven't received your verification email:
            </p>
            <ol className="list-decimal list-inside space-y-1 pl-4">
              <li>Check your spam/junk folder</li>
              <li>Verify you entered your email address correctly</li>
              <li>Click the "Resend Verification Email" option on the login page</li>
              <li>If you still don't receive it, please contact our support team</li>
            </ol>
          </div>
        ),
      },
      {
        question: "How do I reset my password?",
        answer: (
          <p>
            To reset your password, click the "Forgot Password?" link on the login page. Enter your registered email address and follow the instructions sent to your inbox. Make sure to create a strong, unique password to keep your account secure.
          </p>
        ),
      },
      {
        question: "How do I update my profile information?",
        answer: (
          <p>
            You can update your profile information by logging in and navigating to your profile page. Click on the "Edit Profile" button to update your details such as contact information, hostel details, or profile picture. Remember to save your changes before exiting.
          </p>
        ),
      },
    ],
  },
  {
    id: "buying-guide",
    title: "Buying Guide",
    faqs: [
      {
        question: "How do I search for products?",
        answer: (
          <p>
            You can search for products using the search bar at the top of the page. You can also browse products by category, filter by price range, condition, or sort them by newest listings or price. Our advanced filtering system helps you find exactly what you're looking for quickly and efficiently.
          </p>
        ),
      },
      {
        question: "How do I contact a seller?",
        answer: (
          <p>
            When viewing a product listing, you'll see a "Contact Seller" button. Clicking this button will allow you to send a message directly to the seller through our internal messaging system. You can discuss details, negotiate the price, or arrange a meeting time and place for the transaction.
          </p>
        ),
      },
      {
        question: "How are payments handled?",
        answer: (
          <p>
            Campus Market doesn't handle payments directly. Transactions are made in person between buyers and sellers, typically using cash or UPI transfers. We recommend confirming the payment method with the seller before meeting to ensure a smooth transaction. Always meet in public areas on campus for safety.
          </p>
        ),
      },
    ],
  },
  {
    id: "selling-guide",
    title: "Selling Guide",
    faqs: [
      {
        question: "How do I create a product listing?",
        answer: (
          <div className="space-y-2">
            <p>
              To create a product listing:
            </p>
            <ol className="list-decimal list-inside space-y-1 pl-4">
              <li>Log in to your account</li>
              <li>Click on the "Sell" button in the navigation</li>
              <li>Fill in the product details (name, description, category, price)</li>
              <li>Upload clear photos of your item (up to 5 images)</li>
              <li>Specify the condition and whether the price is negotiable</li>
              <li>Add your preferred meeting location on campus</li>
              <li>Submit your listing for review</li>
            </ol>
            <p>
              Your listing will be visible to other students immediately after submission!
            </p>
          </div>
        ),
      },
      {
        question: "How do I price my items?",
        answer: (
          <p>
            When pricing your items, research similar products on Campus Market to see the going rate. For textbooks, consider their condition and original price - typically 50-70% of the original price for good condition books is reasonable. For electronics, factor in age, condition, and original price. You can always mark your price as "Negotiable" if you're flexible.
          </p>
        ),
      },
      {
        question: "How do I mark an item as sold?",
        answer: (
          <p>
            Once you've completed a transaction, you should mark your item as "Sold" to remove it from active listings. To do this, go to your profile, find the listing under "My Listings," and click the "Mark as Sold" button. This helps keep the marketplace updated and prevents you from receiving additional inquiries about the item.
          </p>
        ),
      },
    ],
  },
  {
    id: "safety-security",
    title: "Safety & Security",
    faqs: [
      {
        question: "How does Campus Market ensure safety?",
        answer: (
          <p>
            Campus Market ensures safety by restricting access to verified IIIT RK Valley students only. All users must register with their college email addresses and complete verification. Additionally, we recommend meeting in public places on campus for transactions, using secure payment methods, and reporting any suspicious activity to our team immediately.
          </p>
        ),
      },
      {
        question: "What should I do if I encounter a scam or suspicious activity?",
        answer: (
          <p>
            If you encounter suspicious activity, immediately report it using the "Report" button on the listing or user profile. Provide as much detail as possible about the incident. Our moderation team will investigate promptly. We also recommend not proceeding with any transaction if you feel uncomfortable or suspect fraudulent behavior.
          </p>
        ),
      },
      {
        question: "Are there any items that are prohibited on Campus Market?",
        answer: (
          <div className="space-y-2">
            <p>
              Yes, the following items are prohibited on Campus Market:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Illegal items or substances</li>
              <li>Weapons or dangerous materials</li>
              <li>Counterfeit or stolen goods</li>
              <li>Prescription medications</li>
              <li>Alcohol or tobacco products</li>
              <li>Explicit or inappropriate content</li>
            </ul>
            <p>
              Listings that violate these rules will be removed, and accounts may be suspended.
            </p>
          </div>
        ),
      },
    ],
  },
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCategories = faqCategories.filter((category) => {
    if (searchTerm === "") return true;
    
    return (
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.faqs.some(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (typeof faq.answer === "string" &&
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-campus-primary text-white py-12">
          <div className="container px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-lg mb-8 text-white/90">
                Find answers to common questions about using Campus Market
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search FAQs..."
                  className="pl-10 h-12 text-black bg-white/90 border-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ content */}
        <section className="py-12">
          <div className="container px-4 sm:px-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Category navigation */}
              <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <div className="bg-white p-4 rounded-lg shadow-sm sticky top-24">
                  <h3 className="font-semibold text-lg mb-4 border-b pb-2">Categories</h3>
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => setActiveCategory("all")}
                        className={`w-full text-left px-2 py-1.5 rounded transition-colors ${
                          activeCategory === "all"
                            ? "bg-campus-light text-campus-primary font-medium"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        All Categories
                      </button>
                    </li>
                    {faqCategories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => setActiveCategory(category.id)}
                          className={`w-full text-left px-2 py-1.5 rounded transition-colors ${
                            activeCategory === category.id
                              ? "bg-campus-light text-campus-primary font-medium"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {category.title}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t">
                    <h3 className="font-semibold text-lg mb-4">Need More Help?</h3>
                    <Link
                      to="https://wa.me/919014410240"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-campus-primary hover:bg-campus-dark">
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
                        Contact Support
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* FAQ accordion */}
              <div className="w-full md:w-3/4">
                {filteredCategories.length === 0 ? (
                  <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                    <h3 className="text-lg font-semibold mb-2">No results found</h3>
                    <p className="text-gray-500">
                      Try adjusting your search terms or browse all categories
                    </p>
                  </div>
                ) : (
                  filteredCategories
                    .filter(
                      (category) =>
                        activeCategory === "all" || activeCategory === category.id
                    )
                    .map((category) => (
                      <div key={category.id} id={category.id} className="mb-10">
                        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
                          {category.title}
                        </h2>
                        <Accordion type="single" collapsible className="w-full">
                          {category.faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`${category.id}-${index}`}>
                              <AccordionTrigger className="text-left">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-gray-700">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    ))
                )}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
              <h3 className="text-xl font-bold mb-4">Still Have Questions?</h3>
              <p className="mb-6 text-gray-600">
                If you couldn't find the answer you were looking for, feel free to reach out to our support team.
              </p>
              <Link to="https://wa.me/919014410240" target="_blank" rel="noopener noreferrer">
                <Button className="bg-campus-primary hover:bg-campus-dark">
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
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
