import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  PALETTE, 
  createCityMaterials, 
  createFutureHospital, 
  createHumanFigure, 
  createRealisticVehicle,
  createVariedTree 
} from './cityBuilder';
import sound from '../../utils/sound';
import { HeartPulse, Activity, Dna, ShieldAlert, Sparkles, RotateCcw, Stethoscope, Plane } from 'lucide-react';

export const HOSPITAL_HOTSPOTS = [
  {
    id: 'scanner',
    title: 'AI Molecular Diagnostic Scanner',
    icon: Dna,
    color: '#38BDF8',
    position: new THREE.Vector3(4.0, 3.2, 2.5),
    desc: 'Analyzes cellular proteins, micro-RNA, and cardiovascular elasticity in real time, detecting anomalies up to 3 years before symptoms.',
    metric: 'Predictive Horizon: 36 Months'
  },
  {
    id: 'pods',
    title: 'Continuous Cellular Care Pods',
    icon: Activity,
    color: '#34D399',
    position: new THREE.Vector3(-1.5, 3.5, -2.0),
    desc: 'Beds woven from intelligent bio-textiles deliver gentle sonic cellular repair and replenish vital electrolytes without needles.',
    metric: 'Non-Invasive · Zero Trauma'
  },
  {
    id: 'robotics',
    title: 'Robotic Nanoscale Microsurgery',
    icon: ShieldAlert,
    color: '#F472B6',
    position: new THREE.Vector3(-1.5, 6.2, -2.0),
    desc: 'Autonomous multi-jointed micro-arms perform microscopic vascular repairs with sub-millimeter precision and same-day discharge.',
    metric: '0.01mm Precision · Zero Pain'
  },
  {
    id: 'sanctuary',
    title: 'Empathetic Physician Sanctuary',
    icon: Stethoscope,
    color: '#FBBF24',
    position: new THREE.Vector3(4.0, 6.2, 2.5),
    desc: 'Because algorithms handle data processing, human doctors dedicate their full attention to deep psychological care and human counseling.',
    metric: 'Human-Centered Care'
  },
  {
    id: 'helipad',
    title: 'Autonomous Medical eVTOL Helipad',
    icon: Plane,
    color: '#60A5FA',
    position: new THREE.Vector3(-2.0, 9.4, -2.0),
    desc: 'Rooftop rapid emergency response landing zone coordinates autonomous electric air ambulances with zero road traffic delays.',
    metric: '< 4 Min Urban Response'
  }
];

