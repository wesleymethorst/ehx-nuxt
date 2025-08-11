<template>
  <div class="px-4 py-6">
    <PageHeader title="Eindhoven" highlight="Management">
      <p>Onder overzicht voor management.</p>
    </PageHeader>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <!-- Placeholder cards for now -->
      <div class="rounded-xl border border-white/10 bg-white/5 p-4">
        <h3 class="font-semibold mb-2">Teambeheer</h3>
        <p class="text-white/70 text-sm">Beheer rollen, permissies en teamleden.</p>
      </div>
      <div class="rounded-xl border border-white/10 bg-white/5 p-4">
        <h3 class="font-semibold mb-2">Serverstatus</h3>
        <p class="text-white/70 text-sm">Bekijk realtime status en uptime.</p>
      </div>
      <div class="rounded-xl border border-white/10 bg-white/5 p-4">
        <h3 class="font-semibold mb-2">Acties & Logs</h3>
        <p class="text-white/70 text-sm">Inzicht in recente management-acties.</p>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })
</script>


