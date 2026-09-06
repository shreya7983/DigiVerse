import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  PALETTE, 
  createCityMaterials, 
  createBiophilicSkyscraper, 
  createSmartHome, 
  createFutureHospital, 
  createFutureSchool, 
  createTree, 
  createAutonomousPod, 
  createWindTurbine, 
  createSolarArray 
} from './cityBuilder';

export default function HeroCity3D({ activeMode = 'greenery', height = '460px' }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const dynamicGroupRef = useRef(null);
  const podsRef = useRef([]);
  const turbinesRef = useRef([]);

  // Base 3D Scene Initialization
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const heightPx = container.clientHeight || 460;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07221E);
    scene.fog = new THREE.FogExp2(0x07221E, 0.013);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / heightPx, 0.5, 180);
    camera.position.set(30, 24, 30);
    camera.lookAt(0, 3, 0);
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
    controls.autoRotateSpeed = 0.75;
    controls.maxPolarAngle = Math.PI / 2 - 0.06;
    controls.minDistance = 15;
    controls.maxDistance = 65;
    controls.target.set(0, 3, 0);

    // Warm Architectural & Sea-Green Lighting
    scene.add(new THREE.AmbientLight(0x1A5850, 1.6));
    const sun = new THREE.DirectionalLight(0xFFF7E6, 2.4);
    sun.position.set(25, 40, 20);
    sun.castShadow = true;
    scene.add(sun);

    const rimLight = new THREE.DirectionalLight(0x7ED6C8, 0.8);
    rimLight.position.set(-20, 15, -20);
    scene.add(rimLight);

    // Base Floating Pedestal
    const mats = createCityMaterials();
    const groundGeom = new THREE.CylinderGeometry(26, 27, 1.4, 48);
    const ground = new THREE.Mesh(groundGeom, mats.darkTealWall);
    ground.position.y = -0.7;
    ground.receiveShadow = true;
    scene.add(ground);

    const goldRing = new THREE.Mesh(
      new THREE.TorusGeometry(26.2, 0.28, 12, 64),
      mats.accentGold
    );
    goldRing.rotation.x = Math.PI * 0.5;
    goldRing.position.y = 0.02;
    scene.add(goldRing);

    // Central Aqua Canal
    const canal = new THREE.Mesh(
      new THREE.RingGeometry(8, 10.5, 36),
      mats.water
    );
    canal.rotation.x = -Math.PI * 0.5;
    canal.position.y = 0.05;
    scene.add(canal);

    // Key Permanent Landmark Buildings
    // 1. Central Biophilic Towers
    const tower1 = createBiophilicSkyscraper(mats, 24, 'primary');
    tower1.position.set(0, 0, -8);
    scene.add(tower1);

    const tower2 = createBiophilicSkyscraper(mats, 18, 'cream');
    tower2.position.set(-7, 0, -7);
    scene.add(tower2);

    // 2. 🏠 Smart Home
    const home = createSmartHome(mats);
    home.position.set(-11, 0, 8);
    scene.add(home);

    // 3. 🏥 Future Hospital
    const hospital = createFutureHospital(mats);
    hospital.position.set(11, 0, -8);
    scene.add(hospital);

    // 4. 🏫 Future School
    const school = createFutureSchool(mats);
    school.position.set(9, 0, 9);
    scene.add(school);

    // Elevated Maglev Track
    const maglev = new THREE.Mesh(
      new THREE.TorusGeometry(17, 0.14, 8, 48),
      mats.accentGold
    );
    maglev.rotation.x = Math.PI * 0.5;
    maglev.position.y = 3.6;
    scene.add(maglev);

    // Dynamic Maglev pod
    const maglevPod = createAutonomousPod(mats);
    maglevPod.position.y = 3.9;
    maglevPod.scale.set(1.2, 1.2, 1.2);
    scene.add(maglevPod);

    // Animation Loop
    let reqId;
    let maglevAngle = 0;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      controls.update();

      // Maglev flight
      maglevAngle += 0.015;
      maglevPod.position.x = Math.cos(maglevAngle) * 17;
      maglevPod.position.z = Math.sin(maglevAngle) * 17;
      maglevPod.rotation.y = -maglevAngle + Math.PI * 0.5;

      // Rotate wind turbines
      turbinesRef.current.forEach((t) => {
        if (t.userData.hub) {
          t.userData.hub.rotation.z += t.userData.speed || 0.05;
        }
      });

      // Animate ground pods
      podsRef.current.forEach((pod) => {
        pod.userData.angle = (pod.userData.angle || 0) + (pod.userData.speed || 0.012);
        const r = pod.userData.radius || 13;
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

  // Dynamic Layer Mutation when activeMode changes
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;
    const mats = createCityMaterials();

    if (dynamicGroupRef.current) {
      scene.remove(dynamicGroupRef.current);
    }

    const dynGroup = new THREE.Group();
    turbinesRef.current = [];
    podsRef.current = [];

    // Mode-specific configurations
    if (activeMode === 'greenery') {
      // 🌿 Lush Greenery Surge: 32 trees, parks, rooftop gardens
      for (let i = 0; i < 28; i++) {
        const angle = (i / 28) * Math.PI * 2 + (i % 3) * 0.25;
        const dist = 4.5 + (i % 4) * 4.8;
        if (dist < 7.5 || dist > 11) {
          const tree = createTree(mats, 2.2 + (i % 3) * 0.6);
          tree.position.set(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);
          dynGroup.add(tree);
        }
      }

      // Rooftop gardens
      const roofTree1 = createTree(mats, 1.8);
      roofTree1.position.set(-7, 19, -7);
      dynGroup.add(roofTree1);

      // Light pod count
      const pod = createAutonomousPod(mats);
      pod.userData = { angle: 0, radius: 13.5, speed: 0.008 };
      dynGroup.add(pod);
      podsRef.current.push(pod);
    } else if (activeMode === 'ai') {
      // 🤖 High AI: Pod swarm + glowing smart grid
      const count = 5;
      for (let i = 0; i < count; i++) {
        const pod = createAutonomousPod(mats);
        pod.userData = {
          angle: (i / count) * Math.PI * 2,
          radius: 13.5,
          speed: 0.024, // Fast synchronized swarm
        };
        dynGroup.add(pod);
        podsRef.current.push(pod);
      }

      // Smart grid beacon rings
      const beaconRing = new THREE.Mesh(
        new THREE.TorusGeometry(13.5, 0.08, 8, 48),
        new THREE.MeshBasicMaterial({ color: 0x38BDF8 })
      );
      beaconRing.rotation.x = Math.PI * 0.5;
      beaconRing.position.y = 0.4;
      dynGroup.add(beaconRing);

      // Light trees
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2;
        const tree = createTree(mats, 2.0);
        tree.position.set(Math.cos(angle) * 14, 0, Math.sin(angle) * 14);
        dynGroup.add(tree);
      }
    } else if (activeMode === 'clean_energy') {
      // ⚡ Clean Energy: Wind Turbines + Solar Arrays on rooftops
      const t1 = createWindTurbine(mats, 16);
      t1.position.set(-17, 0, -9);
      t1.userData.speed = 0.08;
      dynGroup.add(t1);
      turbinesRef.current.push(t1);

      const t2 = createWindTurbine(mats, 18);
      t2.position.set(16, 0, -14);
      t2.userData.speed = 0.07;
      dynGroup.add(t2);
      turbinesRef.current.push(t2);

      // Rooftop solar arrays
      const s1 = createSolarArray(mats, 2, 4);
      s1.position.set(0, 25, -8);
      dynGroup.add(s1);

      const s2 = createSolarArray(mats, 2, 3);
      s2.position.set(-7, 19, -7);
      dynGroup.add(s2);

      // Balanced trees
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const tree = createTree(mats, 2.2);
        tree.position.set(Math.cos(angle) * 13, 0, Math.sin(angle) * 13);
        dynGroup.add(tree);
      }

      const pod = createAutonomousPod(mats);
      pod.userData = { angle: 0.5, radius: 13.5, speed: 0.012 };
      dynGroup.add(pod);
      podsRef.current.push(pod);
    } else if (activeMode === 'car_free') {
      // 🚶 Car-Free: 0 street pods, wide pedestrian tiles, high trees, civic gathering
      for (let i = 0; i < 22; i++) {
        const angle = (i / 22) * Math.PI * 2;
        const dist = 5 + (i % 3) * 5;
        if (dist < 7.5 || dist > 11) {
          const tree = createTree(mats, 2.4);
          tree.position.set(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);
          dynGroup.add(tree);
        }
      }

      // Pedestrian plaza
      const plaza = new THREE.Mesh(
        new THREE.CylinderGeometry(5, 5, 0.1, 24),
        mats.pedestrianTile
      );
      plaza.position.set(0, 0.06, 12);
      dynGroup.add(plaza);
    }

    scene.add(dynGroup);
    dynamicGroupRef.current = dynGroup;
  }, [activeMode]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-seagreen-gold/40 shadow-2xl bg-gradient-to-br from-[#07221E] to-[#041513]" style={{ height }}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Labeled Landmark Hotspots */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-1.5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-seagreen-gold/40 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono font-bold text-seagreen-gold uppercase">
            3D FUTURE CITY PROTOTYPE
          </span>
        </div>
      </div>

      {/* Landmark Legend Pins */}
      <div className="absolute top-4 right-4 z-10 pointer-events-none hidden sm:flex flex-col gap-1.5 text-[10px] font-sans">
        <div className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-white backdrop-blur-xs flex items-center gap-1.5">
          <span>🏠</span> <span>Smart Home</span>
        </div>
        <div className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-white backdrop-blur-xs flex items-center gap-1.5">
          <span>🏥</span> <span>Future Hospital</span>
        </div>
        <div className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-white backdrop-blur-xs flex items-center gap-1.5">
          <span>🏫</span> <span>Future School</span>
        </div>
        <div className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-white backdrop-blur-xs flex items-center gap-1.5">
          <span>🚇</span> <span>Elevated Maglev</span>
        </div>
      </div>

      {/* Orbit Drag Notice */}
      <div className="absolute bottom-3 left-4 z-10 pointer-events-none text-[10px] font-mono text-seagreen-seafoam/50">
        🔄 Drag to rotate 3D view · Click buttons below to reshape city
      </div>
    </div>
  );
}
