import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PALETTE, createCityMaterials, buildCompleteCityScene } from './cityBuilder';
import sound from '../../utils/sound';
import { Sparkles, Share2, Download, Check, RefreshCw, Trophy, ShieldCheck, Heart, Leaf, Cpu } from 'lucide-react';

export default function FutureProfile3D({ 
  profileData = {}, 
  onRedesign 
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const cityRootRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const {
    archetype = 'The Human-Centric Futurist',
    motto = 'Prioritizing empathy, quiet mental solitude, and collective wellbeing over raw automation.',
    scores = {
      sustainability: 87,
      technology: 72,
      wellbeing: 81,
      privacy: 64,
    },
    rawPoints = {
      environment: 25,
      wellbeing: 20,
      technology: 15,
      health: 15,
      education: 10,
      privacy: 10,
      mobility: 5,
      community: 5
    }
  } = profileData;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07221E);
    scene.fog = new THREE.FogExp2(0x07221E, 0.012);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.5, 200);
    camera.position.set(34, 26, 40);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
    controls.target.set(0, 3.5, 0);
    controls.maxPolarAngle = Math.PI / 2 - 0.04;

    scene.add(new THREE.AmbientLight(0x1E5951, 1.4));
    const sun = new THREE.DirectionalLight(0xFFF9E6, 2.2);
    sun.position.set(30, 45, 20);
    sun.castShadow = true;
    scene.add(sun);

    // Glowing Pedestal for User's City
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(36, 38, 2, 48),
      new THREE.MeshStandardMaterial({ color: 0x0E4F4A, roughness: 0.4, metalness: 0.3 })
    );
    pedestal.position.y = -1.2;
    scene.add(pedestal);

    const goldRing = new THREE.Mesh(
      new THREE.TorusGeometry(36.4, 0.35, 12, 64),
      new THREE.MeshStandardMaterial({ color: PALETTE.gold, metalness: 0.9, roughness: 0.2 })
    );
    goldRing.rotation.x = Math.PI * 0.5;
    goldRing.position.y = -0.18;
    scene.add(goldRing);

    // Build user's customized city
    const mats = createCityMaterials();
    const cityRoot = buildCompleteCityScene(scene, mats, {
      greenery: rawPoints.environment * 2,
      technology: rawPoints.technology * 2,
      aiLevel: (rawPoints.technology || 15) * 2,
      isCarFree: rawPoints.environment > 30,
      solarActive: true,
      waterActive: true,
      greenBuildings: rawPoints.environment > 20,
    });
    cityRootRef.current = cityRoot;

    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
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
  }, [rawPoints]);

  const handleCopyShare = () => {
    sound.playChime();
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveToVault = async () => {
    sound.playChime();
    setSaved(true);
    try {
      await fetch('/api/simulator/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype,
          scores,
          points: rawPoints
        })
      });
    } catch (e) {
      console.warn('Saved locally');
    }
  };

  return (
    <div className="w-full rounded-3xl overflow-hidden border border-seagreen-gold/50 shadow-2xl bg-gradient-to-br from-[#0E4F4A] via-[#0A332F] to-[#061D1A] p-6 sm:p-10 text-white">
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-seagreen-gold/40 text-xs font-mono font-bold uppercase tracking-widest text-seagreen-gold mb-3 backdrop-blur-md">
          <Trophy size={13} className="text-seagreen-gold" />
          <span>3D CITIZEN SPECULATIVE PROFILE</span>
        </div>

        <h2 className="editorial-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-2">
          THIS IS YOUR <span className="font-script-accent text-4xl sm:text-6xl text-seagreen-gold font-normal lowercase inline-block ml-1">future</span>.
        </h2>
        <p className="text-xs sm:text-sm text-seagreen-seafoam/80 font-sans">
          You have balanced 100 societal points into a living 3D habitat. Explore your personalized model below.
        </p>
      </div>

      {/* Main Grid: Left 3D Viewport, Right Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 3D Interactive City Canvas */}
        <div className="lg:col-span-7 h-[420px] sm:h-[480px] rounded-2xl overflow-hidden border border-white/15 relative shadow-inner bg-[#07221E]">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
          <div className="absolute bottom-3 left-3 z-10 pointer-events-none text-[10px] font-mono text-seagreen-seafoam/50 bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs">
            🔄 Auto-rotating · Drag to inspect your 3D city from any angle
          </div>
        </div>

        {/* Right: Archetype & Scores */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="p-6 rounded-2xl bg-black/40 border border-seagreen-gold/40 backdrop-blur-xl">
            <span className="text-[11px] font-mono text-seagreen-gold font-bold uppercase tracking-wider block mb-1">
              YOUR SPECULATIVE ARCHETYPE
            </span>
            <h3 className="editorial-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              {archetype}
            </h3>
            <p className="text-xs text-seagreen-seafoam/90 leading-relaxed font-sans italic border-l-2 border-seagreen-gold pl-3 py-0.5">
              "{motto}"
            </p>
          </div>

          {/* 4 Core Score Meters */}
          <div className="space-y-3 p-6 rounded-2xl bg-black/25 border border-white/10">
            {/* Sustainability */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="flex items-center gap-1.5 text-white">
                  <Leaf size={13} className="text-emerald-400" />
                  <span>Sustainability</span>
                </span>
                <span className="font-bold text-emerald-300">{scores.sustainability || 87}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000" style={{ width: `${scores.sustainability || 87}%` }} />
              </div>
            </div>

            {/* Technology */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="flex items-center gap-1.5 text-white">
                  <Cpu size={13} className="text-cyan-400" />
                  <span>Technology</span>
                </span>
                <span className="font-bold text-cyan-300">{scores.technology || 72}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full transition-all duration-1000" style={{ width: `${scores.technology || 72}%` }} />
              </div>
            </div>

            {/* Human Wellbeing */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="flex items-center gap-1.5 text-white">
                  <Heart size={13} className="text-rose-400" />
                  <span>Human Wellbeing</span>
                </span>
                <span className="font-bold text-rose-300">{scores.wellbeing || 81}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-rose-500 to-pink-400 rounded-full transition-all duration-1000" style={{ width: `${scores.wellbeing || 81}%` }} />
              </div>
            </div>

            {/* Privacy */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="flex items-center gap-1.5 text-white">
                  <ShieldCheck size={13} className="text-purple-400" />
                  <span>Privacy & Sovereignty</span>
                </span>
                <span className="font-bold text-purple-300">{scores.privacy || 64}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full transition-all duration-1000" style={{ width: `${scores.privacy || 64}%` }} />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSaveToVault}
              data-cursor="hover"
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-seagreen-primary to-seagreen-secondary text-white font-sans font-bold text-xs flex items-center justify-center gap-2 border border-seagreen-gold/40 shadow-sm hover:brightness-110 transition-all"
            >
              {saved ? <Check size={14} className="text-emerald-300" /> : <Download size={14} />}
              <span>{saved ? 'Saved to Vault' : 'Save 3D City'}</span>
            </button>

            <button
              onClick={handleCopyShare}
              data-cursor="hover"
              className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-sans font-medium text-xs flex items-center justify-center gap-2 border border-white/15 transition-all"
            >
              {copied ? <Check size={14} className="text-emerald-300" /> : <Share2 size={14} />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>

            {onRedesign && (
              <button
                onClick={onRedesign}
                data-cursor="hover"
                title="Tweak sliders"
                className="p-3 rounded-xl bg-white/10 hover:bg-white/15 text-seagreen-gold border border-white/15 transition-all"
              >
                <RefreshCw size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
