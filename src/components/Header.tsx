import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, User, Wallet, Bell, Menu, X, ShoppingBag, Plus, Home } from "lucide-react";
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleWallet = () => setIsConnected(!isConnected);
  return <header className="sticky top-0 z-50 glass border-b border-glass-border">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            
            <div className="hidden md:block">
              <h1 className="text-xl font-bold gradient-text">Vault VR </h1>
              
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="/" className="flex items-center space-x-2 text-foreground hover:text-neon-cyan transition-colors">
              <Home size={18} />
              <span>Home</span>
            </a>
            <a href="/marketplace" className="flex items-center space-x-2 text-foreground hover:text-neon-cyan transition-colors">
              <ShoppingBag size={18} />
              <span>Marketplace</span>
            </a>
            <a href="/create" className="flex items-center space-x-2 text-foreground hover:text-neon-cyan transition-colors">
              <Plus size={18} />
              <span>Create</span>
            </a>
            <a href="/dashboard" className="flex items-center space-x-2 text-foreground hover:text-neon-cyan transition-colors">
              <User size={18} />
              <span>Dashboard</span>
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input type="text" placeholder="Search VR experiences..." className="w-full pl-10 pr-4 py-2 bg-input border border-glass-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative hover:bg-secondary neon-glow">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-neon-pink rounded-full animate-pulse"></span>
            </Button>

            {/* Wallet Connection */}
            <Button variant={isConnected ? "secondary" : "default"} onClick={toggleWallet} className={`${isConnected ? 'purple-glow' : 'neon-glow'} font-medium`}>
              <Wallet size={18} className="mr-2" />
              {isConnected ? '0.42 ICP' : 'Connect'}
            </Button>

            {/* Profile/Login */}
            <Button variant="ghost" size="icon" className="hover:bg-secondary purple-glow">
              <User size={20} />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="lg:hidden mt-4 pb-4 border-t border-glass-border">
            <div className="flex flex-col space-y-4 pt-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <input type="text" placeholder="Search VR experiences..." className="w-full pl-10 pr-4 py-2 bg-input border border-glass-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
              </div>
              
              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-3">
                <a href="/" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary transition-colors">
                  <Home size={18} />
                  <span>Home</span>
                </a>
                <a href="/marketplace" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary transition-colors">
                  <ShoppingBag size={18} />
                  <span>Marketplace</span>
                </a>
                <a href="/create" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary transition-colors">
                  <Plus size={18} />
                  <span>Create</span>
                </a>
                <a href="/dashboard" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary transition-colors">
                  <User size={18} />
                  <span>Dashboard</span>
                </a>
              </div>
            </div>
          </div>}
      </nav>
    </header>;
};