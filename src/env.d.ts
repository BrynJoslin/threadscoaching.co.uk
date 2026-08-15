/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_ENV?: 'preview' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
