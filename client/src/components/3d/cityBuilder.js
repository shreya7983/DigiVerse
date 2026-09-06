import * as THREE from 'three';

// Color Palette Constants for DigiVerse Realistic 3D
export const PALETTE = {
  // Neutral Architectural Materials
  concreteOffWhite: 0xE8E6E1,
  concreteWarm: 0xDDD9D0,
  concreteDark: 0x4A4E4D,
  limestone: 0xF0ECE1,
  bronzeMetal: 0x2A2E2D,
  aluminumSilver: 0xD8DCDD,
  woodOak: 0xB89A6C,
  woodDark: 0x5C4730,
  asphaltDark: 0x222625,
  asphaltMarkingWhite: 0xEDEDED,
  asphaltMarkingYellow: 0xE6B800,
  curbStone: 0xC4C2BC,
  paverLight: 0xD6D2C9,
  waterReflective: 0x1E5C60,
  solarCellBlue: 0x182844,

  // DigiVerse Refined Sea-Green Accents (Used thoughtfully, not everywhere)
  seaGreenPrimary: 0x176B63,
  seaGreenSecondary: 0x2F8F83,
  seaGreenDark: 0x0E4F4A,
  seaGreenDeep: 0x0A332F,
  seafoam: 0xD8F0EA,
  aquaAccent: 0x7ED6C8,
  goldAccent: 0xC8A96B,

  // Organic Varied Vegetation
  foliageDeep: 0x264E36,
  foliageForest: 0x2E6B47,
  foliageOlive: 0x556B2F,
  foliageSage: 0x5B8065,
  foliageWarm: 0x7B8B42,
  trunkBark: 0x4A3E31,
  trunkBirch: 0xD2D4C8,

  // Night Lighting
  windowWarmGlow: 0xFFF2D1,
  streetLightWarm: 0xFFE0A3,
  headlightWhite: 0xF0F8FF,
  taillightRed: 0xEE2A2A,

  // Legacy Aliases for backwards compatibility
  cream: 0xF0ECE1,
  gold: 0xC8A96B,
  glass: 0xB8E6E2,
  solarBlue: 0x182844,
  foliage: 0x2E6B47,
  foliageLight: 0x5B8065,
  primaryWall: 0xE8E6E1,
};

// -------------------------------------------------------------
// Procedural Canvas Texture Generators (Instant 0ms, High Realism)
// -------------------------------------------------------------

/**
 * Generates asphalt road texture with subtle aggregate grain, 
 * white dashed center lines, and yellow curb lines.
 */
export function generateAsphaltTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base asphalt color
  ctx.fillStyle = '#232827';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle aggregate noise
  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 18;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  // White dashed center line
  ctx.strokeStyle = '#EDEDED';
  ctx.lineWidth = 10;
  ctx.setLineDash([48, 48]);
  ctx.beginPath();
  ctx.moveTo(256, 0);
  ctx.lineTo(256, 512);
  ctx.stroke();

  // Solid outer lane boundaries
  ctx.setLineDash([]);
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#D1D5D4';
  ctx.beginPath();
  ctx.moveTo(40, 0);
  ctx.lineTo(40, 512);
  ctx.moveTo(472, 0);
  ctx.lineTo(472, 512);
  ctx.stroke();

  // Subtle green-tinted cycling lane line
  ctx.strokeStyle = 'rgba(47, 143, 131, 0.7)';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(70, 0);
  ctx.lineTo(70, 512);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * Generates pedestrian crossing (zebra stripes) texture.
 */
