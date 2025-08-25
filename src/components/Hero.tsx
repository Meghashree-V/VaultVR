import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, Globe, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
export const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{
      backgroundImage: `url(${heroBg})`
    }}></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-neon-cyan/10 animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-neon-purple/10 animate-float" style={{
        animationDelay: '2s'
      }}></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 rounded-full bg-neon-pink/10 animate-float" style={{
        animationDelay: '4s'
      }}></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 rounded-full bg-neon-blue/10 animate-float" style={{
        animationDelay: '1s'
      }}></div>
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-glass-border mb-8 neon-glow">
            <Zap size={16} className="mr-2 text-neon-cyan" />
            <span className="text-sm font-medium gradient-text">Powered by ICP Blockahin</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="gradient-text">The Future of</span>
            <br />
            <span className="text-foreground">VR Trading</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover, create, and trade immersive VR experiences on the world's most advanced blockchain. 
            Welcome to the <span className="gradient-text font-semibold">Neon Horizon</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="neon-glow bg-gradient-primary hover:shadow-neon text-black font-semibold px-8 py-4 text-lg">
              Explore Marketplace
              <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button size="lg" variant="secondary" className="purple-glow px-8 py-4 text-lg">
              <Play size={20} className="mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Feature Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="glass rounded-2xl p-6 text-center neon-glow">
              <Globe className="w-8 h-8 mx-auto mb-3 text-neon-cyan" />
              <div className="text-2xl font-bold gradient-text mb-1">500+</div>
              <div className="text-sm text-muted-foreground">VR Experiences</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center purple-glow">
              <Shield className="w-8 h-8 mx-auto mb-3 text-neon-purple" />
              <div className="text-2xl font-bold gradient-text mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Decentralized</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center pink-glow">
              <Zap className="w-8 h-8 mx-auto mb-3 text-neon-pink" />
              <div className="text-2xl font-bold gradient-text mb-1">0.001</div>
              <div className="text-sm text-muted-foreground">ICP Gas Fees</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>;
};