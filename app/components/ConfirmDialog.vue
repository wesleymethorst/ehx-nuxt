<script setup lang="ts">
const props = defineProps({
  isOpen: { type: Boolean, default: false },
  title: { type: String, default: 'Bevestiging' },
  message: { type: String, required: true },
  confirmText: { type: String, default: 'Bevestigen' },
  cancelText: { type: String, default: 'Annuleren' },
  confirmButtonClass: { type: String, default: 'bg-red-600 hover:bg-red-700 text-white' }
})

const emit = defineEmits(['confirm', 'cancel', 'close'])

function handleConfirm() {
  emit('confirm')
  emit('close')
}

function handleCancel() {
  emit('cancel')
  emit('close')
}

function handleBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    handleCancel()
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.isOpen) {
    handleCancel()
  }
}

onMounted(() => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="backdrop">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-[#0a1020]/95 z-[100] flex items-center justify-center p-4"
        @click="handleBackdropClick"
      >
        <Transition name="dialog">
          <div v-if="isOpen" class="bg-[#0a1020] border border-white/20 rounded-lg shadow-2xl max-w-sm w-full mx-4 overflow-hidden">
            <div class="px-5 py-4">
              <h3 class="text-base font-semibold text-white mb-2">{{ title }}</h3>
              <p class="text-gray-300 text-sm mb-4">{{ message }}</p>
              <div class="flex justify-end gap-2">
                <button @click="handleCancel" class="px-3 py-1.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors">
                  {{ cancelText }}
                </button>
                <button @click="handleConfirm" class="px-3 py-1.5 text-sm font-medium rounded transition-colors" :class="confirmButtonClass">
                  {{ confirmText }}
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
  
</template>

<style scoped>
.backdrop-enter-active, .backdrop-leave-active { transition: opacity 0.2s ease }
.backdrop-enter-from, .backdrop-leave-to { opacity: 0 }
.dialog-enter-active, .dialog-leave-active { transition: all 0.2s ease }
.dialog-enter-from, .dialog-leave-to { opacity: 0; transform: scale(0.95) translateY(-10px) }
</style>


