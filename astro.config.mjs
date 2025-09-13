import {defineConfig} from 'astro/config';

// https://astro.build/config
// https://docs.astro.build/en/reference/configuration-reference/#build-options
// https://docs.astro.build/en/guides/styling/#external-styles
// https://docs.astro.build/en/guides/client-side-scripts/#load-external-scripts
export default defineConfig({
  server: {
    port: 4321,
  },
  trailingSlash: 'never',
  outDir: './docs',
  compressHTML: false,
  build: {
    inlineStylesheets: `never`,
    format: 'file',
  },
  devToolbar: {
    enabled: false,
  },
});
