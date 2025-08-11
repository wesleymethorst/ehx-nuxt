<template>
  <div class="min-h-screen bg-[#0a1020] text-white">
    <div class="container mx-auto px-4 py-16">
      <PageHeader title="Eindhoven" highlight="Profiel">
        <p>
          Overzicht van jouw account, statistieken en recente activiteit binnen Eindhoven Combat.
        </p>
      </PageHeader>

      <!-- Profiel header -->
      <div class="max-w-5xl mx-auto">
        <div class="bg-white/5 border border-gray-700 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img src="/assets/images/defaultavatar.png" alt="Avatar" class="w-28 h-28 rounded-full object-cover border border-gray-700" />
          <div class="flex-1 w-full">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 class="text-2xl font-bold">Speler Naam</h2>
                <p class="text-white/70 text-sm">Lid sinds jan 2025</p>
              </div>
              <div class="flex gap-2">
                <NuxtLink to="/tools/visitekaartje" class="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/5">Visitekaartje</NuxtLink>
                <NuxtLink to="/leaderboard" class="px-4 py-2 rounded-lg bg-[#bc13fe] hover:opacity-90">Leaderboard</NuxtLink>
              </div>
            </div>

            <!-- Stats -->
            <div class="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div class="rounded-xl border border-gray-700 bg-white/5 p-4 text-center">
                <p class="text-sm text-white/60">Kills</p>
                <p class="text-2xl font-bold">1.234</p>
              </div>
              <div class="rounded-xl border border-gray-700 bg-white/5 p-4 text-center">
                <p class="text-sm text-white/60">Deaths</p>
                <p class="text-2xl font-bold">567</p>
              </div>
              <div class="rounded-xl border border-gray-700 bg-white/5 p-4 text-center">
                <p class="text-sm text-white/60">K/D</p>
                <p class="text-2xl font-bold">2.17</p>
              </div>
              <div class="rounded-xl border border-gray-700 bg-white/5 p-4 text-center">
                <p class="text-sm text-white/60">Speeltijd</p>
                <p class="text-2xl font-bold">85u</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity & About -->
      <div class="max-w-5xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 rounded-2xl border border-gray-700 bg-white/5 p-6">
          <h3 class="text-xl font-semibold mb-4">Recente Activiteit</h3>
          <ul class="space-y-3 text-white/80">
            <li class="flex items-center justify-between">
              <span>Kreeg 50 kills in Gun Game</span>
              <span class="text-white/50 text-sm">2 uur geleden</span>
            </li>
            <li class="flex items-center justify-between">
              <span>Bracht 10 uur door in Eindhoven Combat</span>
              <span class="text-white/50 text-sm">gisteren</span>
            </li>
            <li class="flex items-center justify-between">
              <span>Nieuw persoonlijk record op Sniper Arena</span>
              <span class="text-white/50 text-sm">3 dagen geleden</span>
            </li>
          </ul>
        </div>

        <div class="rounded-2xl border border-gray-700 bg-white/5 p-6">
          <h3 class="text-xl font-semibold mb-4">Over</h3>
          <p class="text-white/80">
            Dit is jouw standaard profielpagina. Koppel later je accounts, pas je avatar aan en toon badges of achievements.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Placeholder – later vullen met echte data via API of store
</script>


