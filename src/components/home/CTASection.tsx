
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="bg-campus-primary py-16">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to start buying and selling?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl">
            Join hundreds of IIIT RK Valley students already using Campus Market to buy and sell within the campus community
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-white text-campus-primary hover:bg-gray-100">
                Create an Account
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
