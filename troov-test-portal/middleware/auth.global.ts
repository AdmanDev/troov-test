import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuthStore } from '~/stores/authStore'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  try {
    const publicPages = ['/auth']

    if (publicPages.includes(to.path) || authStore.isConnected) {
      return
    }

    await authStore.loginWithCookie()
  }
  catch {
    return navigateTo('/auth')
  }
})
