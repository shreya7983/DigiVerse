import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PALETTE, createCityMaterials, createTree, createAutonomousPod, createWindTurbine, createSolarArray } from './cityBuilder';
import sound from '../../utils/sound';
import { Calendar, Sparkles, Sliders, ArrowRight, RotateCcw } from 'lucide-react';

export const TIMELINE_ERAS = [
  {
    year: 2026,
    label: '2026 · Current Era',
    title: 'The Industrial Friction Baseline',
    desc: 'Dense vehicular traffic, asphalt streets, high carbon emission grids, and reactive crisis healthcare.',
    skyColor: 0x1A211E,
    fogDensity: 0.02,
    greeneryCount: 6,
    hasMaglev: false,
    hasTurbines: false,
    hasSolar: false,
    isCarFree: false,
    smogLevel: 'High Carbon Haze',
    transitType: 'Combustion Congestion',
    stats: { cleanEnergy: '18%', greenCoverage: '12%', autonomy: '5%' }
  },
  {
    year: 2030,
    label: '2030 · Smart Transition',
    title: 'Early Connected Infrastructure',
    desc: 'First rooftop solar mandates, connected EV charging corridors, sensor-driven streetlights, and pilot vertical farms.',
    skyColor: 0x102E28,
    fogDensity: 0.016,
    greeneryCount: 16,
    hasMaglev: false,
    hasTurbines: true,
    hasSolar: true,
    isCarFree: false,
    smogLevel: 'Moderate Air Scrubbing',
    transitType: 'Hybrid Electrification',
    stats: { cleanEnergy: '48%', greenCoverage: '26%', autonomy: '32%' }
  },
  {
    year: 2040,
    label: '2040 · Connected Metropolis',
    title: 'Advanced Symbiotic DigiVerse',
    desc: 'Elevated magnetic monorails, subterranean automated logistics, biophilic towers, and zero-accident autonomous pod swarms.',
    skyColor: 0x0A332F,
    fogDensity: 0.012,
    greeneryCount: 38,
    hasMaglev: true,
    hasTurbines: true,
    hasSolar: true,
    isCarFree: false,
    smogLevel: 'Zero-Emission Clean Sky',
    transitType: 'Synchronized Autonomous Grid',
    stats: { cleanEnergy: '92%', greenCoverage: '58%', autonomy: '86%' }
  },
  {
    year: 2050,
    label: '2050 · Living Ecosystem',
    title: 'Self-Healing Circular Biosphere',
    desc: '100% car-free botanical ground streets, living algae building skins, circular zero-waste computing, and atmospheric water towers.',
    skyColor: 0x062420,
    fogDensity: 0.008,
    greeneryCount: 65,
    hasMaglev: true,
    hasTurbines: true,
    hasSolar: true,
    isCarFree: true,
    smogLevel: 'Planetary Biosphere Net-Positive',
    transitType: '100% Pedestrian + Maglev',
    stats: { cleanEnergy: '100%', greenCoverage: '84%', autonomy: '98%' }
  }
];

