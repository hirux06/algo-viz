
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, SkipForward, RotateCcw, Info } from "lucide-react";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const simulationData = [
  { inputSize: 10, blindSearch: 50, aStar: 30, hillClimbing: 20, gradientDescent: 40, parallel: 15 },
  { inputSize: 50, blindSearch: 150, aStar: 70, hillClimbing: 60, gradientDescent: 90, parallel: 30 },
  { inputSize: 100, blindSearch: 300, aStar: 120, hillClimbing: 100, gradientDescent: 170, parallel: 45 },
  { inputSize: 200, blindSearch: 600, aStar: 220, hillClimbing: 180, gradientDescent: 320, parallel: 75 },
  { inputSize: 300, blindSearch: 900, aStar: 310, hillClimbing: 260, gradientDescent: 470, parallel: 100 },
  { inputSize: 400, blindSearch: 1200, aStar: 400, hillClimbing: 340, gradientDescent: 620, parallel: 125 },
  { inputSize: 500, blindSearch: 1500, aStar: 490, hillClimbing: 420, gradientDescent: 770, parallel: 150 },
];

const chartConfig = {
  blindSearch: {
    label: "Blind Search",
    theme: {
      light: "#3b82f6",
      dark: "#60a5fa",
    },
  },
  aStar: {
    label: "A* Search",
    theme: {
      light: "#8b5cf6",
      dark: "#a78bfa",
    },
  },
  hillClimbing: {
    label: "Hill Climbing",
    theme: {
      light: "#10b981",
      dark: "#34d399",
    },
  },
  gradientDescent: {
    label: "Gradient Descent",
    theme: {
      light: "#f59e0b",
      dark: "#fbbf24",
    },
  },
  parallel: {
    label: "Parallel",
    theme: {
      light: "#ef4444",
      dark: "#f87171",
    },
  },
};

