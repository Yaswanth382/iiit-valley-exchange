import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

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

// Sample product data (would come from API in a real app)
const sampleListingData = {
  id: 5,
  title: "Operating Systems Concepts Book",
  description: "Used for CS3510 Operating Systems course. Excellent condition with minor highlighting in the first few chapters. Selling because I've completed the course. Includes all the exercise solutions as a bonus PDF.",
  price: 600,
  category: "Books",
  condition: "Good",
  images: [
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1536",
    "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=1536",
  ],
  isNegotiable: true,
  pickupLocation: "Boys Hostel Block C, Room 304",
};

const EditListing = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingListing, setIsDeletingListing] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
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
      category: "",
      condition: "",
      isNegotiable: false,
      pickupLocation: "",
    },
  });

  useEffect(() => {
    // In a real app, fetch product details based on ID
    // For now, simulate an API call with sample data
    setTimeout(() => {
      const product = sampleListingData; // This would be from an API
      
      form.reset({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        condition: product.condition,
        isNegotiable: product.isNegotiable,
        pickupLocation: product.pickupLocation || "",
      });
      
      setImageUrls(product.images);
      setIsLoading(false);
    }, 800);
  }, [form, id]);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Check if adding new files exceeds the 5 image limit
    if (imageUrls.length + newImageUrls.length + files.length > 5) {
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
  const removeExistingImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove new image
  const removeNewImage = (index: number) => {
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(newImageUrls[index]);
    
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof editListingSchema>) => {
    // Validate that at least one image is present
    if (imageUrls.length + newImageUrls.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you would upload new images to a server and get URLs back
      // Then update the listing with those URLs along with existing ones
      
      // For now, simulate a successful update
      setTimeout(() => {
        toast.success("Product listing updated successfully!");
        navigate(`/product/${id}`);
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      console.error("Error updating listing:", error);
      toast.error("Failed to update listing. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Handle listing deletion
  const handleDeleteListing = async () => {
    setIsDeletingListing(true);
    
    try {
      // In a real app, you would call an API to delete the listing
      
      // For now, simulate a successful deletion
      setTimeout(() => {
        toast.success("Product listing deleted successfully!");
        navigate("/products");
        setIsDeletingListing(false);
        setIsDeleteDialogOpen(false);
      }, 1500);
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast.error("Failed to delete listing. Please try again.");
      setIsDeletingListing(false);
    }
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
                      disabled={isDeletingListing}
                    >
                      {isDeletingListing ? "Deleting..." : "Delete Listing"}
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
                    {imageUrls.length > 0 && (
                      <div className="space-y-4">
                        <div>
                          <FormLabel>Current Images</FormLabel>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                          {imageUrls.map((url, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={url}
                                alt={`Product preview ${index + 1}`}
                                className="h-24 w-24 object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => removeExistingImage(index)}
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
                    {imageUrls.length + newImageUrls.length < 5 && (
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
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update Listing"}
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
