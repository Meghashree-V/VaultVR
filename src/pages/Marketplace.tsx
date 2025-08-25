import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Heart, Eye, ShoppingCart, Search, Filter, Grid, List, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VRModelViewer } from "@/components/VRModelViewer";

const marketplaceItems = [
  {
    id: 1,
    title: "Aesthetic Desk",
    glb: "/models/Aesthetic Desk .glb",
    category: "Furniture",
    price: "85 ICP",
    likes: 724,
    views: 4200
  },
  {
    id: 2,
    title: "Apartment",
    glb: "/models/Apartment.glb",
    category: "Architecture",
    price: "150 ICP",
    likes: 892,
    views: 5400
  },
  {
    id: 3,
    title: "Couch Small",
    glb: "/models/Couch Small.glb",
    category: "Furniture",
    price: "65 ICP",
    likes: 445,
    views: 2800
  },
  {
    id: 4,
    title: "Desk",
    glb: "/models/Desk.glb",
    category: "Furniture",
    price: "55 ICP",
    likes: 398,
    views: 2400
  },
  {
    id: 5,
    title: "Duck",
    glb: "/models/Duck.glb",
    category: "Object/Prop",
    price: "3 ICP",
    likes: 189,
    views: 890
  },
  {
    id: 6,
    title: "Kitchen Table",
    glb: "/models/Kitchen Table.glb",
    category: "Furniture",
    price: "75 ICP",
    likes: 612,
    views: 3600
  },
  {
    id: 7,
    title: "Nail Polish",
    glb: "/models/Nail Polish.glb",
    category: "Beauty",
    price: "8 ICP",
    likes: 198,
    views: 1100
  },
  {
    id: 8,
    title: "Office Chair",
    glb: "/models/Office Chair.glb",
    category: "Furniture",
    price: "40 ICP",
    likes: 356,
    views: 2100
  },
  {
    id: 9,
    title: "Plants - Assorted Shelf Plants",
    glb: "/models/Plants - Assorted shelf plants.glb",
    category: "Decor",
    price: "25 ICP",
    likes: 478,
    views: 2900
  }
];

export default function Marketplace() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Wearable", "Environment", "Object/Prop", "Vehicle", "Avatar", "VR Experience"];

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
          <div className="container mx-auto px-6">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}>
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => navigate(`/product/${item.id}`)}
                  className={`glass rounded-2xl overflow-hidden hover:shadow-neon transition-all duration-300 group cursor-pointer ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                    <VRModelViewer url={item.glb} />
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