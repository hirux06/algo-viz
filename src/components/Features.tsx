
import {
  FileUp,
  LineChart,
  Sparkles,
  FileText,
  Columns,
  Edit,
  Download,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-lg p-6 hover-scale",
      "glass-card-subtle"
    )}>
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            AI-Powered Resume Optimization
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            Our intelligent tools analyze and enhance your resume to maximize your chances of landing interviews.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<FileUp className="h-6 w-6" />}
            title="Resume Analysis"
            description="Upload your resume and get instant insights on formatting, keywords, and overall structure."
          />
          <FeatureCard
            icon={<LineChart className="h-6 w-6" />}
            title="ATS Compatibility"
            description="Real-time ATS compatibility score to ensure your resume gets past automated screening systems."
          />
          <FeatureCard
            icon={<Sparkles className="h-6 w-6" />}
            title="AI Suggestions"
            description="Get intelligent recommendations to improve content, keywords, and format."
          />
          <FeatureCard
            icon={<Columns className="h-6 w-6" />}
            title="Job Matching"
            description="Compare your resume against multiple job descriptions for perfect alignment."
          />
          <FeatureCard
            icon={<Edit className="h-6 w-6" />}
            title="Interactive Editing"
            description="Edit your resume with real-time feedback and ATS score recalculation."
          />
          <FeatureCard
            icon={<Layers className="h-6 w-6" />}
            title="AI Section Builder"
            description="Generate optimized resume sections with the help of AI templates."
          />
        </div>
      </div>
    </section>
  );
}
