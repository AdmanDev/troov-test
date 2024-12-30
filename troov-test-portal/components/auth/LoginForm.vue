<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label
        for="email"
        class="form-label"
      >
        Adresse email
      </label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        class="form-control"
        required
      >
    </div>

    <div class="mb-3">
      <label
        for="psw"
        class="form-label"
      >
        Mot de passe
      </label>
      <input
        id="psw"
        v-model="form.psw"
        type="password"
        class="form-control"
        required
      >
    </div>

    <button
      class="btn btn-primary w-100 mt-4"
      type="submit"
      :disabled="isLoading"
    >
      <span
        v-if="isLoading"
        class="spinner-border spinner-border-sm me-2"
      />
      Se connecter
    </button>
  </form>
</template>

<script setup lang="ts">
import type { LoginRequestData } from '~/types/requests/LoginRequestData'

const authStore = useAuthStore()

const form = ref<LoginRequestData>({
  email: '',
  psw: '',
})

const isLoading = ref(false)

const handleSubmit = async () => {
  try {
    isLoading.value = true

    await authStore.login(form.value)

    navigateTo('/')
  }
  finally {
    isLoading.value = false
  }
}
</script>
