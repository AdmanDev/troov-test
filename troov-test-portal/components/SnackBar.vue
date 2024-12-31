<template>
  <div
    v-if="isVisible"
    class="position-fixed bottom-0 end-0 p-3 rounded shadow-lg"
    :class="[type?.value === 'error' ? 'bg-danger' : 'bg-success', 'text-white']"
  >
    <div class="flex items-center">
      <span>Le message : {{ message }}</span>
      <button
        class="ml-4"
        @click="close"
      >
        <span class="text-white">&times;</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  message: Ref<string>
  type?: Ref<'error' | 'success'>
  duration?: number
}

const props = defineProps<Props>()
console.log(props)
const isVisible = ref(true)

const close = () => {
  isVisible.value = false
}

onMounted(() => {
  if (props.duration) {
    setTimeout(close, props.duration)
  }
})
</script>
