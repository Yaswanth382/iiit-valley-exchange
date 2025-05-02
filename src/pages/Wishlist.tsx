
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Trash2, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type WishlistItem = {
  id: string;
  product_id: string;
  product: {
    id: string;
    title: string;
    price: number;
    category: string;
    condition: string;
    is_negotiable: boolean;
    created_at: string;
    images: { image_url: string }[];
    seller: {
      full_name: string | null;
      phone_number: string | null;
    } | null;
  };
};

const Wishlist = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  
  // Fetch wishlist items
  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ['wishlist', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      // First get the wishlist items
      const { data: wishlistData, error: wishlistError } = await supabase
        .from('wishlists')
        .select(`
          id,
          product_id
        `)
        .eq('user_id', user.id);
        
      if (wishlistError) {
        console.error("Error fetching wishlist:", wishlistError);
        return [];
      }
      
      if (!wishlistData.length) return [];
      
      // Get product details for each wishlist item
      const productIds = wishlistData.map(item => item.product_id);
      
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          id,
          title,
          price,
          category,
          condition,
          is_negotiable,
          created_at,
          user_id
        `)
        .in('id', productIds);
      
      if (productsError) {
        console.error("Error fetching products:", productsError);
        return [];
      }
      
      // Get images for each product
      const { data: imagesData, error: imagesError } = await supabase
        .from('product_images')
        .select('product_id, image_url')
        .in('product_id', productIds);
        
      if (imagesError) {
        console.error("Error fetching product images:", imagesError);
        return [];
      }
      
      // Group images by product
      const imagesByProduct: Record<string, { image_url: string }[]> = {};
      imagesData.forEach(img => {
        if (!imagesByProduct[img.product_id]) {
          imagesByProduct[img.product_id] = [];
        }
        imagesByProduct[img.product_id].push({ image_url: img.image_url });
      });
      
      // Get seller details for each product
      const sellerIds = [...new Set(productsData.map(product => product.user_id))];
      
      const { data: sellersData, error: sellersError } = await supabase
        .from('profiles')
        .select('id, full_name, phone_number')
        .in('id', sellerIds);
        
      if (sellersError) {
        console.error("Error fetching sellers:", sellersError);
        return [];
      }
      
      // Map seller data by id
      const sellerById: Record<string, { full_name: string | null, phone_number: string | null }> = {};
      sellersData.forEach(seller => {
        sellerById[seller.id] = {
          full_name: seller.full_name,
          phone_number: seller.phone_number
        };
      });
      
      // Combine all data
      return wishlistData.map(item => {
        const product = productsData.find(p => p.id === item.product_id);
        if (!product) return null;
        
        return {
          id: item.id,
          product_id: item.product_id,
          product: {
            ...product,
            images: imagesByProduct[product.id] || [],
            seller: sellerById[product.user_id] || null
          }
        };
      }).filter(Boolean) as WishlistItem[];
    },
    enabled: isAuthenticated
  });
  
  // Remove from wishlist mutation
  const removeFromWishlist = useMutation({
    mutationFn: async (wishlistItemId: string) => {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('id', wishlistItemId);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist-count'] });
      toast.success("Item removed from wishlist");
    },
    onError: (error) => {
      toast.error("Failed to remove item from wishlist");
      console.error("Error removing from wishlist:", error);
    }
  });

  // Filter wishlist items based on search term
  const filteredItems = wishlistItems.filter(item => 
    item.product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate WhatsApp link for contacting seller
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
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Heart className="h-6 w-6 text-campus-primary" />
                My Wishlist
              </h1>
              <p className="mt-1 text-gray-500">
                Items you've saved for later
              </p>
            </div>
            
            <div className="w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search wishlist..."
                  className="pl-10 w-full md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Wishlist Content */}
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-campus-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your wishlist...</p>
            </div>
          ) : wishlistItems.length === 0 ? (
            <Card className="text-center p-12">
              <CardHeader>
                <CardTitle>Your Wishlist is Empty</CardTitle>
                <CardDescription>
                  You haven't added any items to your wishlist yet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/products">
                  <Button className="bg-campus-primary hover:bg-campus-dark">
                    Browse Products
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : filteredItems.length === 0 ? (
            <Card className="text-center p-12">
              <CardHeader>
                <CardTitle>No Matching Items</CardTitle>
                <CardDescription>
                  No items match your search criteria.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setSearchTerm("")}
                  className="bg-campus-primary hover:bg-campus-dark"
                >
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="group">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md h-full flex flex-col">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={item.product.images[0]?.image_url || "/placeholder.svg"}
                        alt={item.product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-campus-primary text-white hover:bg-campus-dark">
                          {item.product.condition}
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8 rounded-full bg-white hover:bg-red-50"
                          onClick={() => removeFromWishlist.mutate(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                        {item.product.title}
                      </h3>
                      <div className="flex items-center mt-1 mb-2">
                        <Badge variant="outline" className="text-xs mr-2">
                          {item.product.category}
                        </Badge>
                        {item.product.is_negotiable && (
                          <Badge variant="outline" className="text-xs">
                            Negotiable
                          </Badge>
                        )}
                      </div>
                      <div className="mt-auto flex justify-between items-center">
                        <span className="text-lg font-bold text-campus-primary">
                          ₹{item.product.price}
                        </span>
                        <span className="text-sm text-gray-500">
                          {item.product.seller?.full_name || "Unknown"}
                        </span>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Link to={`/product/${item.product.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">View Details</Button>
                        </Link>
                        <a 
                          href={getWhatsappLink(item.product.seller?.phone_number || null, item.product.title)} 
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
