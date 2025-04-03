
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { name: '10', bfs: 800, astar: 400, parallel: 100 },
  { name: '50', bfs: 1500, astar: 650, parallel: 200 },
  { name: '100', bfs: 3000, astar: 1000, parallel: 300 },
  { name: '500', bfs: 9000, astar: 2500, parallel: 700 },
  { name: '1000', bfs: 15000, astar: 4000, parallel: 1100 },
];

const chartConfig = {
  bfs: {
    label: "Blind Search",
    theme: {
      light: "#3b82f6",
      dark: "#60a5fa",
    }
  },
  astar: {
    label: "A* Search",
    theme: {
      light: "#8b5cf6",
      dark: "#a78bfa",
    }
  },
  parallel: {
    label: "Parallel",
    theme: {
      light: "#10b981",
      dark: "#34d399",
    }
  }
};

export function DemoPreview() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Interactive Demonstrations</h2>
            <p className="text-muted-foreground mb-6">
              Explore how different algorithms perform with varying input sizes and parameters. 
              Our interactive demos allow you to visualize algorithm behavior in real-time.
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <PlayCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Parameter Tweaking</h3>
                  <p className="text-sm text-muted-foreground">Adjust algorithm parameters and see real-time changes in performance</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <PlayCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Visualization Controls</h3>
                  <p className="text-sm text-muted-foreground">Control the speed and view detailed steps of execution</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <PlayCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Performance Metrics</h3>
                  <p className="text-sm text-muted-foreground">View real-time performance metrics as algorithms run</p>
                </div>
              </div>
            </div>
            <Button asChild size="lg">
              <Link to="/live-demo" className="flex items-center">
                Go to Live Demos <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          <Card className="p-4 glass-card-subtle">
            <CardContent className="p-0">
              <div className="mb-4 text-center">
                <h3 className="text-lg font-medium">Algorithm Performance by Input Size</h3>
                <p className="text-sm text-muted-foreground">Execution time in milliseconds</p>
              </div>
              <div className="h-[300px]">
                <ChartContainer config={chartConfig}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      label={{ value: 'Input Size', position: 'insideBottom', offset: -10 }} 
                    />
                    <YAxis 
                      label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft' }} 
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="bfs" stroke="var(--color-bfs)" strokeWidth={2} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="astar" stroke="var(--color-astar)" strokeWidth={2} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="parallel" stroke="var(--color-parallel)" strokeWidth={2} activeDot={{ r: 6 }} />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
