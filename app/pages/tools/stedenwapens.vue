<template>
  <div class="min-h-screen bg-[#0a1020] text-white">
    <div class="container mx-auto px-4 py-16">
      <PageHeader title="Eindhoven" highlight="Wapens">
        <p>
          Een database-achtige weergave van wapens per stad. Filter op stad, sorteer en bekijk recent toegevoegde items.
        </p>
      </PageHeader>

      <!-- Filters -->
      <div class="max-w-7xl mx-auto mb-6 flex flex-col sm:flex-row gap-4">
        <select v-model="selectedCity" class="bg-[#0a1020] border border-gray-700 rounded-lg px-4 py-2 w-full sm:w-64">
          <option value="all">Alle steden</option>
          <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
        </select>
        <select v-model="sortBy" class="bg-[#0a1020] border border-gray-700 rounded-lg px-4 py-2 w-full sm:w-64">
          <option value="recent">Meest recent</option>
          <option value="name">Naam (A-Z)</option>
          <option value="city">Stad (A-Z)</option>
        </select>
      </div>

      <!-- Weapons Grid -->
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="weapon in visibleWeapons" :key="weapon.id" class="rounded-xl border border-gray-700 bg-white/5 p-6">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-xl font-semibold">{{ weapon.name }}</h3>
              <p class="text-white/70 text-sm">Stad: <span class="text-white">{{ weapon.city }}</span></p>
            </div>
            <span class="text-xs text-white/60">Toegevoegd: {{ new Date(weapon.addedAt).toLocaleDateString() }}</span>
          </div>
          <div class="mt-4 flex items-center gap-3 text-sm text-white/80">
            <span class="px-2 py-1 rounded bg-white/10 border border-gray-700">Type: {{ weapon.type }}</span>
            <span class="px-2 py-1 rounded bg-white/10 border border-gray-700">Caliber: {{ weapon.caliber }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

type Weapon = {
  id: number
  name: string
  city: string
  type: string
  caliber: string
  addedAt: string
}

const allWeapons = ref<Weapon[]>([
  { id: 1, name: 'Pistol', city: 'Eindhoven', type: 'Sidearm', caliber: '9mm', addedAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 2, name: 'Carbine Rifle', city: 'Rotterdam', type: 'Rifle', caliber: '5.56mm', addedAt: new Date(Date.now() - 2*86400000).toISOString() },
  { id: 3, name: 'SMG', city: 'Amsterdam', type: 'SMG', caliber: '9mm', addedAt: new Date(Date.now() - 5*86400000).toISOString() },
  { id: 4, name: 'Shotgun', city: 'Eindhoven', type: 'Shotgun', caliber: '12ga', addedAt: new Date(Date.now() - 6*86400000).toISOString() },
  { id: 5, name: 'Heavy Pistol', city: 'Utrecht', type: 'Sidearm', caliber: '.45', addedAt: new Date(Date.now() - 9*86400000).toISOString() }
])

const cities = computed(() => Array.from(new Set(allWeapons.value.map(w => w.city))).sort())

const selectedCity = ref<string>('all')
const sortBy = ref<'recent' | 'name' | 'city'>('recent')

const visibleWeapons = computed(() => {
  let items = allWeapons.value
  if (selectedCity.value !== 'all') {
    items = items.filter(w => w.city === selectedCity.value)
  }
  if (sortBy.value === 'recent') {
    items = [...items].sort((a, b) => +new Date(b.addedAt) - +new Date(a.addedAt))
  } else if (sortBy.value === 'name') {
    items = [...items].sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'city') {
    items = [...items].sort((a, b) => a.city.localeCompare(b.city))
  }
  return items
})
</script>


