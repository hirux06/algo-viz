
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Code, ChevronRight, BarChart2, Play, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-200 py-4",
      scrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
    )}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">AlgoViz</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to="/comparison" className="text-muted-foreground hover:text-foreground transition-colors">Compare</Link>
          <Link to="/live-demo" className="text-muted-foreground hover:text-foreground transition-colors">Live Demo</Link>
          <Link to="/team" className="text-muted-foreground hover:text-foreground transition-colors">Team</Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Get Started <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