export function generateCrosswalkTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#232827';
  ctx.fillRect(0, 0, 256, 256);

  // Zebra white stripes
  ctx.fillStyle = '#E8EAE9';
  const stripeWidth = 28;
  const gap = 20;
  for (let x = 16; x < 256; x += stripeWidth + gap) {
    ctx.fillRect(x, 20, stripeWidth, 216);
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Generates architectural stone/concrete paver texture for walkways.
 */
export function generatePaverTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Base paver tone
  ctx.fillStyle = '#DDD9D0';
  ctx.fillRect(0, 0, 256, 256);

  // Grid paver joint grooves
  ctx.strokeStyle = '#B3AEA3';
  ctx.lineWidth = 3;

  const tileSize = 64;
  for (let x = 0; x <= 256; x += tileSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 256);
    ctx.stroke();
  }
  for (let y = 0; y <= 256; y += tileSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();
  }

  // Subtle stone fleck noise
  for (let i = 0; i < 400; i++) {
    const px = Math.random() * 256;
    const py = Math.random() * 256;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.18)' : 'rgba(120,115,105,0.15)';
    ctx.fillRect(px, py, 2, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * Generates warm architectural oak wood plank texture.
 */
export function generateWoodTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#B89A6C';
  ctx.fillRect(0, 0, 256, 256);

  // Planks
  const plankHeight = 32;
  ctx.strokeStyle = '#8C6F45';
  ctx.lineWidth = 2;
  for (let y = 0; y <= 256; y += plankHeight) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();
  }

  // Subtle wood grain lines
  ctx.strokeStyle = 'rgba(110, 85, 50, 0.15)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 60; i++) {
    const y = Math.random() * 256;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(80, y + (Math.random() - 0.5) * 6, 160, y + (Math.random() - 0.5) * 6, 256, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * Generates realistic skyscraper facade texture with floor slabs,
 * dark bronze mullions, and window panes with interior variation.
 */
export function generateFacadeTexture(isNight = false) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Background concrete/bronze structural wall
  ctx.fillStyle = '#262A29';
  ctx.fillRect(0, 0, 512, 512);

  const floorCount = 8;
  const colCount = 8;
  const colWidth = 512 / colCount;
  const floorHeight = 512 / floorCount;

  for (let f = 0; f < floorCount; f++) {
    const y = f * floorHeight;

    // Floor spandrel slab (off-white architectural concrete band)
    ctx.fillStyle = '#D9D6CE';
    ctx.fillRect(0, y, 512, 10);

    for (let c = 0; c < colCount; c++) {
      const x = c * colWidth;

      // Window Frame (bronze)
      ctx.fillStyle = '#1D2120';
      ctx.fillRect(x + 4, y + 10, colWidth - 8, floorHeight - 14);

      // Window Glass
      if (isNight) {
        // At night, randomize illuminated office/residential windows
        const isLit = Math.random() > 0.35;
        if (isLit) {
          const warm = Math.random() > 0.4;
          ctx.fillStyle = warm ? 'rgba(255, 235, 185, 0.95)' : 'rgba(220, 245, 255, 0.9)';
        } else {
          ctx.fillStyle = 'rgba(20, 32, 34, 0.95)';
        }
      } else {
        // Daytime reflection with sky-tint and subtle interior depth
        const depth = Math.random() * 0.15;
        ctx.fillStyle = `rgba(165, 215, 218, ${0.75 + depth})`;
      }
      ctx.fillRect(x + 7, y + 13, colWidth - 14, floorHeight - 20);

      // Fine vertical window mullion
      ctx.fillStyle = '#1D2120';
      ctx.fillRect(x + colWidth / 2 - 1, y + 13, 2, floorHeight - 20);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// -------------------------------------------------------------
// High-End Architectural PBR Materials System
// -------------------------------------------------------------

export const createCityMaterials = (isNight = false) => {
  const asphaltTex = generateAsphaltTexture();
  asphaltTex.repeat.set(1, 8);

  const paverTex = generatePaverTexture();
  paverTex.repeat.set(4, 4);

  const woodTex = generateWoodTexture();
  woodTex.repeat.set(2, 4);

  const facadeTex = generateFacadeTexture(isNight);
  facadeTex.repeat.set(1, 2);

  return {
    // Architectural Concrete (Off-white, matte, subtle grain)
    concreteWhite: new THREE.MeshStandardMaterial({
      color: PALETTE.concreteOffWhite,
      roughness: 0.8,
      metalness: 0.05,
    }),
    concreteWarm: new THREE.MeshStandardMaterial({
      color: PALETTE.concreteWarm,
      roughness: 0.85,
      metalness: 0.05,
    }),
    concreteDark: new THREE.MeshStandardMaterial({
      color: PALETTE.concreteDark,
      roughness: 0.75,
      metalness: 0.1,
    }),

    // Natural Warm Travertine / Limestone
    limestone: new THREE.MeshStandardMaterial({
      color: PALETTE.limestone,
      roughness: 0.7,
      metalness: 0.05,
    }),

    // Architectural Wood / Oak Slats
    wood: new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.65,
      metalness: 0.05,
    }),
    woodSmooth: new THREE.MeshStandardMaterial({
      color: PALETTE.woodOak,
      roughness: 0.5,
      metalness: 0.05,
    }),

    // Dark Bronze / Anodized Aluminum Window Mullions
    bronzeMetal: new THREE.MeshStandardMaterial({
      color: PALETTE.bronzeMetal,
      roughness: 0.35,
      metalness: 0.8,
    }),
    aluminumSilver: new THREE.MeshStandardMaterial({
      color: PALETTE.aluminumSilver,
      roughness: 0.25,
      metalness: 0.85,
    }),

    // Realistic Architectural Physical Glass
    architecturalGlass: new THREE.MeshPhysicalMaterial({
      color: isNight ? 0x1A2E33 : 0xB8E6E2,
      roughness: 0.04,
      metalness: 0.1,
      transmission: 0.7,
      transparent: true,
      opacity: 0.85,
      ior: 1.52,
      reflectivity: 0.6,
    }),

    // High-Rise Facade Material
    buildingFacade: new THREE.MeshStandardMaterial({
      map: facadeTex,
      roughness: 0.3,
      metalness: 0.2,
      emissive: isNight ? 0xFFEAB3 : 0x000000,
      emissiveIntensity: isNight ? 0.45 : 0.0,
    }),

    // Roads & Sidewalks
    asphaltRoad: new THREE.MeshStandardMaterial({
      map: asphaltTex,
      roughness: 0.85,
      metalness: 0.05,
    }),
    sidewalkPaver: new THREE.MeshStandardMaterial({
      map: paverTex,
      roughness: 0.75,
      metalness: 0.05,
    }),
    curbStone: new THREE.MeshStandardMaterial({
      color: PALETTE.curbStone,
      roughness: 0.8,
      metalness: 0.05,
    }),

    // Water Canal (Reflective with transmission)
    waterCanal: new THREE.MeshStandardMaterial({
      color: PALETTE.waterReflective,
      roughness: 0.12,
      metalness: 0.3,
      transparent: true,
      opacity: 0.8,
    }),

    // Monocrystalline Photovoltaic Solar Glass Tiles
    solarPanel: new THREE.MeshStandardMaterial({
      color: PALETTE.solarCellBlue,
      roughness: 0.15,
      metalness: 0.9,
      emissive: isNight ? 0x0A1830 : 0x08152B,
      emissiveIntensity: 0.2,
    }),

    // Refined Sea-Green Architectural Branding Accents (Used selectively!)
    seaGreenAccent: new THREE.MeshStandardMaterial({
      color: PALETTE.seaGreenPrimary,
      roughness: 0.35,
      metalness: 0.3,
    }),
    seafoamAccent: new THREE.MeshStandardMaterial({
      color: PALETTE.seafoam,
      roughness: 0.4,
      metalness: 0.1,
    }),
    goldAccent: new THREE.MeshStandardMaterial({
      color: PALETTE.goldAccent,
      roughness: 0.25,
      metalness: 0.85,
    }),

    // Varied Biophilic Natural Foliage
    foliageDeep: new THREE.MeshStandardMaterial({
      color: PALETTE.foliageDeep,
      roughness: 0.9,
      metalness: 0.0,
    }),
    foliageForest: new THREE.MeshStandardMaterial({
      color: PALETTE.foliageForest,
      roughness: 0.85,
      metalness: 0.0,
    }),
    foliageOlive: new THREE.MeshStandardMaterial({
      color: PALETTE.foliageOlive,
      roughness: 0.85,
      metalness: 0.0,
    }),
    foliageSage: new THREE.MeshStandardMaterial({
      color: PALETTE.foliageSage,
      roughness: 0.8,
      metalness: 0.0,
    }),
    trunkWood: new THREE.MeshStandardMaterial({
      color: PALETTE.trunkBark,
      roughness: 0.9,
      metalness: 0.0,
    }),

    // Realistic Vehicle Materials
    carPaintWhite: new THREE.MeshStandardMaterial({
      color: 0xF2F5F5,
      roughness: 0.12,
      metalness: 0.4,
    }),
    carPaintTeal: new THREE.MeshStandardMaterial({
      color: 0x1E4F49,
      roughness: 0.15,
      metalness: 0.6,
    }),
    carPaintSilver: new THREE.MeshStandardMaterial({
      color: 0xC8CECF,
      roughness: 0.1,
      metalness: 0.85,
    }),
    carGlass: new THREE.MeshStandardMaterial({
      color: 0x1C2B2A,
      roughness: 0.05,
      metalness: 0.5,
    }),
    tireRubber: new THREE.MeshStandardMaterial({
      color: 0x181919,
      roughness: 0.92,
      metalness: 0.05,
    }),
    wheelAlloy: new THREE.MeshStandardMaterial({
      color: 0xD0D5D6,
      roughness: 0.2,
      metalness: 0.9,
    }),

    // Realistic Night Lights / LED Strips
    headlightLED: new THREE.MeshBasicMaterial({
      color: isNight ? 0xFFFFFF : 0xDEE8F0,
    }),
    taillightLED: new THREE.MeshBasicMaterial({
      color: isNight ? 0xFF2222 : 0xAA1111,
    }),
    streetLampGlow: new THREE.MeshBasicMaterial({
      color: isNight ? 0xFFE2A8 : 0xD6C8A8,
    }),

    // Human Clothing Materials
    humanSkin: new THREE.MeshStandardMaterial({ color: 0xD8B896, roughness: 0.7 }),
    humanClothNavy: new THREE.MeshStandardMaterial({ color: 0x243247, roughness: 0.8 }),
    humanClothTeal: new THREE.MeshStandardMaterial({ color: 0x215C56, roughness: 0.8 }),
    humanClothCream: new THREE.MeshStandardMaterial({ color: 0xE8E4DC, roughness: 0.8 }),
    humanClothCharcoal: new THREE.MeshStandardMaterial({ color: 0x333638, roughness: 0.8 }),

    // Backward-compatible material aliases
    darkTealWall: new THREE.MeshStandardMaterial({ color: PALETTE.seaGreenDark, roughness: 0.6 }),
    accentGold: new THREE.MeshStandardMaterial({ color: PALETTE.goldAccent, roughness: 0.25, metalness: 0.85 }),
    water: new THREE.MeshStandardMaterial({ color: PALETTE.waterReflective, roughness: 0.12, metalness: 0.3, transparent: true, opacity: 0.8 }),
    whiteMetal: new THREE.MeshStandardMaterial({ color: 0xF5F7F7, roughness: 0.3, metalness: 0.8 }),
    podBody: new THREE.MeshStandardMaterial({ color: 0xF2F5F5, roughness: 0.15, metalness: 0.4 }),
    glassWindow: new THREE.MeshPhysicalMaterial({ color: 0xB8E6E2, transmission: 0.7, transparent: true, opacity: 0.85, roughness: 0.05 }),
    glowCyan: new THREE.MeshBasicMaterial({ color: 0x2DD4BF }),
    creamWall: new THREE.MeshStandardMaterial({ color: PALETTE.limestone, roughness: 0.7 }),
    foliage: new THREE.MeshStandardMaterial({ color: PALETTE.foliageForest, roughness: 0.85 }),
    foliageLight: new THREE.MeshStandardMaterial({ color: PALETTE.foliageSage, roughness: 0.8 }),
    primaryWall: new THREE.MeshStandardMaterial({ color: PALETTE.concreteOffWhite, roughness: 0.7 }),
    gold: new THREE.MeshBasicMaterial({ color: PALETTE.goldAccent }),
  };
};

// -------------------------------------------------------------
// Backward Compatibility Functions
// -------------------------------------------------------------

export function createTree(mats, scale = 1) {
  return createVariedTree(mats, 0, scale);
}

export function createAutonomousPod(mats) {
  return createRealisticVehicle(mats, 'teal');
}

export function createWindTurbine(mats, height = 12) {
  const turbine = new THREE.Group();
  turbine.name = 'Wind Turbine';

  const tower = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.45, height, 16),
    mats.aluminumSilver || mats.concreteWhite
  );
  tower.position.y = height * 0.5;
  tower.castShadow = true;
  turbine.add(tower);

  const nacelle = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.6, 1.6),
    mats.aluminumSilver || mats.concreteWhite
  );
  nacelle.position.set(0, height, 0.3);
  turbine.add(nacelle);

  const hub = new THREE.Group();
  hub.position.set(0, height, 1.2);
  turbine.add(hub);
  turbine.userData.hub = hub;

  const hubNose = new THREE.Mesh(
    new THREE.ConeGeometry(0.3, 0.6, 16),
    mats.seaGreenAccent || mats.bronzeMetal
  );
  hubNose.rotation.x = Math.PI * 0.5;
  hub.add(hubNose);

  for (let b = 0; b < 3; b++) {
    const bladeAngle = (b / 3) * Math.PI * 2;
    const bladeGeom = new THREE.BoxGeometry(0.18, 5.5, 0.04);
    const blade = new THREE.Mesh(bladeGeom, mats.aluminumSilver || mats.concreteWhite);
    blade.position.y = 2.75;
    const bladeHolder = new THREE.Group();
    bladeHolder.rotation.z = bladeAngle;
    bladeHolder.add(blade);
    hub.add(bladeHolder);
  }

  return turbine;
}

