import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.threadscoaching.co.uk',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'never',
  },
  compressHTML: true,
});
