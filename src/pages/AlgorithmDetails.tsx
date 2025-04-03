
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ExternalLink, Code as CodeIcon, BookOpen, BarChart2, PenTool } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Mock algorithm data
const algorithmsData = {
  "blind-search": {
    title: "Blind Search Algorithms",
    description: "Algorithms that systematically explore all possible paths without using domain-specific knowledge.",
    timeComplexity: "O(b^d) - where b is the branching factor and d is the depth",
    spaceComplexity: "O(b^d) - where b is the branching factor and d is the depth",
    bestCase: "O(1) - when the start node is the goal",
    worstCase: "O(b^d) - when the goal is at maximum depth",
    applications: [
      "Graph traversal",
      "Puzzle solving",
      "Web crawling",
      "Network routing"
    ],
    pseudocode: `function BFS(start, goal):
  queue = [start]
  visited = {start}
  
  while queue is not empty:
    node = queue.dequeue()
    
    if node is goal:
      return SUCCESS
    
    for each neighbor of node:
      if neighbor is not in visited:
        queue.enqueue(neighbor)
        visited.add(neighbor)
  
  return FAILURE`,
    javaCode: `public class BreadthFirstSearch {
  public boolean search(Node start, Node goal) {
    Queue<Node> queue = new LinkedList<>();
    Set<Node> visited = new HashSet<>();
    
    queue.add(start);
    visited.add(start);
    
    while (!queue.isEmpty()) {
      Node current = queue.remove();
      
      if (current.equals(goal)) {
        return true;
      }
      
      for (Node neighbor : current.getNeighbors()) {
        if (!visited.contains(neighbor)) {
          queue.add(neighbor);
          visited.add(neighbor);
        }
      }
    }
    
    return false;
  }
}`
  },
  "heuristic-search": {
    title: "Heuristic Search Algorithms",
    description: "Algorithms that use problem-specific knowledge to guide the search process more efficiently.",
    timeComplexity: "O(b^d) - but often performs better in practice due to the heuristic",
    spaceComplexity: "O(b^d) - where b is the branching factor and d is the depth",
    bestCase: "O(d) - when the heuristic perfectly guides to the goal",
    worstCase: "O(b^d) - when the heuristic is misleading",
    applications: [
      "Pathfinding (GPS navigation)",
      "Game AI",
      "Robotics motion planning",
      "Constraint satisfaction problems"
    ],
    pseudocode: `function A_STAR(start, goal):
  open_set = {start}
  closed_set = {}
  g_score = {start: 0}
  f_score = {start: heuristic(start, goal)}
  
  while open_set is not empty:
    current = node in open_set with lowest f_score
    
    if current is goal:
      return RECONSTRUCT_PATH(current)
    
    open_set.remove(current)
    closed_set.add(current)
    
    for each neighbor of current:
      if neighbor in closed_set:
        continue
      
      tentative_g_score = g_score[current] + distance(current, neighbor)
      
      if neighbor not in open_set or tentative_g_score < g_score[neighbor]:
        g_score[neighbor] = tentative_g_score
        f_score[neighbor] = g_score[neighbor] + heuristic(neighbor, goal)
        
        if neighbor not in open_set:
          open_set.add(neighbor)
  
  return FAILURE`,
    javaCode: `public class AStarSearch {
  public List<Node> findPath(Node start, Node goal) {
    PriorityQueue<Node> openSet = new PriorityQueue<>(
      Comparator.comparing(node -> fScore.getOrDefault(node, Double.MAX_VALUE))
    );
    Set<Node> closedSet = new HashSet<>();
    Map<Node, Double> gScore = new HashMap<>();
    Map<Node, Double> fScore = new HashMap<>();
    Map<Node, Node> cameFrom = new HashMap<>();
    
    gScore.put(start, 0.0);
    fScore.put(start, heuristic(start, goal));
    openSet.add(start);
    
    while (!openSet.isEmpty()) {
      Node current = openSet.poll();
      
      if (current.equals(goal)) {
        return reconstructPath(cameFrom, current);
      }
      
      closedSet.add(current);
      
      for (Node neighbor : current.getNeighbors()) {
        if (closedSet.contains(neighbor)) continue;
        
        double tentativeGScore = gScore.get(current) + distance(current, neighbor);
        
        if (!openSet.contains(neighbor) || tentativeGScore < gScore.getOrDefault(neighbor, Double.MAX_VALUE)) {
          cameFrom.put(neighbor, current);
          gScore.put(neighbor, tentativeGScore);
          fScore.put(neighbor, tentativeGScore + heuristic(neighbor, goal));
          
          if (!openSet.contains(neighbor)) {
            openSet.add(neighbor);
          }
        }
      }
    }
    
    return Collections.emptyList(); // No path found
  }
  
  private double heuristic(Node a, Node b) {
    // Example: Manhattan distance
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }
  
  private List<Node> reconstructPath(Map<Node, Node> cameFrom, Node current) {
    List<Node> path = new ArrayList<>();
    path.add(current);
    
    while (cameFrom.containsKey(current)) {
      current = cameFrom.get(current);
      path.add(0, current);
    }
    
    return path;
  }
}`
  },
  // Additional algorithms would be defined here
};

