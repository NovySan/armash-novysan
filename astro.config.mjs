import { defineConfig } from 'astro/config';

// Configured for deployment at https://armash.novysan.com
// If you want to use the default GitHub Pages URL instead (e.g., during testing
// before DNS is set up), change to:
//   site: 'https://YOUR-GITHUB-USERNAME.github.io',
//   base: '/REPO-NAME',
// ...and remove the public/CNAME file.

export default defineConfig({
  site: 'https://armash.novysan.com',
  // base: '/',  // explicit '/' for clarity at apex/subdomain
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
