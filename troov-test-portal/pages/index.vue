<template>
  <div>
    <PageHeader />

    <div class="container my-4">
      <div
        v-if="itemStore.lostItemList"
        class="row g-4"
      >
        <div
          v-if="itemStore.lostItemList.length === 0"
          class="text-center"
        >
          <div class="alert alert-info fs-5">
            Il n'y a aucun objet perdu. Nous vivons dans le meilleur des mondes.
          </div>
        </div>

        <div
          v-for="item in itemStore.lostItemList"
          :key="item._id"
          class="col-md-5 col-lg-4"
        >
          <ItemCard
            :item="item"
            @edit="openEditForm"
            @delete="itemStore.deleteLostItem"
          />
        </div>
      </div>

      <div
        v-else
        class="text-center"
      >
        <div
          v-if="itemStore.lostItemsFetchError"
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
      @submit="itemBeingEdited ? handleUpdateLostItem($event) : itemStore.addLostItem($event)"
      @close="isItemFormVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import type { LostItem } from '~/models/LostItem'
import type { LostItemRequestData } from '~/types/requests/LostItemRequestData'

const itemStore = useLostItemStore()

const isItemFormVisible = ref(false)
const itemBeingEdited = ref<LostItem | null>(null)

const openAddForm = () => {
  itemBeingEdited.value = null
  isItemFormVisible.value = true
}

const openEditForm = (item: LostItem) => {
  itemBeingEdited.value = item
  isItemFormVisible.value = true
}

const handleUpdateLostItem = (item: LostItemRequestData) => {
  if (itemBeingEdited.value) {
    itemStore.updateLostItem(item, itemBeingEdited.value._id)
  }
}
</script>

<style scoped>
.add-btn {
  width: 56px;
  height: 56px;
  font-size: 25px;
}
</style>
