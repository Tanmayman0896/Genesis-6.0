"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

interface MascotCanvasProps {
  onProgress?: (progress: number) => void;
  onLoaded?: () => void;
}

export default function MascotCanvas({ onProgress, onLoaded }: MascotCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  // Use refs to keep callbacks up to date without triggering useEffect re-runs
  const onProgressRef = useRef(onProgress);
  const onLoadedRef = useRef(onLoaded);

  useEffect(() => {
    onProgressRef.current = onProgress;
    onLoadedRef.current = onLoaded;
  }, [onProgress, onLoaded]);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    // 1. Scene Variables
    let mascotModel: THREE.Group | null = null;
    let modelGroup: THREE.Group | null = null;
    let animationFrameId: number;
    let isVisible = false;

    // Create Scene
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    const isMobile = window.innerWidth < 640;
    const initialZ = isMobile ? 6.2 : 7.5;
    camera.position.set(0, 0.15, initialZ);

    // 3. Renderer Setup with Performance Optimizations
    const renderer = new THREE.WebGLRenderer({
      antialias: window.innerWidth >= 768,
      alpha: true,
      stencil: false,
      depth: true,
      powerPreference: "high-performance",
      precision: "mediump",
    });
    renderer.setSize(width, height);

    // Determine max DPR based on device capability to prevent GPU overhead on weak screens
    let maxDPR = 1.5;
    if (typeof navigator !== "undefined") {
      const isWeakDevice =
        (navigator.hardwareConcurrency && (navigator.hardwareConcurrency as number) < 4) ||
        ((navigator as any).deviceMemory && (navigator as any).deviceMemory < 4);
      if (isWeakDevice || window.innerWidth < 768) {
        maxDPR = 1.0;
      }
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDPR));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 4. Lighting System (Clean neutral white lighting - simple & high performance)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.0);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);

    // 5. Setup GLTF Loader with DRACO Compression
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      "/models/genesis_mascot_optimized.glb",
      (gltf) => {
        mascotModel = gltf.scene;

        // Auto center and scale model
        const box = new THREE.Box3().setFromObject(mascotModel);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const targetSize = window.innerWidth < 640 ? 3.3 : 3.8;
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
            const mesh = node as THREE.Mesh;
            if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              if (mat.roughness !== undefined) mat.roughness = Math.min(mat.roughness, 0.4);
              if (mat.metalness !== undefined) mat.metalness = Math.max(mat.metalness, 0.8);
            }
          }
        });

        // Add parent offset group to easily animate floating
        modelGroup = new THREE.Group();
        modelGroup.add(mascotModel);
        modelGroup.position.y = 0.05;
        
        // Orient the mascot to face forward directly at the camera
        modelGroup.rotation.y = -1.5;

        scene.add(modelGroup);
        if (onLoadedRef.current) onLoadedRef.current();
      },
      (xhr) => {
        if (xhr.total > 0) {
          const pct = Math.round((xhr.loaded / xhr.total) * 100);
          if (onProgressRef.current) onProgressRef.current(pct);
        }
      },
      (err) => {
        console.error("Error loading optimized genesis mascot model", err);
        setError(true);
        if (onLoadedRef.current) onLoadedRef.current(); // Call onLoaded to close preloader in case of error
      }
    );

    // 6. Animation and Render Loop with Visibility Control
    const clock = new THREE.Clock();

    // Accessibility check: respects prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion && modelGroup) {
        modelGroup.position.y = 0.05;
        modelGroup.rotation.z = 0;
        modelGroup.rotation.x = 0;
      }
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Gentle floating/wobble animations (disabled if user prefers reduced motion)
      if (modelGroup && !prefersReducedMotion) {
        modelGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;
        modelGroup.rotation.z = Math.sin(elapsedTime * 0.8) * 0.04;
        modelGroup.rotation.x = Math.cos(elapsedTime * 0.5) * 0.03;
      }

      renderer.render(scene, camera);
    };

    // IntersectionObserver to pause loop when MascotCanvas is off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isVisible) {
              isVisible = true;
              clock.start();
              animate();
            }
          } else {
            if (isVisible) {
              isVisible = false;
              cancelAnimationFrame(animationFrameId);
            }
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 7. Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      
      if (window.innerWidth < 640) {
        camera.position.z = 6.2;
        camera.position.y = 0.15;
      } else {
        camera.position.z = 7.5;
        camera.position.y = 0.15;
      }
      
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 8. Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMotionChange);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      
      dracoLoader.dispose();
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
    <div className="relative w-full h-full min-h-[350px] sm:min-h-[400px] md:min-h-[550px] lg:min-h-[650px] flex items-center justify-center select-none">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-10" />

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
