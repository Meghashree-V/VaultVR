import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Upload, Eye, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const categories = [
  "Avatars",
  "Props", 
  "Environments",
  "Vehicles",
  "Wearables",
  "VR Experiences",
  "Animations",
  "Textures"
];

const acceptedFileTypes = [
  ".gltf",
  ".glb", 
  ".fbx",
  ".obj",
  ".gmpf"
];

export default function Create() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: ""
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (!acceptedFileTypes.includes(fileExtension)) {
        toast.error(`File type ${fileExtension} not supported. Please upload: ${acceptedFileTypes.join(', ')}`);
        return;
      }

      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        toast.error("File size must be less than 50MB");
        return;
      }

      setUploadedFile(file);
      
      // Create preview URL for supported formats
      if (file.type.startsWith('image/') || fileExtension === '.glb' || fileExtension === '.gltf') {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
      
      toast.success("File uploaded successfully!");
    }
  };

  const handlePublish = async () => {
    if (!uploadedFile) {
      toast.error("Please upload an asset file");
      return;
    }

    if (!formData.title || !formData.description || !formData.category || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (parseFloat(formData.price) <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    setIsUploading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Asset published successfully!");
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        price: ""
      });
      setUploadedFile(null);
      setPreviewUrl(null);
      
    } catch (error) {
      toast.error("Failed to publish asset. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-16 bg-gradient-to-b from-background to-background/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Create & Mint</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Upload your VR assets and mint them as NFTs on the ICP blockchain
              </p>
            </div>
          </div>
        </section>

        {/* Create Form */}
        <section className="pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="glass rounded-2xl p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  
                  {/* Upload Section */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-6 gradient-text">Upload Asset</h2>
                      
                      {/* File Upload */}
                      <div className="space-y-4">
                        <Label htmlFor="file-upload" className="text-base font-medium">
                          Asset File *
                        </Label>
                        <div className="relative">
                          <input
                            id="file-upload"
                            type="file"
                            accept={acceptedFileTypes.join(',')}
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-glass-border rounded-lg cursor-pointer glass hover:shadow-neon transition-all duration-300"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {acceptedFileTypes.join(', ')} (MAX 50MB)
                              </p>
                            </div>
                          </label>
                        </div>
                        
                        {uploadedFile && (
                          <div className="glass p-4 rounded-lg">
                            <p className="text-sm font-medium text-neon-cyan">
                              Uploaded: {uploadedFile.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        )}
                      </div>

                      {/* 3D Preview */}
                      {previewUrl && (
                        <div className="space-y-4">
                          <Label className="text-base font-medium">3D Preview</Label>
                          <div className="glass rounded-lg p-6 text-center">
                            <div className="w-full h-48 bg-background/30 rounded-lg flex items-center justify-center mb-4">
                              <Eye className="w-12 h-12 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Interactive 3D preview will appear here
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Form Section */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6 gradient-text">Asset Information</h2>
                    
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title" className="text-base font-medium">
                          Asset Title *
                        </Label>
                        <Input
                          id="title"
                          name="title"
                          placeholder="Enter asset title..."
                          value={formData.title}
                          onChange={handleInputChange}
                          className="mt-2 bg-background/50 border-glass-border"
                        />
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-base font-medium">
                          Description *
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Describe your asset..."
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={4}
                          className="mt-2 bg-background/50 border-glass-border resize-none"
                        />
                      </div>

                      <div>
                        <Label htmlFor="category" className="text-base font-medium">
                          Category *
                        </Label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full mt-2 bg-background/50 border border-glass-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select category...</option>
                          {categories.map(category => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-neon-cyan">Pricing</h3>
                      <div>
                        <Label htmlFor="price" className="text-base font-medium">
                          Price (ICP) *
                        </Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          min="0"
                          step="0.1"
                          placeholder="0.0"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="mt-2 bg-background/50 border-glass-border"
                        />
                      </div>
                    </div>

                    {/* Publish Button */}
                    <div className="pt-6">
                      <Button
                        onClick={handlePublish}
                        disabled={isUploading}
                        className="w-full neon-glow text-lg py-6"
                        size="lg"
                      >
                        {isUploading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Publishing...
                          </>
                        ) : (
                          <>
                            <Sparkles size={20} className="mr-2" />
                            Publish Asset
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        Your asset will be minted as an NFT and listed in the marketplace
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}