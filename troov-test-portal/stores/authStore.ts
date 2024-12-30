import { defineStore } from 'pinia'
import type { LoginRequestData } from '~/types/requests/LoginRequestData'
import type { UserRegisterationRequestData } from '~/types/requests/UserRegisterationRequestData'

export const useAuthStore = defineStore('auth', () => {
  const { $apiFetch } = useNuxtApp()
  const isConnected = ref(false)

  const signup = async (data: UserRegisterationRequestData) => {
    await $apiFetch('/auth/register', {
      method: 'POST',
      body: data,
    })
  }

  const login = async (data: LoginRequestData) => {
    await $apiFetch('/auth/login', {
      method: 'POST',
      body: data,
    })

    isConnected.value = true
  }

  const loginWithCookie = async () => {
    await $apiFetch('/auth/loginwithcookie', {
      method: 'POST',
    })

    isConnected.value = true
  }

  const logout = async () => {
    await $apiFetch('/auth/logout', {
      method: 'POST',
    })

    isConnected.value = false
  }

  return {
    isConnected,
    signup,
    login,
    loginWithCookie,
    logout,
  }
})