export default function AlgorithmDetails() {
  const { id } = useParams<{id: string}>();
  const [algorithm, setAlgorithm] = useState<any>(null);
  
  useEffect(() => {
    if (id && algorithmsData[id as keyof typeof algorithmsData]) {
      setAlgorithm(algorithmsData[id as keyof typeof algorithmsData]);
    }
  }, [id]);
  
  if (!algorithm) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-[400px] max-w-full">
            <CardHeader>
              <CardTitle>Algorithm Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">The requested algorithm details could not be found.</p>
              <Button asChild>
                <Link to="/">Return Home</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-16">
        <div className="container px-4 md:px-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to all algorithms
          </Link>
          
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">{algorithm.title}</h1>
            <p className="text-muted-foreground max-w-[800px]">{algorithm.description}</p>
          </div>
          
          <Tabs defaultValue="overview" className="mb-12">
            <TabsList className="mb-6">
              <TabsTrigger value="overview" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center">
                <CodeIcon className="mr-2 h-4 w-4" /> Implementation
              </TabsTrigger>
              <TabsTrigger value="visualization" className="flex items-center">
                <BarChart2 className="mr-2 h-4 w-4" /> Visualization
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Complexity Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid md:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Time Complexity</dt>
                      <dd className="text-base">{algorithm.timeComplexity}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Space Complexity</dt>
                      <dd className="text-base">{algorithm.spaceComplexity}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Best Case</dt>
                      <dd className="text-base">{algorithm.bestCase}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Worst Case</dt>
                      <dd className="text-base">{algorithm.worstCase}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {algorithm.applications.map((app: string, index: number) => (
                      <li key={index}>{app}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="code">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PenTool className="mr-2 h-5 w-5" /> 
                      Pseudocode
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="p-4 rounded-md bg-muted overflow-x-auto">
                      <code className="text-sm">{algorithm.pseudocode}</code>
                    </pre>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CodeIcon className="mr-2 h-5 w-5" /> 
                      Java Implementation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="p-4 rounded-md bg-muted overflow-x-auto">
                      <code className="text-sm">{algorithm.javaCode}</code>
                    </pre>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="visualization">
              <Card>
                <CardHeader>
                  <CardTitle>Algorithm Visualization</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="w-full h-[300px] mb-4 flex items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-lg">
                      <div className="text-center p-6">
                        <BarChart2 className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                        <h3 className="text-lg font-medium mb-1">Interactive Visualization</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          For a fully interactive experience, try our live demonstrations
                        </p>
                        <Button asChild>
                          <Link to="/live-demo">Go to Live Demo</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
