
import { Check } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Create an Account",
    description: "Sign up using your IIIT RK Valley college email to verify you're part of the campus community"
  },
  {
    number: 2,
    title: "Browse or List Items",
    description: "Search for what you need or list items you want to sell with detailed descriptions and photos"
  },
  {
    number: 3,
    title: "Connect with Buyers/Sellers",
    description: "Chat directly with other students to negotiate prices and arrange meetups on campus"
  },
  {
    number: 4,
    title: "Complete the Transaction",
    description: "Meet in person to exchange items and complete the transaction with cash or UPI payments"
  }
];

const features = [
  "Exclusive to IIIT RK Valley students",
  "No transaction fees or commissions",
  "Secure campus-only marketplace",
  "Find items from fellow students",
  "Sell unused items quickly",
  "Protect the environment by reusing"
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Campus Market makes buying and selling within IIIT RK Valley simple and secure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Why use Campus Market?</h3>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-campus-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-campus-primary" />
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-1 md:order-2 space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex group">
                <div className="flex-shrink-0 mr-6">
                  <div className="h-12 w-12 rounded-full bg-campus-primary/10 flex items-center justify-center border-2 border-campus-primary group-hover:bg-campus-primary transition-colors duration-300">
                    <span className="text-lg font-bold text-campus-primary group-hover:text-white transition-colors duration-300">
                      {step.number}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-gray-900">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
