<template>
  <ClientOnly>
    <Teleport to="body">
      <div
        class="modal fade show"
        tabindex="-1"
        style="display: block;"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <ModalHeader
              :title="title"
              @close="$emit('close')"
            />
            <div class="modal-body">
              <p>{{ message }}</p>
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
                class="btn btn-primary"
                @click="handleConfirm"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  message: string
}>()

const emit = defineEmits<{
  close: []
  confirm: []
}>()

const handleConfirm = () => {
  emit('confirm')
  emit('close')
}
</script>

<style scoped>
.modal {
    background-color: rgba(0, 0, 0, 0.5);
    display: flex !important;
    align-items: center;
    justify-content: center;
}
</style>
