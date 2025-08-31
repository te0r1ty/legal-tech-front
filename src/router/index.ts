import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@/auth/authGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/desktop/HomePage.vue'),
    },
    {
      path: '/methods',
      name: 'Методология',
      component: () => import('@/pages/desktop/MethodsPage.vue'),
    },
    {
      path: '/projects',
      name: 'Проекты',
      component: () => import('@/pages/desktop/ProjectsPage.vue'),
    },
    {
      path: '/offer',
      name: 'Добавить проект',
      component: () => import('@/pages/desktop/project-offer/ProjectOfferPage.vue'),
    },
    {
      path: '/offer/success',
      name: 'Заявка отправлена',
      component: () => import('@/pages/desktop/project-offer/ProjectOfferSuccessPage.vue'),
    },
    {
      path: '/admin',
      name: 'Личный кабинет',
      component: () => import('@/pages/desktop/AdminPage.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/cookies',
      name: 'Политика обработки персональных данных',
      component: () => import('@/pages/desktop/CookiesPage.vue'),
    },
    {
      path: '/login',
      name: 'Вход',
      component: () => import('@/pages/desktop/LoginPage.vue'),
    },
  ],
})

export default router
