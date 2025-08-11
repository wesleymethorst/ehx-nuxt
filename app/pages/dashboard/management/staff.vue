<template>
  <div class="px-4 py-6">
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1 min-w-0">
        <PageHeader title="Management" highlight="Staff">
          <p>Zoek en beheer staffleden. Data komt uit de tabel <code>profiles</code>.</p>
        </PageHeader>
      </div>
      <div class="pt-2 shrink-0">
        <button class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#bc13fe] text-white font-semibold hover:opacity-90">
          <Icon name="mdi:account-plus-outline" />
          <span>Nieuw stafflid</span>
        </button>
      </div>
    </div>

    <div class="mt-2 grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
      <div class="lg:col-span-1">
        <div class="bg-[#0a1020] rounded-lg p-6 border border-gray-700">
          <label class="block text-sm text-white/70 mb-2">Zoeken</label>
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Zoek op naam of e-mail"
              class="w-full h-12 px-4 pr-10 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#bc13fe] transition-colors"
            />
            <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <Icon name="material-symbols:search" class="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      <div class="lg:col-span-3">
        <div class="rounded-xl border border-white/10 overflow-hidden">
          <table class="min-w-full bg-white/5 text-left">
            <thead class="bg-white/10 text-white/80 text-sm">
              <tr>
                <th class="px-4 py-3">Naam</th>
                <th class="px-4 py-3">E-mail</th>
                <th class="px-4 py-3">Groep</th>
                <th class="px-4 py-3">Aangemaakt</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading">
                <td colspan="4" class="px-4 py-6 text-center text-white/70">Laden…</td>
              </tr>
              <tr v-else-if="errorMessage">
                <td colspan="4" class="px-4 py-6 text-center text-red-300">{{ errorMessage }}</td>
              </tr>
              <tr v-else-if="filteredProfiles.length === 0">
                <td colspan="4" class="px-4 py-6 text-center text-white/70">Geen resultaten</td>
              </tr>
              <tr v-for="p in filteredProfiles" :key="p.id" class="border-t border-white/10 hover:bg-white/[0.07]">
                <td class="px-4 py-3">{{ p.display_name || '—' }}</td>
                <td class="px-4 py-3">{{ p.email || '—' }}</td>
                <td class="px-4 py-3">
                  <span class="inline-flex items-center rounded-md bg-white/10 px-2 py-1 text-xs">{{ p.access }}</span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">{{ formatDate(p.created_at) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

type Profile = {
  id: string
  email: string | null
  display_name: string | null
  created_at: string
  access: string
}

const client = useSupabaseClient()

const isLoading = ref(true)
const errorMessage = ref<string | null>(null)
const profiles = ref<Profile[]>([])

const searchQuery = ref('')
const filteredProfiles = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return profiles.value
  return profiles.value.filter(p =>
    [p.display_name, p.email, p.access].filter(Boolean).some(v => String(v).toLowerCase().includes(q))
  )
})

onMounted(async () => {
  try {
    const { data, error } = await client
      .from('profiles')
      .select('id, email, display_name, created_at, access')
      .neq('access', 'user')
      .order('created_at', { ascending: false })

    if (error) throw error
    profiles.value = (data as Profile[]) || []
  } catch (err: any) {
    errorMessage.value = err?.message || 'Kon stafflijst niet ophalen'
  } finally {
    isLoading.value = false
  }
})

function formatDate(iso: string) {
  try { return new Date(iso).toLocaleString() } catch { return iso }
}
</script>


