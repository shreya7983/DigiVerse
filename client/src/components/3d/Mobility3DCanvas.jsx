import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  PALETTE, 
  createCityMaterials,
  createRealisticVehicle,
  createElectricBus,
  createBusShelter,
  createStreetLamppost,
  createHumanFigure,
  createVariedTree 
} from './cityBuilder';
import sound from '../../utils/sound';
import { Car, Zap, Trees, AlertTriangle, ShieldCheck, RotateCcw } from 'lucide-react';

export default function Mobility3DCanvas({ height = '480px' }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const transitGroupRef = useRef(null);
  const [mode, setMode] = useState('future'); // 'traditional' | 'future'

  const buildTransitScene = (currentMode) => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    if (transitGroupRef.current) {
      scene.remove(transitGroupRef.current);
    }

    const group = new THREE.Group();
    const mats = createCityMaterials(false);

    if (currentMode === 'traditional') {
      scene.background = new THREE.Color(0x18201E);
      scene.fog = new THREE.FogExp2(0x18201E, 0.018);

      // Dark asphalt arterial road
      const road = new THREE.Mesh(
        new THREE.BoxGeometry(34, 0.3, 14),
        mats.asphaltRoad
      );
      road.position.y = 0.15;
      road.receiveShadow = true;
      group.add(road);

      // Concrete curbs
      const curb1 = new THREE.Mesh(new THREE.BoxGeometry(34, 0.25, 0.4), mats.curbStone);
      curb1.position.set(0, 0.35, 7.2);
      group.add(curb1);
      const curb2 = new THREE.Mesh(new THREE.BoxGeometry(34, 0.25, 0.4), mats.curbStone);
      curb2.position.set(0, 0.35, -7.2);
      group.add(curb2);

      // Yellow double dividing lane lines
      const laneLine = new THREE.Mesh(
        new THREE.BoxGeometry(34, 0.02, 0.3),
        new THREE.MeshBasicMaterial({ color: 0xFBBF24 })
      );
      laneLine.position.set(0, 0.32, 0);
      group.add(laneLine);

      // Cluttered conventional traffic jam (cars stuck bumper-to-bumper)
      const carColors = [0x991B1B, 0x1E3A8A, 0x374151, 0x4B5563, 0xD97706];
      for (let c = 0; c < 6; c++) {
        const car = new THREE.Group();
        const bodyMat = new THREE.MeshStandardMaterial({ 
          color: carColors[c % carColors.length], 
          roughness: 0.3 
        });

        // Chassis
        const body = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.6, 1.8), bodyMat);
        body.position.y = 0.5;
        body.castShadow = true;
        car.add(body);

        // Cabin
        const cabin = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.6, 1.5), mats.carGlass);
        cabin.position.set(-0.2, 1.0, 0);
        cabin.castShadow = true;
        car.add(cabin);

        // 4 Wheels
        const wGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.22, 16);
        wGeom.rotateZ(Math.PI * 0.5);
        [[-1.2, 0.8], [1.2, 0.8], [-1.2, -0.8], [1.2, -0.8]].forEach(([wx, wz]) => {
          const w = new THREE.Mesh(wGeom, mats.tireRubber);
          w.position.set(wx, 0.35, wz);
          car.add(w);
        });

        // Red taillights & white headlights
        const tail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.15, 1.5), mats.taillightLED);
        tail.position.set(-2.02, 0.6, 0);
        car.add(tail);

        const head = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.15, 1.5), mats.headlightLED);
        head.position.set(2.02, 0.6, 0);
        car.add(head);

        const laneZ = c % 2 === 0 ? -3.5 : 3.5;
        const posX = (c - 2.5) * 5.4;
        car.position.set(posX, 0, laneZ);
        if (c % 2 === 0) car.rotation.y = Math.PI;
        group.add(car);
      }
    } else {
      // Future mode: Oceanic clean atmosphere & Multi-Modal Complete Street
      scene.background = new THREE.Color(0x0A2B26);
      scene.fog = new THREE.FogExp2(0x0A2B26, 0.012);

      // 1. Reclaimed multi-modal street base
      const ground = new THREE.Mesh(
        new THREE.BoxGeometry(34, 0.4, 20),
        mats.sidewalkPaver
      );
      ground.position.y = 0.2;
      ground.receiveShadow = true;
      group.add(ground);

      // Transit arterial strip (PBR Asphalt)
      const transitRoad = new THREE.Mesh(
        new THREE.BoxGeometry(34, 0.02, 7.0),
        mats.asphaltRoad
      );
      transitRoad.position.set(0, 0.42, 3.5);
      transitRoad.receiveShadow = true;
      group.add(transitRoad);

      // Green cycle & micromobility lane
      const bikeLane = new THREE.Mesh(
        new THREE.BoxGeometry(34, 0.02, 2.5),
        mats.seaGreenAccent
      );
      bikeLane.position.set(0, 0.42, -1.25);
      group.add(bikeLane);

      // Wide pedestrian promenade
      const promenade = new THREE.Mesh(
        new THREE.BoxGeometry(34, 0.02, 6.0),
        mats.sidewalkPaver
      );
      promenade.position.set(0, 0.42, -5.5);
      group.add(promenade);

      // Trees along pedestrian promenade
      for (let t = -12; t <= 12; t += 6) {
        const tree = createVariedTree(mats, 0, 1.1);
        tree.position.set(t, 0.4, -7.5);
        group.add(tree);
      }

      // Modern glass transit bus shelter
      const busShelter = createBusShelter(mats);
      busShelter.position.set(-6, 0.4, -2.8);
      group.add(busShelter);

      // Solar street lampposts
      const lamp1 = createStreetLamppost(mats);
      lamp1.position.set(8, 0.4, -2.8);
      group.add(lamp1);

      // Human-scale pedestrians walking and waiting
      const ped1 = createHumanFigure(mats, 0, false);
      ped1.position.set(-6.5, 0.4, -2.2);
      group.add(ped1);

      const ped2 = createHumanFigure(mats, 1, false);
      ped2.position.set(2, 0.4, -5.5);
      group.add(ped2);

      const ped3 = createHumanFigure(mats, 2, false);
      ped3.position.set(-2, 0.4, -5.8);
      group.add(ped3);

      // 2. Elevated Maglev Monorail Track
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(34, 0.35, 0.9),
        mats.concreteWhite
      );
      rail.position.set(0, 7.0, -5.0);
      group.add(rail);

      for (let p = -12; p <= 12; p += 8) {
        const pillar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.35, 0.45, 7.0, 16),
          mats.bronzeMetal
        );
        pillar.position.set(p, 3.5, -5.0);
        pillar.castShadow = true;
        group.add(pillar);
      }

      // Aerodynamic Maglev Train Gliding on elevated rail
      const train = new THREE.Group();
      for (let i = 0; i < 3; i++) {
        const car = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.2, 1.3), mats.carPaintWhite);
        car.position.x = (i - 1) * 3.8;
        const win = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.4, 1.32), mats.carGlass);
        car.add(win);
        train.add(car);
      }
      train.position.set(0, 7.8, -5.0);
      group.add(train);
      group.userData.train = train;

      // 3. Autonomous Electric Fleet on Road Strip
      const bus = createElectricBus(mats);
      bus.position.set(-5, 0.4, 3.5);
      bus.rotation.y = Math.PI * 0.5;
      group.add(bus);

      const car1 = createRealisticVehicle(mats, 'teal');
      car1.position.set(6, 0.4, 3.5);
      car1.rotation.y = Math.PI * 0.5;
      group.add(car1);
    }

    scene.add(group);
    transitGroupRef.current = group;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const heightPx = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / heightPx, 0.5, 100);
    camera.position.set(22, 16, 24);
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
    controls.target.set(0, 3, 0);
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controlsRef.current = controls;

    // Lighting
    scene.add(new THREE.HemisphereLight(0xF2FAF7, 0x1A3530, 1.3));
    const sun = new THREE.DirectionalLight(0xFFF9E6, 2.2);
    sun.position.set(20, 30, 15);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    scene.add(sun);

    buildTransitScene(mode);

    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (mode === 'future' && transitGroupRef.current?.userData?.train) {
        const train = transitGroupRef.current.userData.train;
        train.position.x = train.position.x + 0.12;
        if (train.position.x > 18) train.position.x = -18;
      }
      controls.update();
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

  const toggleMode = (newMode) => {
    sound.playChime();
    setMode(newMode);
    buildTransitScene(newMode);
  };

  const resetCamera = () => {
    sound.playClick();
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(22, 16, 24);
      controlsRef.current.target.set(0, 3, 0);
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-seagreen-primary/40 shadow-2xl bg-[#0A2B26]" style={{ height }}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Banner & Mode Toggle */}
      <div className="absolute top-5 left-5 z-20 flex items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-seagreen-gold/50 text-white backdrop-blur-md shadow-lg">
          <Car size={13} className="text-seagreen-gold" />
          <span className="font-mono text-xs text-seagreen-gold font-bold uppercase tracking-wider">
            2040 MULTI-MODAL MOBILITY CORRIDOR
          </span>
        </div>

        {/* Traditional vs Future Toggle */}
        <div className="p-1 rounded-2xl bg-black/70 border border-white/15 backdrop-blur-md flex items-center gap-1 shadow-lg">
          <button
            onClick={() => toggleMode('traditional')}
            data-cursor="hover"
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              mode === 'traditional'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Traditional (2026)
          </button>
          <button
            onClick={() => toggleMode('future')}
            data-cursor="hover"
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              mode === 'future'
                ? 'bg-gradient-to-r from-seagreen-dark to-seagreen-primary text-white border border-seagreen-gold shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Autonomous (2040)
          </button>
        </div>
      </div>

      {/* Top Right Reset */}
      <button
        onClick={resetCamera}
        data-cursor="hover"
        title="Reset Camera View"
        className="absolute top-5 right-5 z-20 p-2.5 rounded-xl bg-black/60 hover:bg-black/85 text-seagreen-gold border border-white/15 transition-colors backdrop-blur-md shadow-lg"
      >
        <RotateCcw size={14} />
      </button>

      {/* Mode Comparison Telemetry Badge */}
      <div className="absolute bottom-5 right-5 left-5 sm:left-auto sm:max-w-md z-20 p-5 rounded-3xl bg-black/85 border border-seagreen-gold shadow-2xl backdrop-blur-2xl text-white">
        {mode === 'traditional' ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold mb-1">
              <AlertTriangle size={14} />
              <span>TRADITIONAL MOBILITY FRICTION</span>
            </div>
            <p className="text-xs text-white/80 font-sans leading-relaxed mb-3">
              Combustion engine congestion, toxic carbon exhaust, road rage, and 35% of land sacrificed for static asphalt parking.
            </p>
            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded-xl bg-red-950/40 border border-red-500/20 text-red-300">
                Accidents: 1.3M / yr
              </div>
              <div className="p-2 rounded-xl bg-red-950/40 border border-red-500/20 text-red-300">
                Asphalt Cover: 35%
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold mb-1">
              <ShieldCheck size={14} />
              <span>SYNCHRONIZED AUTONOMOUS GRID</span>
            </div>
            <p className="text-xs text-seagreen-seafoam/90 font-sans leading-relaxed mb-3">
              Silent magnetic pods synchronize like a flock of birds. Reclaimed roads become green walking boulevards with zero crashes.
            </p>
            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-emerald-300">
                Accidents: 0.00%
              </div>
              <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-emerald-300">
                Parks Reclaimed: +35%
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-3 left-5 z-10 pointer-events-none text-[11px] font-mono text-seagreen-seafoam/40 hidden sm:block">
        🖱️ Drag to rotate 3D street · Toggle between Traditional and Autonomous above
      </div>
    </div>
  );
}
