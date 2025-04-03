
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const performanceData = [
  {
    name: "Small",
    "Blind Search": 90,
    "A* Search": 40,
    "Hill Climbing": 20,
    "Gradient Descent": 60,
    "Parallel": 10,
  },
  {
    name: "Medium",
    "Blind Search": 280,
    "A* Search": 100,
    "Hill Climbing": 70,
    "Gradient Descent": 140,
    "Parallel": 40,
  },
  {
    name: "Large",
    "Blind Search": 800,
    "A* Search": 300,
    "Hill Climbing": 250,
    "Gradient Descent": 350,
    "Parallel": 90,
  },
  {
    name: "Very Large",
    "Blind Search": 2000,
    "A* Search": 800,
    "Hill Climbing": 600,
    "Gradient Descent": 900,
    "Parallel": 150,
  },
];

const chartConfig = {
  "Blind Search": {
    label: "Blind Search",
    theme: {
      light: "#3b82f6",
      dark: "#60a5fa",
    },
  },
  "A* Search": {
    label: "A* Search",
    theme: {
      light: "#8b5cf6",
      dark: "#a78bfa",
    },
  },
  "Hill Climbing": {
    label: "Hill Climbing",
    theme: {
      light: "#10b981",
      dark: "#34d399",
    },
  },
  "Gradient Descent": {
    label: "Gradient Descent",
    theme: {
      light: "#f59e0b",
      dark: "#fbbf24",
    },
  },
  "Parallel": {
    label: "Parallel",
    theme: {
      light: "#ef4444",
      dark: "#f87171",
    },
  },
};

