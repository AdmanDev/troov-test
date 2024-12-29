<template>
  <div class="modal-header bg-primary text-white">
    <h5 class="modal-title">
      {{ title }}
    </h5>
    <button
      type="button"
      class="btn-close btn-close-white"
      aria-label="Close"
      @click="$emit('close')"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()

defineEmits<{
  close: []
}>()
</script>
