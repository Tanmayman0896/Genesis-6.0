"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function MascotCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    // 1. Create Scene
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 7.5);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 4;
    controls.maxDistance = 12;
    // Limit vertical rotation to keep it looking cool
    controls.minPolarAngle = Math.PI / 3; // Look slightly down
    controls.maxPolarAngle = Math.PI / 1.7; // Look slightly up
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6; // Very slow and majestic rotation

    // 5. Lighting System (Clean neutral white lighting)
    // Ambient Light to fill in shadows neutrally
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Key Light (Directional white light)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    // Fill Light (Directional white light to soften opposite side)
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.0);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);

    // 6. Load Model
    let mascotModel: THREE.Group | null = null;
    const loader = new GLTFLoader();

    // We can try to load "genesis mascot.glb". If not found, log error.
    loader.load(
      "/models/genesis mascot.glb",
      (gltf) => {
        mascotModel = gltf.scene;

        // Auto center and scale model
        const box = new THREE.Box3().setFromObject(mascotModel);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Target size of mascot in Three.js space
        const targetSize = 4.2;
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = targetSize / maxDim;
        mascotModel.scale.set(scale, scale, scale);

        // Position it center-aligned
        mascotModel.position.x = -center.x * scale;
        mascotModel.position.y = -center.y * scale;
        mascotModel.position.z = -center.z * scale;

        // Traverse and optimize materials
        mascotModel.traverse((node) => {
          if ((node as THREE.Mesh).isMesh) {
            
            // Boost material roughness & metalness if missing to look glossy and futuristic
            const mesh = node as THREE.Mesh;
            if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              // Make it metallic and glowing
              if (mat.roughness !== undefined) mat.roughness = Math.min(mat.roughness, 0.4);
              if (mat.metalness !== undefined) mat.metalness = Math.max(mat.metalness, 0.8);
            }
          }
        });

        // Add parent offset group to easily animate floating without messing with controls
        const modelGroup = new THREE.Group();
        modelGroup.add(mascotModel);
        // Slightly lower it so it sits near the grid
        modelGroup.position.y = 0.2;
        scene.add(modelGroup);

        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (err) => {
        console.error("Error loading genesis mascot.glb", err);
        setError(true);
        setLoading(false);
      }
    );

    // 7. Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Gentle floating animation
      if (scene.children.length > 0) {
        // Find the group containing the mascot
        scene.traverse((node) => {
          if (node instanceof THREE.Group && node.parent === scene) {
            // Floating up and down
            node.position.y = Math.sin(elapsedTime * 1.5) * 0.12;
            
            // Slow wobble/tilting animation in addition to auto-rotation
            node.rotation.z = Math.sin(elapsedTime * 0.8) * 0.04;
            node.rotation.x = Math.cos(elapsedTime * 0.5) * 0.03;
          }
        });
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 9. Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose scene resources
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();

        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[550px] lg:min-h-[650px] flex items-center justify-center select-none">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-10" />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-sm z-20 transition-opacity duration-500">
          <div className="relative flex items-center justify-center">
            {/* Neutral outer spinning ring */}
            <div className="w-16 h-16 rounded-full border-2 border-t-white border-r-neutral-600 border-b-neutral-800 border-l-transparent animate-spin duration-700" />
            <div className="absolute w-12 h-12 rounded-full border border-white/5 animate-ping duration-1000" />
            {/* Center neutral dot */}
            <div className="absolute w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          </div>
          <span className="mt-6 font-sans font-medium text-neutral-400 tracking-widest text-[10px] uppercase animate-pulse">
            Loading Mascot {progress}%
          </span>
        </div>
      )}

      {/* Error Fallback */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-sm z-20 p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 text-lg font-bold mb-4">
            !
          </div>
          <h3 className="font-sans text-sm font-bold text-white mb-2">Mascot Offline</h3>
          <p className="text-xs text-neutral-400 max-w-xs mb-6">
            Failed to load the 3D mascot model.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-[10px] font-semibold uppercase tracking-wider rounded-full transition-all duration-300 active:scale-95"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
