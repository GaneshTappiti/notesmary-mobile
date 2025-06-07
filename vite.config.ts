
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    sourcemap: mode === 'development',
    minify: 'terser',
    target: 'es2020',
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create separate vendor chunks for better caching
          if (id.includes('node_modules')) {
            // Core React bundle
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            
            // Router bundle
            if (id.includes('react-router-dom')) {
              return 'router';
            }
            
            // UI library bundle
            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'ui-vendor';
            }
            
            // Animation libraries
            if (id.includes('framer-motion')) {
              return 'animation';
            }
            
            // Chart libraries
            if (id.includes('recharts') || id.includes('@nivo')) {
              return 'charts';
            }
            
            // Authentication and data
            if (id.includes('@supabase') || id.includes('@tanstack')) {
              return 'data-vendor';
            }
            
            return 'vendor'; // Other dependencies
          }
          
          // Admin pages bundle
          if (id.includes('/src/pages/Admin') || id.includes('/src/components/admin/')) {
            return 'admin';
          }
          
          // College admin bundle
          if (id.includes('/src/pages/college-admin/') || id.includes('/src/components/college-admin/')) {
            return 'college-admin';
          }
          
          // Answer generator bundle
          if (id.includes('/src/components/answer-generator/')) {
            return 'answer-generator';
          }
          
          // Dashboard and core pages
          if (id.includes('/src/pages/Dashboard') || id.includes('/src/components/dashboard/')) {
            return 'dashboard';
          }
          
          // Mobile components
          if (id.includes('/src/components/mobile/')) {
            return 'mobile';
          }
        },
        chunkFileNames: (chunkInfo) => {
          return `assets/js/[name]-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (assetInfo.name?.endsWith('.woff2') || assetInfo.name?.endsWith('.woff')) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      '@radix-ui/react-slot',
      'lucide-react',
      'clsx',
      'tailwind-merge'
    ],
    exclude: ['@supabase/supabase-js'],
    force: true,
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    target: 'es2020',
    legalComments: 'none',
    treeShaking: true,
  },
}));