export function createSolarArray(mats, rows = 2, cols = 3) {
  const arrayGroup = new THREE.Group();
  arrayGroup.name = 'Solar Array';

  const post = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.18, 1.6, 12),
    mats.bronzeMetal
  );
  post.position.y = 0.8;
  arrayGroup.add(post);

  const panelBed = new THREE.Mesh(
    new THREE.BoxGeometry(cols * 1.4, 0.1, rows * 1.8),
    mats.solarPanel
  );
  panelBed.position.set(0, 1.8, 0);
  panelBed.rotation.x = 0.45;
  panelBed.castShadow = true;
  arrayGroup.add(panelBed);

  return arrayGroup;
}

export function createMaglevTrack(mats, radius = 18) {
  const track = new THREE.Mesh(
    new THREE.TorusGeometry(radius, 0.14, 8, 48),
    mats.goldAccent || mats.bronzeMetal
  );
  track.rotation.x = Math.PI * 0.5;
  track.position.y = 3.6;
  return track;
}

// -------------------------------------------------------------
// Realistic Architectural Building Models
// -------------------------------------------------------------

/**
 * Creates high-end biophilic skyscraper with realistic floor plates (~3.3m),
 * structural columns, recessed lobby, cantilevered balconies with planters,
 * and rooftop architectural crown.
 */
