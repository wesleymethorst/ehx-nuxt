<template>
  <div class="px-4 py-6">
    <PageHeader title="Eindhoven" highlight="Admin">
      <p>Beheer- en admin-overzicht.</p>
    </PageHeader>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <div class="rounded-xl border border-white/10 bg-white/5 p-4">
        <h3 class="font-semibold mb-2">Rollen & Permissies</h3>
        <p class="text-white/70 text-sm">Beheer toegangsniveaus van teamleden.</p>
      </div>
      <div class="rounded-xl border border-white/10 bg-white/5 p-4">
        <h3 class="font-semibold mb-2">Gebruikersbeheer</h3>
        <p class="text-white/70 text-sm">Zoeken, bewerken en uitschakelen van accounts.</p>
      </div>
      <div class="rounded-xl border border-white/10 bg-white/5 p-4">
        <h3 class="font-semibold mb-2">Audit Log</h3>
        <p class="text-white/70 text-sm">Bekijk recente acties en wijzigingen.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })
</script>


