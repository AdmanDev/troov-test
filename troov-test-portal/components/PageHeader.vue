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
        <slot name="actions" />
      </div>
    </div>
  </nav>
</template>
