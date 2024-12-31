<template>
  <div class="mb-3">
    <label class="form-label">Séléctionner une image</label>
    <div class="row g-3">
      <div
        v-for="image in images"
        :key="image"
        class="col-6 col-md-4"
      >
        <div
          class="image-option"
          :class="{ selected: modelValue === image }"
          @click="$emit('update:modelValue', image)"
        >
          <img
            :src="image"
            class="img-fluid rounded fixed-size"
            :alt="image"
          >
          <div class="selected-overlay">
            <i class="bi bi-check-circle-fill" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [string]
}>()

const images = [
  'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
  'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=500',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500',
]
</script>

<style scoped>
.image-option {
    position: relative;
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 0.5rem;
    transition: all 0.2s ease-in-out;
}

.image-option:hover {
    transform: translateY(-2px);
}

.image-option.selected {
    border-color: var(--bs-primary);
}

.selected-overlay {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    color: var(--bs-primary);
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
}

.selected.image-option .selected-overlay {
    opacity: 1;
}

.fixed-size {
    width: 100%;
    height: 200px;
    object-fit: cover;
}
</style>
