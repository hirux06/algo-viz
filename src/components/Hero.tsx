
import { Button } from "@/components/ui/button";
import { FileUp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
            <span className="font-medium">New</span> AI-Powered Resume Optimization
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Land Your Dream Job with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI-optimized
            </span>{" "}
            Resumes
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Elevate your job applications with our intelligent resume analyzer and optimizer.
            Match job descriptions, improve formatting, and get real-time ATS compatibility scores.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90">
              <FileUp className="mr-2 h-5 w-5" />
              Upload Resume
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <div className={cn(
            "relative w-full max-w-4xl overflow-hidden rounded-xl border glass-card p-1", 
            "animate-scale-in shadow-xl"
          )}>
            <div className="aspect-[16/9] overflow-hidden rounded-lg border bg-muted/50">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-medium">Resume Dashboard Preview</p>
                  <p className="text-muted-foreground">Upload your resume to get started</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
