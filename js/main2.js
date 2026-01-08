/**
 * Pearlmeen Media - Three.js 3D Background
 * Professional animated 3D scene with particles, earth, and interactive elements
 * Matches professional color scheme: Blue, Teal, Cyan
 */

// Wait for page to load before initializing Three.js
window.addEventListener('load', function() {
  initThreeJs();
});

function initThreeJs() {

/* =========================
   PROFESSIONAL COLOR PALETTE
========================= */
const COLORS = {
  PRIMARY_BLUE: 0x1e40af,      // Deep Blue
  PRIMARY_LIGHT: 0x3b82f6,     // Light Blue
  SECONDARY_TEAL: 0x0369a1,    // Professional Teal
  ACCENT_CYAN: 0x00d9ff,       // Bright Cyan
  SUCCESS_GREEN: 0x10b981,     // Success Green
  WARNING_AMBER: 0xf59e0b,     // Warning Amber
  BG_DARK: 0x111827,           // Dark background
  BG_LIGHTER: 0x1f2937         // Slightly lighter background
};

/* =========================
   BASIC SETUP
========================= */
const canvas = document.getElementById("webgl");

const scene = new THREE.Scene();
scene.background = new THREE.Color(COLORS.BG_DARK);
scene.fog = new THREE.Fog(COLORS.BG_DARK, 20, 100);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.6, 4);
scene.add(camera);

/* =========================
   RENDERER
========================= */
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
renderer.setClearColor(COLORS.BG_DARK, 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

/* =========================
   CONTROLS
========================= */
let controls = { update: () => {} };
if (THREE && (THREE.OrbitControls || THREE.OrbitControls)) {
  const Orbit = THREE.OrbitControls || THREE.OrbitControls;
  try {
    controls = new Orbit(camera, canvas);
    if (controls) {
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.minDistance = 2.5;
      controls.maxDistance = 6;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;
      controls.dampingFactor = 0.05;
    }
  } catch (e) { /* fallback */ }
}

/* =========================
   EARTH (AFRICA SYMBOL)
   Simplified texture loading (no DOM loader) — render immediately
========================= */
const textureLoader = new THREE.TextureLoader();

const earthMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.8,
  metalness: 0.1,
  emissive: new THREE.Color(COLORS.PRIMARY_BLUE),
  emissiveIntensity: 0.2
});

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  earthMaterial
);
earth.position.y = 0.6;
earth.castShadow = true;
earth.receiveShadow = true;
scene.add(earth);

// Load texture and apply if available; fallback to canvas gradient on error
textureLoader.load(
  'images/R.jpg',
  (tex) => {
    earth.material.map = tex;
    earth.material.needsUpdate = true;
  },
  undefined,
  () => {
    console.warn('Earth texture not found, using fallback');
    const cvs = document.createElement('canvas');
    cvs.width = 512; cvs.height = 512;
    const ctx = cvs.getContext('2d');
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 512);
    gradient.addColorStop(0, '#3b82f6');
    gradient.addColorStop(0.5, '#0369a1');
    gradient.addColorStop(1, '#1e40af');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, 512, 512);
    earth.material.map = new THREE.CanvasTexture(cvs);
    earth.material.needsUpdate = true;
  }
);

/* =========================
   ATMOSPHERE GLOW
========================= */
const glowGeometry = new THREE.SphereGeometry(1.05, 64, 64);
const glowMaterial = new THREE.MeshBasicMaterial({
  color: COLORS.ACCENT_CYAN,
  transparent: true,
  opacity: 0.1
});
const glow = new THREE.Mesh(glowGeometry, glowMaterial);
glow.position.copy(earth.position);
scene.add(glow);

/* =========================
   LIGHTING - PROFESSIONAL
========================= */
// Ambient Light - Soft overall illumination
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

// Key Light - Main directional light (Blue tinted)
const keyLight = new THREE.DirectionalLight(COLORS.PRIMARY_LIGHT, 1.2);
keyLight.position.set(5, 6, 4);
keyLight.castShadow = true;
keyLight.shadow.mapSize.width = 2048;
keyLight.shadow.mapSize.height = 2048;
keyLight.shadow.camera.near = 0.1;
keyLight.shadow.camera.far = 50;
scene.add(keyLight);

// Rim Light - Cyan accent light
const rimLight = new THREE.PointLight(COLORS.ACCENT_CYAN, 1.5, 15);
rimLight.position.set(-4, 2, -3);
scene.add(rimLight);

// Fill Light - Teal light for depth
const fillLight = new THREE.PointLight(COLORS.SECONDARY_TEAL, 0.8, 12);
fillLight.position.set(4, 1, -2);
scene.add(fillLight);

/* =========================
   PARTICLES - STORIES & DATA
========================= */
const PARTICLE_COUNT = window.innerWidth < 768 ? 800 : 1200; // lower on mobile for faster startup

const particleGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(PARTICLE_COUNT * 3);
const colors = new Float32Array(PARTICLE_COUNT * 3);
const velocities = new Float32Array(PARTICLE_COUNT * 3);

