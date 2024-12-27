<template>
  <div class="card shadow-sm hover-shadow position-relative p-0">
    <div class="image-container">
      <img
        :src="item.imageUrl"
        class="card-img-top"
        :alt="item.name"
      >
    </div>
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start">
        <h5 class="card-title mb-1">
          {{ item.name }}
        </h5>
        <span
          class="badge"
          :class="{
            'bg-success': item.status === 'FOUND',
            'bg-danger': item.status === 'LOST',
          }"
        >
          {{ item.status === 'FOUND' ? 'Trouvé' : 'Perdu' }}
        </span>
      </div>
      <p class="text-muted small mb-2">
        <i class="bi bi-geo-alt me-1" />
        {{ item.location }}
      </p>
      <p class="text-muted small mb-2">
        <i class="bi bi-calendar me-1" />
        {{ formatedDate }}
      </p>
      <p class="card-text">
        {{ item.description }}
      </p>
    </div>

    <!-- Hover actions -->
    <div class="hover-actions">
      <button
        class="btn btn-sm btn-light"
        title="Modifier"
      >
        <i class="bi bi-pencil" />
      </button>
      <button
        class="btn btn-sm btn-light ms-2"
        title="Supprimer"
      >
        <i class="bi bi-trash" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LostItem } from '~/models/LostItem'

type Props = {
  item: LostItem
}

const { item } = defineProps<Props>()

const formatedDate = computed(() => {
  return new Date(item.date).toLocaleDateString()
})
</script>

<style scoped>
.image-container {
  height: 250px;
  overflow: hidden;
  position: relative;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hover-actions {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.25rem;
  border-radius: 0.375rem;
}

.card:hover .hover-actions {
  opacity: 1;
}

.card.flex-row {
  height: 200px;
}
</style>
