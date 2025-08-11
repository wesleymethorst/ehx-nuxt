<template>
  <Transition name="notification">
    <div 
      v-if="show" 
      class="fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-3 z-50 border border-gray-700 bg-[#0a1020] border-l-4"
      :class="variantBorderClass"
    >
      <!-- Support both Iconify name and CSS class icons -->
      <Icon v-if="isIconify" :name="effectiveIcon" class="text-xl" :class="variantIconClass" />
      <i v-else-if="effectiveIcon" :class="[effectiveIcon, 'text-lg', variantIconClass]"></i>
      <span class="font-medium text-white">{{ message }}</span>
    </div>
  </Transition>
 </template>

<script setup lang="ts">
const props = defineProps({
  show: { type: Boolean, default: false },
  message: { type: String, required: true },
  // New: variant styling; defaults to success
  variant: { type: String as () => 'success' | 'error' | 'info' | 'warning', default: 'success' },
  // Back-compat optional overrides
  bgColor: { type: String, default: '' },
  textColor: { type: String, default: '' },
  icon: { type: String, default: '' }
})

const defaultIcons: Record<'success'|'error'|'info'|'warning', string> = {
  success: 'material-symbols:check-circle-rounded',
  error: 'material-symbols:error-outline',
  info: 'material-symbols:info-outline',
  warning: 'material-symbols:warning-amber-rounded'
}

const isIconify = computed(() => effectiveIcon.value?.includes(':'))

const effectiveIcon = computed(() => props.icon || defaultIcons[props.variant as 'success'|'error'|'info'|'warning'])

const variantBorderClass = computed(() => {
  switch (props.variant) {
    case 'success': return 'border-l-green-500'
    case 'error': return 'border-l-red-500'
    case 'info': return 'border-l-sky-500'
    case 'warning': return 'border-l-yellow-500'
    default: return 'border-l-sky-500'
  }
})

const variantIconClass = computed(() => {
  switch (props.variant) {
    case 'success': return 'text-green-400'
    case 'error': return 'text-red-400'
    case 'info': return 'text-sky-400'
    case 'warning': return 'text-yellow-400'
    default: return 'text-sky-400'
  }
})
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>


