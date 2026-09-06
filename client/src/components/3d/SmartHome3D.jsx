import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  PALETTE, 
  createCityMaterials, 
  createModernHouse, 
  createHumanFigure, 
  createVariedTree 
} from './cityBuilder';
import sound from '../../utils/sound';
import { Sparkles, Sun, Thermometer, Bot, ShieldCheck, Leaf, ArrowRight, RotateCcw } from 'lucide-react';

export const SMART_HOME_COMPONENTS = [
  {
    id: 'thermostat',
    title: 'Ambient Circadian Thermostat',
    icon: Thermometer,
    color: '#34D399',
    position: new THREE.Vector3(-0.5, 2.2, -3.0),
    desc: 'The home automatically adjusts temperature and humidity according to your biometric flow states and circadian sleep rhythms.',
    metric: '21.5°C · Optimal REM Sleep Alignment'
  },
  {
    id: 'solar',
    title: 'Rooftop Solar Tiles & Power Wall',
    icon: Sun,
    color: '#FBBF24',
    position: new THREE.Vector3(1.5, 7.4, -1.2),
    desc: 'BIPV solar glass shingles generate 28 kWh/day, storing surplus energy into subterranean solid-state lithium-ceramic batteries.',
    metric: '100% Clean Energy Self-Sovereignty'
  },
  {
    id: 'ai-core',
    title: 'Ambient Holographic AI Assistant',
    icon: Bot,
    color: '#60A5FA',
    position: new THREE.Vector3(0.5, 1.2, -0.5),
    desc: 'Your localized digital assistant coordinates your morning routine, manages nutritious meal prep, and silences notifications during focus.',
    metric: 'Zero-Cloud · Edge Encryption'
  },
  {
    id: 'glass',
    title: 'Electrochromic Dynamic Glass',
    icon: ShieldCheck,
    color: '#A78BFA',
    position: new THREE.Vector3(-0.4, 2.2, 2.2),
    desc: 'Windows automatically tint during intense midday sun to eliminate thermal heat gain and frost to total privacy at sunset.',
    metric: '99% UV Block · Instant Privacy'
  },
  {
    id: 'hydroponics',
    title: 'Indoor Hydroponic Harvest Wall',
    icon: Leaf,
    color: '#10B981',
    position: new THREE.Vector3(-5.2, 2.2, -0.2),
    desc: 'Vertical aerated misting column yields fresh organic vegetables, strawberries, and medicinal herbs year-round with 95% less water.',
    metric: 'Zero Food Miles · Hyper-Local'
  }
];

