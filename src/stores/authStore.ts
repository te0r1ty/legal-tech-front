import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { getToken, logout } from '../auth/authService'

export const useAuthStore = defineStore('auth', () => {
  function checkAuth() {
    const token = getToken()
    if (!token) return false

    try {
      const decodedToken = jwtDecode(token) as { exp: number }
      const currentTime = Math.floor(Date.now() / 1000)

      if (decodedToken.exp < currentTime) {
        logout()
        return false
      }

      return true
    } catch (error) {
      logout()
      console.error('Error decoding token: ', error)
      return false
    }
  }

  return { checkAuth }
})
