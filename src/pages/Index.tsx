import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MarketplacePreview } from "@/components/MarketplacePreview";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <MarketplacePreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
