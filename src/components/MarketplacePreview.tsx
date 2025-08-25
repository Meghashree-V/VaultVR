import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, ShoppingCart, Star, Filter, Grid, List } from "lucide-react";
import { useState } from "react";

const mockAssets = [
  {
    id: 1,
    title: "Cyberpunk City Explorer",
    creator: "NeonCreator.icp",
    price: "2.5 ICP",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    category: "Environment",
    likes: 847,
    views: 12300,
    rating: 4.8,
    trending: true
  },
  {
    id: 2,
    title: "Space Station VR",
    creator: "SpaceVR.icp",
    price: "1.8 ICP",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop",
    category: "Experience",
    likes: 623,
    views: 8900,
    rating: 4.9,
    trending: false
  },
  {
    id: 3,
    title: "Fantasy Forest World",
    creator: "MysticWorlds.icp",
    price: "3.2 ICP",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    category: "Environment",
    likes: 1205,
    views: 15600,
    rating: 4.7,
    trending: true
  },
  {
    id: 4,
    title: "Ocean Depths VR",
    creator: "AquaVR.icp",
    price: "2.1 ICP",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    category: "Experience",
    likes: 456,
    views: 6800,
    rating: 4.6,
    trending: false
  },
  {
    id: 5,
    title: "Neon Racing Circuit",
    creator: "RaceVR.icp",
    price: "4.0 ICP",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop",
    category: "Game",
    likes: 892,
    views: 11200,
    rating: 4.8,
    trending: true
  },
  {
    id: 6,
    title: "Ancient Temple Quest",
    creator: "HistoryVR.icp",
    price: "2.8 ICP",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d0c66e?w=400&h=300&fit=crop",
    category: "Adventure",
    likes: 734,
    views: 9500,
    rating: 4.9,
    trending: false
  }
];

export const MarketplacePreview = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [likedAssets, setLikedAssets] = useState<number[]>([]);

  const toggleLike = (assetId: number) => {
    setLikedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Environment': return 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50';
      case 'Experience': return 'bg-neon-purple/20 text-neon-purple border-neon-purple/50';
      case 'Game': return 'bg-neon-pink/20 text-neon-pink border-neon-pink/50';
      case 'Adventure': return 'bg-neon-blue/20 text-neon-blue border-neon-blue/50';
      default: return 'bg-muted/20 text-muted-foreground border-muted/50';
    }
  };

  return (
    <section className="py-20 bg-background/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Featured</span> Experiences
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular and trending VR experiences in our marketplace
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <Button variant="secondary" className="purple-glow">
              <Filter size={18} className="mr-2" />
              Filters
            </Button>
            <select className="bg-input border border-glass-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          
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

        {/* Assets Grid */}
        <div className={`grid gap-6 mb-12 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {mockAssets.map((asset) => (
            <div 
              key={asset.id} 
              className="glass rounded-2xl overflow-hidden hover:shadow-neon transition-all duration-300 group cursor-pointer"
            >
              <div className="relative">
                <img 
                  src={asset.image} 
                  alt={asset.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {asset.trending && (
                  <Badge className="absolute top-3 left-3 bg-neon-pink/20 text-neon-pink border-neon-pink/50">
                    🔥 Trending
                  </Badge>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(asset.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full glass transition-all ${
                    likedAssets.includes(asset.id) 
                      ? 'text-neon-pink' 
                      : 'text-muted-foreground hover:text-neon-pink'
                  }`}
                >
                  <Heart size={18} fill={likedAssets.includes(asset.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`${getCategoryColor(asset.category)} border`}>
                    {asset.category}
                  </Badge>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Star size={14} className="text-neon-cyan fill-current" />
                    <span>{asset.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:gradient-text transition-all">
                  {asset.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  by {asset.creator}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Heart size={14} />
                      <span>{asset.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye size={14} />
                      <span>{asset.views}</span>
                    </div>
                  </div>
                  <div className="text-lg font-bold gradient-text">
                    {asset.price}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button className="flex-1 neon-glow">
                    <ShoppingCart size={16} className="mr-2" />
                    Buy Now
                  </Button>
                  <Button variant="secondary" size="icon" className="purple-glow">
                    <Eye size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button size="lg" variant="secondary" className="purple-glow px-8">
            View All Experiences
          </Button>
        </div>
      </div>
    </section>
  );
};