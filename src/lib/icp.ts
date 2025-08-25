import { AuthClient } from '@dfinity/auth-client';
import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

// Canister IDs (will be generated when deployed)
const CANISTER_ID = process.env.REACT_APP_CANISTER_ID || 'rdmx6-jaaaa-aaaah-qcaiq-cai';

// IDL Interface for the backend canister
const idlFactory = ({ IDL }: any) => {
  const AssetId = IDL.Nat;
  const UserId = IDL.Principal;
  
  const Asset = IDL.Record({
    'id': AssetId,
    'title': IDL.Text,
    'description': IDL.Text,
    'category': IDL.Text,
    'price': IDL.Nat,
    'creator': UserId,
    'createdAt': IDL.Int,
    'likes': IDL.Nat,
    'views': IDL.Nat,
    'modelUrl': IDL.Text,
    'rating': IDL.Float64,
    'reviews': IDL.Nat,
  });
  
  const CreateAssetRequest = IDL.Record({
    'title': IDL.Text,
    'description': IDL.Text,
    'category': IDL.Text,
    'price': IDL.Nat,
    'modelUrl': IDL.Text,
  });
  
  const PurchaseResult = IDL.Variant({
    'success': IDL.Text,
    'error': IDL.Text,
  });
  
  const Result = IDL.Variant({
    'ok': AssetId,
    'err': IDL.Text,
  });
  
  return IDL.Service({
    'getAllAssets': IDL.Func([], [IDL.Vec(Asset)], ['query']),
    'getAsset': IDL.Func([AssetId], [IDL.Opt(Asset)], ['query']),
    'getAssetsByCategory': IDL.Func([IDL.Text], [IDL.Vec(Asset)], ['query']),
    'getUserAssets': IDL.Func([UserId], [IDL.Vec(Asset)], ['query']),
    'createAsset': IDL.Func([UserId, CreateAssetRequest], [Result], []),
    'purchaseAsset': IDL.Func([UserId, AssetId], [PurchaseResult], []),
    'likeAsset': IDL.Func([AssetId], [IDL.Bool], []),
    'incrementViews': IDL.Func([AssetId], [IDL.Bool], []),
  });
};

export interface Asset {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  creator: Principal;
  createdAt: bigint;
  likes: number;
  views: number;
  modelUrl: string;
  rating: number;
  reviews: number;
}

export interface CreateAssetRequest {
  title: string;
  description: string;
  category: string;
  price: number;
  modelUrl: string;
}

class ICPService {
  private authClient: AuthClient | null = null;
  private actor: any = null;
  private isAuthenticated = false;

  async init() {
    this.authClient = await AuthClient.create();
    
    if (await this.authClient.isAuthenticated()) {
      this.isAuthenticated = true;
      await this.createActor();
    }
  }

  async login() {
    if (!this.authClient) await this.init();
    
    return new Promise<boolean>((resolve) => {
      this.authClient!.login({
        identityProvider: process.env.NODE_ENV === 'production' 
          ? 'https://identity.ic0.app/#authorize'
          : `http://localhost:4943?canisterId=rdmx6-jaaaa-aaaah-qcaiq-cai#authorize`,
        onSuccess: async () => {
          this.isAuthenticated = true;
          await this.createActor();
          resolve(true);
        },
        onError: () => {
          resolve(false);
        }
      });
    });
  }

  async logout() {
    if (this.authClient) {
      await this.authClient.logout();
      this.isAuthenticated = false;
      this.actor = null;
    }
  }

  private async createActor() {
    if (!this.authClient) return;

    const identity = this.authClient.getIdentity();
    const agent = new HttpAgent({
      identity,
      host: process.env.NODE_ENV === 'production' 
        ? 'https://ic0.app' 
        : 'http://localhost:4943'
    });

    // Fetch root key for local development
    if (process.env.NODE_ENV !== 'production') {
      await agent.fetchRootKey();
    }

    this.actor = Actor.createActor(idlFactory, {
      agent,
      canisterId: CANISTER_ID,
    });
  }

  getIdentity() {
    return this.authClient?.getIdentity();
  }

  getPrincipal(): Principal | null {
    const identity = this.getIdentity();
    return identity ? identity.getPrincipal() : null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Asset management functions
  async getAllAssets(): Promise<Asset[]> {
    if (!this.actor) throw new Error('Not authenticated');
    return await this.actor.getAllAssets();
  }

  async getAsset(id: number): Promise<Asset | null> {
    if (!this.actor) throw new Error('Not authenticated');
    const result = await this.actor.getAsset(id);
    return result.length > 0 ? result[0] : null;
  }

  async createAsset(request: CreateAssetRequest): Promise<number> {
    if (!this.actor) throw new Error('Not authenticated');
    const principal = this.getPrincipal();
    if (!principal) throw new Error('No principal found');
    
    const result = await this.actor.createAsset(principal, request);
    if ('ok' in result) {
      return Number(result.ok);
    } else {
      throw new Error(result.err);
    }
  }

  async purchaseAsset(assetId: number): Promise<string> {
    if (!this.actor) throw new Error('Not authenticated');
    const principal = this.getPrincipal();
    if (!principal) throw new Error('No principal found');
    
    const result = await this.actor.purchaseAsset(principal, assetId);
    if ('success' in result) {
      return result.success;
    } else {
      throw new Error(result.error);
    }
  }

  async likeAsset(assetId: number): Promise<boolean> {
    if (!this.actor) throw new Error('Not authenticated');
    return await this.actor.likeAsset(assetId);
  }

  async incrementViews(assetId: number): Promise<boolean> {
    if (!this.actor) throw new Error('Not authenticated');
    return await this.actor.incrementViews(assetId);
  }

  // Convert ICP to e8s (1 ICP = 100,000,000 e8s)
  icpToE8s(icp: number): number {
    return Math.floor(icp * 100_000_000);
  }

  // Convert e8s to ICP
  e8sToIcp(e8s: number): number {
    return e8s / 100_000_000;
  }
}

export const icpService = new ICPService();
