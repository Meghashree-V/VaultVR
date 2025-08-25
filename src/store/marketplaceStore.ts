import { create } from 'zustand';

export type MarketplaceItem = {
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
};

type MarketplaceState = {
  items: MarketplaceItem[];
  addItem: (item: Omit<MarketplaceItem, 'id'>) => void;
  getNextId: () => number;
};

const initialItems: MarketplaceItem[] = [
  {
    id: 1,
    title: 'Aesthetic Desk',
    glb: '/models/Aesthetic Desk .glb',
    category: 'Furniture',
    price: '85 ICP',
    likes: 724,
    views: 4200,
    description: 'Modern aesthetic desk with clean lines and premium materials for stylish workspace environments.',
    creator: 'DesignStudio',
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 2,
    title: 'Apartment',
    glb: '/models/Apartment.glb',
    category: 'Architecture',
    price: '150 ICP',
    likes: 892,
    views: 5400,
    description: 'Complete apartment interior with modern furnishings and realistic lighting for VR experiences.',
    creator: 'ArchViz Pro',
    rating: 4.9,
    reviews: 203,
  },
  {
    id: 3,
    title: 'Desk',
    glb: '/models/Desk.glb',
    category: 'Furniture',
    price: '55 ICP',
    likes: 398,
    views: 2400,
    description: 'Simple wooden desk with clean design, ideal for office and workspace VR environments.',
    creator: 'OfficeModels',
    rating: 4.5,
    reviews: 98,
  },
  {
    id: 4,
    title: 'Duck',
    glb: '/models/Duck.glb',
    category: 'Object/Prop',
    price: '3 ICP',
    likes: 189,
    views: 890,
    description: 'Adorable rubber duck model with vibrant colors, perfect for bathroom or playful VR scenes.',
    creator: 'ToyMaker',
    rating: 4.2,
    reviews: 45,
  },
  {
    id: 5,
    title: 'Kitchen Table',
    glb: '/models/Kitchen Table.glb',
    category: 'Furniture',
    price: '75 ICP',
    likes: 612,
    views: 3600,
    description: 'Rustic kitchen table with detailed wood grain texture, perfect for dining room VR setups.',
    creator: 'KitchenCraft',
    rating: 4.8,
    reviews: 167,
  },
  {
    id: 6,
    title: 'Nail Polish',
    glb: '/models/Nail Polish.glb',
    category: 'Beauty',
    price: '8 ICP',
    likes: 198,
    views: 1100,
    description: 'Elegant nail polish bottle with glossy finish and premium brand styling for beauty VR scenes.',
    creator: 'NailArt3D',
    rating: 4.3,
    reviews: 56,
  },
  {
    id: 7,
    title: 'Office Chair',
    glb: '/models/Office Chair.glb',
    category: 'Furniture',
    price: '40 ICP',
    likes: 356,
    views: 2100,
    description: 'Ergonomic office chair with adjustable features and professional appearance for workspace VR.',
    creator: 'ErgoDesign',
    rating: 4.6,
    reviews: 112,
  },
  {
    id: 8,
    title: 'Plants - Assorted Shelf Plants',
    glb: '/models/Plants - Assorted shelf plants.glb',
    category: 'Decor',
    price: '25 ICP',
    likes: 478,
    views: 2900,
    description: 'Collection of realistic potted plants perfect for adding life to any VR interior space.',
    creator: 'GreenThumb3D',
    rating: 4.7,
    reviews: 156,
  },
];

export const useMarketplaceStore = create<MarketplaceState>((set, get) => ({
  items: initialItems,
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, { id: get().getNextId(), ...item }],
    })),
  getNextId: () => Math.max(0, ...get().items.map((i) => i.id)) + 1,
}));
