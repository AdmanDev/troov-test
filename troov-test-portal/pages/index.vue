<template>
  <div>
    <PageHeader />
    <h1>Home</h1>
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup lang="ts">
const { data } = await useApi('/test')
</script>
