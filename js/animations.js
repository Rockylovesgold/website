import { setParticleOpacity, setCameraZ } from './three-scene.js';

export function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -------------------------------------------------------
  // PAGE LOAD SEQUENCE
  // -------------------------------------------------------
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (prefersReduced) {
    // Just show everything immediately
    gsap.set([
      '#three-canvas',
      '.hero__eyebrow', '.headline-line', '.hero__sub', '.hero__actions', '.hero__scroll-hint',
      '.nav__inner',
    ], { opacity: 1, y: 0, x: 0 });
    return;
  }

  // Canvas fade in
  tl.to('#three-canvas', { opacity: 1, duration: 1.2 }, 0);

  // Nav slide down
  tl.from('.nav__inner', { y: -60, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.3);

  // Hero eyebrow
  tl.to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.6 }, 0.7);
  tl.from('.hero__eyebrow', { y: 20 }, '<');

  // Hero headline lines
  tl.to('.headline-line', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power4.out',
  }, 0.9);
  tl.from('.headline-line', {
    y: 80,
    skewY: 6,
    duration: 0.9,
    stagger: 0.12,
  }, 0.9);

  // Sub + actions
  tl.to('.hero__sub', { opacity: 1, y: 0, duration: 0.6 }, 1.5);
  tl.from('.hero__sub', { y: 20 }, '<');
  tl.to('.hero__actions', { opacity: 1, y: 0, duration: 0.6 }, 1.7);
  tl.from('.hero__actions', { y: 16 }, '<');

  // Scroll hint
  tl.to('.hero__scroll-hint', { opacity: 1, duration: 0.5 }, 2.2);

  // -------------------------------------------------------
  // HERO SCROLL PARALLAX
  // -------------------------------------------------------
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress;
      setParticleOpacity(1 - p);
      setCameraZ(3 + p * 3);
      gsap.set('.hero__content', { y: p * -120 });
    },
  });

  // -------------------------------------------------------
  // ABOUT
  // -------------------------------------------------------
  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 75%',
    once: true,
    onEnter: () => {
      gsap.from('.about__text', { x: -60, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.about__visual', { x: 60, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.1 });
      gsap.from('.visual-stat', { scale: 0.85, opacity: 0, duration: 0.8, ease: 'back.out(1.5)', stagger: 0.15, delay: 0.3 });
    },
  });

  // -------------------------------------------------------
  // SERVICES
  // -------------------------------------------------------
  ScrollTrigger.create({
    trigger: '#services',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      gsap.from('.services .section__header', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' });
      gsap.to('.service-card', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
      });
    },
  });

  // -------------------------------------------------------
  // RESULTS
  // -------------------------------------------------------
  ScrollTrigger.create({
    trigger: '#results',
    start: 'top 75%',
    once: true,
    onEnter: () => {
      gsap.from('.results .section__header', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' });
      gsap.to('.result-card', {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
      });
    },
  });

  ScrollTrigger.create({
    trigger: '.results__aggregate',
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.from('.results__aggregate', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.agg-stat__value', {
        scale: 0.8,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        delay: 0.2,
      });
    },
  });

  // -------------------------------------------------------
  // CTA
  // -------------------------------------------------------
  ScrollTrigger.create({
    trigger: '#contact',
    start: 'top 75%',
    once: true,
    onEnter: () => {
      gsap.from('.cta__inner > *', {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      });
    },
  });
}
