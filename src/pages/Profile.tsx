import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Heart, Edit } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type UserProfile = {
  id: string;
  full_name: string | null;
  phone_number: string | null;
  hostel_details: string | null;
  student_id: string | null;
};

type UserListing = {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  is_negotiable: boolean;
  sold: boolean;
  created_at: string;
  images: { image_url: string }[];
};

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("listings");
  
  // Get user profile data
  const { data: profile } = useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
      
      return data as UserProfile;
    },
    enabled: isAuthenticated
  });
  
  // Get user's listings
  const { data: listings = [] } = useQuery({
    queryKey: ['user-listings', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          title,
          price,
          category,
          condition,
          is_negotiable,
          sold,
          created_at,
          product_images (image_url)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching listings:", error);
        return [];
      }
      
      return data.map(listing => ({
        ...listing,
        images: listing.product_images
      })) as UserListing[];
    },
    enabled: isAuthenticated
  });
  
  // Get user's liked items (wishlist)
  const { data: wishlistItems = [] } = useQuery({
    queryKey: ['user-wishlist', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('wishlists')
        .select(`
          id,
          products (
            id,
            title,
            price,
            category,
            condition,
            is_negotiable,
            sold,
            created_at,
            product_images (image_url)
          )
        `)
        .eq('user_id', user.id);
        
      if (error) {
        console.error("Error fetching wishlist:", error);
        return [];
      }
      
      return data
        .filter(item => item.products) // Filter out null products
        .map(item => ({
          ...item.products,
          images: item.products?.product_images || []
        })) as UserListing[];
    },
    enabled: isAuthenticated
  });

  // Generate user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.user_metadata || !user.user_metadata.full_name) {
      return "U";
    }
    const fullName = user.user_metadata.full_name;
    const nameParts = fullName.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return fullName[0].toUpperCase();
  };

  const activeListings = listings.filter(listing => !listing.sold);
  const soldListings = listings.filter(listing => listing.sold);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24 border-2 border-campus-primary">
                <AvatarImage 
                  src={user?.user_metadata?.avatar_url || ""} 
                  alt={user?.user_metadata?.full_name || "User"} 
                />
                <AvatarFallback className="bg-campus-primary text-white text-2xl">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-grow text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile?.full_name || user?.user_metadata?.full_name || "User"}
                </h1>
                <p className="text-gray-500">{user?.email}</p>
                
                {profile && (
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    {profile.phone_number && (
                      <p className="flex justify-center md:justify-start items-center gap-1">
                        <span className="font-medium">Phone:</span> {profile.phone_number}
                      </p>
                    )}
                    {profile.student_id && (
                      <p className="flex justify-center md:justify-start items-center gap-1">
                        <span className="font-medium">Student ID:</span> {profile.student_id}
                      </p>
                    )}
                    {profile.hostel_details && (
                      <p className="flex justify-center md:justify-start items-center gap-1">
                        <span className="font-medium">Hostel:</span> {profile.hostel_details}
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-2">
                <Link to="/edit-profile">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
                <Link to="/create-listing">
                  <Button className="w-full flex items-center gap-2 bg-campus-primary hover:bg-campus-dark">
                    <PlusCircle className="h-4 w-4" />
                    Create Listing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Profile Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-4 mb-6">
              <TabsTrigger value="listings" className="flex items-center gap-2">
                Active Listings
                <Badge variant="secondary">{activeListings.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="sold" className="flex items-center gap-2">
                Sold Items
                <Badge variant="secondary">{soldListings.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2">
                Wishlist
                <Badge variant="secondary">{wishlistItems.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Active Listings */}
            <TabsContent value="listings" className="mt-0">
              {activeListings.length === 0 ? (
                <Card className="text-center p-12">
                  <CardHeader>
                    <CardTitle>No Active Listings</CardTitle>
                    <CardDescription>
                      You haven't created any listings yet.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to="/create-listing">
                      <Button className="bg-campus-primary hover:bg-campus-dark">
                        Create Your First Listing
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeListings.map((listing) => (
                    <Link to={`/product/${listing.id}`} key={listing.id} className="group">
                      <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md h-full flex flex-col">
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={listing.images[0]?.image_url || "/placeholder.svg"}
                            alt={listing.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-campus-primary text-white hover:bg-campus-dark">
                              {listing.condition}
                            </Badge>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/edit-listing/${listing.id}`} onClick={(e) => e.stopPropagation()}>
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Link>
                            </Button>
                          </div>
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                            {listing.title}
                          </h3>
                          <div className="flex items-center mt-1 mb-2">
                            <Badge variant="outline" className="text-xs mr-2">
                              {listing.category}
                            </Badge>
                            {listing.is_negotiable && (
                              <Badge variant="outline" className="text-xs">
                                Negotiable
                              </Badge>
                            )}
                          </div>
                          <div className="mt-auto flex justify-between items-center">
                            <span className="text-lg font-bold text-campus-primary">
                              ₹{listing.price}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(listing.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>
            
            {/* Sold Items */}
            <TabsContent value="sold" className="mt-0">
              {soldListings.length === 0 ? (
                <Card className="text-center p-12">
                  <CardHeader>
                    <CardTitle>No Sold Items</CardTitle>
                    <CardDescription>
                      You haven't sold any items yet.
                    </CardDescription>
                  </CardHeader>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {soldListings.map((listing) => (
                    <Link to={`/product/${listing.id}`} key={listing.id} className="group">
                      <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md h-full flex flex-col opacity-75">
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={listing.images[0]?.image_url || "/placeholder.svg"}
                            alt={listing.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-green-600 text-white">
                              Sold
                            </Badge>
                          </div>
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                            {listing.title}
                          </h3>
                          <div className="flex items-center mt-1 mb-2">
                            <Badge variant="outline" className="text-xs mr-2">
                              {listing.category}
                            </Badge>
                          </div>
                          <div className="mt-auto flex justify-between items-center">
                            <span className="text-lg font-bold text-campus-primary">
                              ₹{listing.price}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(listing.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>
            
            {/* Wishlist */}
            <TabsContent value="wishlist" className="mt-0">
              {wishlistItems.length === 0 ? (
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
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <Link to={`/product/${item.id}`} key={item.id} className="group">
                      <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md h-full flex flex-col">
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={item.images[0]?.image_url || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-campus-primary text-white hover:bg-campus-dark">
                              {item.condition}
                            </Badge>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="h-8 w-8 rounded-full bg-white hover:bg-red-50"
                            >
                              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                            {item.title}
                          </h3>
                          <div className="flex items-center mt-1 mb-2">
                            <Badge variant="outline" className="text-xs mr-2">
                              {item.category}
                            </Badge>
                            {item.is_negotiable && (
                              <Badge variant="outline" className="text-xs">
                                Negotiable
                              </Badge>
                            )}
                          </div>
                          <div className="mt-auto flex justify-between items-center">
                            <span className="text-lg font-bold text-campus-primary">
                              ₹{item.price}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(item.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>
            
            {/* Settings */}
            <TabsContent value="settings" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    <p className="text-sm text-gray-500">
                      Update your personal information and contact details.
                    </p>
                    <Link to="/edit-profile">
                      <Button variant="outline">Edit Personal Information</Button>
                    </Link>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <p className="text-sm text-gray-500">
                      Update your password to keep your account secure.
                    </p>
                    <Button variant="outline">Change Password</Button>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Notifications</h3>
                    <p className="text-sm text-gray-500">
                      Manage your notification preferences.
                    </p>
                    <Button variant="outline">Manage Notifications</Button>
                  </div>
                  
                  <div className="space-y-2 pt-4 border-t">
                    <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
                    <p className="text-sm text-gray-500">
                      Delete your account and all of your data.
                    </p>
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
