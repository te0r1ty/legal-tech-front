import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@/auth/authGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
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
      beforeEnter: authGuard,
    },
    {
      path: '/cookies',
      name: 'Политика обработки персональных данных',
      component: () => import('@/pages/CookiesPage.vue'),
    },
    {
      path: '/login',
      name: 'Вход',
      component: () => import('@/pages/LoginPage.vue'),
    },
  ],
})

export default router
