import type { Admin, AdminLogin } from '@/types/admin/admin'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<Admin | null>(null)
  const isAuth = computed(() => !!user.value)

  function logOut() {
    user.value = null
  }

  function logIn(args: AdminLogin) {
    console.log(args)
  }

  return { user, isAuth, logIn, logOut }
})
