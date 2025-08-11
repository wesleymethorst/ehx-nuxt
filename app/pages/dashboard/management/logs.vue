<template>
  <div class="px-4 py-6">
    <PageHeader title="Management" highlight="Logs">
      <p>Overzicht van recente acties op de site.</p>
    </PageHeader>

    <div class="mt-4">
      <FilterToolbar class="mb-4" :show-search="true" placeholder="Zoek op gebruiker, actie of route" @search="onSearch" />

      <div class="rounded-xl border border-white/10 overflow-hidden">
        <table class="min-w-full bg-white/5 text-left">
          <thead class="bg-white/10 text-white/80 text-sm">
            <tr>
              <th class="px-4 py-3">Tijd</th>
              <th class="px-4 py-3">Gebruiker</th>
              <th class="px-4 py-3">Actie</th>
              <th class="px-4 py-3">Route</th>
              <th class="px-4 py-3">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="5" class="px-4 py-6 text-center text-white/70">Laden…</td>
            </tr>
            <tr v-else-if="errorMessage">
              <td colspan="5" class="px-4 py-6 text-center text-red-300">{{ errorMessage }}</td>
            </tr>
            <tr v-else-if="filteredLogs.length === 0">
              <td colspan="5" class="px-4 py-6 text-center text-white/70">Geen logs gevonden</td>
            </tr>
            <tr v-for="log in filteredLogs" :key="log.id" class="border-t border-white/10 hover:bg-white/[0.07]">
              <td class="px-4 py-3 whitespace-nowrap">{{ formatDate(log.created_at) }}</td>
              <td class="px-4 py-3">{{ log.user_name || 'Onbekend' }}</td>
              <td class="px-4 py-3">{{ log.action }}</td>
              <td class="px-4 py-3">{{ log.path || '-' }}</td>
              <td class="px-4 py-3 text-white/80 text-sm">{{ truncate(log.details, 120) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4 flex items-center justify-between text-sm text-white/70">
        <div>
          Totaal: {{ filteredLogs.length }}
        </div>
        <div class="flex items-center gap-2">
          <button class="px-3 py-1 rounded bg-white/10 hover:bg-white/15" :disabled="page === 1" @click="page--">Vorige</button>
          <span>Pagina {{ page }}</span>
          <button class="px-3 py-1 rounded bg-white/10 hover:bg-white/15" :disabled="filteredLogs.length < pageSize" @click="page++">Volgende</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

type SiteLog = {
  id: string
  created_at: string
  user_id?: string | null
  user_name?: string | null
  action: string
  path?: string | null
  details?: string | null
}

const client = useSupabaseClient()
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)
const logs = ref<SiteLog[]>([])

// filters & pagination
const searchQuery = ref('')
const page = ref(1)
const pageSize = 50

const filteredLogs = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  const start = (page.value - 1) * pageSize
  const end = start + pageSize
  const base = q
    ? logs.value.filter(l =>
        [l.user_name, l.action, l.path, l.details]
          .filter(Boolean)
          .some(v => String(v).toLowerCase().includes(q))
      )
    : logs.value
  return base.slice(start, end)
})

function onSearch(q: string) {
  page.value = 1
  searchQuery.value = q
}

onMounted(async () => {
  try {
    // Verwacht een tabel 'site_logs' met velden: id, created_at, user_id, user_name, action, path, details
    const { data, error } = await client
      .from('site_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500)

    if (error) throw error
    logs.value = (data as SiteLog[]) || []
  } catch (err: any) {
    // Graceful fallback als tabel nog niet bestaat of permissie ontbreekt
    errorMessage.value = err?.message || 'Kon logs niet ophalen'
  } finally {
    isLoading.value = false
  }
})

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

function truncate(value: string | null | undefined, length: number) {
  const v = value || ''
  return v.length > length ? v.slice(0, length - 1) + '…' : v
}
</script>


