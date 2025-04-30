
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin, Share, Edit, Trash2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type ProductImage = {
  id: string;
  image_url: string;
};

type ProductProfile = {
  id: string;
  full_name: string | null;
  student_id: string | null;
  phone_number: string | null;
  hostel_details: string | null;
};

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  is_negotiable: boolean;
  pickup_location: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  profiles: ProductProfile;
  product_images: ProductImage[];
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const { user } = useAuth();

  // Fetch product data
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          profiles:user_id (*),
          product_images (*)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as unknown as Product;
    },
    enabled: !!id,
  });

  // Delete product mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!product) return;

      // Delete the product (cascade will take care of images)
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Product successfully deleted");
      navigate("/products");
    },
    onError: (error) => {
      toast.error(`Failed to delete product: ${error instanceof Error ? error.message : "Unknown error"}`);
    },
  });

  const handleDelete = async () => {
    deleteMutation.mutate();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-campus-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">
              The product you're looking for might have been removed or doesn't exist.
            </p>
            <Link to="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Check if user is the owner of the product
  const isOwner = user?.id === product.user_id;

  // Format the date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get WhatsApp link
  const getWhatsappLink = () => {
    if (!product.profiles?.phone_number) return "#";
    
    const message = `Hello, I'm interested in your listing: ${product.title} on IIIT RKV Campus Market.`;
    const encodedMessage = encodeURIComponent(message);
    
    // Format phone number to remove spaces and ensure it has international format
    const formattedNumber = product.profiles.phone_number.startsWith('+') 
      ? product.profiles.phone_number.replace(/\s+/g, '') 
      : '+91' + product.profiles.phone_number.replace(/\s+/g, '');
      
    return `https://wa.me/${formattedNumber.replace('+', '')}?text=${encodedMessage}`;
  };

  // Share functionality
  const handleShare = async () => {
    const shareData = {
      title: `${product.title} - Campus Market`,
      text: `Check out this ${product.title} for ₹${product.price} on Campus Market`,
      url: window.location.href,
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  // Manage image carousel
  const handlePrevImage = () => {
    setCurrentImage((prev) => 
      prev === 0 ? product.product_images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => 
      prev === product.product_images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container py-8 px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb navigation */}
          <nav className="flex mb-6 text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link to="/products" className="text-gray-500 hover:text-gray-700">
                  Products
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-campus-primary font-medium truncate">
                {product.title}
              </li>
            </ol>
          </nav>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Product images carousel */}
              <div className="space-y-4">
                {product.product_images && product.product_images.length > 0 ? (
                  <>
                    <Carousel>
                      <CarouselContent>
                        {product.product_images.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="relative aspect-square rounded-md overflow-hidden">
                              <img
                                src={image.image_url}
                                alt={`${product.title} - image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </Carousel>
                    
                    {/* Thumbnails */}
                    {product.product_images.length > 1 && (
                      <div className="flex space-x-2 overflow-x-auto py-2">
                        {product.product_images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImage(index)}
                            className={`rounded-md overflow-hidden border-2 flex-shrink-0 
                              ${currentImage === index ? 'border-campus-primary' : 'border-transparent'}`}
                          >
                            <img
                              src={image.image_url}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-16 h-16 object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="aspect-square rounded-md bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-400">No images available</p>
                  </div>
                )}
              </div>

              {/* Product details */}
              <div className="flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.title}</h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">{product.category}</Badge>
                      <Badge className="bg-campus-primary">{product.condition}</Badge>
                      {product.is_negotiable && <Badge variant="outline">Negotiable</Badge>}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleShare}
                    aria-label="Share"
                  >
                    <Share className="h-5 w-5" />
                  </Button>
                </div>

                <div className="mt-4">
                  <p className="text-3xl font-bold text-campus-primary">₹{product.price}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Listed on {formatDate(product.created_at)}
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-2">Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
                </div>
                
                {product.pickup_location && (
                  <div className="mt-6 flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Pickup Location</h3>
                      <p className="text-gray-700">{product.pickup_location}</p>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-2">Seller Information</h3>
                  <div className="flex items-center">
                    <div className="bg-campus-primary/10 rounded-full p-2 mr-3">
                      <div className="w-10 h-10 rounded-full bg-campus-primary text-white flex items-center justify-center text-lg font-medium">
                        {product.profiles?.full_name?.charAt(0) || "?"}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{product.profiles?.full_name || "Unknown"}</p>
                      {product.profiles?.student_id && (
                        <p className="text-sm text-gray-500">
                          {product.profiles.student_id}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row gap-4">
                  {isOwner ? (
                    <>
                      <Link to={`/edit-listing/${product.id}`} className="flex-1">
                        <Button variant="outline" className="w-full gap-2">
                          <Edit className="h-4 w-4" />
                          Edit Listing
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="w-full gap-2">
                            <Trash2 className="h-4 w-4" />
                            Delete Listing
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              listing and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={handleDelete}
                              className="bg-red-600 text-white hover:bg-red-700"
                            >
                              {deleteMutation.isPending ? "Deleting..." : "Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  ) : (
                    <a 
                      href={getWhatsappLink()} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full bg-green-600 hover:bg-green-700 gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Contact Seller
                      </Button>
                    </a>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <Link to="/products" className="text-campus-primary hover:underline inline-flex items-center">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Products
                  </Link>
                </div>
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
