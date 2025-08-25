import { create } from 'zustand';

export interface MarketplaceItem {
  id: number;
  title: string;
  glb: string;
  category: string;
  price: string;
  likes: number;
  views: number;
  description?: string;
  creator?: string;
  rating?: number;
  reviews?: number;
}

interface MarketplaceStore {
  items: MarketplaceItem[];
  addItem: (item: Omit<MarketplaceItem, 'id'>) => void;
  getNextId: () => number;
}

const initialItems: MarketplaceItem[] = [
  {
    id: 1,
    title: "Aesthetic Desk",
    glb: "/models/Aesthetic Desk .glb",
    category: "Furniture",
    price: "45 ICP",
    likes: 892,
    views: 5400
  },
  {
    id: 2,
    title: "Apartment",
    glb: "/models/Apartment.glb",
    category: "Architecture",
    price: "120 ICP",
    likes: 634,
    views: 3200
  },
  {
    id: 3,
    title: "Desk",
    glb: "/models/Desk.glb",
    category: "Furniture",
    price: "35 ICP",
    likes: 423,
    views: 2800
  },
  {
    id: 4,
    title: "Duck",
    glb: "/models/Duck.glb",
    category: "Object/Prop",
    price: "8 ICP",
    likes: 1205,
    views: 8900
  },
  {
    id: 5,
    title: "Kitchen Table",
    glb: "/models/Kitchen Table.glb",
    category: "Furniture",
    price: "55 ICP",
    likes: 567,
    views: 3400
  },
  {
    id: 6,
    title: "Nail Polish",
    glb: "/models/Nail Polish.glb",
    category: "Beauty",
    price: "12 ICP",
    likes: 789,
    views: 4200
  },
  {
    id: 7,
    title: "Office Chair",
    glb: "/models/Office Chair.glb",
    category: "Furniture",
    price: "65 ICP",
    likes: 345,
    views: 2100
  },
  {
    id: 8,
    title: "Plants - Assorted Shelf Plants",
    glb: "/models/Plants - Assorted shelf plants.glb",
    category: "Decor",
    price: "25 ICP",
    likes: 478,
    views: 2900
  }
];

export const useMarketplaceStore = create<MarketplaceStore>((set, get) => ({
  items: initialItems,
  
  addItem: (newItem) => {
    const nextId = get().getNextId();
    const itemWithId = { ...newItem, id: nextId };
    set((state) => ({
      items: [...state.items, itemWithId]
    }));
  },
  
  getNextId: () => {
    const items = get().items;
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
  }
}));