export default function Comparison() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">Algorithm Comparison</h1>
            <p className="text-muted-foreground max-w-[800px] mx-auto">
              A detailed comparison of different scalable algorithms based on performance, complexity, and use cases.
            </p>
          </div>
          
          <Tabs defaultValue="table" className="mb-12">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="table">Comparison Table</TabsTrigger>
              <TabsTrigger value="chart">Performance Charts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="table">
              <div className="rounded-xl border overflow-hidden glass-card">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[150px]">Algorithm</TableHead>
                        <TableHead>Time Complexity</TableHead>
                        <TableHead>Space Complexity</TableHead>
                        <TableHead>Best Case</TableHead>
                        <TableHead>Worst Case</TableHead>
                        <TableHead>Use Cases</TableHead>
                        <TableHead>Scalability</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Blind Search (BFS)</TableCell>
                        <TableCell>O(b<sup>d</sup>)</TableCell>
                        <TableCell>O(b<sup>d</sup>)</TableCell>
                        <TableCell>O(1)</TableCell>
                        <TableCell>O(b<sup>d</sup>)</TableCell>
                        <TableCell>Graph traversal, puzzles</TableCell>
                        <TableCell>Poor</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">A* Search</TableCell>
                        <TableCell>O(b<sup>d</sup>)</TableCell>
                        <TableCell>O(b<sup>d</sup>)</TableCell>
                        <TableCell>O(d)</TableCell>
                        <TableCell>O(b<sup>d</sup>)</TableCell>
                        <TableCell>Pathfinding, routing</TableCell>
                        <TableCell>Moderate</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Hill Climbing</TableCell>
                        <TableCell>O(n)</TableCell>
                        <TableCell>O(1)</TableCell>
                        <TableCell>O(1)</TableCell>
                        <TableCell>O(n)</TableCell>
                        <TableCell>Local optimization</TableCell>
                        <TableCell>Good</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Gradient Descent</TableCell>
                        <TableCell>O(n·i)</TableCell>
                        <TableCell>O(n)</TableCell>
                        <TableCell>O(i)</TableCell>
                        <TableCell>O(n·i)</TableCell>
                        <TableCell>ML, optimization</TableCell>
                        <TableCell>Very Good</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Parallel Algorithms</TableCell>
                        <TableCell>O(n/p)</TableCell>
                        <TableCell>O(n)</TableCell>
                        <TableCell>O(log n)</TableCell>
                        <TableCell>O(n/p)</TableCell>
                        <TableCell>Big data, simulations</TableCell>
                        <TableCell>Excellent</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Time Complexity Explained</CardTitle>
                    <CardDescription>Understanding the notation</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2"><strong>b</strong>: branching factor (average number of child nodes)</p>
                    <p className="mb-2"><strong>d</strong>: depth of the solution/tree</p>
                    <p className="mb-2"><strong>n</strong>: size of the input</p>
                    <p className="mb-2"><strong>i</strong>: number of iterations</p>
                    <p><strong>p</strong>: number of processors (for parallel algorithms)</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Best Algorithms For</CardTitle>
                    <CardDescription>Use case recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Finding shortest path:</strong> A* Search</li>
                      <li><strong>Local optimization:</strong> Hill Climbing</li>
                      <li><strong>Machine learning:</strong> Gradient Descent</li>
                      <li><strong>Large-scale data:</strong> Parallel Algorithms</li>
                      <li><strong>Complete search:</strong> Blind Search (BFS/DFS)</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Scalability Factors</CardTitle>
                    <CardDescription>What affects algorithm scalability</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Memory usage:</strong> Affects ability to handle large inputs</li>
                      <li><strong>Time growth rate:</strong> How performance degrades with larger inputs</li>
                      <li><strong>Parallelizability:</strong> Ability to distribute computation</li>
                      <li><strong>Data locality:</strong> Efficiency in accessing memory</li>
                      <li><strong>Input sensitivity:</strong> Performance variance across input types</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="chart">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Performance Comparison by Input Size</CardTitle>
                  <CardDescription>Execution time in milliseconds</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ChartContainer config={chartConfig}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={performanceData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 20,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft' }} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Bar dataKey="Blind Search" fill="var(--color-Blind Search)" />
                          <Bar dataKey="A* Search" fill="var(--color-A* Search)" />
                          <Bar dataKey="Hill Climbing" fill="var(--color-Hill Climbing)" />
                          <Bar dataKey="Gradient Descent" fill="var(--color-Gradient Descent)" />
                          <Bar dataKey="Parallel" fill="var(--color-Parallel)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Scalability Rating</CardTitle>
                    <CardDescription>Overall performance with increasing data size</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-center justify-between">
                        <span>Blind Search</span>
                        <div className="w-1/2 bg-muted rounded-full h-3">
                          <div className="bg-blue-500 h-3 rounded-full" style={{ width: '30%' }} />
                        </div>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>A* Search</span>
                        <div className="w-1/2 bg-muted rounded-full h-3">
                          <div className="bg-purple-500 h-3 rounded-full" style={{ width: '50%' }} />
                        </div>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Hill Climbing</span>
                        <div className="w-1/2 bg-muted rounded-full h-3">
                          <div className="bg-green-500 h-3 rounded-full" style={{ width: '65%' }} />
                        </div>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Gradient Descent</span>
                        <div className="w-1/2 bg-muted rounded-full h-3">
                          <div className="bg-amber-500 h-3 rounded-full" style={{ width: '80%' }} />
                        </div>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Parallel Algorithms</span>
                        <div className="w-1/2 bg-muted rounded-full h-3">
                          <div className="bg-red-500 h-3 rounded-full" style={{ width: '95%' }} />
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Tradeoffs</CardTitle>
                    <CardDescription>Factors affecting algorithm selection</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose dark:prose-invert">
                      <p className="text-sm">
                        When selecting an algorithm, consider these tradeoffs:
                      </p>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        <li><strong>Completeness vs. efficiency:</strong> Blind search guarantees finding a solution if one exists but can be inefficient.</li>
                        <li><strong>Optimality vs. speed:</strong> A* finds optimal paths but requires more memory than greedy approaches.</li>
                        <li><strong>Local vs. global optimization:</strong> Hill climbing is fast but may get stuck in local optima.</li>
                        <li><strong>Training time vs. quality:</strong> Gradient descent's learning rate affects convergence speed vs. accuracy.</li>
                        <li><strong>Parallelization overhead:</strong> Parallel algorithms have communication costs that can offset speedup.</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