export default function FutureHospital3D({ height = '560px' }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const [activeItem, setActiveItem] = useState(HOSPITAL_HOTSPOTS[0]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const heightPx = container.clientHeight;

    // 1. Realistic Scene Environment
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0A2420);
    scene.fog = new THREE.FogExp2(0x0A2420, 0.014);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / heightPx, 0.5, 120);
    camera.position.set(20, 14, 22);
    cameraRef.current = camera;

    // 3. Renderer with ACES Filmic Tone Mapping & Soft Shadows
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 4, 0);
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 8;
    controls.maxDistance = 50;
    controlsRef.current = controls;

    // 5. Realistic Natural Architectural Lighting
    const hemiLight = new THREE.HemisphereLight(0xF2FAF7, 0x1A3530, 1.3);
    scene.add(hemiLight);

    const sun = new THREE.DirectionalLight(0xFFF6E8, 2.3);
    sun.position.set(24, 36, 18);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.bias = -0.0001;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 80;
    sun.shadow.camera.left = -22;
    sun.shadow.camera.right = 22;
    sun.shadow.camera.top = 22;
    sun.shadow.camera.bottom = -22;
    scene.add(sun);

    // Subtle diagnostic atrium interior glow
    const atriumGlow = new THREE.PointLight(0x7ED6C8, 1.8, 14);
    atriumGlow.position.set(4, 4, 2.5);
    scene.add(atriumGlow);

    // 6. Build Realistic Architectural Hospital Pavilion
    const mats = createCityMaterials(false);

    // Plaza podium
    const plaza = new THREE.Mesh(
      new THREE.CylinderGeometry(26, 27, 1.0, 48),
      mats.sidewalkPaver
    );
    plaza.position.y = -0.5;
    plaza.receiveShadow = true;
    scene.add(plaza);

    // Realistic Modern Hospital Model
    const hospital = createFutureHospital(mats);
    hospital.position.set(0, 0, 0);
    scene.add(hospital);

    // Parked Autonomous Medical Transport Pod under porte-cochere
    const ambulance = createRealisticVehicle(mats, 'teal');
    ambulance.position.set(4.0, 0, 7.8);
    ambulance.rotation.y = Math.PI * 0.5;
    scene.add(ambulance);

    // Proportional human figures outside entrance
    const person1 = createHumanFigure(mats, 0, false);
    person1.position.set(5.5, 0, 4.5);
    scene.add(person1);

    const person2 = createHumanFigure(mats, 2, false);
    person2.position.set(2.2, 0, 5.0);
    scene.add(person2);

    // Surrounding urban street birch trees
    const tree1 = createVariedTree(mats, 0, 1.2);
    tree1.position.set(-11, 0, 8);
    scene.add(tree1);

    const tree2 = createVariedTree(mats, 1, 1.1);
    tree2.position.set(12, 0, -8);
    scene.add(tree2);

    // 7. Interactive 3D Beacon Hotspots
    const markers = [];
    HOSPITAL_HOTSPOTS.forEach((spot) => {
      const beacon = new THREE.Group();
      beacon.position.copy(spot.position);
      beacon.userData = { hotspot: spot };

      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 16, 16),
        new THREE.MeshBasicMaterial({ color: spot.color })
      );
      beacon.add(core);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.42, 0.035, 8, 32),
        new THREE.MeshBasicMaterial({ color: spot.color, transparent: true, opacity: 0.85 })
      );
      ring.rotation.x = Math.PI * 0.5;
      beacon.add(ring);
      beacon.userData.ring = ring;

      scene.add(beacon);
      markers.push(beacon);
    });

    // 8. Animation Loop
    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const t = Date.now() * 0.0025;
      markers.forEach((m, idx) => {
        if (m.userData.ring) {
          m.userData.ring.rotation.z += 0.02;
          const s = 1 + Math.sin(t + idx) * 0.15;
          m.userData.ring.scale.set(s, s, s);
        }
      });
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Raycast click detection on 3D markers
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const onCanvasClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markers, true);

      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj && !obj.userData?.hotspot && obj.parent) {
          obj = obj.parent;
        }
        if (obj?.userData?.hotspot) {
          selectHotspot(obj.userData.hotspot);
        }
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('click', onCanvasClick);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      domEl.removeEventListener('click', onCanvasClick);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const selectHotspot = (item) => {
    sound.playClick();
    setActiveItem(item);

    if (cameraRef.current && controlsRef.current) {
      const cam = cameraRef.current;
      const ctrl = controlsRef.current;
      const targetPos = item.position.clone().add(new THREE.Vector3(8, 5, 8));
      const targetLook = item.position.clone();

      const startPos = cam.position.clone();
      const startLook = ctrl.target.clone();
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / 800, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        cam.position.lerpVectors(startPos, targetPos, ease);
        ctrl.target.lerpVectors(startLook, targetLook, ease);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  };

  const resetCamera = () => {
    sound.playClick();
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(20, 14, 22);
      controlsRef.current.target.set(0, 4, 0);
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-seagreen-primary/40 shadow-2xl bg-[#0A2420]" style={{ height }}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Banner */}
      <div className="absolute top-5 left-5 z-20 pointer-events-none flex items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-seagreen-gold/50 text-white backdrop-blur-md shadow-lg pointer-events-auto">
          <HeartPulse size={13} className="text-cyan-400" />
          <span className="font-mono text-xs text-seagreen-gold font-bold uppercase tracking-wider">
            2040 HEALTHCARE PAVILION ARCHITECTURAL MODEL
          </span>
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

      {/* Hotspots Selector */}
      <div className="absolute top-16 left-5 z-20 flex flex-col gap-2 max-w-xs">
        {HOSPITAL_HOTSPOTS.map((spot) => {
          const isSelected = activeItem.id === spot.id;
          const Icon = spot.icon;
          return (
            <button
              key={spot.id}
              onClick={() => selectHotspot(spot)}
              data-cursor="hover"
              className={`px-3 py-2 rounded-xl text-xs font-sans font-semibold flex items-center gap-2.5 transition-all text-left border ${
                isSelected
                  ? 'bg-gradient-to-r from-seagreen-dark to-seagreen-deep text-white border-seagreen-gold shadow-lg -translate-x-1'
                  : 'bg-black/50 text-white/70 border-white/10 hover:bg-black/80 hover:text-white backdrop-blur-md'
              }`}
            >
              <Icon size={14} style={{ color: spot.color }} />
              <span className="truncate">{spot.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Hotspot Info Card */}
      <div className="absolute bottom-5 right-5 left-5 sm:left-auto sm:max-w-md z-20 p-5 rounded-3xl bg-black/85 border border-seagreen-gold shadow-2xl backdrop-blur-2xl text-white animate-in fade-in slide-in-from-bottom-2">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <activeItem.icon size={16} style={{ color: activeItem.color }} />
            <span className="font-bold text-sm text-white font-serif">{activeItem.title}</span>
          </div>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-seagreen-primary/30 text-seagreen-gold border border-seagreen-gold/30">
            {activeItem.metric}
          </span>
        </div>
        <p className="text-xs text-seagreen-seafoam/90 leading-relaxed font-sans">
          {activeItem.desc}
        </p>
      </div>

      {/* Drag instruction */}
      <div className="absolute bottom-3 left-5 z-10 pointer-events-none text-[11px] font-mono text-seagreen-seafoam/40 hidden sm:block">
        🖱️ Drag to rotate 3D hospital · Click departments to zoom inside
      </div>
    </div>
  );
}