export function createBiophilicSkyscraper(mats, height = 30, style = 'terrace') {
  const group = new THREE.Group();
  group.name = 'Biophilic Skyscraper';

  const storyHeight = 3.3;
  const stories = Math.max(5, Math.floor(height / storyHeight));
  const towerWidth = 10;
  const towerDepth = 9;

  // 1. Double-Height Ground Floor Lobby (~6m height)
  const lobbyHeight = 5.5;
  const lobbyGlass = new THREE.Mesh(
    new THREE.BoxGeometry(towerWidth - 0.4, lobbyHeight - 0.4, towerDepth - 0.4),
    mats.architecturalGlass
  );
  lobbyGlass.position.y = lobbyHeight * 0.5;
  group.add(lobbyGlass);

  // Structural perimeter columns
  const colGeom = new THREE.CylinderGeometry(0.35, 0.35, lobbyHeight, 16);
  const colPositions = [
    [-towerWidth * 0.5 + 0.4, -towerDepth * 0.5 + 0.4],
    [towerWidth * 0.5 - 0.4, -towerDepth * 0.5 + 0.4],
    [-towerWidth * 0.5 + 0.4, towerDepth * 0.5 - 0.4],
    [towerWidth * 0.5 - 0.4, towerDepth * 0.5 - 0.4],
  ];
  colPositions.forEach(([cx, cz]) => {
    const col = new THREE.Mesh(colGeom, mats.bronzeMetal);
    col.position.set(cx, lobbyHeight * 0.5, cz);
    col.castShadow = true;
    group.add(col);
  });

  // Lobby Entrance Canopy (sleek cantilevered bronze roof with warm downlight)
  const canopy = new THREE.Mesh(
    new THREE.BoxGeometry(4.5, 0.25, 3),
    mats.bronzeMetal
  );
  canopy.position.set(0, 3.2, towerDepth * 0.5 + 1.2);
  canopy.castShadow = true;
  group.add(canopy);

  // 2. Tower Body Stories
  for (let s = 1; s <= stories; s++) {
    const floorY = lobbyHeight + (s - 1) * storyHeight;

    // Floor Slab (Off-white architectural concrete band)
    const slab = new THREE.Mesh(
      new THREE.BoxGeometry(towerWidth + 0.3, 0.4, towerDepth + 0.3),
      mats.concreteWhite
    );
    slab.position.y = floorY + 0.2;
    slab.castShadow = true;
    slab.receiveShadow = true;
    group.add(slab);

    // Story Facade Volume
    const storyFacade = new THREE.Mesh(
      new THREE.BoxGeometry(towerWidth, storyHeight - 0.4, towerDepth),
      mats.buildingFacade
    );
    storyFacade.position.y = floorY + storyHeight * 0.5;
    storyFacade.castShadow = true;
    group.add(storyFacade);

    // Alternating Biophilic Cantilever Balconies & Planters
    if (s % 2 === 0 && s < stories - 1) {
      const isFront = (s / 2) % 2 === 0;
      const balconyZ = isFront ? towerDepth * 0.5 + 1.0 : -towerDepth * 0.5 - 1.0;

      // Balcony Slab
      const bSlab = new THREE.Mesh(
        new THREE.BoxGeometry(towerWidth * 0.7, 0.25, 2.2),
        mats.concreteWhite
      );
      bSlab.position.set(0, floorY + 0.15, balconyZ);
      bSlab.castShadow = true;
      group.add(bSlab);

      // Glass Balustrade
      const balustrade = new THREE.Mesh(
        new THREE.BoxGeometry(towerWidth * 0.68, 1.1, 0.08),
        mats.architecturalGlass
      );
      balustrade.position.set(0, floorY + 0.75, isFront ? balconyZ + 1.0 : balconyZ - 1.0);
      group.add(balustrade);

      // Integrated Planter Box with lush green foliage
      const planter = new THREE.Mesh(
        new THREE.BoxGeometry(towerWidth * 0.65, 0.5, 0.5),
        mats.concreteDark
      );
      planter.position.set(0, floorY + 0.4, balconyZ);
      group.add(planter);

      const foliage = new THREE.Mesh(
        new THREE.BoxGeometry(towerWidth * 0.63, 0.4, 0.6),
        mats.foliageForest
      );
      foliage.position.set(0, floorY + 0.75, balconyZ);
      group.add(foliage);
    }
  }

  // 3. Rooftop Crown & Sky Garden Terrace
  const totalTowerHeight = lobbyHeight + stories * storyHeight;

  const roofSlab = new THREE.Mesh(
    new THREE.BoxGeometry(towerWidth + 0.5, 0.5, towerDepth + 0.5),
    mats.concreteWhite
  );
  roofSlab.position.y = totalTowerHeight + 0.25;
  group.add(roofSlab);

  // Mechanical Penthouse & Solar Pergola
  const penthouse = new THREE.Mesh(
    new THREE.BoxGeometry(towerWidth * 0.5, 3.2, towerDepth * 0.5),
    mats.bronzeMetal
  );
  penthouse.position.set(0, totalTowerHeight + 1.8, 0);
  penthouse.castShadow = true;
  group.add(penthouse);

  // Rooftop Solar Canopy
  const solarRoof = new THREE.Mesh(
    new THREE.BoxGeometry(towerWidth * 0.7, 0.15, towerDepth * 0.7),
    mats.solarPanel
  );
  solarRoof.position.set(0, totalTowerHeight + 3.6, 0);
  solarRoof.castShadow = true;
  group.add(solarRoof);

  return group;
}

/**
 * Creates luxury architectural 2040 residential pavilion.
 * Limestone walls, floor-to-ceiling glass, furnished living area,
 * oak pergolas, rooftop solar tiles, and deck.
 */
export function createModernHouse(mats) {
  const group = new THREE.Group();
  group.name = 'Smart Home';
  group.userData = {
    id: 'home',
    title: 'Smart Adaptive Residence',
    category: 'Residential',
    desc: 'Passive biophilic residence crafted from warm limestone, oak louvers, and transparent solar glass.',
    cameraTarget: new THREE.Vector3(-12, 2.8, 8),
    cameraPosition: new THREE.Vector3(-12, 10, 22),
  };

  // 1. Foundation Platform (Landscaped deck with granite steps)
  const foundation = new THREE.Mesh(
    new THREE.BoxGeometry(14, 0.5, 13),
    mats.concreteWhite
  );
  foundation.position.y = 0.25;
  foundation.receiveShadow = true;
  group.add(foundation);

  // Hardwood Outdoor Living Deck
  const deck = new THREE.Mesh(
    new THREE.BoxGeometry(13.2, 0.1, 6),
    mats.wood
  );
  deck.position.set(0, 0.55, 3.2);
  deck.receiveShadow = true;
  group.add(deck);

  // 2. Ground Floor Living Pavilion (Limestone spine + glass walls)
  // Rear solid thermal mass wall (Limestone)
  const rearWall = new THREE.Mesh(
    new THREE.BoxGeometry(10, 3.4, 0.6),
    mats.limestone
  );
  rearWall.position.set(-0.5, 2.2, -3.2);
  rearWall.castShadow = true;
  group.add(rearWall);

  // Side limestone accent wall
  const sideWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 3.4, 6),
    mats.limestone
  );
  sideWall.position.set(-5.2, 2.2, -0.2);
  sideWall.castShadow = true;
  group.add(sideWall);

  // Panoramic Floor-to-Ceiling Glass Living Facade
  const livingGlassFront = new THREE.Mesh(
    new THREE.BoxGeometry(9.6, 3.2, 0.1),
    mats.architecturalGlass
  );
  livingGlassFront.position.set(-0.4, 2.1, 2.2);
  group.add(livingGlassFront);

  const livingGlassSide = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 3.2, 5.2),
    mats.architecturalGlass
  );
  livingGlassSide.position.set(4.4, 2.1, -0.4);
  group.add(livingGlassSide);

  // 3. Interior Minimalist Furnishings (Living Room visible through glass!)
  // Low modern sofa
  const sofaBase = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 0.45, 1.4),
    mats.concreteDark
  );
  sofaBase.position.set(0.5, 0.8, -0.5);
  group.add(sofaBase);

  const sofaBack = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 0.5, 0.4),
    mats.concreteDark
  );
  sofaBack.position.set(0.5, 1.25, -1.0);
  group.add(sofaBack);

  // Dark timber coffee table
  const coffeeTable = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.3, 0.8),
    mats.woodSmooth
  );
  coffeeTable.position.set(0.5, 0.7, 0.6);
  group.add(coffeeTable);

  // Kitchen marble island in background
  const kitchenIsland = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 1.0, 1.0),
    mats.concreteWhite
  );
  kitchenIsland.position.set(-3.0, 1.1, -1.5);
  group.add(kitchenIsland);

  // Subtle ambient LED cove line (Smart Home Lighting)
  const coveLight = new THREE.Mesh(
    new THREE.BoxGeometry(8, 0.05, 0.05),
    mats.streetLampGlow
  );
  coveLight.position.set(0, 3.6, -1.0);
  group.add(coveLight);

  // 4. Second Floor Cantilevered Master Suite (Oak Wood Louvers + Glass)
  const floor2Slab = new THREE.Mesh(
    new THREE.BoxGeometry(11, 0.4, 9),
    mats.concreteWhite
  );
  floor2Slab.position.set(0.5, 3.9, -0.5);
  floor2Slab.castShadow = true;
  group.add(floor2Slab);

  const suiteWall = new THREE.Mesh(
    new THREE.BoxGeometry(7.5, 3.0, 6.5),
    mats.wood
  );
  suiteWall.position.set(1.5, 5.6, -1.2);
  suiteWall.castShadow = true;
  group.add(suiteWall);

  // Master bedroom corner glass
  const suiteGlass = new THREE.Mesh(
    new THREE.BoxGeometry(4.5, 2.6, 0.1),
    mats.architecturalGlass
  );
  suiteGlass.position.set(2.8, 5.5, 2.06);
  group.add(suiteGlass);

  // 5. Rooftop Integrated Photovoltaic Glass Pergola
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(8.2, 0.25, 7.2),
    mats.solarPanel
  );
  roof.position.set(1.5, 7.25, -1.2);
  roof.castShadow = true;
  group.add(roof);

  // Outdoor Pergola Beams over Ground Deck
  for (let b = 0; b < 5; b++) {
    const beam = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.3, 3.8),
      mats.bronzeMetal
    );
    beam.position.set(-2 + b * 1.0, 3.9, 3.4);
    group.add(beam);
  }

  // Potted Ficus Tree on Deck
  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.35, 0.8, 16),
    mats.concreteDark
  );
  pot.position.set(3.8, 0.95, 4.2);
  group.add(pot);

  const plantFoliage = new THREE.Mesh(
    new THREE.SphereGeometry(0.75, 12, 12),
    mats.foliageForest
  );
  plantFoliage.position.set(3.8, 1.8, 4.2);
  group.add(plantFoliage);

  return group;
}

