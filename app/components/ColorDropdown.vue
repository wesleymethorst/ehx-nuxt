<template>
  <div ref="rootEl" class="relative inline-block text-left">
    <button 
      @click="toggleDropdown"
      type="button"
      class="px-2 h-[52px] bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#bc13fe] transition-colors flex items-center gap-2 min-w-[120px] text-sm"
      aria-haspopup="listbox"
      :aria-expanded="showDropdown ? 'true' : 'false'"
    >
      <span class="w-3.5 h-3.5 rounded-full" :class="getDotBgClass(modelValue)"></span>
      <span class="capitalize text-sm">{{ modelValue }}</span>
      <Icon name="mdi:chevron-down" class="text-xs opacity-80" />
    </button>

    <div
      v-if="showDropdown"
      class="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 w-full overflow-hidden"
      role="listbox"
    >
      <div 
        v-for="(kleur, index) in kleuren" 
        :key="kleur.value"
        @click="selectKleur(kleur.value)"
        :class="[
          'px-2 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2',
          index === 0 ? 'rounded-t-lg' : '',
          index === kleuren.length - 1 ? 'rounded-b-lg' : ''
        ]"
        role="option"
        :aria-selected="modelValue === kleur.value"
      >
        <span class="w-3.5 h-3.5 rounded-full" :class="getDotBgClass(kleur.value)"></span>
        <span class="text-white text-sm">{{ kleur.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const rootEl = ref<HTMLElement | null>(null)
const showDropdown = ref(false)

const kleuren = [
  { value: 'wit', label: 'Wit' },
  { value: 'rood', label: 'Rood' },
  { value: 'blauw', label: 'Blauw' },
  { value: 'groen', label: 'Groen' },
  { value: 'geel', label: 'Geel' },
  { value: 'paars', label: 'Paars' },
  { value: 'grijs', label: 'Grijs' },
  { value: 'donkergrijs', label: 'Donkergrijs' },
  { value: 'zwart', label: 'Zwart' },
  { value: 'oranje', label: 'Oranje' }
]

function getDotBgClass(kleur: string): string {
  const map: Record<string, string> = {
    wit: 'bg-white',
    rood: 'bg-red-500',
    blauw: 'bg-blue-500',
    groen: 'bg-green-500',
    geel: 'bg-yellow-500',
    paars: 'bg-purple-500',
    grijs: 'bg-gray-500',
    donkergrijs: 'bg-gray-700',
    zwart: 'bg-black',
    oranje: 'bg-orange-500'
  }
  return map[kleur] ?? 'bg-white'
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function selectKleur(kleur: string) {
  emit('update:modelValue', kleur)
  showDropdown.value = false
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node
  if (rootEl.value && !rootEl.value.contains(target)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>