export default function TimelineCityCanvas({ height = '520px', selectedEraIndex, onSelectEra }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const cityGroupRef = useRef(null);
  const materialsRef = useRef(null);

  const [activeEraIndex, setActiveEraIndex] = useState(selectedEraIndex ?? 2); // default 2040
  const currentEra = TIMELINE_ERAS[activeEraIndex];

  // Build or Rebuild Era-specific 3D scene
  const buildEraScene = (era) => {
    if (!sceneRef.current || !materialsRef.current) return;
    const scene = sceneRef.current;
    const mats = materialsRef.current;

    // Remove prior city
    if (cityGroupRef.current) {
      scene.remove(cityGroupRef.current);
    }

    // Adjust background and fog
    scene.background = new THREE.Color(era.skyColor);
    scene.fog = new THREE.FogExp2(era.skyColor, era.fogDensity);

    const group = new THREE.Group();

    // 1. Ground Disk
    const groundGeom = new THREE.CylinderGeometry(40, 40, 1.2, 40);
    const groundMat = era.year === 2026
      ? new THREE.MeshStandardMaterial({ color: 0x1A211E, roughness: 0.8 })
      : mats.darkTealWall;
    const ground = new THREE.Mesh(groundGeom, groundMat);
    ground.position.y = -0.6;
    ground.receiveShadow = true;
    group.add(ground);

    // 2. Buildings (evolving architectural style)
    const buildingCount = 14;
    for (let i = 0; i < buildingCount; i++) {
      const angle = (i / buildingCount) * Math.PI * 2;
      const dist = 10 + (i % 3) * 7;
      const bHeight = 10 + (i % 5) * 4;

      // In 2026, buildings are rough grey concrete; in 2040/2050 they are sleek biophilic cream & sea-green
      let bMat = mats.creamWall;
      if (era.year === 2026) {
        bMat = new THREE.MeshStandardMaterial({ color: 0x3D4A46, roughness: 0.8 });
      } else if (era.year === 2030) {
        bMat = i % 2 === 0 ? mats.creamWall : new THREE.MeshStandardMaterial({ color: 0x2A403C });
      } else {
        bMat = i % 2 === 0 ? mats.creamWall : mats.primaryWall;
      }

      const bGeom = new THREE.BoxGeometry(4.5, bHeight, 4.5);
      const b = new THREE.Mesh(bGeom, bMat);
      b.position.set(Math.cos(angle) * dist, bHeight / 2, Math.sin(angle) * dist);
      b.castShadow = true;
      group.add(b);

      // Add Glass bands on 2040 and 2050
      if (era.year >= 2040) {
        const glassBand = new THREE.Mesh(
          new THREE.BoxGeometry(4.55, bHeight * 0.4, 4.55),
          mats.glassWindow
        );
        glassBand.position.copy(b.position);
        group.add(glassBand);
      }

      // Add Rooftop Solar in 2030, 2040, 2050
      if (era.hasSolar && i % 3 === 0) {
        const solar = createSolarArray(mats, 2, 2);
        solar.position.set(b.position.x, bHeight + 0.2, b.position.z);
        group.add(solar);
      }
    }

    // 3. Elevated Maglev (2040 & 2050 only)
    if (era.hasMaglev) {
      const rail = new THREE.Mesh(
        new THREE.TorusGeometry(22, 0.2, 8, 48),
        mats.whiteMetal
      );
      rail.rotation.x = Math.PI * 0.5;
      rail.position.y = 4.5;
      group.add(rail);

      for (let k = 0; k < 8; k++) {
        const pAngle = (k / 8) * Math.PI * 2;
        const pillar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.3, 0.3, 4.5, 8),
          mats.darkTealWall
        );
        pillar.position.set(Math.cos(pAngle) * 22, 2.25, Math.sin(pAngle) * 22);
        group.add(pillar);
      }
    }

    // 4. Wind Turbines (2030, 2040, 2050)
    if (era.hasTurbines) {
      const turbine1 = createWindTurbine(mats, 16);
      turbine1.position.set(-28, 0, -12);
      group.add(turbine1);

      const turbine2 = createWindTurbine(mats, 16);
      turbine2.position.set(26, 0, -18);
      group.add(turbine2);
    }

    // 5. Trees (procedurally scaled with era)
    for (let t = 0; t < era.greeneryCount; t++) {
      const tAngle = Math.random() * Math.PI * 2;
      const tDist = 6 + Math.random() * 30;
      const tree = createTree(mats, 2.2 + Math.random() * 1.8);
      tree.position.set(Math.cos(tAngle) * tDist, 0, Math.sin(tAngle) * tDist);
      group.add(tree);
    }

    // 6. Vehicles (Conventional cars in 2026; autonomous pods in 2030/2040; none on ground in 2050 car-free)
    if (!era.isCarFree) {
      const vCount = era.year === 2026 ? 8 : 4;
      for (let v = 0; v < vCount; v++) {
        const pod = createAutonomousPod(mats);
        const vAngle = (v / vCount) * Math.PI * 2;
        pod.position.set(Math.cos(vAngle) * 14, 0, Math.sin(vAngle) * 14);
        pod.rotation.y = -vAngle + Math.PI * 0.5;
        group.add(pod);
      }
    }

    scene.add(group);
    cityGroupRef.current = group;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const heightPx = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / heightPx, 0.5, 200);
    camera.position.set(32, 26, 38);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 4, 0);
    controls.maxPolarAngle = Math.PI / 2 - 0.05;

    // Lighting
    scene.add(new THREE.AmbientLight(0x23685E, 1.2));
    const sun = new THREE.DirectionalLight(0xFFF9E6, 2.0);
    sun.position.set(30, 40, 20);
    sun.castShadow = true;
    scene.add(sun);

    materialsRef.current = createCityMaterials();
    buildEraScene(TIMELINE_ERAS[activeEraIndex]);

    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (cityGroupRef.current) {
        cityGroupRef.current.rotation.y += 0.0015; // gentle slow orbit
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

  useEffect(() => {
    if (selectedEraIndex !== undefined && selectedEraIndex !== activeEraIndex) {
      setActiveEraIndex(selectedEraIndex);
      buildEraScene(TIMELINE_ERAS[selectedEraIndex]);
    }
  }, [selectedEraIndex]);

  const switchEra = (idx) => {
    sound.playChime();
    setActiveEraIndex(idx);
    buildEraScene(TIMELINE_ERAS[idx]);
    if (onSelectEra) onSelectEra(idx);
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-seagreen-primary/40 shadow-2xl bg-[#0A332F]" style={{ height }}>
      {/* 3D WebGL Canvas Viewport */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Banner */}
      <div className="absolute top-5 left-5 z-20 pointer-events-none flex items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-seagreen-gold/50 text-white backdrop-blur-md shadow-lg pointer-events-auto">
          <Calendar size={13} className="text-seagreen-gold" />
          <span className="font-mono text-xs text-seagreen-gold font-bold uppercase">
            3D TEMPORAL EVOLUTION SIMULATOR
          </span>
        </div>
      </div>

      {/* Interactive Era Buttons */}
      <div className="absolute top-16 left-5 z-20 flex gap-2 flex-wrap">
        {TIMELINE_ERAS.map((era, idx) => {
          const isActive = activeEraIndex === idx;
          return (
            <button
              key={era.year}
              onClick={() => switchEra(idx)}
              data-cursor="hover"
              className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold transition-all border ${
                isActive
                  ? 'bg-gradient-to-r from-seagreen-dark to-seagreen-deep text-white border-seagreen-gold shadow-lg -translate-y-0.5'
                  : 'bg-black/50 text-white/70 border-white/10 hover:bg-black/80 hover:text-white backdrop-blur-md'
              }`}
            >
              {era.year}
            </button>
          );
        })}
      </div>

      {/* Active Era Story Card */}
      <div className="absolute bottom-5 right-5 left-5 sm:left-auto sm:max-w-md z-20 p-6 rounded-3xl bg-black/85 border border-seagreen-gold shadow-2xl backdrop-blur-2xl text-white animate-in fade-in slide-in-from-bottom-2">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-mono text-xs font-bold text-seagreen-gold uppercase">
            {currentEra.label}
          </span>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-seagreen-primary/40 text-emerald-300 border border-emerald-500/30">
            {currentEra.smogLevel}
          </span>
        </div>

        <h3 className="editorial-serif text-xl font-bold text-white mb-1.5">
          {currentEra.title}
        </h3>
        <p className="text-xs text-seagreen-seafoam/90 leading-relaxed font-sans mb-4">
          {currentEra.desc}
        </p>

        {/* 3 Telemetry Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/15 text-center">
          <div className="p-2 rounded-xl bg-white/5">
            <span className="text-[10px] text-white/60 block font-mono">Clean Energy</span>
            <span className="font-bold text-xs font-mono text-amber-300">{currentEra.stats.cleanEnergy}</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5">
            <span className="text-[10px] text-white/60 block font-mono">Green Space</span>
            <span className="font-bold text-xs font-mono text-emerald-300">{currentEra.stats.greenCoverage}</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5">
            <span className="text-[10px] text-white/60 block font-mono">Autonomous</span>
            <span className="font-bold text-xs font-mono text-cyan-300">{currentEra.stats.autonomy}</span>
          </div>
        </div>
      </div>

      {/* Drag instruction */}
      <div className="absolute bottom-3 left-5 z-10 pointer-events-none text-[11px] font-mono text-seagreen-seafoam/40 hidden sm:block">
        🖱️ Drag to rotate 3D timeline world · Select eras above to watch the city evolve
      </div>
    </div>
  );
}
