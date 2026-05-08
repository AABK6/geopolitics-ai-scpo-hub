(function () {
  const path = window.location.pathname || '';
  if (!path.endsWith('/primer/module-01.html') && !path.endsWith('/module-01.html')) {
    return;
  }

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      callback();
    }
  }

  onReady(function () {
    const moduleRoot = document.getElementById('week1-part1');
    if (!moduleRoot || document.querySelector('[data-clinton-prologue]')) {
      return;
    }

    const originalHero = moduleRoot.querySelector('header');
    if (!originalHero) {
      return;
    }

    originalHero.id = originalHero.id || 'module-title';
    originalHero.classList.add('clinton-title-reveal');

    const style = document.createElement('style');
    style.textContent = `
      .clinton-prologue {
        position: relative;
        min-height: calc(100svh - 3.4rem);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        padding: clamp(3.25rem, 6vw, 5.75rem) 1.5rem clamp(3rem, 6vw, 5.5rem);
        background:
          radial-gradient(circle at 50% 10%, rgba(251, 146, 60, 0.13), transparent 25rem),
          radial-gradient(circle at 18% 78%, rgba(34, 197, 94, 0.08), transparent 24rem),
          linear-gradient(180deg, #0b1222 0%, #0f172a 58%, #111827 100%);
        color: #f8fafc;
        isolation: isolate;
      }

      .clinton-prologue::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -2;
        background-image:
          linear-gradient(rgba(148, 163, 184, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(148, 163, 184, 0.03) 1px, transparent 1px);
        background-size: 72px 72px;
        mask-image: radial-gradient(circle at 50% 38%, black, transparent 76%);
      }

      .clinton-prologue::after {
        content: "";
        position: absolute;
        inset: auto 8% 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.32), transparent);
      }

      .clinton-prologue__inner {
        width: min(100%, 74rem);
        margin: 0 auto;
        text-align: center;
      }

      .clinton-prologue__subhead {
        max-width: 54rem;
        margin: 0 auto clamp(2rem, 4.8vw, 3.1rem);
        color: #dbeafe;
        font-size: clamp(1.08rem, 1.82vw, 1.42rem);
        line-height: 1.6;
        text-wrap: balance;
      }

      .clinton-prologue__stage {
        position: relative;
        max-width: min(88vw, 46rem);
        margin: 0 auto;
      }

      .clinton-prologue__stage::before {
        content: "";
        position: absolute;
        inset: -1.2rem;
        z-index: -1;
        border-radius: 1.45rem;
        background: radial-gradient(circle at 50% 0%, rgba(251, 146, 60, 0.16), transparent 64%);
        filter: blur(2px);
      }

      .clinton-prologue__video-shell {
        position: relative;
        padding: clamp(0.65rem, 1.8vw, 1rem);
        border: 1px solid rgba(226, 232, 240, 0.20);
        border-radius: 1.1rem;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.025)),
          rgba(15, 23, 42, 0.70);
        box-shadow:
          0 30px 90px rgba(2, 6, 23, 0.58),
          inset 0 1px 0 rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(14px);
      }

      .clinton-prologue__video-wrap {
        position: relative;
        overflow: hidden;
        border-radius: 0.72rem;
        background: #020617;
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
      }

      .clinton-prologue__video-wrap video {
        display: block;
        width: 100%;
        height: auto;
        aspect-ratio: 4 / 3;
        background: #020617;
      }

      .clinton-prologue__caption {
        margin: 0.95rem auto 0;
        max-width: 42rem;
        color: #94a3b8;
        font-size: 0.88rem;
        line-height: 1.55;
      }

      .clinton-prologue__cta {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        margin-top: clamp(1.65rem, 3.2vw, 2.25rem);
        color: #e2e8f0;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.76rem;
        letter-spacing: 0.15em;
        text-decoration: none;
        text-transform: uppercase;
      }

      .clinton-prologue__cta span {
        display: inline-grid;
        place-items: center;
        width: 2rem;
        height: 2rem;
        border: 1px solid rgba(226, 232, 240, 0.28);
        border-radius: 999px;
        color: #fb923c;
      }

      .clinton-title-reveal {
        min-height: 72vh !important;
        border-top: 1px solid rgba(148, 163, 184, 0.14);
      }

      .clinton-prologue__subhead,
      .clinton-prologue__stage,
      .clinton-prologue__cta {
        animation: clintonPrologueRise 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }

      .clinton-prologue__stage { animation-delay: 140ms; }
      .clinton-prologue__cta { animation-delay: 260ms; }

      @keyframes clintonPrologueRise {
        from { opacity: 0; transform: translateY(24px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @media (max-width: 760px) {
        .clinton-prologue {
          min-height: auto;
          padding-top: 3rem;
        }

        .clinton-title-reveal {
          min-height: 78vh !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .clinton-prologue__subhead,
        .clinton-prologue__stage,
        .clinton-prologue__cta {
          animation: none;
        }
      }
    `;
    document.head.appendChild(style);

    const prologue = document.createElement('section');
    prologue.className = 'clinton-prologue';
    prologue.setAttribute('data-clinton-prologue', '');
    prologue.setAttribute('aria-label', 'Clinton archival video prologue');
    prologue.innerHTML = `
      <div class="clinton-prologue__inner">
        <p class="clinton-prologue__subhead">
          At the end of the 1990s, American leaders believed digital technologies would expand exchange, spread democratic norms, and pull states toward convergence - faster than states could reassert sovereignty
        </p>

        <div class="clinton-prologue__stage">
          <figure class="clinton-prologue__video-shell">
            <div class="clinton-prologue__video-wrap">
              <video
                controls
                preload="metadata"
                playsinline
                width="480"
                height="360"
                aria-label="Archival video of President Clinton's remarks at the Paul H. Nitze School of Advanced International Studies, March 8, 2000."
              >
                <source src="../assets/course-media/module-01/clinton-sais-2000/clinton-sais-china-internet-2000.mp4" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <figcaption class="clinton-prologue__caption">
              President Bill Clinton delivers remarks on China, trade, and the internet at the Paul H. Nitze School of Advanced International Studies, March 8, 2000.
            </figcaption>
          </figure>
        </div>

        <a class="clinton-prologue__cta" href="#module-title">
          Enter Module 1
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    `;

    moduleRoot.insertBefore(prologue, originalHero);

    const cta = prologue.querySelector('.clinton-prologue__cta');
    cta.addEventListener('click', function (event) {
      event.preventDefault();
      originalHero.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}());
