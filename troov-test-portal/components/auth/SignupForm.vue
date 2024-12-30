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

    <div class="mb-3">
      <label
        for="pswConfirm"
        class="form-label"
      >
        Confirmez le mot de passe
      </label>
      <input
        id="pswConfirm"
        v-model="form.pswConfirm"
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
      Créer un compte
    </button>
  </form>
</template>

<script setup lang="ts">
import type { UserRegisterationRequestData } from '~/types/requests/UserRegisterationRequestData'

const snackbar = useSnackbar()
const authStore = useAuthStore()

const emit = defineEmits<{
  showLoginForm: []
}>()

const form = ref<UserRegisterationRequestData>({
  email: '',
  psw: '',
  pswConfirm: '',
})

const isLoading = ref(false)

const handleSubmit = async () => {
  try {
    isLoading.value = true

    await authStore.signup(form.value)

    snackbar.add({
      type: 'success',
      text: 'Votre compte a bien été créé !',
    })

    emit('showLoginForm')
  }
  finally {
    isLoading.value = false
  }
}
</script>
