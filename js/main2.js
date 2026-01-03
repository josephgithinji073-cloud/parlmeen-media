import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";





/* =========================
   BASIC SETUP
========================= */
const canvas = document.getElementById("webgl");

const scene = new THREE.Scene();

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
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
renderer.setClearColor(0x000000, 1);
renderer.shadowMap.enabled = true;

/* =========================
   CONTROLS
========================= */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 2.5;
controls.maxDistance = 6;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.3;

/* =========================
   VIDEO BACKGROUND
========================= */
const video = document.createElement("video");
video.src = "assets/hero.mp4";
video.muted = true;
video.loop = true;
video.playsInline = true;
video.addEventListener("canplay", () => video.play());

const videoTexture = new THREE.VideoTexture(video);
videoTexture.colorSpace = THREE.SRGBColorSpace;

const videoMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(16, 9),
  new THREE.MeshBasicMaterial({
    map: videoTexture,
    transparent: true,
    opacity: 0.25
  })
);
videoMesh.scale.set(0.6, 0.6, 1);
videoMesh.position.set(0, 0, -6);
scene.add(videoMesh);

/* =========================
   EARTH (AFRICA SYMBOL)
========================= */
const earthTexture = new THREE.TextureLoader().load("assets/R.jpg");

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    roughness: 0.9,
    metalness: 0.05
  })
);
earth.position.y = 0.6;
earth.castShadow = true;
scene.add(earth);

/* =========================
   LIGHTING
========================= */
scene.add(new THREE.AmbientLight(0x4c6a88, 0.45));

const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(5, 6, 4);
keyLight.castShadow = true;
scene.add(keyLight);

const rimLight = new THREE.PointLight(0x00cfff, 1, 10);
rimLight.position.set(-4, 2, -3);
scene.add(rimLight);

/* =========================
   PARTICLES (STORIES / DATA)
========================= */
const PARTICLE_COUNT = 2000;

const particleGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(PARTICLE_COUNT * 3);
const colors = new Float32Array(PARTICLE_COUNT * 3);
const colorVelocities = new Float32Array(PARTICLE_COUNT * 3); // speed of change per channel

for (let i = 0; i < PARTICLE_COUNT; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

  // Random initial RGB color
  colors[i * 3] = Math.random();
  colors[i * 3 + 1] = Math.random();
  colors[i * 3 + 2] = Math.random();

  // Random RGB velocity (how fast the color changes)
  colorVelocities[i * 3] = (Math.random() * 0.002 + 0.001);
  colorVelocities[i * 3 + 1] = (Math.random() * 0.002 + 0.001);
  colorVelocities[i * 3 + 2] = (Math.random() * 0.002 + 0.001);
}

particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
particleGeometry.setAttribute(
  "color",
  new THREE.BufferAttribute(colors, 3)
);

const particleMaterial = new THREE.PointsMaterial({
  size: 0.012,
  vertexColors: true,
  transparent: true,
  opacity: 0.8
});

const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

/* =========================
   PLANTS (COMMUNITY IMPACT)
========================= */
const plants = [];

function createPlant(x, z) {
  const height = 0.15 + Math.random() * 0.35;

  const plant = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, height, 6),
    new THREE.MeshStandardMaterial({
      color: 0x44ff88,
      emissive: 0x22aa55,
      emissiveIntensity: 0.4
    })
  );

  plant.position.set(x, height / 2, z);
  scene.add(plant);
  plants.push(plant);
}

/* =========================
   SATELLITES (CONNECTIONS)
========================= */
const satellites = [];
const SAT_COLORS = [0xffaa00, 0x00ffaa, 0xff44ff, 0x44aaff];

SAT_COLORS.forEach((color) => {
  const sat = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 16, 16),
    new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 1
    })
  );

  satellites.push({
    mesh: sat,
    radius: 1.5 + Math.random() * 0.4,
    angle: Math.random() * Math.PI * 2,
    speed: 0.002 + Math.random() * 0.004
  });

  scene.add(sat);
});

/* =========================
   INTERACTION (CLICK EARTH)
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

  earth.rotation.y += 0.0006;
  particles.rotation.y += 0.0004;

  satellites.forEach((s) => {
    s.angle += s.speed;
    s.mesh.position.set(
      Math.cos(s.angle) * s.radius,
      Math.sin(s.angle * 0.5) * 0.3,
      Math.sin(s.angle) * s.radius
    );
  });

  plants.forEach((p, i) => {
    p.scale.y = 1 + Math.sin(elapsed * 2 + i) * 0.12;
  });

  // Smoothly change each particle color independently
  const colorsArray = particleGeometry.attributes.color.array;
  for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
    colorsArray[i] += (Math.random() - 0.5) * colorVelocities[i]; // Random walk
    if (colorsArray[i] < 0) colorsArray[i] = 0;
    if (colorsArray[i] > 1) colorsArray[i] = 1;
  }
  particleGeometry.attributes.color.needsUpdate = true;

  controls.update();
  renderer.render(scene, camera);
}

animate();

/* =========================
   RESIZE HANDLING
========================= */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
