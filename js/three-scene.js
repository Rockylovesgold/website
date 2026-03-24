import * as THREE from 'three';

let renderer, scene, camera, particles1, particles2, animFrameId;
let mouseX = 0, mouseY = 0;
let targetRotX = 0, targetRotY = 0;
const canvas = document.getElementById('three-canvas');

export function initThreeScene() {
  // Reduced on mobile
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 800 : 2500;

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 3;

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  // Particle system 1 — amber
  particles1 = createParticles(particleCount, 0xE8A030, 0.6, 0.012);
  scene.add(particles1);

  // Particle system 2 — violet (depth layer)
  particles2 = createParticles(particleCount, 0xC040E0, 0.25, 0.009);
  scene.add(particles2);

  // Mouse tracking
  document.addEventListener('mousemove', onMouseMove);

  // Resize
  window.addEventListener('resize', onResize);

  // Start loop
  animate();
}

function createParticles(count, color, opacity, size) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 6;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    size,
    color,
    transparent: true,
    opacity,
    sizeAttenuation: true,
  });

  return new THREE.Points(geo, mat);
}

function animate() {
  animFrameId = requestAnimationFrame(animate);

  // Slow rotation
  scene.rotation.y += 0.0003;
  scene.rotation.x += 0.0001;

  // Mouse parallax
  targetRotY += (mouseX * 0.15 - targetRotY) * 0.05;
  targetRotX += (mouseY * 0.1  - targetRotX) * 0.05;

  scene.rotation.y += targetRotY * 0.01;
  scene.rotation.x += targetRotX * 0.01;

  renderer.render(scene, camera);
}

function onMouseMove(e) {
  mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export function setParticleOpacity(opacity) {
  if (particles1) particles1.material.opacity = Math.max(0, 0.6 * opacity);
  if (particles2) particles2.material.opacity = Math.max(0, 0.25 * opacity);
}

export function setCameraZ(z) {
  if (camera) camera.position.z = z;
}
