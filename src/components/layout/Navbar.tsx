
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, User, Menu, ShoppingCart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSellClick = () => {
    if (isAuthenticated) {
      navigate('/create-listing');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-campus-primary">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-campus-primary" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span>Campus Market</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-campus-primary">Home</Link>
            <Link to="/products" className="transition-colors hover:text-campus-primary">Products</Link>
            <button 
              onClick={handleSellClick}
              className="transition-colors hover:text-campus-primary bg-transparent border-none p-0 font-medium text-sm cursor-pointer"
            >
              Sell
            </button>
            <Link to="/help" className="transition-colors hover:text-campus-primary">Help</Link>
            <Link to="/faq" className="transition-colors hover:text-campus-primary">FAQ</Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <form className="hidden md:flex relative w-[200px] lg:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products..."
              className="flex h-10 w-full rounded-md border border-input bg-background py-2 pl-8 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </form>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-campus-primary text-[10px] font-bold text-white flex items-center justify-center">
                    3
                  </span>
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" onClick={() => signOut()}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="default" className="bg-campus-primary hover:bg-campus-dark">
                  Register
                </Button>
              </Link>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                  Campus Market
                </SheetTitle>
                <SheetDescription>Buy and sell within your campus community</SheetDescription>
              </SheetHeader>
              <div className="grid gap-2 py-6">
                <form className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search products..."
                    className="flex h-10 w-full rounded-md border border-input bg-background py-2 pl-8 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </form>
                <Link to="/" className="flex w-full items-center py-2 text-lg font-semibold">Home</Link>
                <Link to="/products" className="flex w-full items-center py-2 text-lg font-semibold">Products</Link>
                <button 
                  onClick={handleSellClick}
                  className="flex w-full items-center py-2 text-lg font-semibold bg-transparent border-none text-left"
                >
                  Sell
                </button>
                <Link to="/help" className="flex w-full items-center py-2 text-lg font-semibold">Help</Link>
                <Link to="/faq" className="flex w-full items-center py-2 text-lg font-semibold">FAQ</Link>
                
                {!isAuthenticated ? (
                  <div className="flex flex-col gap-2 mt-4">
                    <Link to="/login">
                      <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link to="/register">
                      <Button className="w-full bg-campus-primary hover:bg-campus-dark">Register</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 mt-4">
                    <Link to="/profile">
                      <Button variant="outline" className="w-full">My Profile</Button>
                    </Link>
                    <Link to="/cart">
                      <Button variant="outline" className="w-full">My Cart</Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => signOut()}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
