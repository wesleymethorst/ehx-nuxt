export function useDashboardSidebar() {
  const isExpanded = useState<boolean>('dashboard-sidebar-expanded', () => true)
  const isMobileOpen = useState<boolean>('dashboard-sidebar-mobile-open', () => false)

  function toggle() {
    isExpanded.value = !isExpanded.value
  }

  function openMobile() {
    isMobileOpen.value = true
  }

  function closeMobile() {
    isMobileOpen.value = false
  }

  return { isExpanded, isMobileOpen, toggle, openMobile, closeMobile }
}


