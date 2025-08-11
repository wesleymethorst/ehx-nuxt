<template>
  <div class="min-h-screen bg-[#0a1020] text-white flex items-center justify-center px-4">
    <div class="text-center">
      <Icon name="mdi:loading" class="animate-spin text-3xl inline-block mb-3" />
      <p>Bezig met inloggen…</p>
    </div>
  </div>
</template>

<script setup lang="ts">
onMounted(async () => {
  // Voor nu: 5 seconden laten zien zodat je het kunt bekijken
  await new Promise((r) => setTimeout(r, 5000))
  await navigateTo('/')
})
</script>


