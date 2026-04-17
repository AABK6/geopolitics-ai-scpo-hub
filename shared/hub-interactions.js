import { initLatentSpace } from './3d-hub.js';

document.addEventListener('DOMContentLoaded', () => {
  const revealHeroNow = () => {
    const revealTargets = [
      '#hero-badge',
      '#hero-title',
      '#hero-subtitle',
      '#hero-statement',
      '#core-question',
      '#hero-instructors'
    ];
    revealTargets.forEach((selector) => {
      const element = document.querySelector(selector);
      if (!element) return;
      element.style.opacity = '1';
      element.style.transform = 'none';
    });
  };

  const hideLoadingOverlayNow = () => {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (!loadingOverlay) return;
    loadingOverlay.style.opacity = '0';
    loadingOverlay.style.display = 'none';
  };

  if (window.lucide) {
    window.lucide.createIcons();
  }

  const jumpToNetwork = (behavior = 'smooth') => {
    window.scrollTo({ top: window.innerHeight * 0.95, behavior });
  };

  let latentSpace = null;
  try {
    latentSpace = initLatentSpace();
  } catch (error) {
    console.error('Latent space initialization failed:', error);
    hideLoadingOverlayNow();
  }
  const { camera, controls, renderer } = latentSpace || {};

  if (latentSpace) {
    camera.position.set(-30, 8, 25);
    controls.target.set(0, 4, 0);
    controls.update();
    controls.enabled = false;
    controls.autoRotate = false;
  }

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    revealHeroNow();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Entrance
  const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  introTl.fromTo('#hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5 })
    .fromTo('#hero-title', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1 }, '-=0.4')
    .fromTo('#hero-subtitle', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.55')
    .fromTo('#hero-statement', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .fromTo('#core-question', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8 }, '-=0.4')
    .fromTo('#hero-instructors', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');

  // Scroll
  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "55% top",
      scrub: 1.2, // Faster scrub to prevent lag feeling
      snap: {
        snapTo: [0, 1], // Magnetic snapping: forces either full hero (0) or full 3D Hub (1)
        duration: 0.5,
        ease: "power2.inOut"
      },
      onLeave: () => { if (controls) { controls.enabled = true; controls.autoRotate = false; } },
      onEnterBack: () => { if (controls) { controls.enabled = false; controls.autoRotate = false; } },
      onUpdate: (self) => {
        // Instantly disable the invisible hero shield so the 3D map is clickable
        const hero = document.getElementById('hero-section');
        if (hero) hero.style.pointerEvents = self.progress > 0.18 ? 'none' : 'auto';
      }
    }
  });

  scrollTl.to("#hero-section", { opacity: 0, y: -90 }, 0);
  /* Brighten the background and slowly pan down to the data center racks */
  scrollTl.to("#hero-bg-image", {
    filter: "brightness(1.3) blur(0.8px) saturate(0.96)",
    backgroundPosition: "50% 72%" // Slows down scroll mapping by travelling less distance
  }, 0);
  scrollTl.to("#canvas-container", { filter: "blur(0px) brightness(1.25) contrast(1.08)", opacity: 1, pointerEvents: "auto" }, 0);

  const isMobileConfig = window.innerWidth <= 768;

  if (camera && controls) {
    if (isMobileConfig) {
      // Mobile specific framing: Pan to the center of the vertical stack
      scrollTl.to(camera.position, { x: 0, y: 0, z: 42 }, 0);
      const targetObj = { x: 0, y: 0, z: 0 };
      scrollTl.to(targetObj, { x: 0, y: 0, z: 0, onUpdate: () => controls.target.set(targetObj.x, targetObj.y, targetObj.z) }, 0);
    } else {
      // Desktop framing
      scrollTl.to(camera.position, { x: 0, y: 5, z: 42 }, 0); // Pulled back for tighter FOV
      const targetObj = { x: 0, y: 4, z: 0 };
      scrollTl.to(targetObj, { x: 0, y: 0, z: 0, onUpdate: () => controls.target.set(targetObj.x, targetObj.y, targetObj.z) }, 0);
    }
  }

  scrollTl.to("#ui-layer", { opacity: 1 }, 0.56);

  if (window.location.hash === '#network') {
    requestAnimationFrame(() => jumpToNetwork('auto'));
  }

});
