
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search, Filter, Grid3X3, List, Heart, HeartOff } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Define the type for a product
type ProductProfile = {
  full_name: string | null;
  phone_number: string | null;
};

type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  images: { image_url: string }[];
  seller: ProductProfile | null;
  is_negotiable: boolean;
  created_at: string;
  is_in_wishlist?: boolean;
};

const categories = [
  "All Categories",
  "Books",
  "Electronics",
  "Clothing",
  "Furniture",
  "Stationery",
  "Sports",
  "Others",
];

const conditions = ["New", "Like New", "Good", "Used", "Fair"];

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const { user, isAuthenticated } = useAuth();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All Categories");
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [showNegotiableOnly, setShowNegotiableOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Fetch wishlist items for the current user
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchWishlistItems();
    }
  }, [isAuthenticated, user]);

  const fetchWishlistItems = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('wishlists')
      .select('product_id')
      .eq('user_id', user.id);
      
    if (error) {
      console.error("Error fetching wishlist:", error);
      return;
    }
    
    if (data) {
      setWishlistIds(data.map(item => item.product_id));
    }
  };

  // Fetch products from Supabase
  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data: productsData, error } = await supabase
        .from('products')
        .select(`
          id,
          title,
          price,
          category,
          condition,
          is_negotiable,
          created_at,
          user_id,
          product_images (image_url),
          profiles:user_id (
            full_name,
            phone_number
          )
        `)
        .filter('sold', 'eq', false)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Transform the data to match our Product type
      return productsData.map(product => {
        // Safely handle the profiles data
        const seller: ProductProfile | null = product.profiles ? {
          full_name: product.profiles.full_name || null,
          phone_number: product.profiles.phone_number || null
        } : null;

        return {
          ...product,
          seller,
          images: product.product_images,
          is_in_wishlist: wishlistIds.includes(product.id)
        };
      });
    },
    enabled: true
  });

  // Handle toggling wishlist/like status
  const toggleWishlist = async (productId: string) => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to your wishlist");
      return;
    }

    const isInWishlist = wishlistIds.includes(productId);
    
    if (isInWishlist) {
      // Remove from wishlist
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user?.id)
        .eq('product_id', productId);
        
      if (error) {
        toast.error("Failed to remove from wishlist");
        return;
      }
      
      setWishlistIds(prev => prev.filter(id => id !== productId));
      toast.success("Removed from wishlist");
    } else {
      // Add to wishlist
      const { error } = await supabase
        .from('wishlists')
        .insert({
          user_id: user?.id,
          product_id: productId
        });
        
      if (error) {
        toast.error("Failed to add to wishlist");
        return;
      }
      
      setWishlistIds(prev => [...prev, productId]);
      toast.success("Added to wishlist");
    }
    
    refetch();
  };

  // Filter products based on all criteria
  const filteredProducts = products.filter((product) => {
    // Search term filter
    if (
      searchTerm &&
      !product.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Category filter
    if (
      selectedCategory !== "All Categories" &&
      product.category !== selectedCategory
    ) {
      return false;
    }

    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Condition filter
    if (
      selectedConditions.length > 0 &&
      !selectedConditions.includes(product.condition)
    ) {
      return false;
    }

    // Negotiable filter
    if (showNegotiableOnly && !product.is_negotiable) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "newest":
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const handleConditionToggle = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const getWhatsappLink = (phoneNumber: string | null, productTitle: string) => {
    if (!phoneNumber) return "#";
    
    const message = `Hello, I'm interested in your listing: ${productTitle} on IIIT RKV Campus Market.`;
    const encodedMessage = encodeURIComponent(message);
    
    // Format phone number to remove spaces and ensure it has international format
    const formattedNumber = phoneNumber.startsWith('+') 
      ? phoneNumber.replace(/\s+/g, '') 
      : '+91' + phoneNumber.replace(/\s+/g, '');
      
    return `https://wa.me/${formattedNumber.replace('+', '')}?text=${encodedMessage}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container py-8 px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="flex justify-between items-center pb-6 border-b border-gray-200">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="mt-1 text-gray-500">
                Browse products available for sale on Campus Market
              </p>
            </div>
            <Link to={isAuthenticated ? "/create-listing" : "/login"}>
              <Button className="bg-campus-primary hover:bg-campus-dark gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Sell an Item</span>
              </Button>
            </Link>
          </div>

          {/* Search and filter bar */}
          <div className="flex flex-col lg:flex-row justify-between items-center py-4 gap-4">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto">
              <Button
                variant="outline"
                className="w-full lg:w-auto"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="h-10 rounded-none rounded-l-md"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="h-10 rounded-none rounded-r-md"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters sidebar */}
            <div
              className={`${
                mobileFiltersOpen ? "block" : "hidden"
              } lg:block col-span-1 space-y-6 bg-white p-6 rounded-lg shadow-sm`}
            >
              <div>
                <h3 className="font-semibold text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className="flex items-center"
                    >
                      <input
                        type="radio"
                        id={category}
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="mr-2"
                      />
                      <label htmlFor={category} className="text-sm">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[0, 15000]}
                    max={15000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                  <div className="flex justify-between text-sm">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Condition</h3>
                <div className="space-y-2">
                  {conditions.map((condition) => (
                    <div
                      key={condition}
                      className="flex items-center"
                    >
                      <Checkbox
                        id={`condition-${condition}`}
                        checked={selectedConditions.includes(condition)}
                        onCheckedChange={() => handleConditionToggle(condition)}
                        className="mr-2"
                      />
                      <label htmlFor={`condition-${condition}`} className="text-sm">
                        {condition}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center">
                  <Checkbox
                    id="negotiable"
                    checked={showNegotiableOnly}
                    onCheckedChange={(checked) => 
                      setShowNegotiableOnly(checked === true)
                    }
                    className="mr-2"
                  />
                  <label htmlFor="negotiable" className="text-sm">
                    Negotiable Only
                  </label>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => {
                  setSelectedCategory("All Categories");
                  setPriceRange([0, 15000]);
                  setSelectedConditions([]);
                  setShowNegotiableOnly(false);
                  setSearchTerm("");
                }}
              >
                Reset Filters
              </Button>
            </div>

            {/* Product grid/list */}
            <div className="col-span-1 lg:col-span-3">
              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  Showing {sortedProducts.length} results
                </p>
              </div>
              
              {isLoading ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-campus-primary mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <h3 className="text-lg font-semibold mb-2">No products found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group"
                    >
                      <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md h-full flex flex-col">
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={product.images[0]?.image_url || "/placeholder.svg"}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-campus-primary text-white hover:bg-campus-dark">
                              {product.condition}
                            </Badge>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="h-8 w-8 rounded-full bg-white hover:bg-gray-100"
                              onClick={(e) => {
                                e.preventDefault();
                                toggleWishlist(product.id);
                              }}
                            >
                              {wishlistIds.includes(product.id) ? (
                                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                              ) : (
                                <Heart className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                            {product.title}
                          </h3>
                          <div className="flex items-center mt-1 mb-2">
                            <Badge variant="outline" className="text-xs mr-2">
                              {product.category}
                            </Badge>
                            {product.is_negotiable && (
                              <Badge variant="outline" className="text-xs">
                                Negotiable
                              </Badge>
                            )}
                          </div>
                          <div className="mt-auto flex justify-between items-center">
                            <span className="text-lg font-bold text-campus-primary">
                              ₹{product.price}
                            </span>
                            <span className="text-sm text-gray-500">
                              {product.seller?.full_name || "Unknown"}
                            </span>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <Link to={`/product/${product.id}`} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full">View Details</Button>
                            </Link>
                            <a 
                              href={getWhatsappLink(product.seller?.phone_number, product.title)} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex-1"
                            >
                              <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">Contact Seller</Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group"
                    >
                      <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
                        <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-1/4 aspect-square relative overflow-hidden">
                            <img
                              src={product.images[0]?.image_url || "/placeholder.svg"}
                              alt={product.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-campus-primary text-white hover:bg-campus-dark">
                                {product.condition}
                              </Badge>
                            </div>
                            <div className="absolute top-2 right-2">
                              <Button 
                                variant="outline" 
                                size="icon"
                                className="h-8 w-8 rounded-full bg-white hover:bg-gray-100"
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleWishlist(product.id);
                                }}
                              >
                                {wishlistIds.includes(product.id) ? (
                                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                                ) : (
                                  <Heart className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                          <div className="p-4 sm:p-6 w-full sm:w-3/4 flex flex-col justify-between">
                            <div>
                              <h3 className="font-medium text-lg text-gray-900 mb-2">
                                {product.title}
                              </h3>
                              <div className="flex items-center mb-4">
                                <Badge variant="outline" className="text-xs mr-2">
                                  {product.category}
                                </Badge>
                                {product.is_negotiable && (
                                  <Badge variant="outline" className="text-xs">
                                    Negotiable
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-xl font-bold text-campus-primary">
                                ₹{product.price}
                              </span>
                              <div className="flex flex-col items-end">
                                <span className="text-sm text-gray-500">
                                  Seller: {product.seller?.full_name || "Unknown"}
                                </span>
                                <span className="text-xs text-gray-400">
                                  Posted {new Date(product.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Link to={`/product/${product.id}`} className="flex-1 sm:flex-none">
                                <Button variant="outline" size="sm" className="w-full sm:w-auto">View Details</Button>
                              </Link>
                              <a 
                                href={getWhatsappLink(product.seller?.phone_number, product.title)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex-1 sm:flex-none"
                              >
                                <Button size="sm" className="w-full sm:w-auto bg-green-600 hover:bg-green-700">Contact Seller</Button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
