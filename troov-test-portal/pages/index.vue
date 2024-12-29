<template>
  <div>
    <PageHeader>
      <template #actions>
        <button
          class="btn btn-primary"
          @click="isItemFormVisible = true"
        >
          <i class="bi bi-plus" />
          Signaler un objet
        </button>
      </template>
    </PageHeader>

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

    <ModalItemForm
      v-if="isItemFormVisible"
      @submit="addLostItem"
      @close="isItemFormVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import type { LostItem } from '~/models/LostItem'
import type { LostItemRequestData } from '~/types/requests/LostItemRequestData'

const { $apiFetch } = useNuxtApp()

const isItemFormVisible = ref(false)
const { data: lostItemList, error } = await useApiFetch<LostItem[]>('/lost-item')

const addLostItem = async (itemRequestData: LostItemRequestData) => {
  isItemFormVisible.value = false
  const newItem = await $apiFetch<LostItem>('/lost-item', {
    method: 'POST',
    body: itemRequestData,
  })

  lostItemList.value = [newItem, ...lostItemList.value || []]
}
</script>
