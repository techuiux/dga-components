import { defineConfig } from 'tsup';

// JS + type declarations. Dependencies and peers (react, @dev-dga/react) stay external.
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'es2022',
  // Hooks and context: mark as client components for React Server Components (Next.js app router).
  banner: { js: "'use client';" },
});
