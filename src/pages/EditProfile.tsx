
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name: "",
    student_id: "",
    phone_number: "",
    hostel_details: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (data) {
          setFormData({
            full_name: data.full_name || "",
            student_id: data.student_id || "",
            phone_number: data.phone_number || "",
            hostel_details: data.hostel_details || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to update your profile");
      return;
    }

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          student_id: formData.student_id,
          phone_number: formData.phone_number,
          hostel_details: formData.hostel_details,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#800000] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile information...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Edit Personal Information</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="student_id">Student ID</Label>
                <Input
                  id="student_id"
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleChange}
                  placeholder="Enter your student ID"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  type="tel"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="hostel_details">Hostel Details</Label>
                <Textarea
                  id="hostel_details"
                  name="hostel_details"
                  value={formData.hostel_details}
                  onChange={handleChange}
                  placeholder="Enter your hostel and room number"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/profile")}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-[#800000] hover:bg-[#600000] text-white"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditProfile;
