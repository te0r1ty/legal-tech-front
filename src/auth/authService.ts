import { authEndPoint } from '@/constants/api-links'

export const login = async (login: string, password: string) => {
  let token = ''

  const response = await fetch(authEndPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: login,
      password: password,
    }),
  })

  if (!response.ok) throw new Error('Failed to login')

  const data = await response.json()
  token = data.token

  localStorage.setItem('token', token)
  return token
}

export const logout = () => {
  localStorage.removeItem('token')
}

export const getToken = () => {
  return localStorage.getItem('token')
}