export const createSmartHome = createModernHouse;

/**
 * Creates realistic modern hospital pavilion.
 * White architectural concrete panels, double-height glass atrium,
 * welcoming reception, diagnostic wing, and rooftop helipad.
 */
export function createFutureHospital(mats) {
  const group = new THREE.Group();
  group.name = 'Future Hospital';
  group.userData = {
    id: 'health',
    title: 'Modern Healthcare & Diagnostic Pavilion',
    category: 'Healthcare',
    desc: 'Biophilic medical center emphasizing natural daylight, continuous cellular health twins, and trauma-free care.',
    cameraTarget: new THREE.Vector3(14, 4.5, -10),
    cameraPosition: new THREE.Vector3(14, 15, 8),
  };

  // 1. Base Plaza Platform
  const plaza = new THREE.Mesh(
    new THREE.BoxGeometry(18, 0.5, 16),
    mats.sidewalkPaver
  );
  plaza.position.y = 0.25;
  plaza.receiveShadow = true;
  group.add(plaza);

  // 2. Main Clinical Wing (White concrete + dark bronze framing)
  const mainWing = new THREE.Mesh(
    new THREE.BoxGeometry(12, 8.5, 8),
    mats.concreteWhite
  );
  mainWing.position.set(-1.5, 4.75, -2);
  mainWing.castShadow = true;
  group.add(mainWing);

  // Regular architectural window bands on main wing
  for (let f = 1; f <= 2; f++) {
    const winBand = new THREE.Mesh(
      new THREE.BoxGeometry(10.5, 1.4, 0.1),
      mats.architecturalGlass
    );
    winBand.position.set(-1.5, 2.8 + f * 2.6, 2.05);
    group.add(winBand);
  }

  // 3. Double-Height Glass Atrium / Reception Pavilion
  const atrium = new THREE.Mesh(
    new THREE.BoxGeometry(7.5, 5.5, 6.5),
    mats.architecturalGlass
  );
  atrium.position.set(4.0, 3.25, 2.5);
  group.add(atrium);

  // Atrium structural bronze frame
  const atriumRoof = new THREE.Mesh(
    new THREE.BoxGeometry(8, 0.3, 7),
    mats.bronzeMetal
  );
  atriumRoof.position.set(4.0, 6.1, 2.5);
  atriumRoof.castShadow = true;
  group.add(atriumRoof);

  // Subtle sea-green civic healthcare cross emblem (recessed, tasteful)
  const crossGroup = new THREE.Group();
  const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.6, 0.1), mats.seaGreenAccent);
  const crossH = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 0.1), mats.seaGreenAccent);
  crossGroup.add(crossV);
  crossGroup.add(crossH);
  crossGroup.position.set(4.0, 4.5, 5.8);
  group.add(crossGroup);

  // 4. Emergency Drop-off Porte-Cochere / Canopy
  const porteCochere = new THREE.Mesh(
    new THREE.BoxGeometry(6.5, 0.3, 4.5),
    mats.bronzeMetal
  );
  porteCochere.position.set(4.0, 3.4, 6.5);
  porteCochere.castShadow = true;
  group.add(porteCochere);

  const pCol1 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 3.4, 16), mats.aluminumSilver);
  pCol1.position.set(1.5, 1.7, 8.2);
  group.add(pCol1);
  const pCol2 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 3.4, 16), mats.aluminumSilver);
  pCol2.position.set(6.5, 1.7, 8.2);
  group.add(pCol2);

  // 5. Rooftop Helipad
  const helipadBase = new THREE.Mesh(
    new THREE.CylinderGeometry(3.6, 3.6, 0.3, 32),
    mats.concreteDark
  );
  helipadBase.position.set(-2, 9.15, -2);
  group.add(helipadBase);

  // Helipad Yellow/White Circular Markings
  const helipadRing = new THREE.Mesh(
    new THREE.RingGeometry(2.4, 2.7, 32),
    mats.asphaltRoad
  );
  helipadRing.rotation.x = -Math.PI * 0.5;
  helipadRing.position.set(-2, 9.32, -2);
  group.add(helipadRing);

  // Helipad 'H' letter
  const hBar1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.02, 2.0), mats.concreteWhite);
  hBar1.position.set(-2.7, 9.32, -2);
  group.add(hBar1);
  const hBar2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.02, 2.0), mats.concreteWhite);
  hBar2.position.set(-1.3, 9.32, -2);
  group.add(hBar2);
  const hBarCross = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.02, 0.3), mats.concreteWhite);
  hBarCross.position.set(-2.0, 9.32, -2);
  group.add(hBarCross);

  return group;
}

/**
 * Creates realistic modern school / curiosity studio.
 * Circular biophilic mass-timber pavilion, central courtyard with tree,
 * tiered wood seating, and glass clerestory.
 */
