
import { CodeIcon, BarChart, Clock, Lightbulb, Search, Share2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <BarChart className="h-10 w-10" />,
    title: "Comparative Analysis",
    description: "Compare multiple algorithms side-by-side to understand performance differences across various input sizes."
  },
  {
    icon: <Zap className="h-10 w-10" />,
    title: "Live Execution",
    description: "Watch algorithms run in real-time with adjustable speed controls to observe behavior step-by-step."
  },
  {
    icon: <CodeIcon className="h-10 w-10" />,
    title: "Interactive Code",
    description: "Explore annotated implementations of each algorithm, with syntax highlighting and explanatory comments."
  },
  {
    icon: <Clock className="h-10 w-10" />,
    title: "Time Complexity",
    description: "Visualize Big-O notation through animated graphs showing how execution time scales with input size."
  },
  {
    icon: <Search className="h-10 w-10" />,
    title: "Deep Insights",
    description: "Gain thorough understanding of algorithm behavior through detailed metrics and performance analysis."
  },
  {
    icon: <Share2 className="h-10 w-10" />,
    title: "Shareable Results",
    description: "Export visualizations and comparison data to share with teammates or include in academic work."
  }
];

export function Features() {
  return (
    <section className="py-16 md:py-24 bg-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-14">
          <h2 className="section-title">Master Algorithm Complexity</h2>
          <p className="section-subtitle">
            Explore the fundamental building blocks of computer science through our interactive visualization tools
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={cn(
                "glass-card-subtle p-6 transition-all hover:shadow-md",
                "hover:border-primary/30 hover-scale"
              )}
            >
              <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
