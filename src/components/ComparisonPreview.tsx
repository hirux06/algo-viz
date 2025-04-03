
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { BarChart2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function ComparisonPreview() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Algorithm Comparison</h2>
          <p className="text-muted-foreground max-w-[800px] mx-auto">
            Compare the performance, complexity, and use cases of different algorithms.
          </p>
        </div>
        
        <div className="relative overflow-hidden rounded-xl border glass-card mb-8">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Algorithm</TableHead>
                  <TableHead>Time Complexity</TableHead>
                  <TableHead className="hidden md:table-cell">Space Complexity</TableHead>
                  <TableHead className="hidden lg:table-cell">Best Use Case</TableHead>
                  <TableHead className="hidden lg:table-cell">Scalability</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Blind Search (BFS)</TableCell>
                  <TableCell>O(b^d)</TableCell>
                  <TableCell className="hidden md:table-cell">O(b^d)</TableCell>
                  <TableCell className="hidden lg:table-cell">Finding shortest path</TableCell>
                  <TableCell className="hidden lg:table-cell">Poor</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">A* Search</TableCell>
                  <TableCell>O(b^d)</TableCell>
                  <TableCell className="hidden md:table-cell">O(b^d)</TableCell>
                  <TableCell className="hidden lg:table-cell">Pathfinding with heuristics</TableCell>
                  <TableCell className="hidden lg:table-cell">Moderate</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Gradient Descent</TableCell>
                  <TableCell>O(n·i)</TableCell>
                  <TableCell className="hidden md:table-cell">O(n)</TableCell>
                  <TableCell className="hidden lg:table-cell">Function optimization</TableCell>
                  <TableCell className="hidden lg:table-cell">Good</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button asChild size="lg">
            <Link to="/comparison" className="flex items-center">
              See Full Comparison <BarChart2 className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
