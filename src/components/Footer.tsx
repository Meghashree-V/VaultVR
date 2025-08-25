import { Button } from "@/components/ui/button";
import { Twitter, Github, MessageCircle, Mail, Globe, Zap, Heart } from "lucide-react";
export const Footer = () => {
  return <footer className="border-t border-glass-border bg-background/80">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center neon-glow">
                <span className="text-black font-bold text-sm">
              </span>
              </div>
              <div>
                <h3 className="font-bold gradient-text">Vault VR </h3>
                <p className="text-xs text-muted-foreground">
              </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              The future of VR asset trading on the Internet Computer blockchain. 
              Discover, create, and trade immersive experiences.
            </p>
            <div className="flex items-center space-x-2">
              <Zap size={16} className="text-neon-cyan" />
              <span className="text-sm text-muted-foreground">Powered by Internet Computer</span>
            </div>
          </div>

          {/* Marketplace */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Marketplace</h4>
            <div className="space-y-2">
              <a href="/marketplace" className="block text-sm text-muted-foreground hover:text-neon-cyan transition-colors">
                Browse Assets
              </a>
              <a href="/marketplace?category=environments" className="block text-sm text-muted-foreground hover:text-neon-cyan transition-colors">
                Environments
              </a>
              <a href="/marketplace?category=experiences" className="block text-sm text-muted-foreground hover:text-neon-cyan transition-colors">
                Experiences
              </a>
              <a href="/marketplace?category=games" className="block text-sm text-muted-foreground hover:text-neon-cyan transition-colors">
                Games
              </a>
              <a href="/marketplace?trending=true" className="block text-sm text-muted-foreground hover:text-neon-cyan transition-colors">
                Trending
              </a>
            </div>
          </div>

          {/* Creators */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Creators</h4>
            <div className="space-y-2">
              <a href="/create" className="block text-sm text-muted-foreground hover:text-neon-purple transition-colors">
                Upload Asset
              </a>
              <a href="/dashboard" className="block text-sm text-muted-foreground hover:text-neon-purple transition-colors">
                Creator Dashboard
              </a>
              <a href="/docs/guidelines" className="block text-sm text-muted-foreground hover:text-neon-purple transition-colors">
                Asset Guidelines
              </a>
              <a href="/docs/monetization" className="block text-sm text-muted-foreground hover:text-neon-purple transition-colors">
                Monetization
              </a>
              <a href="/community" className="block text-sm text-muted-foreground hover:text-neon-purple transition-colors">
                Creator Community
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Support</h4>
            <div className="space-y-2">
              <a href="/help" className="block text-sm text-muted-foreground hover:text-neon-pink transition-colors">
                Help Center
              </a>
              <a href="/docs" className="block text-sm text-muted-foreground hover:text-neon-pink transition-colors">
                Documentation
              </a>
              <a href="/contact" className="block text-sm text-muted-foreground hover:text-neon-pink transition-colors">
                Contact Us
              </a>
              <a href="/status" className="block text-sm text-muted-foreground hover:text-neon-pink transition-colors">
                Status Page
              </a>
              <a href="/bug-report" className="block text-sm text-muted-foreground hover:text-neon-pink transition-colors">
                Report Bug
              </a>
            </div>
          </div>
        </div>

        {/* Social Links & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-center py-8 border-t border-glass-border space-y-6 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Follow us:</span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="hover:text-neon-cyan">
                <Twitter size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-neon-purple">
                <MessageCircle size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-neon-pink">
                <Github size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-neon-cyan">
                <Globe size={18} />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Stay updated:</span>
            <div className="flex space-x-2">
              <input type="email" placeholder="Enter your email" className="px-4 py-2 bg-input border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
              <Button className="neon-glow">
                <Mail size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-glass-border space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>© 2024 ICP VR Marketplace</span>
            <span>•</span>
            <a href="/privacy" className="hover:text-neon-cyan transition-colors">Privacy</a>
            <span>•</span>
            <a href="/terms" className="hover:text-neon-cyan transition-colors">Terms</a>
            <span>•</span>
            <a href="/cookies" className="hover:text-neon-cyan transition-colors">Cookies</a>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart size={14} className="text-neon-pink fill-current" />
            <span>for the VR community</span>
          </div>
        </div>
      </div>
    </footer>;
};