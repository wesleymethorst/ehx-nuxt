<template>
  <div class="bg-[#0a1020] rounded-lg p-6 border border-gray-700 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Zoekbalk -->
      <div class="relative">
        <input
          :value="search"
          @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
          type="text"
          :placeholder="searchPlaceholder"
          class="w-full h-12 px-4 pr-10 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#bc13fe] transition-colors"
        />
        <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <Icon name="material-symbols:search" class="text-gray-400" />
        </div>
      </div>

      <!-- Select (custom, styled like ColorDropdown) -->
      <div ref="selectRoot" class="relative">
        <button 
          type="button"
          @click="toggleSelect"
          class="w-full px-4 h-[52px] bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#bc13fe] transition-colors flex items-center justify-between"
          aria-haspopup="listbox"
          :aria-expanded="showSelect ? 'true' : 'false'"
        >
          <span class="truncate">{{ selectedLabel }}</span>
          <Icon name="mdi:chevron-down" :class="['text-gray-400 transition-transform', showSelect ? 'rotate-180' : '']" />
        </button>

        <div
          v-if="showSelect"
          class="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 w-full overflow-hidden"
          role="listbox"
        >
          <div 
            v-for="(opt, index) in options" 
            :key="opt.value"
            @click="selectOption(opt.value)"
            :class="[
              'px-4 py-2 hover:bg-gray-700 cursor-pointer',
              index === 0 ? 'rounded-t-lg' : '',
              index === options.length - 1 ? 'rounded-b-lg' : ''
            ]"
            role="option"
            :aria-selected="selected === opt.value"
          >
            <span class="text-white text-sm">{{ opt.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Resultaten teller -->
    <div class="mt-4 text-sm text-gray-400">
      {{ filtered }} van {{ total }} {{ resultLabel }} gevonden
      <span v-if="isFiltered" class="text-[#bc13fe]">(gefilterd)</span>
    </div>
  </div>

  <!-- Resultaten lijst -->
  <div class="bg-[#0a1020] rounded-lg p-8 border border-gray-700">
    <div class="space-y-8">
      <div v-if="!items || items.length === 0" class="text-center py-12">
        <div class="text-gray-400 text-lg mb-4">
          <Icon name="material-symbols:search" class="text-4xl mb-4 block mx-auto" />
          {{ emptyTitle }}
        </div>
        <p class="text-gray-500">{{ emptySubtitle }}</p>
        <button 
          v-if="showReset"
          @click="$emit('reset')"
          class="mt-4 px-6 py-2 bg-[#bc13fe] text-white rounded-lg hover:bg-[#bc13fe]/80 transition-colors"
        >
          Reset filters
        </button>
      </div>

      <div 
        v-else
        v-for="item in items" 
        :key="item.id"
        class="border-b border-gray-700 pb-6 last:border-b-0"
      >
        <h3 class="text-2xl font-bold mb-4 text-white">
          {{ item.title }} 
          <span :class="['font-semibold', getMetaColor(item.meta)]">
            ({{ item.meta }})
          </span>
          <button 
            @click="onCopy && onCopy(`${item.title} (${item.meta})`)"
            class="ml-2 text-[#bc13fe] hover:text-[#bc13fe]/80 transition-colors cursor-pointer"
            title="Kopieer"
          >
            <Icon name="material-symbols:content-copy-outline" class="text-xl" />
          </button>
        </h3>
        <p class="text-lg text-gray-300 leading-relaxed">
          {{ item.content }}
        </p>
        
        <div class="mt-4 flex flex-wrap gap-2" v-if="item.keywords?.length">
          <span 
            v-for="keyword in item.keywords.slice(0, 5)" 
            :key="keyword"
            class="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-full border border-gray-700"
          >
            {{ keyword }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

type Option = { value: string; label: string }

const props = defineProps<{
  search: string
  selected: string
  options: Option[]
  total: number
  filtered: number
  resultLabel: string
  searchPlaceholder: string
  items?: Array<{ id: number | string; title: string; meta: string; content: string; keywords: string[] }>
  getMetaColor: (meta: string) => string
  onCopy?: (text: string) => void
  emptyTitle: string
  emptySubtitle: string
  showReset?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'update:selected', value: string): void
  (e: 'reset'): void
}>()

const isFiltered = computed(() => {
  return Boolean((props.search && props.search.length > 0) || props.selected !== 'all')
})

const showSelect = ref(false)
const selectRoot = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => props.options.find(o => o.value === props.selected)?.label || '')

function toggleSelect() {
  showSelect.value = !showSelect.value
}

function selectOption(value: string) {
  showSelect.value = false
  emit('update:selected', value)
}

function onClickOutside(e: MouseEvent) {
  const target = e.target as Node
  if (selectRoot.value && !selectRoot.value.contains(target)) {
    showSelect.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>


