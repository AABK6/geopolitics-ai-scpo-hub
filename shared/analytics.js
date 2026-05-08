(function () {
  const MAX_WAIT_MS = 3000;
  const POLL_MS = 50;
  const TOKEN_PLACEHOLDER = 'PASTE_CLOUDFLARE_WEB_ANALYTICS_TOKEN_HERE';

  function getToken() {
    const config = window.GeoAIAnalyticsConfig || {};
    return config.cloudflareToken;
  }

  function loadBeacon(token) {
    if (!token || token === TOKEN_PLACEHOLDER || document.querySelector('script[data-cf-beacon]')) {
      return;
    }

    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.setAttribute('data-cf-beacon', JSON.stringify({ token }));
    document.head.appendChild(script);
  }

  const immediateToken = getToken();
  if (immediateToken) {
    loadBeacon(immediateToken);
    return;
  }

  const startedAt = Date.now();
  const timer = window.setInterval(function () {
    const token = getToken();
    if (token || Date.now() - startedAt > MAX_WAIT_MS) {
      window.clearInterval(timer);
      loadBeacon(token);
    }
  }, POLL_MS);
})();
