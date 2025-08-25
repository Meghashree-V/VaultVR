import React, { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (this.props.onError) {
      this.props.onError();
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function VRModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);
  
  // Auto-scale for uploaded blob URLs (Create page) or use specific scaling for known models
  let scale = 8;
  let position = [0, 0, 0];
  
  if (url.startsWith('blob:')) {
    // For uploaded files, use auto-scaling based on bounding box
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const maxDimension = Math.max(size.x, size.y, size.z);
      
      // Scale to fit nicely in viewport
      scale = maxDimension > 0 ? 3 / maxDimension : 1;
      
      // Center the model
      const center = box.getCenter(new THREE.Vector3());
      position = [-center.x * scale, -center.y * scale, -center.z * scale];
    }
  } else {
    // Existing scaling for known models
    if (url.includes('Duck.glb')) scale = 4;
    if (url.includes('Apartment.glb')) scale = 1.5;
    if (url.includes('Aesthetic Desk .glb')) scale = 3;
    if (url.includes('Desk.glb')) scale = 7;
    if (url.includes('Kitchen Table.glb')) scale = 6;
    if (url.includes('Nail Polish.glb')) scale = 45;
    if (url.includes('Office Chair.glb')) scale = 8;
    if (url.includes('Plants - Assorted shelf plants.glb')) scale = 7;
  }
  
  return <primitive object={scene} scale={scale} position={position} />;
}

function ErrorFallback() {
  return (
    <div style={{ 
      width: "100%", 
      height: "100%", 
      background: "#18181b", 
      borderRadius: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#666"
    }}>
      Model unavailable
    </div>
  );
}

export function VRModelViewer({ modelUrl }: { modelUrl?: string }) {
  const [error, setError] = useState(false);
  
  if (!modelUrl || error) {
    return <ErrorFallback />;
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas 
        style={{ width: "100%", height: "100%", background: "#18181b", borderRadius: 16 }} 
        camera={{ position: [0, 0, 4], fov: 85 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#18181b');
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <ambientLight intensity={2.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -10, -5]} intensity={1.2} />
        <pointLight position={[0, 10, 0]} intensity={0.8} />
        <pointLight position={[5, 0, 5]} intensity={0.6} />
        <pointLight position={[-5, 0, -5]} intensity={0.6} />
        <Suspense fallback={null}>
          <ErrorBoundary onError={() => setError(true)}>
            <VRModel url={modelUrl} />
          </ErrorBoundary>
        </Suspense>
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          enableRotate={true}
          autoRotate={false}
          minDistance={1.5}
          maxDistance={10}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
