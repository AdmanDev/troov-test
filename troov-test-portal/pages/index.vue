<template>
  <div>
    <PageHeader />

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
            @edit="openEditForm"
            @delete="deleteLostItem"
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

    <button
      class="add-btn btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow"
      @click="openAddForm"
    >
      +
    </button>

    <ModalItemForm
      :is-visible="isItemFormVisible"
      :item-to-edit="itemBeingEdited"
      @submit="itemBeingEdited ? updateLostItem($event) : addLostItem($event)"
      @close="isItemFormVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import type { LostItem } from '~/models/LostItem'
import type { LostItemRequestData } from '~/types/requests/LostItemRequestData'

const { $apiFetch } = useNuxtApp()

const isItemFormVisible = ref(false)
const itemBeingEdited = ref<LostItem | null>(null)

const { data: lostItemList, error } = await useApiFetch<LostItem[]>('/lost-item')

const openAddForm = () => {
  itemBeingEdited.value = null
  isItemFormVisible.value = true
}

const openEditForm = (item: LostItem) => {
  itemBeingEdited.value = item
  isItemFormVisible.value = true
}

const addLostItem = async (itemRequestData: LostItemRequestData) => {
  const newItem = await $apiFetch<LostItem>('/lost-item', {
    method: 'POST',
    body: itemRequestData,
  })

  lostItemList.value = [newItem, ...lostItemList.value || []]
}

const updateLostItem = async (itemRequestData: LostItemRequestData) => {
  if (itemBeingEdited.value) {
    const updatedItem = await $apiFetch<LostItem>(`/lost-item/${itemBeingEdited.value._id}`, {
      method: 'PUT',
      body: itemRequestData,
    })

    lostItemList.value = lostItemList.value?.map(item => item._id === updatedItem._id ? updatedItem : item) || []
  }
}

const deleteLostItem = async (itemToDelete: LostItem) => {
  await $apiFetch(`/lost-item/${itemToDelete._id}`, {
    method: 'DELETE',
  })

  lostItemList.value = lostItemList.value?.filter(item => item._id !== itemToDelete._id) || []
}
</script>

<style scoped>
.add-btn {
  width: 56px;
  height: 56px;
  font-size: 25px;
}
</style>
