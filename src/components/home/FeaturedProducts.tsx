
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart } from "lucide-react";

// Sample product data
const products = [
  {
    id: 1,
    title: "Data Structures and Algorithms Textbook",
    price: 850,
    category: "Books",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=1536",
    seller: "Amit Kumar",
    isNegotiable: true,
  },
  {
    id: 2,
    title: "TI-84 Plus Graphing Calculator",
    price: 1200,
    category: "Electronics",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1574492543172-b7be99fd7ba1?auto=format&fit=crop&q=80&w=1536",
    seller: "Priya Singh",
    isNegotiable: false,
  },
  {
    id: 3,
    title: "IIIT-RKV Branded Hoodie - Large",
    price: 450,
    category: "Clothing",
    condition: "New",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1536",
    seller: "Rahul Mishra",
    isNegotiable: true,
  },
  {
    id: 4,
    title: "Logitech G402 Gaming Mouse",
    price: 950,
    category: "Electronics",
    condition: "Used",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=1536",
    seller: "Sneha Patel",
    isNegotiable: false,
  },
  {
    id: 5,
    title: "Operating Systems Concepts Book",
    price: 600,
    category: "Books",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1536",
    seller: "Karthik Reddy",
    isNegotiable: true,
  },
  {
    id: 6,
    title: "Wooden Study Table",
    price: 1800,
    category: "Furniture",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=1536",
    seller: "Ananya Gupta",
    isNegotiable: true,
  },
  {
    id: 7,
    title: "Scientific Calculator - Casio FX-991ES",
    price: 750,
    category: "Electronics",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1587142369400-ce359326c2d5?auto=format&fit=crop&q=80&w=1536",
    seller: "Vikram Singh",
    isNegotiable: false,
  },
  {
    id: 8,
    title: "Complete Set of Programming Reference Books",
    price: 1500,
    category: "Books",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1536",
    seller: "Meera Kapoor",
    isNegotiable: true,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-16">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Featured Products</h2>
            <p className="text-lg text-gray-600">
              Check out the latest items from fellow students
            </p>
          </div>
          <Link 
            to="/products" 
            className="mt-4 md:mt-0 text-campus-primary hover:text-campus-dark font-semibold flex items-center"
          >
            View All Products
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg group">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <button className="h-8 w-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="h-8 w-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                      <Eye className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-campus-primary text-white hover:bg-campus-dark">
                      {product.condition}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 line-clamp-2 h-12">
                    {product.title}
                  </h3>
                  <div className="mt-2 flex items-center">
                    <Badge variant="outline" className="text-xs mr-2">
                      {product.category}
                    </Badge>
                    {product.isNegotiable && (
                      <Badge variant="outline" className="text-xs">
                        Negotiable
                      </Badge>
                    )}
                  </div>
                  <p className="mt-2 text-lg font-bold text-campus-primary">
                    ₹{product.price}
                  </p>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    By {product.seller}
                  </span>
                  <span className="text-xs text-gray-400">
                    Posted 2 days ago
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
