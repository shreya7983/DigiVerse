import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createCityMaterials, buildCompleteCityScene, PALETTE } from './cityBuilder';
import sound from '../../utils/sound';
import { 
  Compass, 
  Maximize2, 
  RotateCcw, 
  Sun, 
  Sunset,
  Moon,
  Trees, 
  Droplets, 
  Car, 
  Layers, 
  Info, 
  ArrowRight,
  Eye,
  Sliders,
  Sparkles
} from 'lucide-react';

export default function FutureCityCanvas({ 
  onSelectBuilding, 
  customOptions = {},
  showControls = true,
  height = '680px' 
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const cityRootRef = useRef(null);
  const materialsRef = useRef(null);
  const sunLightRef = useRef(null);
  const hemiLightRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // Time of Day State: 'day' | 'sunset' | 'night'
  const [timeOfDay, setTimeOfDay] = useState('day');

  // Dynamic City Feature Toggles
  const [solarActive, setSolarActive] = useState(true);
  const [greenBuildings, setGreenBuildings] = useState(true);
  const [waterActive, setWaterActive] = useState(true);
  const [carFree, setCarFree] = useState(false);
  
  // Interactive Building Hover & Selection State
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [cameraView, setCameraView] = useState('isometric'); // 'isometric' | 'aerial' | 'street'

  // Apply lighting & atmosphere based on timeOfDay
  const applyLightingAtmosphere = (scene, time) => {
    if (!scene || !sunLightRef.current || !hemiLightRef.current) return;

    if (time === 'sunset') {
      // Warm golden hour
      scene.background = new THREE.Color(0x241812);
      scene.fog = new THREE.FogExp2(0x241812, 0.011);

      sunLightRef.current.color.setHex(0xFFAA55);
      sunLightRef.current.intensity = 2.8;
      sunLightRef.current.position.set(50, 18, 25);

      hemiLightRef.current.color.setHex(0xFDBA74);
      hemiLightRef.current.groundColor.setHex(0x1F140D);
      hemiLightRef.current.intensity = 1.0;
    } else if (time === 'night') {
      // Atmospheric cinematic night (subtle moon + illuminated city)
      scene.background = new THREE.Color(0x050D0B);
      scene.fog = new THREE.FogExp2(0x050D0B, 0.013);

      sunLightRef.current.color.setHex(0x7A9FC2);
      sunLightRef.current.intensity = 0.65;
      sunLightRef.current.position.set(-30, 45, -20);

      hemiLightRef.current.color.setHex(0x132630);
      hemiLightRef.current.groundColor.setHex(0x030806);
      hemiLightRef.current.intensity = 0.5;
    } else {
      // Crisp architectural daylight
      scene.background = new THREE.Color(0x0A2B27);
      scene.fog = new THREE.FogExp2(0x0A2B27, 0.012);

      sunLightRef.current.color.setHex(0xFFF7E6);
      sunLightRef.current.intensity = 2.4;
      sunLightRef.current.position.set(40, 60, 30);

      hemiLightRef.current.color.setHex(0xD8F0EA);
      hemiLightRef.current.groundColor.setHex(0x0F332E);
      hemiLightRef.current.intensity = 1.2;
    }
  };

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const heightPx = container.clientHeight;

    // 1. Scene & Atmosphere
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0A2B27);
    scene.fog = new THREE.FogExp2(0x0A2B27, 0.012);
    sceneRef.current = scene;

    // 2. Camera with architectural perspective (42° FOV)
    const camera = new THREE.PerspectiveCamera(40, width / heightPx, 1, 300);
    camera.position.set(38, 30, 46);
    cameraRef.current = camera;

    // 3. Renderer with PBR tone mapping
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.minDistance = 16;
    controls.maxDistance = 120;
    controls.target.set(0, 3.5, 0);
    controlsRef.current = controls;

    // 5. Lighting Setup (Directional Sunlight + Hemisphere Bounce)
    const ambient = new THREE.AmbientLight(0x194D45, 1.2);
    scene.add(ambient);

    const hemiLight = new THREE.HemisphereLight(0xD8F0EA, 0x0F332E, 1.2);
    hemiLight.position.set(0, 60, 0);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const sunLight = new THREE.DirectionalLight(0xFFF7E6, 2.4);
    sunLight.position.set(40, 60, 30);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 150;
    sunLight.shadow.camera.left = -45;
    sunLight.shadow.camera.right = 45;
    sunLight.shadow.camera.top = 45;
    sunLight.shadow.camera.bottom = -45;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // 6. Build Initial City
    const materials = createCityMaterials(timeOfDay === 'night');
    materialsRef.current = materials;

    const cityRoot = buildCompleteCityScene(scene, materials, {
      solarActive,
      greenBuildings,
      waterActive,
      isCarFree: carFree,
      isNight: timeOfDay === 'night',
      ...customOptions,
    });
    cityRootRef.current = cityRoot;

    // 7. Raycaster for Mouse Interactivity
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      if (!cityRootRef.current?.userData?.landmarks) return;

      const landmarks = cityRootRef.current.userData.landmarks;
      const intersects = raycaster.intersectObjects(landmarks, true);

      if (intersects.length > 0) {
        let hitGroup = intersects[0].object;
        while (hitGroup.parent && !hitGroup.userData?.title) {
          hitGroup = hitGroup.parent;
        }

        if (hitGroup?.userData?.title) {
          setHoveredBuilding(hitGroup.userData);
          renderer.domElement.style.cursor = 'pointer';
        }
      } else {
        setHoveredBuilding(null);
        renderer.domElement.style.cursor = 'grab';
      }
    };

    const handleClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      if (!cityRootRef.current?.userData?.landmarks) return;

      const landmarks = cityRootRef.current.userData.landmarks;
      const intersects = raycaster.intersectObjects(landmarks, true);

      if (intersects.length > 0) {
        let hitGroup = intersects[0].object;
        while (hitGroup.parent && !hitGroup.userData?.title) {
          hitGroup = hitGroup.parent;
        }

        if (hitGroup?.userData?.title) {
          sound.playChime();
          setSelectedBuilding(hitGroup.userData);
          onSelectBuilding?.(hitGroup.userData);

          if (hitGroup.userData.cameraTarget && hitGroup.userData.cameraPosition) {
            animateCameraTo(
              hitGroup.userData.cameraPosition,
              hitGroup.userData.cameraTarget
            );
          }
        }
      }
    };

    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('click', handleClick);

    // 8. Animation Render Loop (Animates Vehicles & Damped Orbit)
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Animate Realistic Vehicles along Ring Road
      if (cityRootRef.current?.userData?.vehicleFleet) {
        cityRootRef.current.userData.vehicleFleet.forEach((v) => {
          v.userData.angle = (v.userData.angle || 0) + (v.userData.speed || 0.008);
          const rad = v.userData.radius || 26;
          v.position.x = Math.cos(v.userData.angle) * rad;
          v.position.z = Math.sin(v.userData.angle) * rad;
          v.rotation.y = -v.userData.angle + Math.PI * 0.5;
        });
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('click', handleClick);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Smooth Camera Fly-To Animation
  const animateCameraTo = (targetPos, targetLookAt, duration = 1200) => {
    if (!cameraRef.current || !controlsRef.current) return;
    const cam = cameraRef.current;
    const ctrl = controlsRef.current;

    const startPos = cam.position.clone();
    const startLook = ctrl.target.clone();
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      cam.position.lerpVectors(startPos, targetPos, ease);
      ctrl.target.lerpVectors(startLook, targetLookAt, ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  // Re-build city when feature toggles or time of day change
  const rebuildScene = useCallback(() => {
    if (!sceneRef.current) return;
    sound.playChime();

    // Update lighting & materials
    applyLightingAtmosphere(sceneRef.current, timeOfDay);
    const updatedMats = createCityMaterials(timeOfDay === 'night');
    materialsRef.current = updatedMats;

    // Remove existing city root
    if (cityRootRef.current) {
      sceneRef.current.remove(cityRootRef.current);
    }

    // Rebuild with updated toggles
    const newCityRoot = buildCompleteCityScene(sceneRef.current, updatedMats, {
      solarActive,
      greenBuildings,
      waterActive,
      isCarFree: carFree,
      isNight: timeOfDay === 'night',
      ...customOptions,
    });
    cityRootRef.current = newCityRoot;
  }, [solarActive, greenBuildings, waterActive, carFree, timeOfDay, customOptions]);

  useEffect(() => {
    rebuildScene();
  }, [solarActive, greenBuildings, waterActive, carFree, timeOfDay]);

  // Preset Camera Angles
  const setViewPreset = (view) => {
    sound.playClick();
    setCameraView(view);
    if (view === 'aerial') {
      animateCameraTo(new THREE.Vector3(0, 68, 8), new THREE.Vector3(0, 0, 0));
    } else if (view === 'street') {
      animateCameraTo(new THREE.Vector3(-14, 5, 26), new THREE.Vector3(0, 3.5, 0));
    } else {
      animateCameraTo(new THREE.Vector3(38, 30, 46), new THREE.Vector3(0, 3.5, 0));
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-seagreen-primary/30 shadow-2xl bg-[#08201D]" style={{ height }}>
      {/* 3D WebGL Canvas Viewport */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left: Interactive Mode Title & Active Hover Tooltip */}
      <div className="absolute top-5 left-5 z-20 pointer-events-none flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E4F4A]/90 border border-seagreen-gold/40 text-white backdrop-blur-md shadow-lg pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs text-seagreen-gold uppercase font-bold tracking-wider">
            REALISTIC 3D ARCHITECTURAL TWIN · 2040
          </span>
        </div>

        {/* Hover Inspector Pill */}
        {hoveredBuilding && (
          <div className="p-3.5 rounded-2xl bg-black/80 border border-seagreen-gold/60 text-white backdrop-blur-xl shadow-2xl max-w-sm pointer-events-auto transition-all animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-bold text-sm text-white font-serif">{hoveredBuilding.title}</span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-seagreen-primary/30 text-seagreen-gold border border-seagreen-gold/30">
                {hoveredBuilding.category}
              </span>
            </div>
            <p className="text-xs text-white/80 font-sans leading-relaxed line-clamp-2">
              {hoveredBuilding.desc}
            </p>
            <div className="mt-2 flex items-center gap-1 text-[11px] font-mono text-seagreen-gold font-bold">
              <span>Click to inspect & zoom in</span>
              <ArrowRight size={12} />
            </div>
          </div>
        )}
      </div>

      {/* Top Right: Time of Day Switcher & Camera Views */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2.5 flex-wrap justify-end">
        {/* Day / Sunset / Night Toggle */}
        <div className="flex items-center p-1 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-xl shadow-lg">
          <button
            onClick={() => { sound.playClick(); setTimeOfDay('day'); }}
            data-cursor="hover"
            title="Daylight"
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1 transition-all ${
              timeOfDay === 'day' 
                ? 'bg-gradient-to-r from-seagreen-dark to-seagreen-primary text-white border border-seagreen-gold/50 shadow-xs' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Sun size={12} className="text-amber-300" />
            <span>Day</span>
          </button>
          <button
            onClick={() => { sound.playClick(); setTimeOfDay('sunset'); }}
            data-cursor="hover"
            title="Golden Hour Sunset"
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1 transition-all ${
              timeOfDay === 'sunset' 
                ? 'bg-gradient-to-r from-amber-700 to-amber-600 text-white border border-amber-400 shadow-xs' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Sunset size={12} className="text-amber-400" />
            <span>Sunset</span>
          </button>
          <button
            onClick={() => { sound.playClick(); setTimeOfDay('night'); }}
            data-cursor="hover"
            title="Night Illumination"
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1 transition-all ${
              timeOfDay === 'night' 
                ? 'bg-gradient-to-r from-indigo-900 to-slate-800 text-white border border-indigo-400 shadow-xs' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Moon size={12} className="text-cyan-300" />
            <span>Night</span>
          </button>
        </div>

        {/* Camera Views */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-xl shadow-lg">
          <button
            onClick={() => setViewPreset('isometric')}
            data-cursor="hover"
            title="Isometric 45° Angle"
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              cameraView === 'isometric'
                ? 'bg-seagreen-primary text-white border border-seagreen-gold/50'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Isometric
          </button>
          <button
            onClick={() => setViewPreset('aerial')}
            data-cursor="hover"
            title="Aerial Plan View"
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              cameraView === 'aerial'
                ? 'bg-seagreen-primary text-white border border-seagreen-gold/50'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Aerial
          </button>
          <button
            onClick={() => setViewPreset('street')}
            data-cursor="hover"
            title="Street Eye-Level"
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              cameraView === 'street'
                ? 'bg-seagreen-primary text-white border border-seagreen-gold/50'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Street
          </button>
          <button
            onClick={() => setViewPreset('isometric')}
            data-cursor="hover"
            title="Reset Camera"
            className="p-1.5 rounded-xl text-seagreen-gold hover:text-white transition-colors"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Bottom Floating Control Bar: Sustainability & Infrastructure Toggles */}
      {showControls && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 max-w-2xl w-[92%] px-4 py-2.5 rounded-2xl bg-black/80 border border-white/15 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-xs text-seagreen-seafoam font-mono uppercase font-bold shrink-0 mr-1 hidden sm:flex">
            <Sliders size={13} className="text-seagreen-gold" />
            <span>3D Controls:</span>
          </div>

          {/* ☀️ Solar Energy */}
          <button
            onClick={() => { sound.playClick(); setSolarActive(!solarActive); }}
            data-cursor="hover"
            className={`px-3 py-1.5 rounded-xl text-xs font-sans font-semibold flex items-center gap-1.5 transition-all shrink-0 border ${
              solarActive
                ? 'bg-gradient-to-r from-amber-600/60 to-amber-500/80 text-white border-amber-400 shadow-sm'
                : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
            }`}
          >
            <Sun size={13} className={solarActive ? 'text-amber-300' : 'text-white/40'} />
            <span>Solar Panels</span>
          </button>

          {/* 🌳 Green Balconies */}
          <button
            onClick={() => { sound.playClick(); setGreenBuildings(!greenBuildings); }}
            data-cursor="hover"
            className={`px-3 py-1.5 rounded-xl text-xs font-sans font-semibold flex items-center gap-1.5 transition-all shrink-0 border ${
              greenBuildings
                ? 'bg-gradient-to-r from-emerald-700/60 to-emerald-600/80 text-white border-emerald-400 shadow-sm'
                : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
            }`}
          >
            <Trees size={13} className={greenBuildings ? 'text-emerald-300' : 'text-white/40'} />
            <span>Green Balconies</span>
          </button>

          {/* 💧 Water Canal */}
          <button
            onClick={() => { sound.playClick(); setWaterActive(!waterActive); }}
            data-cursor="hover"
            className={`px-3 py-1.5 rounded-xl text-xs font-sans font-semibold flex items-center gap-1.5 transition-all shrink-0 border ${
              waterActive
                ? 'bg-gradient-to-r from-teal-700/60 to-teal-600/80 text-white border-teal-400 shadow-sm'
                : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
            }`}
          >
            <Droplets size={13} className={waterActive ? 'text-teal-300' : 'text-white/40'} />
            <span>Water Canal</span>
          </button>

          {/* 🚲 Car-Free Mode */}
          <button
            onClick={() => { sound.playClick(); setCarFree(!carFree); }}
            data-cursor="hover"
            className={`px-3 py-1.5 rounded-xl text-xs font-sans font-semibold flex items-center gap-1.5 transition-all shrink-0 border ${
              carFree
                ? 'bg-gradient-to-r from-seagreen-dark to-seagreen-primary text-white border-seagreen-gold shadow-sm'
                : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
            }`}
          >
            <Car size={13} className={carFree ? 'text-seagreen-gold' : 'text-white/40'} />
            <span>Car-Free</span>
          </button>
        </div>
      )}

      {/* Selected Landmark Inspection Drawer */}
      {selectedBuilding && (
        <div className="absolute bottom-20 right-5 z-30 max-w-sm w-[90%] p-5 rounded-3xl bg-[#0E4F4A]/95 border border-seagreen-gold shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-3 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-seagreen-gold font-bold">
              ● ARCHITECTURAL INSPECTION
            </span>
            <button
              onClick={() => setSelectedBuilding(null)}
              className="text-white/60 hover:text-white text-xs font-mono"
            >
              ✕ CLOSE
            </button>
          </div>

          <h3 className="editorial-serif text-xl font-bold text-white mb-1">
            {selectedBuilding.title}
          </h3>
          <p className="text-xs text-seagreen-seafoam/90 leading-relaxed font-sans mb-4">
            {selectedBuilding.desc}
          </p>

          <div className="pt-3 border-t border-white/15 flex items-center justify-between">
            <span className="text-[11px] font-mono text-seagreen-gold">
              Interactive 3D Cutaway Available
            </span>
            <button
              onClick={() => onSelectBuilding?.(selectedBuilding)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-seagreen-primary text-white text-xs font-sans font-bold hover:brightness-110 transition-all border border-seagreen-gold/40 shadow-sm"
            >
              <span>Explore Inside</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Orbit Controls Guidance Hint */}
      <div className="absolute bottom-2 left-5 z-10 pointer-events-none text-[11px] font-mono text-seagreen-seafoam/40 hidden md:block">
        🖱️ Drag to rotate · Scroll to zoom · Click buildings to inspect
      </div>
    </div>
  );
}
