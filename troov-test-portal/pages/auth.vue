<template>
  <div class="vh-100 d-flex flex-column">
    <PageHeader />
    <div class="d-flex justify-content-center align-items-center flex-grow-1">
      <div class="auth-card">
        <div class="bg-primary text-white p-3 rounded-top d-flex align-items-center justify-content-between">
          <h5 class="fw-bold">
            {{ signupMode ? 'Créez votre compte' : 'Connexion' }}
          </h5>
          <img
            src="~/assets/images/Live-collaboration-pana.svg"
            alt="Live collaboration"
            class="header-image"
          >
        </div>
        <div class="p-3">
          <AuthSignupForm
            v-if="signupMode"
            @show-login-form="signupMode = false"
          />

          <AuthLoginForm v-else />

          <div class="mt-3">
            <span class="me-2">
              {{ signupMode ? 'Vous avez deja un compte ?' : 'Vous n\'avez pas de compte ?' }}
            </span>
            <span
              class="text-primary cursor-pointer"
              @click="signupMode = !signupMode"
            >
              {{ signupMode ? 'Connectez-vous' : "S'inscrire" }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const signupMode = ref(false)
</script>

<style>
.auth-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  width: 100%;
  max-width: 400px;
}

.header-image {
  height: 100px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
