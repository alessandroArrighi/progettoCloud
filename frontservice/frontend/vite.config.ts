import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  assetsInclude: "**/*.Vue",
  server: {
    proxy: {                            //questa è l'impostazione che completa la comunicazione fra front and back
      "/api": "http://localhost:3000",
      "/img": "http://localhost:3000"
    }
  }
})
