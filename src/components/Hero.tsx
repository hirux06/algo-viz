
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, BarChart2 } from "lucide-react";
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
    for (let i = 0; i < 40; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8
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
        if (distance < 180) {
          const opacity = (1 - distance / 180) * edge.opacity;
          
          ctx.beginPath();
          ctx.moveTo(startNode.x, startNode.y);
          ctx.lineTo(endNode.x, endNode.y);
          ctx.strokeStyle = `rgba(79, 70, 229, ${opacity})`;
          ctx.lineWidth = 0.6;
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
        ctx.fillStyle = 'rgba(79, 70, 229, 0.6)';
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
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10"></div>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-30"
      />
      <div className="container px-4 md:px-6 relative z-20">
        <div className="flex flex-col items-center gap-6 text-center">
          <div 
            className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            Visualize & Learn Algorithms
          </div>
          <h1 
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Understand{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Algorithm Scaling
            </span>{" "}
            Through Interactive Visualization
          </h1>
          <p 
            className="max-w-[800px] text-muted-foreground md:text-xl"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Master the principles of algorithm efficiency with dynamic visual demonstrations, 
            comparative analysis, and hands-on learning experiences.
          </p>
          <div 
            className="flex flex-col sm:flex-row items-center gap-4 mt-6"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Button size="lg" className="h-12 px-8 btn-gradient rounded-full">
              <Link to="/comparison" className="flex items-center">
                Compare Algorithms
                <BarChart2 className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 rounded-full border-primary/20 hover:border-primary/60">
              <Link to="/live-demo" className="flex items-center">
                Live Demonstrations
                <PlayCircle className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
