<template>
  <div class="text-center mb-12">
    <h1 class="text-5xl font-bold mb-4">
      {{ title }} <span class="text-[#bc13fe]">{{ highlight }}</span>
    </h1>
    <div v-if="$slots.default" class="bg-[#0a1020] rounded-lg p-8 border border-gray-700 max-w-7xl mx-auto mt-8">
      <div class="text-xl text-gray-300 space-y-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; highlight: string }>()
</script>


