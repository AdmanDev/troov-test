<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container">
      <NuxtLink
        class="navbar-brand d-flex align-items-center"
        to="/"
      >
        <i class="bi bi-box me-2 text-primary" />
        <span class="fw-bold">Troov</span>
      </NuxtLink>

      <div class="d-flex align-items-center">
        <button
          v-if="authStore.isConnected"
          title="Se déconnecter"
          class="btn btn-outline-secondary"
          @click="handleLogout"
        >
          <i class="bi bi-box-arrow-right" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const handleLogout = async () => {
  await authStore.logout()
  navigateTo('/auth')
}
</script>
