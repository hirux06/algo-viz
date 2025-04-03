
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Code, ChevronRight, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled ? "bg-background/90 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
    )}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 relative z-50">
          <div className="size-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Code className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl">AlgoViz</span>
        </Link>
        
        <div className="md:hidden relative z-50">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 transition-opacity duration-300 md:static md:flex md:flex-row md:bg-transparent md:backdrop-blur-none md:opacity-100 md:pointer-events-auto",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"
        )}>
          <Link to="/" className="text-lg md:text-base font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/comparison" className="text-lg md:text-base font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Compare</Link>
          <Link to="/live-demo" className="text-lg md:text-base font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Live Demo</Link>
          <Link to="/team" className="text-lg md:text-base font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Team</Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-3">
          <ThemeSwitcher />
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white">
            Get Started <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
