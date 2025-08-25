import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { icpService, Asset, CreateAssetRequest } from '@/lib/icp';
import { Principal } from '@dfinity/principal';

interface ICPContextType {
  isAuthenticated: boolean;
  principal: Principal | null;
  assets: Asset[];
  login: () => Promise<boolean>;
  logout: () => Promise<void>;
  createAsset: (request: CreateAssetRequest) => Promise<number>;
  purchaseAsset: (assetId: number) => Promise<string>;
  likeAsset: (assetId: number) => Promise<boolean>;
  refreshAssets: () => Promise<void>;
  loading: boolean;
}

const ICPContext = createContext<ICPContextType | undefined>(undefined);

export const useICP = () => {
  const context = useContext(ICPContext);
  if (context === undefined) {
    throw new Error('useICP must be used within an ICPProvider');
  }
  return context;
};

interface ICPProviderProps {
  children: ReactNode;
}

export const ICPProvider: React.FC<ICPProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState<Principal | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeICP();
  }, []);

  const initializeICP = async () => {
    try {
      await icpService.init();
      const authenticated = icpService.isLoggedIn();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        setPrincipal(icpService.getPrincipal());
        await refreshAssets();
      }
    } catch (error) {
      console.error('Failed to initialize ICP:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (): Promise<boolean> => {
    try {
      const success = await icpService.login();
      if (success) {
        setIsAuthenticated(true);
        setPrincipal(icpService.getPrincipal());
        await refreshAssets();
      }
      return success;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await icpService.logout();
      setIsAuthenticated(false);
      setPrincipal(null);
      setAssets([]);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const createAsset = async (request: CreateAssetRequest): Promise<number> => {
    try {
      const assetId = await icpService.createAsset(request);
      await refreshAssets(); // Refresh to show new asset
      return assetId;
    } catch (error) {
      console.error('Failed to create asset:', error);
      throw error;
    }
  };

  const purchaseAsset = async (assetId: number): Promise<string> => {
    try {
      const result = await icpService.purchaseAsset(assetId);
      await refreshAssets(); // Refresh to update ownership
      return result;
    } catch (error) {
      console.error('Failed to purchase asset:', error);
      throw error;
    }
  };

  const likeAsset = async (assetId: number): Promise<boolean> => {
    try {
      const result = await icpService.likeAsset(assetId);
      if (result) {
        await refreshAssets(); // Refresh to update like count
      }
      return result;
    } catch (error) {
      console.error('Failed to like asset:', error);
      return false;
    }
  };

  const refreshAssets = async (): Promise<void> => {
    try {
      const allAssets = await icpService.getAllAssets();
      setAssets(allAssets);
    } catch (error) {
      console.error('Failed to fetch assets:', error);
    }
  };

  const value: ICPContextType = {
    isAuthenticated,
    principal,
    assets,
    login,
    logout,
    createAsset,
    purchaseAsset,
    likeAsset,
    refreshAssets,
    loading,
  };

  return (
    <ICPContext.Provider value={value}>
      {children}
    </ICPContext.Provider>
  );
};
