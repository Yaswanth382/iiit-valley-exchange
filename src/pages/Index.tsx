
import HeroCarousel from "@/components/home/HeroCarousel";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const heroImages = [
  {
    url: "https://ik.imagekit.io/btzamftjv/IMG-20250426-WA0011.jpg?updatedAt=1746199321087",
    alt: "Campus Market Highlight 1"
  },
  {
    url: "https://ik.imagekit.io/btzamftjv/IMG-20250426-WA0010.jpg?updatedAt=1746199401187",
    alt: "Campus Market Highlight 2"
  },
  {
    url: "https://ik.imagekit.io/btzamftjv/IMG-20250426-WA0009.jpg?updatedAt=1746199494571",
    alt: "Campus Market Highlight 3"
  },
  {
    url: "https://ik.imagekit.io/btzamftjv/IMG-20250426-WA0007.jpg",
    alt: "Campus Market Highlight 4"
  }
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroCarousel images={heroImages} />
        <CategorySection />
        <FeaturedProducts />
        <HowItWorks />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
