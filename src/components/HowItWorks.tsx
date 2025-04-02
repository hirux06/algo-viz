
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Upload Your Resume",
    description:
      "Upload your current resume as PDF or text. Our AI system will analyze the content, structure, and formatting.",
  },
  {
    number: "02",
    title: "Review Analysis",
    description:
      "Get detailed insights on ATS compatibility, keyword optimization, and formatting improvements needed.",
  },
  {
    number: "03",
    title: "Add Job Descriptions",
    description:
      "Input target job descriptions to match your resume against specific roles and requirements.",
  },
  {
    number: "04",
    title: "Apply AI Suggestions",
    description:
      "Implement our AI-powered recommendations to optimize your resume for the specific roles.",
  },
  {
    number: "05",
    title: "Edit & Enhance",
    description:
      "Use our interactive editor to make changes with real-time feedback on improvements.",
  },
  {
    number: "06",
    title: "Download & Apply",
    description:
      "Download your optimized, ATS-friendly resume and start applying with confidence.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            How It Works
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            Our simple process helps you optimize your resume in minutes
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "p-6 rounded-lg glass-card-subtle",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl font-bold text-primary/50 mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
