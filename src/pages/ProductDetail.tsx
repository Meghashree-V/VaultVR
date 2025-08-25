import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart, Star, Eye, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VRModelViewer } from "@/components/VRModelViewer";
import { useMarketplaceStore } from "../store/marketplaceStore";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items: marketplaceItems } = useMarketplaceStore();
  const [isLiked, setIsLiked] = useState(false);
  
  const product = marketplaceItems.find(item => item.id === parseInt(id || "0"));
  
  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <button 
            onClick={() => navigate('/marketplace')}
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-lg transition-colors"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/marketplace')}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Marketplace
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* VR Model Viewer */}
          <div className="space-y-4">
            <div className="bg-zinc-900 rounded-2xl p-4 h-[600px]">
              <VRModelViewer modelUrl={product.glb} />
            </div>
            <p className="text-sm text-zinc-400 text-center">
              Click and drag to rotate • Scroll to zoom
            </p>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
                  {product.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-zinc-400 mb-4">{product.description}</p>
              <p className="text-sm text-zinc-500">Created by <span className="text-cyan-400">{product.creator}</span></p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-zinc-600"} 
                  />
                ))}
              </div>
              <span className="text-sm text-zinc-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-zinc-400">
              <div className="flex items-center gap-1">
                <Heart size={16} />
                {product.likes}
              </div>
              <div className="flex items-center gap-1">
                <Eye size={16} />
                {product.views}
              </div>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-cyan-400">
              {product.price}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2">
                <ShoppingCart size={20} />
                Buy Now
              </button>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex-1 border border-zinc-700 hover:border-zinc-600 py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                    isLiked ? 'text-red-400 border-red-400' : ''
                  }`}
                >
                  <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                  {isLiked ? 'Liked' : 'Like'}
                </button>
                
                <button className="flex-1 border border-zinc-700 hover:border-zinc-600 py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-zinc-900 rounded-xl p-4 space-y-3">
              <h3 className="font-semibold">Product Details</h3>
              <div className="space-y-2 text-sm text-zinc-400">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Creator:</span>
                  <span>{product.creator}</span>
                </div>
                <div className="flex justify-between">
                  <span>Views:</span>
                  <span>{product.views.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Likes:</span>
                  <span>{product.likes.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
