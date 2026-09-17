import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { logger } from '@/utils/logger'
import App from './App.vue'
import { i18n } from './locales'
import router from './router'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/main.css'

logger.info(`Running in ${import.meta.env.MODE} mode`)

const queryOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  },
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(VueQueryPlugin, queryOptions)

app.mount('#app')
