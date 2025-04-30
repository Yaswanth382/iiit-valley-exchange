
import { useState } from "react";
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
import { PlusCircle, Search, Filter, Grid3X3, List } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Sample product data (same as in FeaturedProducts)
const allProducts = [
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
  {
    id: 9,
    title: "Samsung Galaxy S20 - 128GB",
    price: 12000,
    category: "Electronics",
    condition: "Used",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=1536",
    seller: "Nikhil Joshi",
    isNegotiable: true,
  },
  {
    id: 10,
    title: "Computer Networks Textbook",
    price: 550,
    category: "Books",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1544391591-51cdca0a6c4e?auto=format&fit=crop&q=80&w=1536",
    seller: "Divya Sharma",
    isNegotiable: false,
  },
  {
    id: 11,
    title: "Desk Lamp with Adjustable Brightness",
    price: 350,
    category: "Electronics",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1534107414612-5c96a9f6a843?auto=format&fit=crop&q=80&w=1536",
    seller: "Arjun Nair",
    isNegotiable: true,
  },
  {
    id: 12,
    title: "Lab Coat - Size Medium",
    price: 200,
    category: "Clothing",
    condition: "New",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1536",
    seller: "Priya Malhotra",
    isNegotiable: false,
  },
];

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

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All Categories");
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [showNegotiableOnly, setShowNegotiableOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter products based on all criteria
  const filteredProducts = allProducts.filter((product) => {
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
    if (showNegotiableOnly && !product.isNegotiable) {
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
        return b.id - a.id; // Using ID as a proxy for newest
    }
  });

  const handleConditionToggle = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
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
            <Link to="/create-listing">
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
              
              {sortedProducts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <h3 className="text-lg font-semibold mb-2">No products found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="group"
                    >
                      <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md h-full flex flex-col">
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-campus-primary text-white hover:bg-campus-dark">
                              {product.condition}
                            </Badge>
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
                            {product.isNegotiable && (
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
                              {product.seller}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="group"
                    >
                      <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
                        <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-1/4 aspect-square relative overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-campus-primary text-white hover:bg-campus-dark">
                                {product.condition}
                              </Badge>
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
                                {product.isNegotiable && (
                                  <Badge variant="outline" className="text-xs">
                                    Negotiable
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xl font-bold text-campus-primary">
                                ₹{product.price}
                              </span>
                              <div className="flex flex-col items-end">
                                <span className="text-sm text-gray-500">
                                  Seller: {product.seller}
                                </span>
                                <span className="text-xs text-gray-400">
                                  Posted 2 days ago
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
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
