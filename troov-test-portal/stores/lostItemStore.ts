import { defineStore } from 'pinia'
import type { LostItem } from '~/models/LostItem'
import type { LostItemRequestData } from '~/types/requests/LostItemRequestData'

export const useLostItemStore = defineStore('lostItem', () => {
  const { $apiFetch } = useNuxtApp()

  const endpoint = '/lost-item'

  const { data: lostItemList, error: lostItemsFetchError } = useApiFetch<LostItem[]>(endpoint)

  const addLostItem = async (itemRequestData: LostItemRequestData) => {
    const newItem = await $apiFetch<LostItem>(endpoint, {
      method: 'POST',
      body: itemRequestData,
    })

    lostItemList.value = [newItem, ...lostItemList.value || []]
  }

  const updateLostItem = async (itemRequestData: LostItemRequestData, itemId: string) => {
    const updatedItem = await $apiFetch<LostItem>(`${endpoint}/${itemId}`, {
      method: 'PUT',
      body: itemRequestData,
    })

    lostItemList.value = lostItemList.value?.map(item => item._id === updatedItem._id ? updatedItem : item) || []
  }

  const deleteLostItem = async (itemToDelete: LostItem) => {
    await $apiFetch(`${endpoint}/${itemToDelete._id}`, {
      method: 'DELETE',
    })

    lostItemList.value = lostItemList.value?.filter(item => item._id !== itemToDelete._id) || []
  }

  return {
    lostItemList,
    lostItemsFetchError,
    addLostItem,
    updateLostItem,
    deleteLostItem,
  }
})