export default function LiveDemo() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("aStar");
  const [inputSize, setInputSize] = useState(100);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState([50]); // 1-100 speed slider
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [algorithmParams, setAlgorithmParams] = useState({
    learningRate: 0.01,
    maxIterations: 100,
    heuristic: "manhattan",
    branchingFactor: 4,
    processors: 4,
  });
  
  const handleRunSimulation = () => {
    if (isRunning) {
      setIsRunning(false);
      return;
    }
    
    setIsRunning(true);
    setProgress(0);
    setCurrentStep(0);
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return newProgress;
      });
      
      setCurrentStep((prev) => prev + 1);
    }, 100 - speed[0] + 10); // Speed affects interval
  };
  
  const handleReset = () => {
    setIsRunning(false);
    setProgress(0);
    setCurrentStep(0);
  };
  
  const handleAlgorithmChange = (value: string) => {
    setSelectedAlgorithm(value);
    handleReset();
  };
  
  const handleInputSizeChange = (value: number) => {
    setInputSize(value);
  };
  
  // Generate simulation data based on current input size
  const filteredData = simulationData.filter(item => item.inputSize <= inputSize);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">Live Algorithm Demonstrations</h1>
            <p className="text-muted-foreground max-w-[800px] mx-auto">
              Interact with different algorithms to understand their behavior and performance characteristics in real-time.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Visualization</CardTitle>
                  <CardDescription>Watch the algorithm in action</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ChartContainer config={chartConfig}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={filteredData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="inputSize" 
                            label={{ value: 'Input Size', position: 'insideBottomRight', offset: -10 }}
                          />
                          <YAxis 
                            label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft' }}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="blindSearch" 
                            name="Blind Search"
                            stroke="var(--color-blindSearch)" 
                            strokeWidth={2} 
                            dot={{ stroke: 'var(--color-blindSearch)', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="aStar" 
                            name="A* Search"
                            stroke="var(--color-aStar)" 
                            strokeWidth={2} 
                            dot={{ stroke: 'var(--color-aStar)', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="hillClimbing"
                            name="Hill Climbing" 
                            stroke="var(--color-hillClimbing)" 
                            strokeWidth={2} 
                            dot={{ stroke: 'var(--color-hillClimbing)', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="gradientDescent" 
                            name="Gradient Descent"
                            stroke="var(--color-gradientDescent)" 
                            strokeWidth={2} 
                            dot={{ stroke: 'var(--color-gradientDescent)', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="parallel"
                            name="Parallel"
                            stroke="var(--color-parallel)" 
                            strokeWidth={2} 
                            dot={{ stroke: 'var(--color-parallel)', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button
                      variant={isRunning ? "destructive" : "default"}
                      onClick={handleRunSimulation}
                    >
                      {isRunning ? (
                        <>
                          <Pause className="mr-2 h-4 w-4" /> Pause
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" /> Run
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                      <RotateCcw className="mr-2 h-4 w-4" /> Reset
                    </Button>
                    <Button variant="outline" disabled={!isRunning}>
                      <SkipForward className="mr-2 h-4 w-4" /> Skip
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground mr-2">Speed:</span>
                    <Slider
                      value={speed}
                      min={1}
                      max={100}
                      step={1}
                      className="w-[100px]"
                      onValueChange={(value) => setSpeed(value)}
                    />
                  </div>
                </CardFooter>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-muted rounded-full h-3 mb-2">
                      <div
                        className="bg-primary h-3 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {progress}% complete • Step {currentStep}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Current Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="text-2xl font-bold">
                    {progress > 0
                      ? `${Math.round(
                          (filteredData[filteredData.length - 1][
                            selectedAlgorithm as keyof typeof filteredData[0]
                          ] as number) *
                            (progress / 100)
                        )} ms`
                      : "-- ms"}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Time Complexity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-mono">
                      {selectedAlgorithm === "blindSearch" && "O(b^d)"}
                      {selectedAlgorithm === "aStar" && "O(b^d)"}
                      {selectedAlgorithm === "hillClimbing" && "O(n)"}
                      {selectedAlgorithm === "gradientDescent" && "O(n·i)"}
                      {selectedAlgorithm === "parallel" && "O(n/p)"}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Live Stats</CardTitle>
                  <CardDescription>Real-time algorithm metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Memory Usage:</span>
                        <span>{Math.min(100, progress * 1.5)}MB</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${Math.min(100, progress * 1.5)}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>CPU Usage:</span>
                        <span>{Math.min(100, progress * 2)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-amber-500 h-2 rounded-full"
                          style={{ width: `${Math.min(100, progress * 2)}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Solution Quality:</span>
                        <span>{Math.min(100, progress * 0.8)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${Math.min(100, progress * 0.8)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Iterations Completed:</span>
                      <span>{Math.floor(currentStep * (algorithmParams.maxIterations / 100))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nodes Explored:</span>
                      <span>{Math.floor(currentStep * 10)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Elapsed:</span>
                      <span>{(currentStep * 0.1).toFixed(1)}s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Configuration</CardTitle>
                  <CardDescription>Adjust parameters to see how they affect performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="algorithm">Algorithm</Label>
                    <Select value={selectedAlgorithm} onValueChange={handleAlgorithmChange}>
                      <SelectTrigger id="algorithm">
                        <SelectValue placeholder="Select algorithm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blindSearch">Blind Search</SelectItem>
                        <SelectItem value="aStar">A* Search</SelectItem>
                        <SelectItem value="hillClimbing">Hill Climbing</SelectItem>
                        <SelectItem value="gradientDescent">Gradient Descent</SelectItem>
                        <SelectItem value="parallel">Parallel Algorithm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="inputSize">Input Size</Label>
                    <div className="flex gap-4">
                      <Slider
                        id="inputSize"
                        value={[inputSize]}
                        min={10}
                        max={500}
                        step={10}
                        className="flex-1"
                        onValueChange={(value) => handleInputSizeChange(value[0])}
                      />
                      <span className="w-12 text-right">{inputSize}</span>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="general" className="mt-2">
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="general">General</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="general">
                      {selectedAlgorithm === "gradientDescent" && (
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="learningRate">Learning Rate</Label>
                            <div className="flex gap-4">
                              <Slider
                                value={[Number(algorithmParams.learningRate) * 1000]}
                                min={1}
                                max={100}
                                step={1}
                                className="flex-1"
                                onValueChange={(value) => 
                                  setAlgorithmParams({
                                    ...algorithmParams,
                                    learningRate: (value[0] / 1000).toFixed(3),
                                  })
                                }
                              />
                              <span className="w-12 text-right">{algorithmParams.learningRate}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="maxIterations">Max Iterations</Label>
                            <div className="flex gap-4">
                              <Slider
                                value={[algorithmParams.maxIterations]}
                                min={10}
                                max={1000}
                                step={10}
                                className="flex-1"
                                onValueChange={(value) => 
                                  setAlgorithmParams({
                                    ...algorithmParams,
                                    maxIterations: value[0],
                                  })
                                }
                              />
                              <span className="w-12 text-right">{algorithmParams.maxIterations}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedAlgorithm === "aStar" && (
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="heuristic">Heuristic Function</Label>
                            <Select 
                              value={algorithmParams.heuristic}
                              onValueChange={(value) => 
                                setAlgorithmParams({
                                  ...algorithmParams,
                                  heuristic: value,
                                })
                              }
                            >
                              <SelectTrigger id="heuristic">
                                <SelectValue placeholder="Select heuristic" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="manhattan">Manhattan Distance</SelectItem>
                                <SelectItem value="euclidean">Euclidean Distance</SelectItem>
                                <SelectItem value="chebyshev">Chebyshev Distance</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                      
                      {selectedAlgorithm === "blindSearch" && (
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="branchingFactor">Branching Factor</Label>
                            <div className="flex gap-4">
                              <Slider
                                value={[algorithmParams.branchingFactor]}
                                min={1}
                                max={10}
                                step={1}
                                className="flex-1"
                                onValueChange={(value) => 
                                  setAlgorithmParams({
                                    ...algorithmParams,
                                    branchingFactor: value[0],
                                  })
                                }
                              />
                              <span className="w-12 text-right">{algorithmParams.branchingFactor}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedAlgorithm === "parallel" && (
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="processors">Number of Processors</Label>
                            <div className="flex gap-4">
                              <Slider
                                value={[algorithmParams.processors]}
                                min={1}
                                max={16}
                                step={1}
                                className="flex-1"
                                onValueChange={(value) => 
                                  setAlgorithmParams({
                                    ...algorithmParams,
                                    processors: value[0],
                                  })
                                }
                              />
                              <span className="w-12 text-right">{algorithmParams.processors}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedAlgorithm === "hillClimbing" && (
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="restarts">Random Restarts</Label>
                            <div className="flex gap-4">
                              <Input
                                id="restarts"
                                type="number"
                                min={0}
                                max={10}
                                value={3}
                                className="w-full"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="advanced">
                      <div className="space-y-4 pt-4">
                        <div className="p-4 bg-muted/50 rounded-lg border text-sm space-y-2">
                          <div className="flex items-start">
                            <Info className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                            <p>Advanced parameters affect algorithm behavior in complex ways and may drastically change performance characteristics.</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="timeout">Timeout (ms)</Label>
                          <Input
                            id="timeout"
                            type="number"
                            min={100}
                            max={10000}
                            defaultValue={5000}
                            className="w-full"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="memoryLimit">Memory Limit (MB)</Label>
                          <Input
                            id="memoryLimit"
                            type="number"
                            min={16}
                            max={1024}
                            defaultValue={512}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleRunSimulation}>
                    {isRunning ? (
                      <>
                        <Pause className="mr-2 h-4 w-4" /> Stop Simulation
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" /> Run Simulation
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Algorithm Info</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  {selectedAlgorithm === "blindSearch" && (
                    <div className="space-y-2">
                      <p><strong>Description:</strong> Blind search algorithms systematically explore all possible paths without using domain-specific knowledge.</p>
                      <p><strong>Time Complexity:</strong> O(b^d), where b is the branching factor and d is the depth.</p>
                      <p><strong>Space Complexity:</strong> O(b^d) for breadth-first search.</p>
                      <p><strong>Advantages:</strong> Guaranteed to find a solution if one exists. Complete.</p>
                      <p><strong>Disadvantages:</strong> Inefficient for large search spaces.</p>
                    </div>
                  )}
                  
                  {selectedAlgorithm === "aStar" && (
                    <div className="space-y-2">
                      <p><strong>Description:</strong> A* is an informed search algorithm that uses a heuristic function to guide the search.</p>
                      <p><strong>Time Complexity:</strong> O(b^d) in the worst case, but often performs better in practice.</p>
                      <p><strong>Space Complexity:</strong> O(b^d) as it stores all generated nodes.</p>
                      <p><strong>Advantages:</strong> Optimal and complete when using an admissible heuristic.</p>
                      <p><strong>Disadvantages:</strong> High memory requirements for complex problems.</p>
                    </div>
                  )}
                  
                  {selectedAlgorithm === "hillClimbing" && (
                    <div className="space-y-2">
                      <p><strong>Description:</strong> Hill climbing is a local search algorithm that iteratively moves towards better solutions from an initial point.</p>
                      <p><strong>Time Complexity:</strong> O(n), where n is the size of the search space.</p>
                      <p><strong>Space Complexity:</strong> O(1), as it only stores the current state.</p>
                      <p><strong>Advantages:</strong> Simple implementation and low memory usage.</p>
                      <p><strong>Disadvantages:</strong> Can get stuck in local optima.</p>
                    </div>
                  )}
                  
                  {selectedAlgorithm === "gradientDescent" && (
                    <div className="space-y-2">
                      <p><strong>Description:</strong> Gradient descent is an optimization algorithm that iteratively adjusts parameters to minimize a cost function.</p>
                      <p><strong>Time Complexity:</strong> O(n·i), where n is the number of parameters and i is the number of iterations.</p>
                      <p><strong>Space Complexity:</strong> O(n).</p>
                      <p><strong>Advantages:</strong> Effective for many optimization problems, especially in machine learning.</p>
                      <p><strong>Disadvantages:</strong> May converge to local minima. Sensitive to learning rate.</p>
                    </div>
                  )}
                  
                  {selectedAlgorithm === "parallel" && (
                    <div className="space-y-2">
                      <p><strong>Description:</strong> Parallel algorithms distribute computation across multiple processors to solve problems faster.</p>
                      <p><strong>Time Complexity:</strong> O(n/p), where n is the size of the problem and p is the number of processors.</p>
                      <p><strong>Space Complexity:</strong> O(n) total across all processors.</p>
                      <p><strong>Advantages:</strong> Significant speedup for large problems when properly parallelized.</p>
                      <p><strong>Disadvantages:</strong> Communication overhead between processors. Not all problems can be efficiently parallelized.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
