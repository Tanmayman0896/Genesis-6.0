"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MascotCanvasProps {
  onProgress?: (progress: number) => void;
  onLoaded?: () => void;
  page?: "home" | "contact";
}

export default function MascotCanvas({ onProgress, onLoaded, page = "home" }: MascotCanvasProps) {
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
    let rotationTrigger: any = null;
    let cleanupClick: (() => void) | null = null;
    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };

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

    // Create Heart Geometry
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 0.5);
    heartShape.bezierCurveTo(0, 0.5, 0.4, 1, 1, 1);
    heartShape.bezierCurveTo(1.8, 1, 1.8, 0, 1.8, 0);
    heartShape.bezierCurveTo(1.8, -0.6, 1.2, -1, 0, -1.8);
    heartShape.bezierCurveTo(-1.2, -1, -1.8, -0.6, -1.8, 0);
    heartShape.bezierCurveTo(-1.8, 0, -1.8, 1, -1, 1);
    heartShape.bezierCurveTo(-0.4, 1, 0, 0.5, 0, 0.5);

    const extrudeSettings = {
      depth: 0.08,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };

    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeometry.center(); // Center geometry so scale/rotation is clean

    // Create Sparkle Geometry
    const sparkleShape = new THREE.Shape();
    sparkleShape.moveTo(0, 1);
    sparkleShape.quadraticCurveTo(0.15, 0.15, 1, 0);
    sparkleShape.quadraticCurveTo(0.15, -0.15, 0, -1);
    sparkleShape.quadraticCurveTo(-0.15, -0.15, -1, 0);
    sparkleShape.quadraticCurveTo(-0.15, 0.15, 0, 1);

    const sparkleExtrudeSettings = {
      depth: 0.05,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    };

    const sparkleGeometry = new THREE.ExtrudeGeometry(sparkleShape, sparkleExtrudeSettings);
    sparkleGeometry.center(); // Center geometry so scale/rotation is clean

    // Mouse Tracking Event Listeners
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleMouseLeave = () => {
      targetMouse.x = 0;
      targetMouse.y = 0;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

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

        const spawnHeart = (delay: number = 0) => {
          if (!scene || !modelGroup) return;

          const mat = new THREE.MeshStandardMaterial({
            color: 0xff3b7e,
            roughness: 0.1,
            metalness: 0.3,
            emissive: 0xff3b7e,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0,
          });

          const mesh = new THREE.Mesh(heartGeometry, mat);

          // Position it near the chest/center of the mascot
          // Start far enough forward (Z-axis) to be in front of the scaled mascot model
          mesh.position.set(
            (Math.random() - 0.5) * 0.2, // slight random x offset
            0.2 + (Math.random() - 0.5) * 0.1, // near mascot chest
            1.5 // in front of the model
          );

          // Random rotation
          mesh.rotation.set(
            (Math.random() - 0.5) * 0.2,
            (Math.random() - 0.5) * 0.2,
            (Math.random() - 0.5) * 0.5
          );

          // Start small
          mesh.scale.set(0, 0, 0);

          scene.add(mesh);

          // Animate with GSAP
          const targetScale = 0.08 + Math.random() * 0.06; // scale factor
          const targetY = 1.8 + Math.random() * 1.0;     // float up
          const targetX = mesh.position.x + (Math.random() - 0.5) * 1.2; // drift sideways
          const targetZ = 1.9 + Math.random() * 0.6; // float forward (towards camera) to stay clear of the mascot body
          const duration = 1.5 + Math.random() * 1.0;

          gsap.timeline({
            delay: delay,
            onComplete: () => {
              scene.remove(mesh);
              mat.dispose();
            }
          })
            .to(mesh.scale, {
              x: targetScale,
              y: targetScale,
              z: targetScale,
              duration: duration * 0.3,
              ease: "back.out(1.5)"
            })
            .to(mesh.position, {
              x: targetX,
              y: targetY,
              z: targetZ,
              duration: duration,
              ease: "power1.out"
            }, 0)
            .to(mesh.rotation, {
              x: mesh.rotation.x + (Math.random() - 0.5) * 2,
              y: mesh.rotation.y + (Math.random() - 0.5) * 2,
              z: mesh.rotation.z + (Math.random() - 0.5) * 3,
              duration: duration,
              ease: "power1.out"
            }, 0)
            .to(mat, {
              opacity: 0.9,
              duration: duration * 0.2,
              ease: "power1.out"
            }, 0)
            .to(mat, {
              opacity: 0,
              duration: duration * 0.5,
              ease: "power1.in"
            }, duration * 0.5);
        };

        const spawnSparkle = (angle: number, delay: number = 0) => {
          if (!scene || !modelGroup) return;

          const mat = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            roughness: 0.1,
            metalness: 0.8, // high metalness for shiny gold reflection
            emissive: 0xffd700,
            emissiveIntensity: 0.6,
            transparent: true,
            opacity: 0,
          });

          const mesh = new THREE.Mesh(sparkleGeometry, mat);

          // Position it near the chest/center of the mascot
          // Start in front of the model
          mesh.position.set(
            0, // start at center X
            0.4, // start near chest/center of the mascot Y
            1.5 // in front of the model
          );

          // Random rotation
          mesh.rotation.set(
            (Math.random() - 0.5) * 0.2,
            (Math.random() - 0.5) * 0.2,
            Math.random() * Math.PI // full range of rotation on Z
          );

          // Start small
          mesh.scale.set(0, 0, 0);

          scene.add(mesh);

          // Animate with GSAP (radial explosion in 360 degrees)
          const targetScale = 0.08 + Math.random() * 0.08; // scale factor
          const distance = 1.2 + Math.random() * 0.8; // explode outwards
          const targetX = Math.cos(angle) * distance;
          const targetY = 0.4 + Math.sin(angle) * distance; // offset Y by starting Y (0.4)
          const targetZ = 1.9 + Math.random() * 0.8; // float forward (towards camera)
          const duration = 1.0 + Math.random() * 0.5;

          gsap.timeline({
            delay: delay,
            onComplete: () => {
              scene.remove(mesh);
              mat.dispose();
            }
          })
            .to(mesh.scale, {
              x: targetScale,
              y: targetScale,
              z: targetScale,
              duration: duration * 0.25,
              ease: "back.out(2.0)" // extra bouncy pop
            })
            .to(mesh.position, {
              x: targetX,
              y: targetY,
              z: targetZ,
              duration: duration,
              ease: "power2.out"
            }, 0)
            .to(mesh.rotation, {
              z: mesh.rotation.z + (Math.random() > 0.5 ? 2 : -2) * Math.PI, // spin nicely
              duration: duration,
              ease: "power1.out"
            }, 0)
            .to(mat, {
              opacity: 1,
              duration: duration * 0.15,
              ease: "power1.out"
            }, 0)
            .to(mat, {
              opacity: 0,
              duration: duration * 0.45,
              ease: "power2.in"
            }, duration * 0.55);
        };

        if (page === "contact") {
          let hasBlinkedContact = false;

          rotationTrigger = ScrollTrigger.create({
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.0,
            onUpdate: (self) => {
              if (modelGroup && mascotModel) {
                const p = self.progress;

                // Sync rotation: straight (-1.5) when centered in screen (p = 0.5)
                const rotationRange = 1.6; // ~90 degrees sweep
                modelGroup.rotation.y = -1.5 + (p - 0.5) * rotationRange;

                // When get in touch is scrolled, play sparkle animations (around p = 0.45 to 0.6)
                if (p >= 0.45 && p <= 0.6) {
                  if (!hasBlinkedContact) {
                    hasBlinkedContact = true;

                    // Trigger squash/stretch bounce
                    gsap.timeline()
                      .to(mascotModel.scale, { y: scale * 0.72, x: scale * 1.15, duration: 0.15, ease: "power1.out" })
                      .to(mascotModel.scale, { y: scale * 1.12, x: scale * 0.9, duration: 0.15, ease: "power1.inOut" })
                      .to(mascotModel.scale, { y: scale, x: scale, duration: 0.2, ease: "back.out(2)" });

                    // Spawn a stream of golden sparkles!
                    const numSparkles = 12;
                    for (let i = 0; i < numSparkles; i++) {
                      const baseAngle = (i / numSparkles) * 2 * Math.PI;
                      const angle = baseAngle + (Math.random() - 0.5) * 0.25;
                      spawnSparkle(angle, Math.random() * 0.15);
                    }
                  }
                } else if (p < 0.35 || p > 0.7) {
                  hasBlinkedContact = false;
                }
              }
            }
          });

          // Interactive click behavior: squash/stretch and spawn sparkles
          const handleClick = () => {
            if (modelGroup && mascotModel) {
              gsap.timeline()
                .to(mascotModel.scale, { y: scale * 0.72, x: scale * 1.15, duration: 0.15, ease: "power1.out" })
                .to(mascotModel.scale, { y: scale * 1.12, x: scale * 0.9, duration: 0.15, ease: "power1.inOut" })
                .to(mascotModel.scale, { y: scale, x: scale, duration: 0.2, ease: "back.out(2)" });

              const numSparkles = 8;
              for (let i = 0; i < numSparkles; i++) {
                const baseAngle = (i / numSparkles) * 2 * Math.PI;
                const angle = baseAngle + (Math.random() - 0.5) * 0.25;
                spawnSparkle(angle, Math.random() * 0.1);
              }
            }
          };
          container.addEventListener("click", handleClick);
          cleanupClick = () => {
            container.removeEventListener("click", handleClick);
          };
        } else {
          let hasBlinked = false;
          let hasSparkled = false;

          // ScrollTrigger to rotate the mascot model Y-axis 360 degrees as it moves to the stats section
          rotationTrigger = ScrollTrigger.create({
            trigger: document.documentElement,
            start: "top top",
            endTrigger: "#our-moments-title",
            end: "center center",
            scrub: 1.2,
            onUpdate: (self) => {
              if (modelGroup && mascotModel) {
                const p = self.progress;
                // As it moves to stats section (first 60% of scroll range):
                if (p <= 0.6) {
                  const ratio = p / 0.6;
                  // Apply power1.inOut (quad ease in out) to match the translation ease
                  const easedRatio = ratio < 0.5
                    ? 2 * ratio * ratio
                    : 1 - Math.pow(-2 * ratio + 2, 2) / 2;
                  modelGroup.rotation.y = -1.5 + easedRatio * (2 * Math.PI);
                } else {
                  modelGroup.rotation.y = -1.5 + (2 * Math.PI);
                }

                // Trigger a cute bounce (squash/stretch) when it enters the stats section (only when scrolling down)
                if (p >= 0.58 && p <= 0.85) {
                  if (!hasBlinked) {
                    hasBlinked = true;
                    if (self.direction === 1) {
                      gsap.timeline()
                        .to(mascotModel.scale, { y: scale * 0.72, x: scale * 1.15, duration: 0.15, ease: "power1.out" })
                        .to(mascotModel.scale, { y: scale * 1.12, x: scale * 0.9, duration: 0.15, ease: "power1.inOut" })
                        .to(mascotModel.scale, { y: scale, x: scale, duration: 0.2, ease: "back.out(2)" });

                      // Spawn pink hearts stream
                      for (let i = 0; i < 6; i++) {
                        spawnHeart(i * 0.15);
                      }
                    }
                  }
                } else if (p < 0.5 || p > 0.9) {
                  hasBlinked = false;
                }

                // Trigger magical sparkles when it enters the "Our Moments" section (only when scrolling down)
                if (p >= 0.92) {
                  if (!hasSparkled) {
                    hasSparkled = true;
                    if (self.direction === 1) {
                      // Trigger a subtle chest puff/bounce animation for the mascot
                      gsap.timeline()
                        .to(mascotModel.scale, { y: scale * 0.8, x: scale * 1.1, duration: 0.12, ease: "power1.out" })
                        .to(mascotModel.scale, { y: scale * 1.08, x: scale * 0.92, duration: 0.12, ease: "power1.inOut" })
                        .to(mascotModel.scale, { y: scale, x: scale, duration: 0.2, ease: "back.out(1.5)" });

                      // Spawn magical golden sparkles stream in a 360-degree burst
                      const numSparkles = 12;
                      for (let i = 0; i < numSparkles; i++) {
                        const baseAngle = (i / numSparkles) * 2 * Math.PI;
                        // Add slight random offset to angle for more natural look
                        const angle = baseAngle + (Math.random() - 0.5) * 0.25;
                        spawnSparkle(angle, Math.random() * 0.15);
                      }
                    }
                  }
                } else if (p < 0.88) {
                  hasSparkled = false;
                }
              }
            }
          });
        }

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

      // Lerp mouse coordinates for smooth rotation transitions
      mouse.x += (targetMouse.x - mouse.x) * 0.08;
      mouse.y += (targetMouse.y - mouse.y) * 0.08;

      // Gentle floating/wobble animations (disabled if user prefers reduced motion)
      if (modelGroup && !prefersReducedMotion) {
        modelGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;
        modelGroup.rotation.z = Math.sin(elapsedTime * 0.8) * 0.04;
        modelGroup.rotation.x = Math.cos(elapsedTime * 0.5) * 0.03;
      }

      // Rotate the mascot model slightly to track cursor (disabled if user prefers reduced motion)
      if (mascotModel && !prefersReducedMotion) {
        mascotModel.rotation.y = mouse.x * 0.25; // look left/right
        mascotModel.rotation.x = mouse.y * 0.15; // look up/down
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
      if (rotationTrigger) {
        rotationTrigger.kill();
      }
      if (cleanupClick) {
        cleanupClick();
      }
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMotionChange);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      dracoLoader.dispose();
      renderer.dispose();
      heartGeometry.dispose();
      sparkleGeometry.dispose();

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
  }, [page]);

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
