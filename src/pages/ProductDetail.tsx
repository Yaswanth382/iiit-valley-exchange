
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  MessageSquare, 
  Share, 
  ThumbsDown, 
  ThumbsUp
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Sample product data (would come from API in a real app)
const productDetailsData = {
  id: 5,
  title: "Operating Systems Concepts Book",
  description: "Used for CS3510 Operating Systems course. Excellent condition with minor highlighting in the first few chapters. Selling because I've completed the course. Includes all the exercise solutions as a bonus PDF.",
  price: 600,
  category: "Books",
  condition: "Good",
  images: [
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1536",
    "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=1536",
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1536",
  ],
  seller: {
    id: 101,
    name: "Karthik Reddy",
    rating: 4.8,
    joinedDate: "August 2022",
    image: null, // placeholder for avatar
    department: "Computer Science",
    responseRate: "95%",
  },
  isNegotiable: true,
  pickupLocation: "Boys Hostel Block C, Room 304",
  postedDate: "2025-04-10T10:30:00Z",
  views: 45,
  interested: 3,
};

// Similar products data
const similarProducts = [
  {
    id: 2,
    title: "Data Structures Textbook",
    price: 550,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=1536",
  },
  {
    id: 10,
    title: "Computer Networks Textbook",
    price: 550,
    image: "https://images.unsplash.com/photo-1544391591-51cdca0a6c4e?auto=format&fit=crop&q=80&w=1536",
  },
  {
    id: 15,
    title: "Database Management Systems",
    price: 500,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1536",
  },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInterestedLoading, setIsInterestedLoading] = useState(false);
  const [isMessageLoading, setIsMessageLoading] = useState(false);

  // In a real app, fetch product details based on the ID
  const product = productDetailsData; // This would be from an API

  // Format date
  const formattedDate = new Date(product.postedDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Handle marking interest
  const handleMarkInterested = () => {
    setIsInterestedLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("You have shown interest in this product");
      setIsInterestedLoading(false);
    }, 1000);
  };

  // Handle messaging seller
  const handleMessageSeller = () => {
    setIsMessageLoading(true);
    // Simulate API call or navigation to chat
    setTimeout(() => {
      toast.success("Message request sent to seller");
      setIsMessageLoading(false);
    }, 1000);
  };

  // Handle sharing product
  const handleShare = () => {
    // In a real app, this would open a share dialog or copy link to clipboard
    toast.success("Link copied to clipboard!");
  };

  // Handle adding to wishlist
  const handleAddToWishlist = () => {
    toast.success("Added to wishlist");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container py-8 px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="mb-6 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to listings
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product images */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {product.images.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="flex aspect-[4/3] items-center justify-center p-1">
                            <img
                              src={image}
                              alt={`${product.title} - image ${index + 1}`}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                  </Carousel>
                </div>

                {/* Thumbnail navigation */}
                <div className="flex justify-center p-4 gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? "border-campus-primary"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product description */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
                
                <Separator className="my-6" />
                
                {/* Product details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                    <p className="text-gray-900">{product.category}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Condition</h3>
                    <p className="text-gray-900">{product.condition}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Pickup Location</h3>
                    <p className="text-gray-900">{product.pickupLocation}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Posted Date</h3>
                    <p className="text-gray-900">{formattedDate}</p>
                  </div>
                </div>
              </div>

              {/* Similar products */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Similar Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similarProducts.map((product) => (
                    <div
                      key={product.id}
                      className="rounded-md overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="text-campus-primary font-bold mt-1">
                          ₹{product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar with price, seller info, actions */}
            <div className="space-y-6">
              {/* Price and actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-bold text-gray-900 line-clamp-2">
                    {product.title}
                  </h1>
                </div>
                
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold text-campus-primary">
                    ₹{product.price}
                  </span>
                  {product.isNegotiable && (
                    <Badge variant="outline" className="ml-2">
                      Negotiable
                    </Badge>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <Button
                    onClick={handleMarkInterested}
                    className="w-full"
                    disabled={isInterestedLoading}
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    {isInterestedLoading ? "Processing..." : "I'm Interested"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleMessageSeller}
                    className="w-full"
                    disabled={isMessageLoading}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {isMessageLoading ? "Sending..." : "Message Seller"}
                  </Button>
                  <div className="flex gap-4 mt-2">
                    <Button
                      variant="ghost"
                      onClick={handleAddToWishlist}
                      className="flex-1"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleShare}
                      className="flex-1"
                    >
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{product.views} views</span>
                  <span>{product.interested} interested</span>
                </div>
              </div>

              {/* Seller information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Seller Information
                </h2>
                <div className="flex items-center">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="flex items-center cursor-pointer">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={product.seller.image || ""} alt={product.seller.name} />
                          <AvatarFallback>{product.seller.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{product.seller.name}</p>
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-xs ${
                                    i < Math.floor(product.seller.rating)
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="ml-1 text-xs text-gray-500">
                              ({product.seller.rating})
                            </span>
                          </div>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <Avatar>
                          <AvatarImage src={product.seller.image || ""} />
                          <AvatarFallback>{product.seller.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">{product.seller.name}</h4>
                          <p className="text-xs text-gray-500">
                            {product.seller.department}
                          </p>
                          <div className="flex items-center pt-1">
                            <span className="text-xs text-gray-500 mr-2">
                              Member since {product.seller.joinedDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Response rate:</span>
                          <p>{product.seller.responseRate}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Rating:</span>
                          <div className="flex items-center">
                            <span className="text-yellow-400 mr-1">★</span>
                            <p>{product.seller.rating}/5</p>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                
                <Separator className="my-4" />
                
                <Button variant="outline" onClick={handleMessageSeller} className="w-full">
                  Contact Seller
                </Button>
              </div>

              {/* Safety tips */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Safety Tips
                </h2>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Meet in a public place on campus
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Inspect the item before paying
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Never share personal financial information
                  </li>
                </ul>
                <Button 
                  variant="link" 
                  className="mt-2 p-0 h-auto text-campus-primary" 
                  onClick={() => navigate("/help")}
                >
                  View all safety guidelines
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
