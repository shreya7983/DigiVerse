import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { PALETTE, createAutonomousPod } from './cityBuilder';

export default function EthicsSimulator3D({ selectedChoice = 'choiceA', height = '280px' }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const podsRef = useRef([]);
  const speedRef = useRef(0.015);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const heightPx = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x082421);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / heightPx, 0.5, 100);
    camera.position.set(16, 12, 16);
    camera.lookAt(0, 1.5, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    scene.add(new THREE.AmbientLight(0x1B5E55, 1.4));
    const dirLight = new THREE.DirectionalLight(0xFFF9E6, 2.0);
    dirLight.position.set(15, 25, 10);
    scene.add(dirLight);

    // Street Intersection Ground
    const road = new THREE.Mesh(
      new THREE.BoxGeometry(22, 0.4, 22),
      new THREE.MeshStandardMaterial({ color: 0x142825, roughness: 0.6 })
    );
    road.position.y = 0.2;
    scene.add(road);

    // Crosswalk Pedestrian Plazas
    const plaza1 = new THREE.Mesh(
      new THREE.BoxGeometry(7, 0.5, 7),
      new THREE.MeshStandardMaterial({ color: PALETTE.seaGreenDark })
    );
    plaza1.position.set(-6.5, 0.25, -6.5);
    scene.add(plaza1);

    const plaza2 = new THREE.Mesh(
      new THREE.BoxGeometry(7, 0.5, 7),
      new THREE.MeshStandardMaterial({ color: PALETTE.seaGreenDark })
    );
    plaza2.position.set(6.5, 0.25, 6.5);
    scene.add(plaza2);

    // Glowing Lane Markings
    const laneRing = new THREE.Mesh(
      new THREE.TorusGeometry(8, 0.08, 8, 36),
      new THREE.MeshBasicMaterial({ color: 0x5EEAD4 })
    );
    laneRing.rotation.x = Math.PI * 0.5;
    laneRing.position.y = 0.42;
    scene.add(laneRing);

    // Create moving pods along the corridor
    const mats = {
      podBody: new THREE.MeshStandardMaterial({ color: 0xE8F5F3, roughness: 0.2 }),
      glassWindow: new THREE.MeshStandardMaterial({ color: 0x7ED6C8, roughness: 0.1 }),
      glowCyan: new THREE.MeshBasicMaterial({ color: 0x2DD4BF }),
      darkTealWall: new THREE.MeshStandardMaterial({ color: 0x0E4F4A }),
    };

    const podGroup = [];
    const count = 4;
    for (let i = 0; i < count; i++) {
      const pod = createAutonomousPod(mats);
      pod.userData = {
        angle: (i / count) * Math.PI * 2,
        radius: 8,
      };
      scene.add(pod);
      podGroup.push(pod);
    }
    podsRef.current = podGroup;

    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      podGroup.forEach((pod) => {
        pod.userData.angle += speedRef.current;
        pod.position.x = Math.cos(pod.userData.angle) * pod.userData.radius;
        pod.position.z = Math.sin(pod.userData.angle) * pod.userData.radius;
        pod.rotation.y = -pod.userData.angle + Math.PI * 0.5;
      });
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update speed and behavior based on user choice
  useEffect(() => {
    if (selectedChoice === 'choiceA') {
      // Let AI decide: Hyper-fast, synchronized
      speedRef.current = 0.035;
    } else if (selectedChoice === 'choiceB') {
      // Human approval required: Moderate, controlled
      speedRef.current = 0.016;
    } else {
      // AI only advises: Traditional slower caution
      speedRef.current = 0.008;
    }
  }, [selectedChoice]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-seagreen-gold/30 shadow-inner bg-[#082421]" style={{ height }}>
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute top-2.5 left-3 z-10 pointer-events-none flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-mono text-seagreen-gold uppercase font-bold">
          3D STREET CONSEQUENCE TELEMETRY
        </span>
      </div>

      <div className="absolute bottom-2.5 right-3 z-10 pointer-events-none text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/60 text-seagreen-seafoam border border-white/10 backdrop-blur-xs">
        {selectedChoice === 'choiceA' && '⚡ 120 km/h Autonomous Swarm · 0% Human Override'}
        {selectedChoice === 'choiceB' && '🛡️ 50 km/h Civic Pacing · Human Checkpoints Active'}
        {selectedChoice === 'choiceC' && '🚶 25 km/h Manual Priority · Human Discretion Retained'}
      </div>
    </div>
  );
}