export function createFutureSchool(mats) {
  const group = new THREE.Group();
  group.name = 'Future School';
  group.userData = {
    id: 'education',
    title: 'Curiosity Synthesis Academy',
    category: 'Education',
    desc: 'Mass-timber learning academy centered on daylight, collaborative inquiry, and personalized mentorship.',
    cameraTarget: new THREE.Vector3(12, 3.2, 14),
    cameraPosition: new THREE.Vector3(12, 12, 28),
  };

  // 1. Plaza Base
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(11, 11.5, 0.5, 36),
    mats.sidewalkPaver
  );
  base.position.y = 0.25;
  base.receiveShadow = true;
  group.add(base);

  // 2. Circular Mass-Timber Outer Wall with Large Vertical Windows
  const wallRingGeom = new THREE.CylinderGeometry(9.5, 9.8, 4.5, 32, 1, true, 0.3, Math.PI * 1.8);
  const wallRing = new THREE.Mesh(wallRingGeom, mats.wood);
  wallRing.position.y = 2.75;
  wallRing.castShadow = true;
  group.add(wallRing);

  // 3. Slanted Clerestory Glass Roof
  const roofGeom = new THREE.CylinderGeometry(5.0, 10.2, 1.2, 32, 1, false);
  const roof = new THREE.Mesh(roofGeom, mats.architecturalGlass);
  roof.position.y = 5.6;
  group.add(roof);

  // Central Oculous Skylight Frame (Bronze)
  const oculus = new THREE.Mesh(
    new THREE.TorusGeometry(5.0, 0.2, 12, 32),
    mats.bronzeMetal
  );
  oculus.rotation.x = Math.PI * 0.5;
  oculus.position.y = 6.2;
  group.add(oculus);

  // 4. Interior Tiered Wooden Seating
  for (let tier = 0; tier < 3; tier++) {
    const tierGeom = new THREE.CylinderGeometry(4.2 + tier * 1.4, 4.4 + tier * 1.4, 0.5, 24, 1, true, 0.8, Math.PI * 1.4);
    const tierMesh = new THREE.Mesh(tierGeom, mats.woodSmooth);
    tierMesh.position.y = 0.75 + tier * 0.5;
    group.add(tierMesh);
  }

  // 5. Central Courtyard Planter with Mature Olive Tree
  const planter = new THREE.Mesh(
    new THREE.CylinderGeometry(2.0, 2.0, 0.5, 24),
    mats.concreteWhite
  );
  planter.position.y = 0.75;
  group.add(planter);

  const tree = createVariedTree(mats, 1, 1.2);
  tree.position.set(0, 0.8, 0);
  group.add(tree);

  return group;
}

// -------------------------------------------------------------
// Realistic Vehicles & Mobility
// -------------------------------------------------------------

/**
 * Creates realistic aerodynamic electric car / autonomous pod.
 * Proportions: ~4.6m length, ~1.85m width, ~1.45m height.
 * Features: aerodynamic chassis, glass canopy, 4 wheels with rubber tires
 * and multi-spoke alloy wheels, and LED light strips.
 */
export function createRealisticVehicle(mats, colorType = 'teal') {
  const car = new THREE.Group();
  car.name = 'Autonomous Electric Vehicle';

  const bodyMat = colorType === 'white' 
    ? mats.carPaintWhite 
    : colorType === 'silver' 
    ? mats.carPaintSilver 
    : mats.carPaintTeal;

  // 1. Lower Body Chassis
  const chassisGeom = new THREE.BoxGeometry(1.8, 0.55, 4.2);
  const chassis = new THREE.Mesh(chassisGeom, bodyMat);
  chassis.position.y = 0.45;
  chassis.castShadow = true;
  car.add(chassis);

  // 2. Aerodynamic Tapered Cabin Glass Canopy
  const cabinGeom = new THREE.BoxGeometry(1.5, 0.65, 2.4);
  const cabin = new THREE.Mesh(cabinGeom, mats.carGlass);
  cabin.position.set(0, 0.95, -0.2);
  cabin.castShadow = true;
  car.add(cabin);

  // 3. Roof Panel
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.1, 2.2),
    bodyMat
  );
  roof.position.set(0, 1.3, -0.2);
  car.add(roof);

  // 4. Four Realistic Wheels with Rubber Tires & Alloy Hubs
  const wheelGeom = new THREE.CylinderGeometry(0.34, 0.34, 0.24, 20);
  wheelGeom.rotateZ(Math.PI * 0.5);

  const hubGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.26, 16);
  hubGeom.rotateZ(Math.PI * 0.5);

  const wheelPositions = [
    [-0.92, 0.34, 1.3],
    [0.92, 0.34, 1.3],
    [-0.92, 0.34, -1.3],
    [0.92, 0.34, -1.3],
  ];

  wheelPositions.forEach(([wx, wy, wz]) => {
    const tire = new THREE.Mesh(wheelGeom, mats.tireRubber);
    tire.position.set(wx, wy, wz);
    tire.castShadow = true;
    car.add(tire);

    const hub = new THREE.Mesh(hubGeom, mats.wheelAlloy);
    hub.position.set(wx, wy, wz);
    car.add(hub);
  });

  // 5. Headlights & Taillights (Continuous horizontal LED strips)
  const headlight = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.08, 0.08),
    mats.headlightLED
  );
  headlight.position.set(0, 0.55, 2.12);
  car.add(headlight);

  const taillight = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.08, 0.08),
    mats.taillightLED
  );
  taillight.position.set(0, 0.58, -2.12);
  car.add(taillight);

  return car;
}

/**
 * Creates sleek autonomous electric shuttle / bus.
 * Proportions: ~7.5m length, ~2.3m width, ~2.7m height.
 */
export function createElectricBus(mats) {
  const bus = new THREE.Group();
  bus.name = 'Electric Transit Shuttle';

  // Lower body
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(2.3, 1.0, 7.5),
    mats.carPaintWhite
  );
  body.position.y = 0.8;
  body.castShadow = true;
  bus.add(body);

  // Sea-green transit brand accent ribbon along base
  const stripe = new THREE.Mesh(
    new THREE.BoxGeometry(2.34, 0.2, 7.4),
    mats.seaGreenAccent
  );
  stripe.position.y = 0.5;
  bus.add(stripe);

  // Panoramic Glass Upper Passenger Cabin
  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 1.4, 6.8),
    mats.carGlass
  );
  cabin.position.set(0, 1.9, 0);
  bus.add(cabin);

  // Roof with AC/Battery pods
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(2.25, 0.2, 7.0),
    mats.carPaintWhite
  );
  roof.position.set(0, 2.65, 0);
  bus.add(roof);

  // 6 Wheels
  const wheelGeom = new THREE.CylinderGeometry(0.38, 0.38, 0.26, 20);
  wheelGeom.rotateZ(Math.PI * 0.5);

  const wheelZPositions = [-2.4, 0, 2.4];
  wheelZPositions.forEach(wz => {
    [-1.15, 1.15].forEach(wx => {
      const tire = new THREE.Mesh(wheelGeom, mats.tireRubber);
      tire.position.set(wx, 0.38, wz);
      tire.castShadow = true;
      bus.add(tire);
    });
  });

  // Front destination LED display
  const sign = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.22, 0.05),
    mats.seaGreenAccent
  );
  sign.position.set(0, 2.4, 3.52);
  bus.add(sign);

  return bus;
}

// -------------------------------------------------------------
// Realistic Human-Scale Figures & Street Furniture
// -------------------------------------------------------------

/**
 * Creates human-scale figure (~1.75m height) with natural proportions.
 */
export function createHumanFigure(mats, clothType = 0, isSeated = false) {
  const figure = new THREE.Group();
  figure.name = 'Pedestrian';

  const clothMats = [
    mats.humanClothNavy,
    mats.humanClothTeal,
    mats.humanClothCream,
    mats.humanClothCharcoal,
  ];
  const clothMat = clothMats[clothType % clothMats.length];

  if (isSeated) {
    // Seated pose (on bench)
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.6, 0.24), clothMat);
    torso.position.y = 0.85;
    figure.add(torso);

    const legs = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.5, 0.45), mats.humanClothCharcoal);
    legs.position.set(0, 0.45, 0.15);
    figure.add(legs);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), mats.humanSkin);
    head.position.y = 1.3;
    figure.add(head);
  } else {
    // Standing / Walking pose
    const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.85, 0.16), mats.humanClothCharcoal);
    leg1.position.set(-0.1, 0.425, 0.05);
    figure.add(leg1);

    const leg2 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.85, 0.16), mats.humanClothCharcoal);
    leg2.position.set(0.1, 0.425, -0.05);
    figure.add(leg2);

    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.65, 0.24), clothMat);
    torso.position.y = 1.15;
    torso.castShadow = true;
    figure.add(torso);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), mats.humanSkin);
    head.position.y = 1.62;
    figure.add(head);
  }

  return figure;
}

