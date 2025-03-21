import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '@/pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage,
    },
    {
      path: '/methods',
      name: 'Методология',
      component: () => import('@/pages/MethodsPage.vue'),
    },
    {
      path: '/projects',
      name: 'Проекты',
      component: () => import('@/pages/ProjectsPage.vue'),
    },
    {
      path: '/offer',
      name: 'Добавить проект',
      component: () => import('@/pages/project-offer/ProjectOfferPage.vue'),
    },
    {
      path: '/offer/success',
      name: 'Заявка отправлена',
      component: () => import('@/pages/project-offer/ProjectOfferSuccessPage.vue'),
    },
    {
      path: '/admin',
      name: 'Личный кабинет',
      component: () => import('@/pages/AdminPage.vue'),
    },
    {
      path: '/cookies',
      name: 'Политика обработки персональных данных',
      component: () => import('@/pages/CookiesPage.vue'),
    },
  ],
})

export default router
