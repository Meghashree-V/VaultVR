import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Nat "mo:base/Nat";
import Int "mo:base/Int";

actor VRMarketplace {
    
    // Types
    public type AssetId = Nat;
    public type UserId = Principal;
    
    public type Asset = {
        id: AssetId;
        title: Text;
        description: Text;
        category: Text;
        price: Nat; // Price in e8s (ICP tokens)
        creator: UserId;
        createdAt: Int;
        likes: Nat;
        views: Nat;
        modelUrl: Text;
        rating: Float;
        reviews: Nat;
    };
    
    public type CreateAssetRequest = {
        title: Text;
        description: Text;
        category: Text;
        price: Nat;
        modelUrl: Text;
    };
    
    public type PurchaseResult = {
        #success: Text;
        #error: Text;
    };
    
    // State
    private stable var nextAssetId: AssetId = 1;
    private var assets = HashMap.HashMap<AssetId, Asset>(10, Nat.equal, Nat.hash);
    private var userAssets = HashMap.HashMap<UserId, [AssetId]>(10, Principal.equal, Principal.hash);
    private var assetOwners = HashMap.HashMap<AssetId, UserId>(10, Nat.equal, Nat.hash);
    
    // Initialize with sample data
    private func initSampleData() {
        let sampleAssets: [Asset] = [
            {
                id = 1;
                title = "Aesthetic Desk";
                description = "Modern minimalist desk perfect for any VR workspace";
                category = "Furniture";
                price = 45_00000000; // 45 ICP in e8s
                creator = Principal.fromText("rdmx6-jaaaa-aaaah-qcaiq-cai");
                createdAt = Time.now();
                likes = 892;
                views = 5400;
                modelUrl = "/models/Aesthetic Desk .glb";
                rating = 4.8;
                reviews = 234;
            },
            {
                id = 2;
                title = "Apartment";
                description = "Fully furnished modern apartment with detailed interior";
                category = "Architecture";
                price = 120_00000000; // 120 ICP in e8s
                creator = Principal.fromText("rdmx6-jaaaa-aaaah-qcaiq-cai");
                createdAt = Time.now();
                likes = 634;
                views = 3200;
                modelUrl = "/models/Apartment.glb";
                rating = 4.9;
                reviews = 187;
            }
        ];
        
        for (asset in sampleAssets.vals()) {
            assets.put(asset.id, asset);
            assetOwners.put(asset.id, asset.creator);
        };
        
        nextAssetId := 3;
    };
    
    // Initialize sample data on first deployment
    initSampleData();
    
    // Public functions
    public query func getAllAssets(): async [Asset] {
        Iter.toArray(assets.vals())
    };
    
    public query func getAsset(id: AssetId): async ?Asset {
        assets.get(id)
    };
    
    public query func getAssetsByCategory(category: Text): async [Asset] {
        let filtered = Iter.filter(assets.vals(), func(asset: Asset): Bool {
            asset.category == category
        });
        Iter.toArray(filtered)
    };
    
    public query func getUserAssets(userId: UserId): async [Asset] {
        switch (userAssets.get(userId)) {
            case null { [] };
            case (?assetIds) {
                let userAssetsList = Array.mapFilter<AssetId, Asset>(assetIds, func(id: AssetId): ?Asset {
                    assets.get(id)
                });
                userAssetsList
            };
        }
    };
    
    public func createAsset(caller: Principal, request: CreateAssetRequest): async Result.Result<AssetId, Text> {
        let assetId = nextAssetId;
        nextAssetId += 1;
        
        let newAsset: Asset = {
            id = assetId;
            title = request.title;
            description = request.description;
            category = request.category;
            price = request.price;
            creator = caller;
            createdAt = Time.now();
            likes = 0;
            views = 0;
            modelUrl = request.modelUrl;
            rating = 5.0;
            reviews = 0;
        };
        
        assets.put(assetId, newAsset);
        assetOwners.put(assetId, caller);
        
        // Update user assets
        switch (userAssets.get(caller)) {
            case null {
                userAssets.put(caller, [assetId]);
            };
            case (?existingAssets) {
                let updatedAssets = Array.append(existingAssets, [assetId]);
                userAssets.put(caller, updatedAssets);
            };
        };
        
        #ok(assetId)
    };
    
    public func purchaseAsset(buyer: Principal, assetId: AssetId): async PurchaseResult {
        switch (assets.get(assetId)) {
            case null {
                #error("Asset not found")
            };
            case (?asset) {
                // In a real implementation, you would:
                // 1. Check buyer's ICP balance
                // 2. Transfer ICP from buyer to seller
                // 3. Transfer asset ownership
                // 4. Update ownership records
                
                // For demo purposes, we'll simulate a successful purchase
                switch (userAssets.get(buyer)) {
                    case null {
                        userAssets.put(buyer, [assetId]);
                    };
                    case (?existingAssets) {
                        let updatedAssets = Array.append(existingAssets, [assetId]);
                        userAssets.put(buyer, updatedAssets);
                    };
                };
                
                #success("Asset purchased successfully")
            };
        }
    };
    
    public func likeAsset(assetId: AssetId): async Bool {
        switch (assets.get(assetId)) {
            case null { false };
            case (?asset) {
                let updatedAsset = {
                    asset with likes = asset.likes + 1
                };
                assets.put(assetId, updatedAsset);
                true
            };
        }
    };
    
    public func incrementViews(assetId: AssetId): async Bool {
        switch (assets.get(assetId)) {
            case null { false };
            case (?asset) {
                let updatedAsset = {
                    asset with views = asset.views + 1
                };
                assets.put(assetId, updatedAsset);
                true
            };
        }
    };
    
    // System functions for upgrades
    system func preupgrade() {
        // Stable variables are automatically preserved
    };
    
    system func postupgrade() {
        // Reinitialize HashMaps if needed
    };
}
