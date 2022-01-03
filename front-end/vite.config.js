import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        }
      ]
    }),
  ],
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}/`,
    }
  },
  optimizeDeps: {
    include: [
      'element-plus/lib/locale',
      'element-plus/es/directives',
      'element-plus/lib/locale/lang/en',
      'date-fns/locale/en-US',
    ]
  },
  build: {
    sourcemap: false,
  }
})
