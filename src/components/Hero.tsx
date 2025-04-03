
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Animation parameters
    const nodes: {x: number, y: number, size: number, speedX: number, speedY: number}[] = [];
    const edges: {start: number, end: number, opacity: number}[] = [];
    
    // Create initial nodes
    for (let i = 0; i < 30; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1
      });
    }
    
    // Create edges between some nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.85) {
          edges.push({
            start: i,
            end: j,
            opacity: Math.random() * 0.5
          });
        }
      }
    }
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw edges
      edges.forEach(edge => {
        const startNode = nodes[edge.start];
        const endNode = nodes[edge.end];
        
        const dx = endNode.x - startNode.x;
        const dy = endNode.y - startNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only draw edges for nearby nodes
        if (distance < 150) {
          const opacity = (1 - distance / 150) * edge.opacity;
          
          ctx.beginPath();
          ctx.moveTo(startNode.x, startNode.y);
          ctx.lineTo(endNode.x, endNode.y);
          ctx.strokeStyle = `rgba(147, 51, 234, ${opacity})`;
          ctx.stroke();
        }
      });
      
      // Update and draw nodes
      nodes.forEach(node => {
        // Update position
        node.x += node.speedX;
        node.y += node.speedY;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.speedX *= -1;
        if (node.y < 0 || node.y > canvas.height) node.speedY *= -1;
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(147, 51, 234, 0.6)';
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-30"
      />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
            <span className="font-medium">Explore</span> Scalable Algorithms
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Understanding{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Scalable Algorithms
            </span>{" "}
            Through Visualization
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Explore the power of modern algorithms with interactive visualizations,
            comparisons, and live demonstrations to understand their scalability and applications.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90">
              <Link to="/comparison" className="flex items-center">
                Compare Algorithms
                <BarChart2 className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8">
              <Link to="/live-demo" className="flex items-center">
                Live Demonstrations
                <PlayCircle className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
