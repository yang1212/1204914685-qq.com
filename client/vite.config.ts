import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "api": path.resolve(__dirname, "src/api"),
      "component": path.resolve(__dirname, "src/views/component"),
      "common": path.resolve(__dirname, "src/common")
    }
  },
  server: {
    port: 3002,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3030',
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp('^/api'), '')
      }
    }
  },
  build:{
    assetsDir: 'static/img/',
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
