# Vault VR — ICP VR Marketplace

An interactive VR asset marketplace built with Vite + React + TypeScript. Browse and preview 3D models, upload new assets with live 3D preview, and see them appear instantly in the marketplace via a global store.

## Tech Stack
- React 18, TypeScript, Vite
- Tailwind CSS, shadcn/ui
- three.js, @react-three/fiber, @react-three/drei
- Zustand (global state)
- React Router
- Sonner (toasts)

## Features
- Marketplace grid and list views with category filter and search
- Product detail page with 3D model viewer
- Create Asset page with drag-and-drop upload and live 3D preview
- Auto-scaling and centering for uploaded models
- Instant marketplace updates using a Zustand store

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Install dependencies
```bash
npm install
```

### Start the dev server
```bash
npm run dev
# Local: http://localhost:8080/
```

### Build for production
```bash
npm run build
```

### Preview the production build
```bash
npm run preview
# Local: http://localhost:8080/
```

## Environment Variables
See `.env.example`. Most features run without additional env. Add your own variables if integrating ICP backend/auth.

## Project Structure
```
Vault-VR/
├─ public/
│  └─ models/                # Place static .glb/.gltf files here for production
├─ src/
│  ├─ components/
│  │  └─ VRModelViewer.tsx   # 3D viewer using three.js/R3F with auto-scaling
│  ├─ pages/
│  │  ├─ Index.tsx           # Landing page
│  │  ├─ Marketplace.tsx     # Marketplace grid/list, filters, search
│  │  ├─ ProductDetail.tsx   # Single product with 3D preview
│  │  └─ Create.tsx          # Upload + live preview + publish to store
│  ├─ store/
│  │  └─ marketplaceStore.ts # Zustand store for items (id, title, glb, etc.)
│  ├─ App.tsx                # Routes and providers
│  └─ main.tsx               # App bootstrapping
├─ vite.config.ts            # Includes alias @ => ./src
├─ tsconfig.app.json         # Also defines @ paths
└─ README.md
```

## 3D Models and Preview
- Supported formats: `.glb`, `.gltf` (Create page also validates a few extra extensions for future use)
- File size limit: 50MB (client-side check)
- Live preview: Uses a blob URL for uploaded files and auto-scales the model by its bounding box
- Production paths: Published items reference `/models/<fileName>` in `public/models`

### Scaling behavior in `VRModelViewer`
- For blob URLs (uploaded models), the component computes a bounding box and auto-scales/centers
- For known demo models, sane default scales are applied

## State Management
- Zustand store: `src/store/marketplaceStore.ts`
- Exposes `items` and `addItem()`
- New items from Create page are appended and immediately visible on Marketplace/Product pages

## Key Pages
- `pages/Marketplace.tsx` — Lists items with filters, search, and like UI
- `pages/ProductDetail.tsx` — Shows a single item, stats, and 3D viewer
- `pages/Create.tsx` — Upload form, validation, live 3D preview, and publish flow

## Troubleshooting

### 1) Module alias errors like Failed to resolve import "@/..."
- Vite and tsconfig already define `@` => `./src`
- If your IDE or dev server still complains, use relative imports as a fallback

### 2) Duplicate Toaster import
- Ensure only one named import for each toaster:
  - `import { Toaster } from "@/components/ui/toaster";`
  - `import { Toaster as Sonner } from "@/components/ui/sonner";`

### 3) GLTF/GLB not shown in preview
- Check the browser console for GLTFLoader errors
- Verify the file is `.glb` or `.gltf` and under 50MB
- For published items, ensure the file is actually present in `public/models/`

## Deployment
See `DEPLOYMENT_GUIDE.md` and `deploy-steps.md` for environment notes and hosting steps.

## License
This project is provided as-is for demonstration purposes. Add your preferred license.
