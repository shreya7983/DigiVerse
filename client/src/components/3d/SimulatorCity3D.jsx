import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PALETTE, createCityMaterials, createBiophilicSkyscraper, createSmartHome, createTree, createAutonomousPod, createWindTurbine, createSolarArray } from './cityBuilder';

export default function SimulatorCity3D({ points = {}, height = '380px' }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const dynamicGroupRef = useRef(null);
  const podsRef = useRef([]);
  const turbinesRef = useRef([]);

  const {
    environment = 25,
    technology = 15,
    mobility = 5,
    privacy = 10,
    wellbeing = 15,
    community = 5,
  } = points;

  // Initial Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const heightPx = container.clientHeight || 380;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x082B26);
    scene.fog = new THREE.FogExp2(0x082B26, 0.015);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / heightPx, 0.5, 150);
    camera.position.set(28, 22, 28);
    camera.lookAt(0, 2, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.7;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 15;
    controls.maxDistance = 60;
    controls.target.set(0, 2, 0);

    // Lighting
    scene.add(new THREE.AmbientLight(0x1B5E55, 1.5));
    const sun = new THREE.DirectionalLight(0xFFF8E7, 2.2);
    sun.position.set(25, 35, 18);
    sun.castShadow = true;
    scene.add(sun);

    // Static Base Platform
    const mats = createCityMaterials();
    const groundGeom = new THREE.CylinderGeometry(28, 28, 1.2, 40);
    const ground = new THREE.Mesh(groundGeom, mats.darkTealWall);
    ground.position.y = -0.6;
    ground.receiveShadow = true;
    scene.add(ground);

    const goldRing = new THREE.Mesh(
      new THREE.TorusGeometry(28.2, 0.25, 12, 48),
      mats.accentGold
    );
    goldRing.rotation.x = Math.PI * 0.5;
    goldRing.position.y = 0.02;
    scene.add(goldRing);

    // Central Canal
    const canal = new THREE.Mesh(
      new THREE.RingGeometry(9, 11.5, 32),
      mats.water
    );
    canal.rotation.x = -Math.PI * 0.5;
    canal.position.y = 0.04;
    scene.add(canal);

    // Core Landmarks
    const tower1 = createBiophilicSkyscraper(mats, 22, 'primary');
    tower1.position.set(0, 0, -8);
    scene.add(tower1);

    const tower2 = createBiophilicSkyscraper(mats, 16, 'cream');
    tower2.position.set(-8, 0, -6);
    scene.add(tower2);

    const tower3 = createBiophilicSkyscraper(mats, 14, 'primary');
    tower3.position.set(8, 0, -4);
    scene.add(tower3);

    const home = createSmartHome(mats);
    home.position.set(-10, 0, 8);
    scene.add(home);

    // Maglev ring
    const maglevRing = new THREE.Mesh(
      new THREE.TorusGeometry(18, 0.12, 8, 48),
      mats.accentGold
    );
    maglevRing.rotation.x = Math.PI * 0.5;
    maglevRing.position.y = 3.5;
    scene.add(maglevRing);

    // Animation Loop
    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      controls.update();

      // Rotate wind turbines
      turbinesRef.current.forEach(t => {
        if (t.userData.hub) {
          t.userData.hub.rotation.z += 0.04;
        }
      });

      // Animate pods along radius
      podsRef.current.forEach(pod => {
        pod.userData.angle = (pod.userData.angle || 0) + (pod.userData.speed || 0.012);
        const r = pod.userData.radius || 14;
        pod.position.x = Math.cos(pod.userData.angle) * r;
        pod.position.z = Math.sin(pod.userData.angle) * r;
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
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Procedurally Rebuild Dynamic Layer Based on Sliders
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;
    const mats = createCityMaterials();

    // Clean up old dynamic group
    if (dynamicGroupRef.current) {
      scene.remove(dynamicGroupRef.current);
    }

    const dynGroup = new THREE.Group();
    turbinesRef.current = [];
    podsRef.current = [];

    // 1. Environment -> Trees & Foliage Density
    const treeCount = Math.floor(6 + (environment / 40) * 26);
    for (let i = 0; i < treeCount; i++) {
      const angle = (i / treeCount) * Math.PI * 2 + (i % 3) * 0.2;
      const dist = 5 + (i % 4) * 4.5;
      if (dist < 8.5 || dist > 12) { // Avoid canal
        const tree = createTree(mats, 2 + (i % 3) * 0.5);
        tree.position.set(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);
        dynGroup.add(tree);
      }
    }

    // 2. Environment -> Rooftop Solar & Clean Turbines
    if (environment >= 15) {
      const solar1 = createSolarArray(mats, 2, 3);
      solar1.position.set(-8, 17, -6);
      dynGroup.add(solar1);

      const turbine = createWindTurbine(mats, 14);
      turbine.position.set(-18, 0, -10);
      dynGroup.add(turbine);
      turbinesRef.current.push(turbine);
    }
    if (environment >= 28) {
      const turbine2 = createWindTurbine(mats, 16);
      turbine2.position.set(18, 0, -12);
      dynGroup.add(turbine2);
      turbinesRef.current.push(turbine2);
    }

    // 3. Mobility & Tech -> Autonomous Pod Fleet
    const podCount = Math.max(1, Math.floor(1 + (mobility / 40) * 3 + (technology / 40) * 2));
    for (let i = 0; i < podCount; i++) {
      const pod = createAutonomousPod(mats);
      pod.userData = {
        angle: (i / podCount) * Math.PI * 2,
        radius: 14,
        speed: 0.008 + (technology / 50) * 0.012,
      };
      pod.position.y = 0.3;
      dynGroup.add(pod);
      podsRef.current.push(pod);
    }

    // 4. Privacy -> Sovereign Encryption Dome / Ring
    if (privacy >= 15) {
      const shieldRing = new THREE.Mesh(
        new THREE.TorusGeometry(12, 0.08, 8, 36),
        new THREE.MeshBasicMaterial({ color: 0xA78BFA, transparent: true, opacity: 0.6 })
      );
      shieldRing.rotation.x = Math.PI * 0.5;
      shieldRing.position.y = 10;
      dynGroup.add(shieldRing);
    }

    // 5. Community -> Plaza Gathering Beacons
    if (community >= 10) {
      const plazaGeom = new THREE.CylinderGeometry(3.5, 3.5, 0.1, 16);
      const plaza = new THREE.Mesh(plazaGeom, mats.pedestrianTile);
      plaza.position.set(8, 0.05, 8);
      dynGroup.add(plaza);
    }

    scene.add(dynGroup);
    dynamicGroupRef.current = dynGroup;
  }, [environment, technology, mobility, privacy, wellbeing, community]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-seagreen-gold/40 shadow-inner bg-[#082B26]" style={{ height }}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating HUD Telemetry Overlay */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none flex flex-col gap-1">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-seagreen-gold/30 backdrop-blur-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-seagreen-gold uppercase">
            3D REAL-TIME CITY VIEWPORT
          </span>
        </div>
      </div>

      <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none flex items-center justify-between gap-2 flex-wrap text-[10px] font-mono">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/70 text-seagreen-seafoam border border-white/10 backdrop-blur-xs">
          <span>🌿 {environment * 2}% Canopy</span>
          <span>•</span>
          <span>⚡ {technology * 2}% Grid</span>
          <span>•</span>
          <span>🤖 {Math.max(1, Math.floor(mobility / 4))} Pods</span>
        </div>

        <div className="text-white/40 hidden sm:block">
          🔄 Drag to rotate 3D view
        </div>
      </div>
    </div>
  );
}
