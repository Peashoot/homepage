import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(),
  legacy({
    targets: ['ie>=11'], // 支持旧版浏览器
    additionalLegacyPolyfills: ['regenerator-runtime/runtime']
  })],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
})