/**
 * Creates modern urban park bench (teak slats + black metal frame).
 */
export function createParkBench(mats) {
  const bench = new THREE.Group();
  bench.name = 'Street Bench';

  // Metal legs
  const legGeom = new THREE.BoxGeometry(0.08, 0.5, 0.55);
  const leg1 = new THREE.Mesh(legGeom, mats.bronzeMetal);
  leg1.position.set(-0.9, 0.25, 0);
  bench.add(leg1);
  const leg2 = new THREE.Mesh(legGeom, mats.bronzeMetal);
  leg2.position.set(0.9, 0.25, 0);
  bench.add(leg2);

  // Teak wood slats (seat)
  for (let s = 0; s < 3; s++) {
    const slat = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 0.04, 0.14),
      mats.woodSmooth
    );
    slat.position.set(0, 0.5, -0.18 + s * 0.18);
    bench.add(slat);
  }

  // Backrest slat
  const back = new THREE.Mesh(
    new THREE.BoxGeometry(2.0, 0.25, 0.04),
    mats.woodSmooth
  );
  back.position.set(0, 0.78, -0.26);
  bench.add(back);

  return bench;
}

/**
 * Creates minimalist solar-powered street lamppost.
 */
export function createStreetLamppost(mats) {
  const lamp = new THREE.Group();
  lamp.name = 'Solar Street Lamp';

  // Pole
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.12, 5.2, 12),
    mats.bronzeMetal
  );
  pole.position.y = 2.6;
  pole.castShadow = true;
  lamp.add(pole);

  // Horizontal cantilever arm
  const arm = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.08, 0.08),
    mats.bronzeMetal
  );
  arm.position.set(0.6, 5.1, 0);
  lamp.add(arm);

  // Downward warm LED light fixture
  const fixture = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.06, 0.18),
    mats.streetLampGlow
  );
  fixture.position.set(1.1, 5.02, 0);
  lamp.add(fixture);

  // Mini solar cell on top
  const cell = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.04, 0.3),
    mats.solarPanel
  );
  cell.position.set(0.5, 5.2, 0);
  lamp.add(cell);

  return lamp;
}

/**
 * Creates modern glass bus stop shelter.
 */
export function createBusShelter(mats) {
  const shelter = new THREE.Group();
  shelter.name = 'Transit Shelter';

  // Vertical bronze columns
  const col1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.8, 12), mats.bronzeMetal);
  col1.position.set(-1.8, 1.4, -0.6);
  shelter.add(col1);
  const col2 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.8, 12), mats.bronzeMetal);
  col2.position.set(1.8, 1.4, -0.6);
  shelter.add(col2);

  // Glass back panel
  const backGlass = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 2.2, 0.06),
    mats.architecturalGlass
  );
  backGlass.position.set(0, 1.4, -0.6);
  shelter.add(backGlass);

  // Cantilevered glass roof
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(4.2, 0.08, 2.0),
    mats.architecturalGlass
  );
  roof.position.set(0, 2.8, 0.2);
  shelter.add(roof);

  // Integrated digital bus schedule screen (subtle sea-green)
  const screen = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 1.4, 0.04),
    mats.seaGreenAccent
  );
  screen.position.set(1.7, 1.4, -0.55);
  shelter.add(screen);

  return shelter;
}

// -------------------------------------------------------------
// Realistic Varied Natural Vegetation
// -------------------------------------------------------------

/**
 * Creates varied natural tree models with realistic trunks and organic leaf canopies.
 */
export function createVariedTree(mats, species = 0, scale = 1) {
  const tree = new THREE.Group();
  tree.name = 'Urban Tree';

  if (species === 0) {
    // Slender Silver Birch / Street Tree (Tall, light trunk, tiered foliage)
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.22, 4.5 * scale, 12),
      mats.trunkWood
    );
    trunk.position.y = 2.25 * scale;
    trunk.castShadow = true;
    tree.add(trunk);

    // Tiered organic leaf clusters
    const foliageCluster = [
      { y: 3.2, r: 1.2, mat: mats.foliageForest },
      { y: 4.4, r: 1.0, mat: mats.foliageOlive },
      { y: 5.4, r: 0.7, mat: mats.foliageSage },
    ];
    foliageCluster.forEach(fc => {
      const leaves = new THREE.Mesh(
        new THREE.DodecahedronGeometry(fc.r * scale, 1),
        fc.mat
      );
      leaves.position.y = fc.y * scale;
      leaves.castShadow = true;
      tree.add(leaves);
    });
  } else if (species === 1) {
    // Broad Spreading Oak / Courtyard Tree (Dark bark, broad full canopy)
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.45, 3.2 * scale, 12),
      mats.trunkWood
    );
    trunk.position.y = 1.6 * scale;
    trunk.castShadow = true;
    tree.add(trunk);

    // Main broad canopy volume
    const canopy1 = new THREE.Mesh(
      new THREE.DodecahedronGeometry(2.2 * scale, 1),
      mats.foliageDeep
    );
    canopy1.position.set(0, 3.8 * scale, 0);
    canopy1.castShadow = true;
    tree.add(canopy1);

    const canopy2 = new THREE.Mesh(
      new THREE.DodecahedronGeometry(1.6 * scale, 1),
      mats.foliageForest
    );
    canopy2.position.set(0.8 * scale, 4.2 * scale, 0.4 * scale);
    canopy2.castShadow = true;
    tree.add(canopy2);
  } else {
    // Manicured Planter Shrub / Compact Maple
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.18, 1.8 * scale, 10),
      mats.trunkWood
    );
    trunk.position.y = 0.9 * scale;
    tree.add(trunk);

    const bush = new THREE.Mesh(
      new THREE.SphereGeometry(1.1 * scale, 12, 10),
      mats.foliageSage
    );
    bush.position.y = 2.0 * scale;
    bush.castShadow = true;
    tree.add(bush);
  }

  return tree;
}

// -------------------------------------------------------------
// Complete Realistic Future City Master Generator
// -------------------------------------------------------------