export default function SmartHome3D({ height = '560px' }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const [activeItem, setActiveItem] = useState(SMART_HOME_COMPONENTS[0]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const heightPx = container.clientHeight;

    // 1. Scene setup with architectural studio atmosphere
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0C2420);
    scene.fog = new THREE.FogExp2(0x0C2420, 0.014);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / heightPx, 0.5, 120);
    camera.position.set(16, 11, 20);
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
    controls.target.set(0, 3.2, 0);
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 6;
    controls.maxDistance = 42;
    controlsRef.current = controls;

    // 5. Realistic Natural Architectural Lighting
    const hemiLight = new THREE.HemisphereLight(0xF4FBF8, 0x1A3530, 1.3);
    scene.add(hemiLight);

    const sun = new THREE.DirectionalLight(0xFFF6E5, 2.3);
    sun.position.set(22, 34, 18);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.bias = -0.0001;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 80;
    sun.shadow.camera.left = -20;
    sun.shadow.camera.right = 20;
    sun.shadow.camera.top = 20;
    sun.shadow.camera.bottom = -20;
    scene.add(sun);

    // Soft warm interior cove accent light
    const interiorWarm = new THREE.PointLight(0xFFE5B4, 1.8, 12);
    interiorWarm.position.set(0, 3.2, 0);
    scene.add(interiorWarm);

    // 6. Build Realistic Architectural Residence
    const mats = createCityMaterials(false);

    // Ground landscaped podium with granite paver texture
    const lawn = new THREE.Mesh(
      new THREE.CylinderGeometry(24, 25, 1.0, 48),
      mats.sidewalkPaver
    );
    lawn.position.y = -0.5;
    lawn.receiveShadow = true;
    scene.add(lawn);

    // Main Realistic Modern Residence Pavilion
    const house = createModernHouse(mats);
    house.position.set(0, 0, 0);
    scene.add(house);

    // Scale human figures (one standing on outdoor hardwood deck)
    const personDeck = createHumanFigure(mats, 2, false);
    personDeck.position.set(2.8, 0.55, 3.8);
    personDeck.rotation.y = -Math.PI * 0.25;
    scene.add(personDeck);

    // Surrounding urban street birch trees
    const tree1 = createVariedTree(mats, 0, 1.2);
    tree1.position.set(-10, 0, 6);
    scene.add(tree1);

    const tree2 = createVariedTree(mats, 1, 1.1);
    tree2.position.set(11, 0, -5);
    scene.add(tree2);

    // 7. Interactive 3D Beacon Hotspots
    const markers = [];
    SMART_HOME_COMPONENTS.forEach((comp) => {
      const beacon = new THREE.Group();
      beacon.position.copy(comp.position);
      beacon.userData = { component: comp };

      // Inner glowing core sphere
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshBasicMaterial({ color: comp.color })
      );
      beacon.add(core);

      // Outer gentle pulsing ring
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.38, 0.035, 8, 32),
        new THREE.MeshBasicMaterial({ color: comp.color, transparent: true, opacity: 0.85 })
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
        while (obj && !obj.userData?.component && obj.parent) {
          obj = obj.parent;
        }
        if (obj?.userData?.component) {
          selectComponent(obj.userData.component);
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

  const selectComponent = (comp) => {
    sound.playClick();
    setActiveItem(comp);

    // Smooth camera movement toward target position
    if (cameraRef.current && controlsRef.current) {
      const cam = cameraRef.current;
      const ctrl = controlsRef.current;

      const targetPos = comp.position.clone().add(new THREE.Vector3(7, 4, 7));
      const targetLook = comp.position.clone();

      const startPos = cam.position.clone();
      const startLook = ctrl.target.clone();
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / 900, 1);
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
      cameraRef.current.position.set(16, 11, 20);
      controlsRef.current.target.set(0, 3.2, 0);
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-seagreen-primary/40 shadow-2xl bg-[#0C2420]" style={{ height }}>
      {/* 3D Viewport */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Banner */}
      <div className="absolute top-5 left-5 z-20 pointer-events-none flex items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-seagreen-gold/50 text-white backdrop-blur-md shadow-lg pointer-events-auto">
          <Sparkles size={12} className="text-seagreen-gold" />
          <span className="font-mono text-xs text-seagreen-gold font-bold uppercase tracking-wider">
            2040 RESIDENCE ARCHITECTURAL MODEL
          </span>
        </div>
      </div>

      {/* Top Right Reset */}
      <button
        onClick={resetCamera}
        data-cursor="hover"
        title="Reset Camera"
        className="absolute top-5 right-5 z-20 p-2 rounded-xl bg-black/50 hover:bg-black/80 text-seagreen-gold border border-white/15 transition-colors backdrop-blur-md"
      >
        <RotateCcw size={14} />
      </button>

      {/* Component Selector Pills */}
      <div className="absolute top-16 left-5 z-20 flex flex-col gap-2 max-w-xs">
        {SMART_HOME_COMPONENTS.map((comp) => {
          const isSelected = activeItem.id === comp.id;
          const Icon = comp.icon;
          return (
            <button
              key={comp.id}
              onClick={() => selectComponent(comp)}
              data-cursor="hover"
              className={`px-3 py-2 rounded-xl text-xs font-sans font-semibold flex items-center gap-2.5 transition-all text-left border ${
                isSelected
                  ? 'bg-gradient-to-r from-seagreen-dark to-seagreen-deep text-white border-seagreen-gold shadow-lg -translate-x-1'
                  : 'bg-black/50 text-white/70 border-white/10 hover:bg-black/80 hover:text-white backdrop-blur-md'
              }`}
            >
              <Icon size={14} style={{ color: comp.color }} />
              <span className="truncate">{comp.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Component Inspection Panel */}
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
        🖱️ Drag to rotate 3D house · Select any component above to fly inside
      </div>
    </div>
  );
}
