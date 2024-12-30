<template>
  <ClientOnly v-if="isVisible">
    <Teleport to="body">
      <div
        class="modal fade show"
        tabindex="-1"
        style="display: block;"
      >
        <form
          class="needs-validation"
          @submit.prevent="handleSubmit"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <ModalHeader
                :title="isEditing ? `Modifier l'objet` : 'Signaler un objet perdu'"
                @close="$emit('close')"
              />
              <div class="modal-body">
                <div class="mb-3">
                  <label
                    for="name"
                    class="form-label"
                  >
                    Nom de l'objet
                  </label>
                  <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    class="form-control"
                    required
                  >
                </div>

                <div class="mb-3">
                  <label
                    for="description"
                    class="form-label"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    v-model="formData.description"
                    class="form-control"
                    rows="3"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label
                    for="location"
                    class="form-label"
                  >
                    Lieu
                  </label>
                  <input
                    id="location"
                    v-model="formData.location"
                    type="text"
                    class="form-control"
                    required
                  >
                </div>

                <div class="mb-3">
                  <label
                    for="date"
                    class="form-label"
                  >
                    Date
                  </label>
                  <input
                    id="date"
                    v-model="formData.date"
                    type="date"
                    class="form-control"
                    :max="today"
                    required
                  >
                </div>

                <div class="mb-3">
                  <label
                    for="status"
                    class="form-label"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    v-model="formData.status"
                    class="form-select"
                    required
                  >
                    <option value="LOST">
                      Perdu
                    </option>
                    <option value="FOUND">
                      Trouvé
                    </option>
                  </select>
                </div>

                <ImageSelector
                  v-model="formData.imageUrl"
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="$emit('close')"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                >
                  {{ isEditing ? 'Modifier' : 'Signaler' }}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-backdrop fade show" />
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { LostItem } from '~/models/LostItem'
import type { LostItemRequestData } from '~/types/requests/LostItemRequestData'

const props = defineProps<{
  isVisible: boolean
  itemToEdit: LostItem | null
}>()

const emit = defineEmits<{
  submit: [LostItemRequestData]
  close: []
}>()

const isEditing = computed(() => !!props.itemToEdit)

const today = computed(() => new Date().toISOString().split('T')[0])

const getInitialFormValue = (initialValue?: LostItem | null) => {
  const value: LostItemRequestData = {
    name: initialValue?.name || '',
    description: initialValue?.description || '',
    location: initialValue?.location || '',
    date: initialValue?.date ? new Date(initialValue.date).toISOString().split('T')[0] : '',
    status: initialValue?.status || 'LOST',
    imageUrl: initialValue?.imageUrl || '',
  }

  return value
}

const formData = ref<LostItemRequestData>(getInitialFormValue())

watch(() => props.itemToEdit, (item) => {
  formData.value = getInitialFormValue(item)
})

const handleSubmit = () => {
  if (formData.value) {
    emit('submit', formData.value)
    emit('close')
  }
}
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  max-height: 100vh;
  display: flex;
  align-items: center;
}

.modal-content {
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}

.modal-body {
  overflow-y: auto;
  flex: 1;
}

.modal-footer,
.modal-header {
  flex-shrink: 0;
}
</style>
