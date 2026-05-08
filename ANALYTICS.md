# Analytics setup

This repository is prepared for a free analytics setup using Cloudflare Web Analytics plus Google Search Console.

## 1. Cloudflare Web Analytics

Cloudflare Web Analytics is the recommended visit counter for this site because it is free, lightweight, and privacy-preserving.

### Setup

1. Create or open a Cloudflare account.
2. Go to **Analytics & Logs** -> **Web Analytics**.
3. Add the site domain: `geopoliticsofai.org`.
4. Copy the Web Analytics token from Cloudflare's embed snippet.
5. Open `shared/analytics-config.js` and paste the token:

```js
window.GeoAIAnalyticsConfig = {
  cloudflareToken: 'PASTE_THE_CLOUDFLARE_TOKEN_HERE'
};
```

6. Commit, merge, and deploy.

The token is public in Cloudflare's own script snippet. It is not a secret.

### What the repository already includes

- `shared/analytics-config.js` holds the token configuration.
- `shared/analytics.js` loads the Cloudflare beacon only when a real token is present.
- The homepage loader and module shared loader are wired to load the analytics scripts.

Until the token is filled in, the analytics loader exits silently and does not call Cloudflare.

### What Cloudflare will show

- Visits and page views
- Top pages
- Referrers
- Countries
- Devices and browsers
- Basic performance metrics

## 2. Google Search Console

Google Search Console is recommended for search visibility rather than on-site behavior.

### Setup

1. Open Google Search Console.
2. Add a **Domain property** for `geopoliticsofai.org`.
3. Verify ownership using the DNS TXT record Google provides.
4. Submit the sitemap:

```text
https://geopoliticsofai.org/sitemap.xml
```

### What Search Console will show

- Google search impressions
- Clicks from Google Search
- Search queries
- Average ranking position
- Indexed pages
- Sitemap indexing status

## Notes

Cloudflare Web Analytics and Google Search Console answer different questions:

- Cloudflare: what visitors do once they reach the site.
- Search Console: how visitors find the site through Google Search.

For full-path coverage across every standalone student project, the most reliable option is Cloudflare's site-level setup for the domain. The repo-level loader covers pages that use the shared site scripts; standalone project builds can also receive the same two analytics scripts if project-level tracking is needed later.
