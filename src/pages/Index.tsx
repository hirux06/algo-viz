
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AlgorithmCards } from "@/components/AlgorithmCards";
import { Footer } from "@/components/Footer";
import { ComparisonPreview } from "@/components/ComparisonPreview";
import { DemoPreview } from "@/components/DemoPreview";
import { AlgorithmPresentation } from "@/components/AlgorithmPresentation";
import { Features } from "@/components/Features";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <AlgorithmCards />
        <DemoPreview />
        <ComparisonPreview />
        <AlgorithmPresentation />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
