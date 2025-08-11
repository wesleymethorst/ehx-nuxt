
const isVisible = ref(false)
const notificationMessage = ref('')
const notificationVariant = ref<'success'|'error'|'info'|'warning'>('success')
const notificationIcon = ref<string>('')
const defaultTimeoutByVariant: Record<'success'|'error'|'info'|'warning', number> = {
  success: 2500,
  info: 3000,
  warning: 4000,
  error: 4500,
}
let hideTimer: ReturnType<typeof setTimeout> | null = null

export function useNotification() {
  function showNotification(options: {
    message: string,
    variant?: 'success'|'error'|'info'|'warning',
    icon?: string,
    timeoutMs?: number
  }) {
    notificationMessage.value = options.message
    notificationVariant.value = options.variant ?? 'success'
    // Only set a custom icon if explicitly provided; otherwise let the component pick by variant
    notificationIcon.value = options.icon ?? ''
    isVisible.value = true

    if (hideTimer) clearTimeout(hideTimer)
    const fallbackTimeout = defaultTimeoutByVariant[notificationVariant.value]
    const duration = options.timeoutMs ?? fallbackTimeout
    hideTimer = setTimeout(() => {
      isVisible.value = false
    }, duration)
  }

  function hideNotification() {
    isVisible.value = false
    if (hideTimer) clearTimeout(hideTimer)
    hideTimer = null
  }

  return {
    // state
    isVisible,
    notificationMessage,
    notificationVariant,
    notificationIcon,
    // actions
    showNotification,
    hideNotification,
  }
}


