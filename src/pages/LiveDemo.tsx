
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, SkipForward, RotateCcw, Info, LineChart as LineChartIcon, BarChart } from "lucide-react";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-28 pb-16">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Live Algorithm Demonstrations</h1>
            <p className="text-muted-foreground max-w-[800px] mx-auto">
              Interact with different algorithms to understand their behavior and performance characteristics in real-time.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="mb-6 glass-card-subtle shadow-lg border-primary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <LineChartIcon className="h-5 w-5 text-primary" />
                    Visualization
                  </CardTitle>
                  <CardDescription>Watch the algorithm in action and compare performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[450px] p-2">
                    <ChartContainer config={chartConfig}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={filteredData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis 
                            dataKey="inputSize" 
                            label={{ value: 'Input Size', position: 'insideBottomRight', offset: -10 }}
                            stroke="var(--foreground)"
                            tick={{ fill: "var(--foreground)" }}
                          />
                          <YAxis 
                            label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft' }}
                            stroke="var(--foreground)"
                            tick={{ fill: "var(--foreground)" }}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend wrapperStyle={{ paddingTop: "10px" }} />
                          <Line 
                            type="monotone" 
                            dataKey="blindSearch" 
                            name="Blind Search"
                            stroke="var(--color-blindSearch)" 
                            strokeWidth={2} 
                            dot={{ stroke: 'var(--color-blindSearch)', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6 }}
                            animationDuration={1000}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="aStar" 
                            name="A* Search"
                            stroke="var(--color-aStar)" 
                            strokeWidth={2} 
                            dot={{ stroke: 'var(--color-aStar)', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6 }}
                            animationDuration={1000}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="hillClimbing"
                            name="Hill Climbing" 
                            stroke="var(--color-hillClimbing)" 
                            strokeWidth={2} 
                            dot={{ stroke: 'var(--color-hillClimbing)', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6 }}
                            animationDuration={1000}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="gradientDescent" 
                            name="Gradient Descent"
                            stroke="var(--color-gradientDescent)" 
                            strokeWidth={2} 
                            dot={{ stroke: 'var(--color-gradientDescent)', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6 }}
                            animationDuration={1000}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="parallel"
                            name="Parallel"
                            stroke="var(--color-parallel)" 
                            strokeWidth={2} 
                            dot={{ stroke: 'var(--color-parallel)', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6 }}
                            animationDuration={1000}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t bg-muted/20 p-4 rounded-b-lg">
                  <div className="flex space-x-2">
                    <Button
                      variant={isRunning ? "destructive" : "default"}
                      className={cn(
                        "transition-all",
                        !isRunning && "bg-primary hover:bg-primary/90"
                      )}
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
                  
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">Speed:</span>
                    <Slider
                      value={speed}
                      min={1}
                      max={100}
                      step={1}
                      className="w-[100px]"
                      onValueChange={(value) => setSpeed(value)}
                    />
                    <span className="text-xs w-6 text-center">{speed[0]}%</span>
                  </div>
                </CardFooter>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="glass-card-subtle shadow-md border-primary/10 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                      Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-muted rounded-full h-3 mb-2 overflow-hidden">
                      <div
                        className="bg-primary h-3 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">
                      {progress}% complete • Step {currentStep}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="glass-card-subtle shadow-md border-primary/10 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-primary" />
                      Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {progress > 0
                        ? `${Math.round(
                            (filteredData[filteredData.length - 1][
                              selectedAlgorithm as keyof typeof filteredData[0]
                            ] as number) *
                              (progress / 100)
                          )} ms`
                        : "-- ms"}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Current execution time</p>
                  </CardContent>
                </Card>
                
                <Card className="glass-card-subtle shadow-md border-primary/10 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg>
                      Complexity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-mono text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
                      {selectedAlgorithm === "blindSearch" && "O(b^d)"}
                      {selectedAlgorithm === "aStar" && "O(b^d)"}
                      {selectedAlgorithm === "hillClimbing" && "O(n)"}
                      {selectedAlgorithm === "gradientDescent" && "O(n·i)"}
                      {selectedAlgorithm === "parallel" && "O(n/p)"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Time complexity</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="glass-card-subtle shadow-lg border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Live Metrics
                  </CardTitle>
                  <CardDescription>Real-time algorithm performance statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Memory Usage</span>
                        <span className="text-primary">{Math.min(100, progress * 1.5)}MB</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, progress * 1.5)}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>CPU Usage</span>
                        <span className="text-primary">{Math.min(100, progress * 2)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-amber-500 h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, progress * 2)}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Solution Quality</span>
                        <span className="text-primary">{Math.min(100, progress * 0.8)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, progress * 0.8)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/50">
                    <h4 className="font-medium mb-2 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      Execution Statistics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Iterations:</span>
                        <span className="font-mono">{Math.floor(currentStep * (algorithmParams.maxIterations / 100))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nodes Explored:</span>
                        <span className="font-mono">{Math.floor(currentStep * 10)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time Elapsed:</span>
                        <span className="font-mono">{(currentStep * 0.1).toFixed(1)}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cache Hits:</span>
                        <span className="font-mono">{Math.floor(currentStep * 0.7)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Memory Peak:</span>
                        <span className="font-mono">{Math.floor(currentStep * 1.8)}MB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Operations/s:</span>
                        <span className="font-mono">{Math.floor(currentStep * 100)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="mb-6 glass-card-subtle shadow-lg border-primary/10 sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                      <path d="M8 1V15M1 8H15M3 3H13V13H3V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Configuration
                  </CardTitle>
                  <CardDescription>Adjust parameters to see how they affect performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="algorithm" className="font-medium">Algorithm</Label>
                    <Select value={selectedAlgorithm} onValueChange={handleAlgorithmChange}>
                      <SelectTrigger id="algorithm" className="bg-background/50">
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
                    <div className="flex justify-between">
                      <Label htmlFor="inputSize" className="font-medium">Input Size</Label>
                      <span className="text-sm font-mono text-primary">{inputSize}</span>
                    </div>
                    <Slider
                      id="inputSize"
                      value={[inputSize]}
                      min={10}
                      max={500}
                      step={10}
                      className="py-2"
                      onValueChange={(value) => handleInputSizeChange(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>10</span>
                      <span>500</span>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="general" className="mt-2">
                    <TabsList className="grid grid-cols-2 mb-2">
                      <TabsTrigger value="general">General</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="general">
                      {selectedAlgorithm === "gradientDescent" && (
                        <div className="space-y-5 pt-2">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="learningRate" className="font-medium">Learning Rate</Label>
                              <span className="text-sm font-mono text-primary">{algorithmParams.learningRate}</span>
                            </div>
                            <Slider
                              value={[Number(algorithmParams.learningRate) * 1000]}
                              min={1}
                              max={100}
                              step={1}
                              className="py-2"
                              onValueChange={(value) => 
                                setAlgorithmParams({
                                  ...algorithmParams,
                                  learningRate: (value[0] / 1000).toFixed(3),
                                })
                              }
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>0.001</span>
                              <span>0.100</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="maxIterations" className="font-medium">Max Iterations</Label>
                              <span className="text-sm font-mono text-primary">{algorithmParams.maxIterations}</span>
                            </div>
                            <Slider
                              value={[algorithmParams.maxIterations]}
                              min={10}
                              max={1000}
                              step={10}
                              className="py-2"
                              onValueChange={(value) => 
                                setAlgorithmParams({
                                  ...algorithmParams,
                                  maxIterations: value[0],
                                })
                              }
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>10</span>
                              <span>1000</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedAlgorithm === "aStar" && (
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="heuristic" className="font-medium">Heuristic Function</Label>
                            <Select 
                              value={algorithmParams.heuristic}
                              onValueChange={(value) => 
                                setAlgorithmParams({
                                  ...algorithmParams,
                                  heuristic: value,
                                })
                              }
                            >
                              <SelectTrigger id="heuristic" className="bg-background/50">
                                <SelectValue placeholder="Select heuristic" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="manhattan">Manhattan Distance</SelectItem>
                                <SelectItem value="euclidean">Euclidean Distance</SelectItem>
                                <SelectItem value="chebyshev">Chebyshev Distance</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground mt-1">
                              Determines how the algorithm estimates distance to goal
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {selectedAlgorithm === "blindSearch" && (
                        <div className="space-y-5 pt-2">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="branchingFactor" className="font-medium">Branching Factor</Label>
                              <span className="text-sm font-mono text-primary">{algorithmParams.branchingFactor}</span>
                            </div>
                            <Slider
                              value={[algorithmParams.branchingFactor]}
                              min={1}
                              max={10}
                              step={1}
                              className="py-2"
                              onValueChange={(value) => 
                                setAlgorithmParams({
                                  ...algorithmParams,
                                  branchingFactor: value[0],
                                })
                              }
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1</span>
                              <span>10</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Average number of branches per node in the search tree
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {selectedAlgorithm === "parallel" && (
                        <div className="space-y-5 pt-2">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="processors" className="font-medium">Number of Processors</Label>
                              <span className="text-sm font-mono text-primary">{algorithmParams.processors}</span>
                            </div>
                            <Slider
                              value={[algorithmParams.processors]}
                              min={1}
                              max={16}
                              step={1}
                              className="py-2"
                              onValueChange={(value) => 
                                setAlgorithmParams({
                                  ...algorithmParams,
                                  processors: value[0],
                                })
                              }
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1</span>
                              <span>16</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Number of parallel processing units available
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {selectedAlgorithm === "hillClimbing" && (
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="restarts" className="font-medium">Random Restarts</Label>
                            <div className="flex gap-4 items-center">
                              <Input
                                id="restarts"
                                type="number"
                                min={0}
                                max={10}
                                defaultValue={3}
                                className="w-full bg-background/50"
                              />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Helps avoid getting stuck in local optima
                            </p>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="advanced">
                      <div className="space-y-4 pt-4">
                        <div className="p-4 bg-muted/30 rounded-lg border border-border/50 text-sm space-y-2">
                          <div className="flex items-start">
                            <Info className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                            <p className="text-muted-foreground">Advanced parameters affect algorithm behavior in complex ways.</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="timeout" className="font-medium">Timeout (ms)</Label>
                          <Input
                            id="timeout"
                            type="number"
                            min={100}
                            max={10000}
                            defaultValue={5000}
                            className="w-full bg-background/50"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="memoryLimit" className="font-medium">Memory Limit (MB)</Label>
                          <Input
                            id="memoryLimit"
                            type="number"
                            min={16}
                            max={1024}
                            defaultValue={512}
                            className="w-full bg-background/50"
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="border-t bg-muted/20 p-4 rounded-b-lg">
                  <Button 
                    className={cn(
                      "w-full transition-all",
                      isRunning ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
                    )}
                    onClick={handleRunSimulation}
                  >
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
              
              <Card className="glass-card-subtle shadow-lg border-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16v-4M12 8h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Algorithm Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  {selectedAlgorithm === "blindSearch" && (
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-1">Blind Search</h4>
                        <p className="text-muted-foreground">Systematically explores all possible paths without using domain-specific knowledge.</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-muted/30 rounded-lg">
                          <p className="text-xs font-medium mb-1">Time Complexity</p>
                          <p className="font-mono font-bold">O(b^d)</p>
                        </div>
                        <div className="p-2 bg-muted/30 rounded-lg">
                          <p className="text-xs font-medium mb-1">Space Complexity</p>
                          <p className="font-mono font-bold">O(b^d)</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Advantages</h5>
                        <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1">
                          <li>Guaranteed to find a solution if one exists</li>
                          <li>Complete for finite search spaces</li>
                          <li>Simple implementation</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Disadvantages</h5>
                        <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1">
                          <li>Inefficient for large search spaces</li>
                          <li>Exponential time complexity</li>
                          <li>High memory requirements</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {selectedAlgorithm === "aStar" && (
                    <div className="space-y-3">
                      <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <h4 className="font-medium text-purple-600 dark:text-purple-400 mb-1">A* Search</h4>
                        <p className="text-muted-foreground">An informed search algorithm that uses a heuristic function to guide the search.</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-muted/30 rounded-lg">
                          <p className="text-xs font-medium mb-1">Time Complexity</p>
                          <p className="font-mono font-bold">O(b^d)</p>
                        </div>
                        <div className="p-2 bg-muted/30 rounded-lg">
                          <p className="text-xs font-medium mb-1">Space Complexity</p>
                          <p className="font-mono font-bold">O(b^d)</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Advantages</h5>
                        <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1">
                          <li>Optimal and complete when using an admissible heuristic</li>
                          <li>More efficient than blind search</li>
                          <li>Finds the shortest path</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Disadvantages</h5>
                        <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1">
                          <li>High memory requirements for complex problems</li>
                          <li>Performance depends on heuristic quality</li>
                          <li>Can be slow on large graphs</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {selectedAlgorithm === "hillClimbing" && (
                    <div className="space-y-3">
                      <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <h4 className="font-medium text-green-600 dark:text-green-400 mb-1">Hill Climbing</h4>
                        <p className="text-muted-foreground">A local search algorithm that iteratively moves towards better solutions from an initial point.</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-muted/30 rounded-lg">
                          <p className="text-xs font-medium mb-1">Time Complexity</p>
                          <p className="font-mono font-bold">O(n)</p>
                        </div>
                        <div className="p-2 bg-muted/30 rounded-lg">
                          <p className="text-xs font-medium mb-1">Space Complexity</p>
                          <p className="font-mono font-bold">O(1)</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Advantages</h5>
                        <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1">
                          <li>Simple implementation and low memory usage</li>
                          <li>Fast convergence to local optima</li>
                          <li>Works well on convex problems</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Disadvantages</h5>
                        <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1">
                          <li>Can get stuck in local optima</li>
                          <li>Not complete or optimal</li>
                          <li>Sensitive to initial state</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {selectedAlgorithm === "gradientDescent" && (
                    <div className="space-y-3">
                      <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                        <h4 className="font-medium text-amber-600 dark:text-amber-400 mb-1">Gradient Descent</h4>
                        <p className="text-muted-foreground">An optimization algorithm that iteratively adjusts parameters to minimize a cost function.</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-muted/30 rounded-lg">
                          <p className="text-xs font-medium mb-1">Time Complexity</p>
                          <p className="font-mono font-bold">O(n·i)</p>
                        </div>
                        <div className="p-2 bg-muted/30 rounded-lg">
                          <p className="text-xs font-medium mb-1">Space Complexity</p>
                          <p className="font-mono font-bold">O(n)</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Advantages</h5>
                        <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1">
                          <li>Effective for many optimization problems</li>
                          <li>Widely used in machine learning</li>
                          <li>Multiple variants (SGD, Mini-batch, etc.)</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Disadvantages</h5>
                        <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1">
                          <li>May converge to local minima</li>
                          <li>Sensitive to learning rate</li>
                          <li>Requires differentiable functions</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {selectedAlgorithm === "parallel" && (
                    <div className="space-y-3">
                      <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                        <h4 className="font-medium text-red-600 dark:text-red-400 mb-1">Parallel Algorithm</h4>
                        <p className="text-muted-foreground">Algorithms designed for simultaneous execution on multiple processors.</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-muted/30 rounded-lg">
                          <p className="text-xs font-medium mb-1">Time Complexity</p>
                          <p className="font-mono font-bold">O(n/p)</p>
                        </div>
                        <div className="p-2 bg-muted/30 rounded-lg">
                          <p className="text-xs font-medium mb-1">Space Complexity</p>
                          <p className="font-mono font-bold">O(n)</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Advantages</h5>
                        <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1">
                          <li>Significant speedup for large problems</li>
                          <li>Efficient use of computing resources</li>
                          <li>Scalable with hardware improvements</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Disadvantages</h5>
                        <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1">
                          <li>Communication overhead between processors</li>
                          <li>Complex implementation and debugging</li>
                          <li>Not all problems can be efficiently parallelized</li>
                        </ul>
                      </div>
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
