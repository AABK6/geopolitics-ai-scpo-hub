(function () {
  const reducedMotionQuery = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

  function prefersReducedMotion() {
    return Boolean(reducedMotionQuery && reducedMotionQuery.matches);
  }

  function initGSAP(options = {}) {
    if (typeof window.gsap === 'undefined') {
      return {
        available: false,
        reduced: prefersReducedMotion(),
        hasScrollTrigger: typeof window.ScrollTrigger !== 'undefined'
      };
    }

    const {
      ease = 'power3.out',
      duration = 0.8,
      timeScale = 0.75
    } = options;

    if (typeof window.ScrollTrigger !== 'undefined') {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }

    window.gsap.defaults({
      ease,
      duration
    });

    const reduced = prefersReducedMotion();
    if (reduced) {
      window.gsap.defaults({
        ease: 'none',
        duration: 0
      });
    } else if (window.gsap.globalTimeline) {
      window.gsap.globalTimeline.timeScale(timeScale);
    }

    return {
      available: true,
      reduced,
      hasScrollTrigger: typeof window.ScrollTrigger !== 'undefined'
    };
  }

  function revealImmediately(config = {}) {
    const {
      selectors = [],
      removeOpacityClasses = true,
      removeTransforms = [],
      clearInlineTransform = true
    } = config;

    if (removeOpacityClasses) {
      document.querySelectorAll('.opacity-0').forEach((element) => {
        element.classList.remove('opacity-0');
      });
    }

    removeTransforms.forEach((className) => {
      document.querySelectorAll(`.${className}`).forEach((element) => {
        element.classList.remove(className);
      });
    });

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        element.style.opacity = '1';
        if (clearInlineTransform) {
          element.style.transform = 'none';
        }
        element.style.animation = 'none';
      });
    });
  }

  function prepareGSAPPage(config = {}) {
    const {
      requireScrollTrigger = true,
      reveal = {}
    } = config;

    const hasGsap = typeof window.gsap !== 'undefined';
    const hasScrollTrigger = typeof window.ScrollTrigger !== 'undefined';

    if (!hasGsap || (requireScrollTrigger && !hasScrollTrigger)) {
      console.warn('GSAP or ScrollTrigger not loaded');
      revealImmediately(reveal);
      return false;
    }

    const state = initGSAP();
    if (state.reduced) {
      revealImmediately(reveal);
      return false;
    }

    return true;
  }

  window.AIGeoMotionPolicy = {
    prefersReducedMotion,
    initGSAP,
    prepareGSAPPage,
    revealImmediately
  };
})();
