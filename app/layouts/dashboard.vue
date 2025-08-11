<template>
  <div class="min-h-screen bg-[#0a1020] text-white flex">
    <DashboardSidebar />
    <div class="flex-1 min-w-0 flex flex-col">
      <!-- Topbar with sidebar toggle -->
      <div class="h-16 border-b border-white/10 flex items-center px-4 gap-3 sticky top-0 z-40 bg-[#0a1020]">
        <button @click="toggleSidebar" class="p-2 rounded hover:bg-white/5">
          <Icon :name="isExpanded ? 'mdi:backburger' : 'mdi:menu'" />
        </button>
      </div>
      <div class="flex-1">
        <slot />
      </div>
    </div>
    <Notification
      :show="isVisible"
      :message="notificationMessage"
      :variant="notificationVariant"
      :icon="notificationIcon"
    />
  </div>
</template>

<script setup lang="ts">

const {
  isVisible,
  notificationMessage,
  notificationVariant,
  notificationIcon
} = useNotification()

const { isExpanded, toggle: toggleSidebar } = useDashboardSidebar()
</script>