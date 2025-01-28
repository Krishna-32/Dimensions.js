import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import peerDependencies from './package.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: './src/index.js', // Entry point for the library
      name: 'dimension',
      formats: ['es', 'cjs'], // Generate ES and CommonJS formats
    },
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies), // Mark peer dependencies as external
        'react', // Explicitly mark react as external
        'react-dom' // Explicitly mark react-dom as external
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        preserveModules: true, // Maintain folder structure
        preserveModulesRoot: 'src', // Set src as the root directory for output
        entryFileNames: '[name].[format].js', // Add format to the file name
      },
    },
  },
})
