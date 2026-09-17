import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      vueDevTools(),
      tailwindcss(),
      Icons({
        autoInstall: true,
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({ prefix: 'i' }),
        ],
        dts: 'src/types/auto-imports.d.ts',
        vueTemplate: true,
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['mdi', 'lucide'],
          }),
        ],
        dts: 'src/types/components.d.ts',
      }),
    ],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_PROXY_TARGET,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },

    build: {
      target: 'baseline-widely-available',
      sourcemap: false,
      chunkSizeWarningLimit: 1500,
    },
  }
})
