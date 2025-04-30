
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
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
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Form schema for validation
const editListingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string({ required_error: "Please select a category" }),
  price: z.coerce.number().positive("Price must be positive"),
  condition: z.string({ required_error: "Please select a condition" }),
  pickupLocation: z.string().optional(),
  isNegotiable: z.boolean().default(false),
});

// Category options
const categories = [
  "Books",
  "Electronics",
  "Clothing",
  "Furniture",
  "Stationery",
  "Sports",
  "Others",
];

// Condition options
const conditions = ["New", "Like New", "Good", "Used", "Fair"];

type ProductImage = {
  id: string;
  image_url: string;
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
  product_images: ProductImage[];
};

const EditListing = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImageUrls, setNewImageUrls] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Initialize form
  const form = useForm<z.infer<typeof editListingSchema>>({
    resolver: zodResolver(editListingSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      isNegotiable: false,
      pickupLocation: "",
    },
  });

  // Fetch product data
  const { data: product, isLoading } = useQuery({
    queryKey: ["edit-product", id],
    queryFn: async () => {
      if (!id) throw new Error("Product ID is required");

      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_images (*)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Product;
    },
    enabled: !!id,
  });

  // Set form values from fetched data when product data is available
  useEffect(() => {
    if (product) {
      form.reset({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        condition: product.condition,
        isNegotiable: product.is_negotiable,
        pickupLocation: product.pickup_location || "",
      });

      // Set existing images
      setExistingImages(product.product_images || []);
    }
  }, [product, form]);

  // Check user is the owner
  useEffect(() => {
    if (product && user && product.user_id !== user.id) {
      toast.error("You don't have permission to edit this listing");
      navigate(`/product/${id}`);
    }
  }, [product, user, id, navigate]);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Calculate total images after upload
    const totalImagesCount = existingImages.length - imagesToDelete.length + newImages.length + files.length;

    // Check if adding new files exceeds the 5 image limit
    if (totalImagesCount > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    // Check each file's size (5MB limit)
    const validFiles: File[] = [];
    const validUrls: string[] = [];

    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 5MB limit`);
        return;
      }
      
      validFiles.push(file);
      validUrls.push(URL.createObjectURL(file));
    });

    setNewImages((prev) => [...prev, ...validFiles]);
    setNewImageUrls((prev) => [...prev, ...validUrls]);
  };

  // Remove existing image
  const removeExistingImage = (image: ProductImage) => {
    setImagesToDelete((prev) => [...prev, image.id]);
  };

  // Remove new image
  const removeNewImage = (index: number) => {
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(newImageUrls[index]);
    
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Update product mutation
  const updateMutation = useMutation({
    mutationFn: async (values: z.infer<typeof editListingSchema>) => {
      if (!id || !user) return;

      // Validate that the product will have at least one image after updates
      const totalImagesAfterUpdate = existingImages.length - imagesToDelete.length + newImages.length;
      if (totalImagesAfterUpdate === 0) {
        throw new Error("Please upload at least one image");
      }

      // 1. Update product data
      const { error: updateError } = await supabase
        .from('products')
        .update({
          title: values.title,
          description: values.description,
          price: values.price,
          category: values.category,
          condition: values.condition,
          is_negotiable: values.isNegotiable,
          pickup_location: values.pickupLocation || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      // 2. Delete images marked for deletion
      for (const imageId of imagesToDelete) {
        const { error: deleteError } = await supabase
          .from('product_images')
          .delete()
          .eq('id', imageId);
        
        if (deleteError) throw deleteError;
      }

      // 3. Upload new images
      for (const image of newImages) {
        const filePath = `products/${id}/${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
        
        // Upload file to storage
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, image);
        
        if (uploadError) throw uploadError;
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
        
        // Create product_images record
        const { error: imageError } = await supabase
          .from('product_images')
          .insert({
            product_id: id,
            image_url: urlData.publicUrl
          });
        
        if (imageError) throw imageError;
      }
    },
    onSuccess: () => {
      toast.success("Product listing updated successfully!");
      navigate(`/product/${id}`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update listing");
    },
  });

  // Delete product mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!id || !user) return;

      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Product listing deleted successfully!");
      navigate("/products");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete listing");
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof editListingSchema>) => {
    updateMutation.mutate(values);
  };

  // Handle product deletion
  const handleDeleteListing = () => {
    deleteMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-campus-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading listing details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Edit Listing</h1>
              <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Listing</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      listing from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteListing}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? "Deleting..." : "Delete Listing"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title field */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Title</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g. Data Structures Textbook" {...field} />
                          </FormControl>
                          <FormDescription>
                            A clear, descriptive title will attract more buyers
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description field */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your product in detail including any defects or special features..." 
                              className="h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Be honest about the condition and include all relevant details
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Category field */}
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Price field */}
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price (₹)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Condition field */}
                    <FormField
                      control={form.control}
                      name="condition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Condition</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {conditions.map((condition) => (
                                <SelectItem key={condition} value={condition}>
                                  {condition}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Pickup Location field */}
                    <FormField
                      control={form.control}
                      name="pickupLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pickup Location (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g. Hostel Block A, Room 101" {...field} />
                          </FormControl>
                          <FormDescription>
                            Where can buyers pick up this item?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Negotiable checkbox */}
                    <FormField
                      control={form.control}
                      name="isNegotiable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Price is negotiable</FormLabel>
                            <FormDescription>
                              Check this if you're open to offers
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    {/* Existing Images */}
                    {existingImages.length > 0 && (
                      <div className="space-y-4">
                        <div>
                          <FormLabel>Current Images</FormLabel>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                          {existingImages.filter(img => !imagesToDelete.includes(img.id)).map((image) => (
                            <div key={image.id} className="relative group">
                              <img
                                src={image.image_url}
                                alt={`Product preview`}
                                className="h-24 w-24 object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => removeExistingImage(image)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* New Images */}
                    {newImageUrls.length > 0 && (
                      <div className="space-y-4">
                        <div>
                          <FormLabel>New Images</FormLabel>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                          {newImageUrls.map((url, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={url}
                                alt={`New product preview ${index + 1}`}
                                className="h-24 w-24 object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => removeNewImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Upload new images */}
                    {existingImages.length - imagesToDelete.length + newImageUrls.length < 5 && (
                      <div className="mt-2">
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 hover:border-campus-primary transition-colors"
                        >
                          <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                              <span className="relative rounded-md font-medium text-campus-primary hover:text-campus-dark">
                                Upload new images
                              </span>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 5MB
                            </p>
                          </div>
                          <input
                            id="image-upload"
                            name="images"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="sr-only"
                          />
                        </label>
                      </div>
                    )}

                    {/* Submit button */}
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        className="mr-2"
                        onClick={() => navigate(`/product/${id}`)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={updateMutation.isPending}
                      >
                        {updateMutation.isPending ? "Updating..." : "Update Listing"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditListing;
