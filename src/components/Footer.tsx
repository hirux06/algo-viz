
import { Code } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Code className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">AlgoViz</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Interactive visualization platform to understand scalable algorithms through hands-on experience.
            </p>
            <div className="text-sm text-muted-foreground">
              © 2025 AlgoViz. All rights reserved.
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/comparison" className="text-muted-foreground hover:text-foreground transition-colors">Algorithm Comparison</Link></li>
              <li><Link to="/live-demo" className="text-muted-foreground hover:text-foreground transition-colors">Live Demonstrations</Link></li>
              <li><Link to="/team" className="text-muted-foreground hover:text-foreground transition-colors">Team</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">GitHub Repository</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Research Papers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
