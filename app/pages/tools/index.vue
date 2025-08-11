<template>
  <div class="bg-[#0a1020] text-white">
    <div class="container mx-auto px-4 pt-16 pb-12">
      <!-- Header consistent met Regels/Terms -->
      <PageHeader title="Eindhoven" highlight="Tools">
        <p>
          Een verzameling handige tools die jij kunt gebruiken in en rondom Eindhoven Combat. Hieronder vind je de beschikbare tools.
        </p>
      </PageHeader>

      <!-- Tools Grid -->
      <div class="max-w-7xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        <NuxtLink
          to="/tools/visitekaartje"
          class="group w-full h-full block rounded-xl border border-gray-700 bg-white/5 hover:bg-white/10 transition-all duration-200 p-6 min-h-48"
        >
          <div class="flex items-start gap-4">
            <div class="text-[#bc13fe]">
              <Icon name="mdi:id-card" class="h-8 w-8" />
            </div>
            <div class="flex-1">
              <h2 class="text-xl font-semibold text-white mb-1">Visitekaartje</h2>
              <p class="text-white/70 text-sm mb-3">Maak je eigen F8-visitekaartje en deel het met je vrienden!</p>
              <span class="inline-flex items-center gap-1 text-[#bc13fe] font-medium group-hover:gap-2 transition-all">
                Ga naar tool
                <Icon name="mdi:arrow-right" />
              </span>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/tools/stedenwapens"
          class="group w-full h-full block rounded-xl border border-gray-700 bg-white/5 hover:bg-white/10 transition-all duration-200 p-6 min-h-48"
        >
          <div class="flex items-start gap-4">
            <div class="text-[#bc13fe]">
              <Icon name="mdi:pistol" class="h-8 w-8" />
            </div>
            <div class="flex-1">
              <h2 class="text-xl font-semibold text-white mb-1">Eindhoven Wapens</h2>
              <p class="text-white/70 text-sm mb-3">Bekijk wapens per stad; sorteer en zie recent toegevoegde items.</p>
              <span class="inline-flex items-center gap-1 text-[#bc13fe] font-medium group-hover:gap-2 transition-all">
                Naar tool
                <Icon name="mdi:arrow-right" />
              </span>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/tools/inkooplijst"
          class="group w-full h-full block rounded-xl border border-gray-700 bg-white/5 hover:bg-white/10 transition-all duration-200 p-6 min-h-48"
        >
          <div class="flex items-start gap-4">
            <div class="text-[#bc13fe]">
              <Icon name="mdi:clipboard-list-outline" class="h-8 w-8" />
            </div>
            <div class="flex-1">
              <h2 class="text-xl font-semibold text-white mb-1">Eindhoven Inkooplijst</h2>
              <p class="text-white/70 text-sm mb-3">Maak een inkooplijst met prijzen en zie direct het totaal in euro's.</p>
              <span class="inline-flex items-center gap-1 text-[#bc13fe] font-medium group-hover:gap-2 transition-all">
                Naar tool
                <Icon name="mdi:arrow-right" />
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>


