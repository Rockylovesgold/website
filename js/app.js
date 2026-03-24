import { initThreeScene } from './three-scene.js';
import { initAnimations } from './animations.js';
import { initUI } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Smooth scroll (Lenis)
  let lenis;
  if (!prefersReduced && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: false,
    });

    // Bridge Lenis RAF with GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // Init Three.js background
  initThreeScene();

  // Init GSAP animations
  initAnimations();

  // Init UI behaviors
  initUI();
});