export function buildCompleteCityScene(scene, mats, options = {}) {
  const {
    greenery = 50,
    technology = 50,
    isCarFree = false,
    solarActive = true,
    waterActive = true,
    isNight = false,
  } = options;

  const cityRoot = new THREE.Group();
  cityRoot.name = 'Realistic Future City Root';

  // 1. Realistic Urban Ground & Arterial Road Grid
  // Base Civic Ground Disk (Limestone pavers & concrete perimeter)
  const groundGeom = new THREE.CylinderGeometry(52, 53, 1.4, 64);
  const ground = new THREE.Mesh(groundGeom, mats.sidewalkPaver);
  ground.position.y = -0.7;
  ground.receiveShadow = true;
  cityRoot.add(ground);

  // Granite Curb Edge Ring
  const curbRing = new THREE.Mesh(
    new THREE.TorusGeometry(52.2, 0.28, 12, 64),
    mats.curbStone
  );
  curbRing.rotation.x = Math.PI * 0.5;
  curbRing.position.y = 0.02;
  cityRoot.add(curbRing);

  // Arterial Asphalt Ring Road (~8m wide road)
  const roadGeom = new THREE.RingGeometry(22, 30, 48);
  const ringRoad = new THREE.Mesh(roadGeom, mats.asphaltRoad);
  ringRoad.rotation.x = -Math.PI * 0.5;
  ringRoad.position.y = 0.03;
  ringRoad.receiveShadow = true;
  cityRoot.add(ringRoad);

  // Pedestrian Zebra Crossings on Ring Road
  const crosswalkPositions = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5];
  crosswalkPositions.forEach(angle => {
    const cw = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 5),
      new THREE.MeshBasicMaterial({ map: generateCrosswalkTexture() })
    );
    cw.rotation.x = -Math.PI * 0.5;
    cw.rotation.z = angle;
    cw.position.set(Math.cos(angle) * 26, 0.04, Math.sin(angle) * 26);
    cityRoot.add(cw);
  });

  // 2. Reflective Central Biophilic Water Canal
  if (waterActive) {
    const waterGeom = new THREE.RingGeometry(11, 15, 36);
    const canal = new THREE.Mesh(waterGeom, mats.waterCanal);
    canal.rotation.x = -Math.PI * 0.5;
    canal.position.y = 0.05;
    cityRoot.add(canal);

    // Stone Canal Border Walls
    const innerBorder = new THREE.Mesh(
      new THREE.TorusGeometry(11, 0.15, 8, 36),
      mats.concreteWhite
    );
    innerBorder.rotation.x = Math.PI * 0.5;
    innerBorder.position.y = 0.08;
    cityRoot.add(innerBorder);
  }

  // 3. Key Architectural Landmark Buildings
  // 🏠 Modern Smart House
  const home = createModernHouse(mats);
  home.position.set(-16, 0, 10);
  cityRoot.add(home);

  // 🏥 Future Healthcare Pavilion
  const hospital = createFutureHospital(mats);
  hospital.position.set(16, 0, -12);
  cityRoot.add(hospital);

  // 🏫 Curiosity Synthesis Academy
  const school = createFutureSchool(mats);
  school.position.set(14, 0, 14);
  cityRoot.add(school);

  // 🏙️ Biophilic Towers (Varied heights & architectural styles)
  const tower1 = createBiophilicSkyscraper(mats, 32, 'terrace');
  tower1.position.set(0, 0, -18);
  cityRoot.add(tower1);

  const tower2 = createBiophilicSkyscraper(mats, 24, 'terrace');
  tower2.position.set(-10, 0, -14);
  cityRoot.add(tower2);

  const tower3 = createBiophilicSkyscraper(mats, 22, 'terrace');
  tower3.position.set(22, 0, 2);
  cityRoot.add(tower3);

  const tower4 = createBiophilicSkyscraper(mats, 18, 'terrace');
  tower4.position.set(-22, 0, -4);
  cityRoot.add(tower4);

  // 4. Street Infrastructure & Furniture
  // Minimalist park benches around central plaza
  const benchPositions = [
    [-6, 0, 6, 0],
    [6, 0, 6, Math.PI],
    [-6, 0, -6, 0],
    [6, 0, -6, Math.PI],
  ];
  benchPositions.forEach(([bx, by, bz, rot]) => {
    const bench = createParkBench(mats);
    bench.position.set(bx, by, bz);
    bench.rotation.y = rot;
    cityRoot.add(bench);
  });

  // Solar Street Lampposts along ring road
  const lamppostCount = 8;
  for (let i = 0; i < lamppostCount; i++) {
    const angle = (i / lamppostCount) * Math.PI * 2;
    const lamp = createStreetLamppost(mats);
    lamp.position.set(Math.cos(angle) * 31, 0, Math.sin(angle) * 31);
    lamp.rotation.y = -angle + Math.PI;
    cityRoot.add(lamp);
  }

  // Bus Stop Shelter
  const busStop = createBusShelter(mats);
  busStop.position.set(-26, 0, 0);
  busStop.rotation.y = Math.PI * 0.5;
  cityRoot.add(busStop);

  // 5. Realistic Human-Scale Pedestrians (Communicating scale!)
  const pedestrianGroup = [];
  const pedestrianPositions = [
    [-5.5, 0, 5.8, 0, false],
    [-6.0, 0, 6.0, 1, true], // seated on bench
    [6.0, 0, 6.0, 2, true],  // seated on bench
    [2.5, 0, 8.5, 3, false],
    [-15.0, 0, 15.5, 1, false], // outside home
    [15.5, 0, -6.5, 0, false],  // outside hospital
    [13.5, 0, 19.5, 2, false],  // outside school
    [-25.5, 0, 1.2, 3, false],  // at bus shelter
  ];
  pedestrianPositions.forEach(([px, py, pz, cloth, seated]) => {
    const person = createHumanFigure(mats, cloth, seated);
    person.position.set(px, py, pz);
    cityRoot.add(person);
    pedestrianGroup.push(person);
  });

  // 6. Realistic Vehicle Fleet on Arterial Road
  const vehicleFleet = [];
  if (!isCarFree) {
    // Electric Sedan 1 (Teal)
    const car1 = createRealisticVehicle(mats, 'teal');
    car1.userData = { angle: 0, radius: 24, speed: 0.008 };
    cityRoot.add(car1);
    vehicleFleet.push(car1);

    // Electric Sedan 2 (White)
    const car2 = createRealisticVehicle(mats, 'white');
    car2.userData = { angle: Math.PI * 0.7, radius: 28, speed: 0.01 };
    cityRoot.add(car2);
    vehicleFleet.push(car2);

    // Electric Sedan 3 (Silver)
    const car3 = createRealisticVehicle(mats, 'silver');
    car3.userData = { angle: Math.PI * 1.4, radius: 24, speed: 0.0075 };
    cityRoot.add(car3);
    vehicleFleet.push(car3);

    // Electric Transit Shuttle Bus
    const bus = createElectricBus(mats);
    bus.userData = { angle: Math.PI * 0.35, radius: 28, speed: 0.006 };
    cityRoot.add(bus);
    vehicleFleet.push(bus);
  }

  // 7. Varied Natural Vegetation & Trees (Organic scale and density)
  const treeCount = Math.floor(18 + (greenery / 100) * 35);
  const trees = [];
  for (let i = 0; i < treeCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = 6 + Math.random() * 42;
    // Don't spawn on top of canal or ring road
    if ((dist < 10 || dist > 16) && (dist < 21 || dist > 31)) {
      const species = i % 3;
      const s = 0.8 + Math.random() * 0.5;
      const tree = createVariedTree(mats, species, s);
      tree.position.set(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);
      cityRoot.add(tree);
      trees.push(tree);
    }
  }

  // Store interactive refs
  cityRoot.userData = {
    vehicleFleet,
    trees,
    landmarks: [home, hospital, school, tower1, tower2],
  };

  scene.add(cityRoot);
  return cityRoot;
}