// Color palette for particles (professional blues and cyans)
const particleColors = [
  new THREE.Color(COLORS.PRIMARY_BLUE),
  new THREE.Color(COLORS.PRIMARY_LIGHT),
  new THREE.Color(COLORS.SECONDARY_TEAL),
  new THREE.Color(COLORS.ACCENT_CYAN),
  new THREE.Color(COLORS.SUCCESS_GREEN)
];

for (let i = 0; i < PARTICLE_COUNT; i++) {
  // Random position in sphere
  const radius = Math.random() * 5;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.random() * Math.PI;
  
  positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
  positions[i * 3 + 1] = radius * Math.cos(phi);
  positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

  // Random velocity
  velocities[i * 3] = (Math.random() - 0.5) * 0.05;
  velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
  velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;

  // Random color from professional palette
  const randomColor = particleColors[Math.floor(Math.random() * particleColors.length)];
  colors[i * 3] = randomColor.r;
  colors[i * 3 + 1] = randomColor.g;
  colors[i * 3 + 2] = randomColor.b;
}

particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const particleMaterial = new THREE.PointsMaterial({
  size: 0.012,
  vertexColors: true,
  transparent: true,
  opacity: 0.8,
  sizeAttenuation: true
});

const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

/* =========================
   SATELLITES - CONNECTIONS
========================= */
const satellites = [];
const SAT_COLORS = [
  COLORS.PRIMARY_LIGHT,      // Light Blue
  COLORS.ACCENT_CYAN,        // Cyan
  COLORS.SECONDARY_TEAL,     // Teal
  COLORS.SUCCESS_GREEN       // Green
];

SAT_COLORS.forEach((color, index) => {
  const sat = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 16, 16),
    new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.8,
      metalness: 0.7,
      roughness: 0.2
    })
  );

  satellites.push({
    mesh: sat,
    radius: 1.5 + index * 0.3,
    angle: (index / SAT_COLORS.length) * Math.PI * 2,
    speed: 0.002 + index * 0.001,
    color: color,
    height: 0.2 + index * 0.1
  });

  scene.add(sat);
});

/* =========================
   PLANTS - COMMUNITY GROWTH
========================= */
const plants = [];

function createPlant(x, z) {
  const height = 0.15 + Math.random() * 0.35;

  const plant = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, height, 6),
    new THREE.MeshStandardMaterial({
      color: COLORS.SUCCESS_GREEN,
      emissive: COLORS.SUCCESS_GREEN,
      emissiveIntensity: 0.5
    })
  );

  plant.position.set(x, height / 2, z);
  plant.castShadow = true;
  scene.add(plant);
  plants.push({
    mesh: plant,
    born: Date.now()
  });
}

/* =========================
   INTERACTION - CLICK EARTH
========================= */
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

canvas.addEventListener("click", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const hit = raycaster.intersectObject(earth);

  if (hit.length) {
    createPlant(hit[0].point.x, hit[0].point.z);
  }
});

/* =========================
   ANIMATION LOOP
========================= */
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();

  // Rotate Earth
  earth.rotation.y += 0.0006;
  glow.rotation.y += 0.0003;

  // Animate Particles
  particles.rotation.y += 0.0004;
  const positionsArray = particleGeometry.attributes.position.array;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positionsArray[i * 3] += velocities[i * 3];
    positionsArray[i * 3 + 1] += velocities[i * 3 + 1];
    positionsArray[i * 3 + 2] += velocities[i * 3 + 2];

    // Wrap around if out of bounds
    if (Math.abs(positionsArray[i * 3]) > 10) velocities[i * 3] *= -1;
    if (Math.abs(positionsArray[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1;
    if (Math.abs(positionsArray[i * 3 + 2]) > 10) velocities[i * 3 + 2] *= -1;
  }
  particleGeometry.attributes.position.needsUpdate = true;

  // Animate Satellites
  satellites.forEach((s, i) => {
    s.angle += s.speed;
    s.mesh.position.set(
      Math.cos(s.angle) * s.radius,
      Math.sin(s.angle * 0.5) * s.height,
      Math.sin(s.angle) * s.radius
    );
    s.mesh.rotation.x += 0.01;
    s.mesh.rotation.y += 0.02;
  });

  // Animate Plants
  plants.forEach((p, i) => {
    const age = (Date.now() - p.born) / 1000;
    if (age > 3) {
      scene.remove(p.mesh);
      plants.splice(i, 1);
    } else {
      p.mesh.scale.y = 1 + Math.sin(elapsed * 2 + i) * 0.12;
      p.mesh.position.y += Math.sin(elapsed * 3) * 0.01;
    }
  });

  controls.update();
  renderer.render(scene, camera);
}

// Start animation immediately
try { animate(); } catch (e) { /* ignore */ }

/* =========================
   RESIZE HANDLING
========================= */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* =========================
   RESPONSIVE PERFORMANCE
========================= */
// Reduce quality on mobile
if (window.innerWidth < 768) {
  renderer.setPixelRatio(1);
  particleMaterial.size = 0.008;
}

// Loader visibility is handled by LoadingManager.onLoad and a timeout fallback
} // End of initThreeJs function