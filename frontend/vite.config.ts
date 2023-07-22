import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    nodePolyfills({
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
        process: true,
      },
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
    react()
  ],
  server: {
    port: 3000
  },
  optimizeDeps: {
    disabled: false,
    include: [
      '@safe-global/protocol-kit',
      '@safe-global/api-kit',
      '@safe-global/safe-core-sdk-types',
      '@safe-global/onramp-kit'
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        // NodeGlobalsPolyfillPlugin({
        //   // buffer: false,
        //   // process: true
        // }),
        // NodeModulesPolyfillPlugin()
      ]
    }
  },
  define: {
    'process.env': {},
    global: {}
  },
  resolve: {
    alias: {
      // '@safe-global/onramp-kit': path.resolve(__dirname, '../../src')
    }
  }
})
