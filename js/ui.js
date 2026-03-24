export function initUI() {
  initCursor();
  initNav();
  initScrollProgress();
  initMobileMenu();
  initMobileLinks();
}

// -------------------------------------------------------
// CUSTOM CURSOR
// -------------------------------------------------------
function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  // Only on non-touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  let cx = window.innerWidth / 2;
  let cy = window.innerHeight / 2;

  // QuickTo for smooth ring lag
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' });

  document.addEventListener('mousemove', (e) => {
    cx = e.clientX;
    cy = e.clientY;

    gsap.set(dot, { x: cx, y: cy });
    ringX(cx);
    ringY(cy);
  });

  // Hover state on interactive elements
  document.querySelectorAll('.hoverable, a, button, [role="button"]').forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hovering'));
  });
}

// -------------------------------------------------------
// STICKY NAV
// -------------------------------------------------------
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// -------------------------------------------------------
// SCROLL PROGRESS
// -------------------------------------------------------
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

// -------------------------------------------------------
// MOBILE MENU
// -------------------------------------------------------
function initMobileMenu() {
  const hamburger = document.querySelector('.nav__hamburger');
  const panel     = document.getElementById('mobile-panel');
  const closeBtn  = document.querySelector('.mobile-panel__close');
  const overlay   = document.querySelector('.mobile-panel__overlay');
  if (!hamburger || !panel) return;

  const openMenu = () => {
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close on nav link click
  panel.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

// -------------------------------------------------------
// MOBILE LINKS STAGGER ANIMATION
// -------------------------------------------------------
function initMobileLinks() {
  const panel = document.getElementById('mobile-panel');
  if (!panel) return;

  const observer = new MutationObserver(() => {
    if (panel.classList.contains('is-open')) {
      gsap.fromTo('.mobile-link',
        { x: 24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo('.mobile-panel__cta',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.5 }
      );
    }
  });

  observer.observe(panel, { attributes: true, attributeFilter: ['class'] });
}
