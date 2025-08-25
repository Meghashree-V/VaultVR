import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Grid3X3, List, Search, Filter, Eye, ShoppingCart, Plus, Grid } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VRModelViewer } from "@/components/VRModelViewer";
import { useMarketplaceStore } from "../store/marketplaceStore";

export default function Marketplace() {
  const navigate = useNavigate();
  const { items: marketplaceItems } = useMarketplaceStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Furniture", "Architecture", "Beauty", "Object/Prop", "Decor"];

  const toggleLike = (itemId: number) => {
    setLikedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Wearable': return 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50';
      case 'Environment': return 'bg-neon-purple/20 text-neon-purple border-neon-purple/50';
      case 'Object/Prop': return 'bg-neon-pink/20 text-neon-pink border-neon-pink/50';
      case 'Vehicle': return 'bg-neon-blue/20 text-neon-blue border-neon-blue/50';
      case 'Avatar': return 'bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 text-neon-cyan border-neon-cyan/50';
      case 'VR Experience': return 'bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 text-neon-purple border-neon-purple/50';
      default: return 'bg-muted/20 text-muted-foreground border-muted/50';
    }
  };

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-16 bg-gradient-to-b from-background to-background/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">VR Marketplace</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover, buy, and sell premium VR assets, experiences, and digital collectibles
              </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              <div className="glass rounded-2xl p-6 mb-8">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search Bar */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                    <Input
                      placeholder="Search VR assets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-background/50 border-glass-border"
                    />
                  </div>

                  {/* Category Filter */}
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-background/50 border border-glass-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary min-w-[150px]"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>

                  {/* View Mode Toggle */}
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('grid')}
                      className="neon-glow"
                    >
                      <Grid size={18} />
                    </Button>
                    <Button 
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('list')}
                      className="neon-glow"
                    >
                      <List size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marketplace Grid */}
        <section className="pb-20">
          <div className="container mx-auto px-2">
            <div className={`grid gap-4 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1 max-w-6xl mx-auto'
            }`}>
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => navigate(`/product/${item.id}`)}
                  className={`glass rounded-2xl overflow-hidden hover:shadow-neon transition-all duration-300 group cursor-pointer ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'h-96'}`}>
                    <VRModelViewer modelUrl={item.glb} />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(item.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full glass transition-all ${
                        likedItems.includes(item.id) 
                          ? 'text-neon-pink' 
                          : 'text-muted-foreground hover:text-neon-pink'
                      }`}
                    >
                      <Heart size={18} fill={likedItems.includes(item.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Badge className={`${getCategoryColor(item.category)} border`}>
                          {item.category}
                        </Badge>
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Heart size={12} />
                            <span>{item.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye size={12} />
                            <span>{item.views}</span>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2 group-hover:gradient-text transition-all">
                        {item.title}
                      </h3>
                      
                      <div className="text-xl font-bold gradient-text mb-4">
                        {item.price}
                      </div>
                    </div>
                    
                    <div className={`flex gap-2 ${viewMode === 'list' ? 'mt-4' : ''}`}>
                      <Button className="flex-1 neon-glow">
                        <ShoppingCart size={16} className="mr-2" />
                        Buy Now
                      </Button>
                      <Button variant="secondary" size="icon" className="purple-glow">
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No items found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}