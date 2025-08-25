import { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

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
  
  // Scale different models appropriately - only for existing GLB files
  let scale = 6;
  if (url.includes('Duck.glb')) scale = 2.5;
  if (url.includes('Apartment.glb')) scale = 1;
  if (url.includes('Aesthetic Desk .glb')) scale = 4;
  if (url.includes('Couch Small.glb')) scale = 12;
  if (url.includes('Desk.glb')) scale = 5;
  if (url.includes('Kitchen Table.glb')) scale = 4;
  if (url.includes('Nail Polish.glb')) scale = 35;
  if (url.includes('Office Chair.glb')) scale = 6;
  if (url.includes('Plants - Assorted shelf plants.glb')) scale = 5;
  
  return <primitive object={scene} scale={scale} />;
}

function ErrorFallback() {
  return (
    <div style={{ 
      width: "100%", 
      height: 380, 
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

export function VRModelViewer({ url }: { url: string }) {
  return (
    <Canvas 
      style={{ width: "100%", height: 380, background: "#18181b", borderRadius: 16 }} 
      camera={{ position: [0, 0, 5], fov: 75 }}
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
        <VRModel url={url} />
      </Suspense>
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        enableRotate={true}
        autoRotate={false}
        minDistance={2}
        maxDistance={12}
      />
    </Canvas>
  );
}
