<template>
  <div class="container my-4">
    <div
      v-if="lostItemList"
      class="row g-4"
    >
      <div
        v-for="item in lostItemList"
        :key="item._id"
        class="col-md-5 col-lg-4"
      >
        <ItemCard
          :item="item"
        />
      </div>
    </div>

    <div
      v-else
      class="text-center"
    >
      <div
        v-if="error"
        class="alert alert-danger fs-5"
      >
        Une erreur est survenue lors du chargement des objets.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LostItem } from '~/models/LostItem'

const { data: lostItemList, error } = await useApiFetch<LostItem[]>('/lost-item')
</script>
