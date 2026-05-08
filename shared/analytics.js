(function () {
  const config = window.GeoAIAnalyticsConfig || {};
  const token = config.cloudflareToken;

  if (!token || token === 'PASTE_CLOUDFLARE_WEB_ANALYTICS_TOKEN_HERE') {
    return;
  }

  if (document.querySelector('script[data-cf-beacon]')) {
    return;
  }

  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.setAttribute('data-cf-beacon', JSON.stringify({ token }));
  document.head.appendChild(script);
})();
