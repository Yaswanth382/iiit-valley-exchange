
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      // Basic validation
      if (!email.endsWith('@iiitrkvalley.ac.in')) {
        toast({
          title: "Error",
          description: "Please use your IIIT RK Valley email address",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Success",
        description: "You have been logged in successfully",
      });
      
      // In a real app, we would navigate to the home page or dashboard
      // after successful login. For now, we just show a toast.
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
              <p className="mt-2 text-gray-600">
                Sign in to your Campus Market account
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.name@iiitrkvalley.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-campus-primary hover:text-campus-dark">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-campus-primary hover:bg-campus-dark"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="font-medium text-campus-primary hover:text-campus-dark">
                  Register now
                </Link>
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{" "}
              <Link to="/terms" className="underline">Terms of Service</Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
