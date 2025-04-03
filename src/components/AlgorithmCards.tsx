
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Lightbulb, TrendingUp, LineChart, Network } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const algorithms = [
  {
    id: "blind-search",
    title: "Blind Search",
    description: "Algorithms that systematically explore all possible paths without using domain-specific knowledge.",
    icon: Search,
    bgClass: "from-blue-500/20 to-cyan-400/20",
    complexity: "O(b^d)",
    spaceComplexity: "O(b^d)",
    primaryUse: "Graph traversal, puzzle solving"
  },
  {
    id: "heuristic-search",
    title: "Heuristic Search",
    description: "Algorithms that use problem-specific knowledge to guide the search process more efficiently.",
    icon: Lightbulb,
    bgClass: "from-yellow-500/20 to-amber-400/20",
    complexity: "O(b^d)",
    spaceComplexity: "O(b^d)",
    primaryUse: "Pathfinding, optimization problems"
  },
  {
    id: "hill-climbing",
    title: "Hill Climbing",
    description: "A local search algorithm that iteratively moves towards better solutions from an initial point.",
    icon: TrendingUp,
    bgClass: "from-green-500/20 to-emerald-400/20",
    complexity: "Varies",
    spaceComplexity: "O(1)",
    primaryUse: "Local optimization"
  },
  {
    id: "gradient-descent",
    title: "Gradient Descent",
    description: "Optimization algorithm that iteratively adjusts parameters to minimize a cost function.",
    icon: LineChart,
    bgClass: "from-purple-500/20 to-violet-400/20",
    complexity: "O(n·i)",
    spaceComplexity: "O(n)",
    primaryUse: "Machine learning, neural networks"
  },
  {
    id: "parallel-algorithms",
    title: "Parallel Algorithms",
    description: "Algorithms designed to be executed simultaneously on multiple processing units.",
    icon: Network,
    bgClass: "from-red-500/20 to-rose-400/20",
    complexity: "O(n/p)",
    spaceComplexity: "O(n)",
    primaryUse: "Big data processing, simulations"
  }
];

export function AlgorithmCards() {
  return (
    <section className="py-16 md:py-24" id="algorithms">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Algorithm Types</h2>
          <p className="text-muted-foreground max-w-[800px] mx-auto">
            Explore different types of algorithms and understand their complexity, applications, and implementation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {algorithms.map((algorithm) => (
            <Card key={algorithm.id} className={cn(
              "hover-scale overflow-hidden",
              "border rounded-xl shadow-lg"
            )}>
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-50 -z-10",
                algorithm.bgClass
              )} />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{algorithm.title}</CardTitle>
                  <algorithm.icon className="h-6 w-6 text-primary" />
                </div>
                <CardDescription>{algorithm.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Time Complexity</p>
                    <p className="text-muted-foreground">{algorithm.complexity}</p>
                  </div>
                  <div>
                    <p className="font-medium">Space Complexity</p>
                    <p className="text-muted-foreground">{algorithm.spaceComplexity}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-medium">Primary Use</p>
                    <p className="text-muted-foreground">{algorithm.primaryUse}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="default" className="w-full">
                  <Link to={`/algorithm/${algorithm.id}`}>
                    Learn More
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
