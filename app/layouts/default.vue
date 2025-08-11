<template>
  <div class="min-h-screen flex flex-col bg-[#0a1020]">
    <Header />
        <main class="flex-1">
        <slot />
        </main>
    <Footer />
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
</script>

