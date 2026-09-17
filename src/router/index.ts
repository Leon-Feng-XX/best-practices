import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: '首页' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: { title: '关于' },
    },
    {
      path: '/data-fetching',
      name: 'data-fetching',
      component: () => import('@/views/DataFetchingView.vue'),
      meta: { title: 'Data Fetching' },
    },
    {
      path: '/form-demo',
      name: 'form-demo',
      component: () => import('@/views/FormDemoView.vue'),
      meta: { title: 'Form Validation' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: '404' },
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

router.afterEach((to) => {
  const base = import.meta.env.VITE_APP_TITLE ?? 'App'
  document.title = to.meta.title ? `${to.meta.title} - ${base}` : base
})

export default router
