
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AlgorithmCards } from "@/components/AlgorithmCards";
import { Footer } from "@/components/Footer";
import { ComparisonPreview } from "@/components/ComparisonPreview";
import { DemoPreview } from "@/components/DemoPreview";
import { AlgorithmPresentation } from "@/components/AlgorithmPresentation";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <AlgorithmCards />
        <AlgorithmPresentation />
        <ComparisonPreview />
        <DemoPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
