import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'vitrine',
      component: () => import('../views/VitrineView.vue'),
    },
  ],
})

export default router
