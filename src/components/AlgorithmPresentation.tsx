
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Presentation, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Understanding Scalable Algorithms",
    content: "An overview of algorithms that efficiently handle growing data sizes",
    points: [
      "Algorithms that maintain performance as input sizes increase",
      "Crucial for modern computing and big data applications",
      "Measured through time and space complexity analysis"
    ]
  },
  {
    title: "Blind Search Algorithms",
    content: "Systematic exploration without domain-specific knowledge",
    points: [
      "Time Complexity: O(b^d)",
      "Space Complexity: O(b^d)",
      "Examples: BFS, DFS",
      "Applications: Graph traversal, puzzle solving"
    ]
  },
  {
    title: "Heuristic Search Algorithms",
    content: "Using problem-specific knowledge to guide search",
    points: [
      "Time Complexity: O(b^d)",
      "Space Complexity: O(b^d)",
      "Examples: A* Search, Best-first search",
      "Applications: Pathfinding, optimization problems"
    ]
  },
  {
    title: "Hill Climbing Algorithm",
    content: "Local search algorithm that iteratively moves toward better solutions",
    points: [
      "Time Complexity: Varies",
      "Space Complexity: O(1)",
      "Easily trapped in local optima",
      "Applications: Local optimization problems"
    ]
  },
  {
    title: "Gradient Descent Algorithm",
    content: "Optimization algorithm that minimizes a cost function",
    points: [
      "Time Complexity: O(n·i)",
      "Space Complexity: O(n)",
      "Variants: Stochastic, Batch, Mini-batch",
      "Applications: Machine learning, neural networks"
    ]
  },
  {
    title: "Parallel Algorithms",
    content: "Algorithms designed for simultaneous execution on multiple processors",
    points: [
      "Time Complexity: O(n/p)",
      "Space Complexity: O(n)",
      "Challenges: Synchronization, load balancing",
      "Applications: Big data processing, simulations"
    ]
  },
  {
    title: "Scalability Comparison",
    content: "How algorithms perform as data size increases",
    points: [
      "Blind Search: Poor scalability with large datasets",
      "Heuristic Search: Improved scalability with good heuristics",
      "Hill Climbing: Fast but may produce suboptimal solutions",
      "Gradient Descent: Scales well with appropriate learning rate",
      "Parallel Algorithms: Best scalability with proper implementation"
    ]
  }
];

export function AlgorithmPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleDownload = () => {
    // In a real implementation, this would generate and download a PPT file
    // For now, we'll just alert the user
    alert("In a production environment, this would download a PowerPoint file of the algorithms summary.");
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-accent/5">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Presentation className="h-8 w-8 text-primary mr-2" />
            <h2 className="text-3xl font-bold tracking-tight">Algorithm Summary Presentation</h2>
          </div>
          <p className="text-muted-foreground max-w-[800px] mx-auto">
            A concise overview of all the algorithms and their key characteristics
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden glass-card border shadow-lg h-[450px] md:h-[500px]">
            <div className="absolute top-4 right-4 z-10">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download PPT
              </Button>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex flex-col"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                      {slides[currentSlide].title}
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {slides[currentSlide].content}
                    </p>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-center">
                    <ul className="space-y-3 md:space-y-4">
                      {slides[currentSlide].points.map((point, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-primary text-sm font-medium">{index + 1}</span>
                          </div>
                          <span className="text-md md:text-lg">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6 text-center text-sm text-muted-foreground">
                    Slide {currentSlide + 1} of {slides.length}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Button variant="outline" size="icon" className="rounded-full" onClick={prevSlide}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Button variant="outline" size="icon" className="rounded-full" onClick={nextSlide}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-primary' : 'bg-muted'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
