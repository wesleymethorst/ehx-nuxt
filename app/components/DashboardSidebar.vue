<template>
  <aside
    :class="[
      'h-screen sticky top-0 z-30 border-r border-gray-800 bg-gradient-to-b from-[#0f1836] to-[#0a1020] text-white transition-[width] duration-300 ease-out shrink-0 backdrop-blur-sm overflow-hidden',
      isExpanded ? 'w-64' : 'w-16'
    ]"
  >
    <!-- Header -->
    <div class="h-16 flex items-center gap-3 px-4 border-b border-white/10">
      <img src="~/assets/images/ehc.gif" alt="EHC" class="h-7 w-7 rounded-lg ring-1 ring-white/10 shadow-sm object-cover" />
      <Transition name="slidefade">
        <span v-if="isExpanded" class="font-bold text-sm md:text-base">
          <span class="text-white">Eindhoven</span>
          <span class="text-[#bc13fe]"> Dashboard</span>
        </span>
      </Transition>
    </div>

    <!-- Content -->
    <nav class="py-3">
      <ul class="space-y-1">
        <!-- Overzicht -->
        <li>
          <NuxtLink to="/dashboard" class="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5">
            <Icon name="mdi:view-dashboard" class="text-white/80 group-hover:text-white" />
            <Transition name="slidefade">
              <span v-if="isExpanded" class="truncate">Overzicht</span>
            </Transition>
          </NuxtLink>
        </li>

        <!-- Management (dropdown) -->
        <li>
          <button @click="managementOpen = !managementOpen" class="w-full group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5">
            <Icon name="mdi:account-cog-outline" class="text-white/80 group-hover:text-white" />
            <Transition name="slidefade">
              <span v-if="isExpanded" class="truncate flex-1 text-left">Management</span>
            </Transition>
            <Icon :name="managementOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="ml-auto text-white/60" v-if="isExpanded" />
          </button>
          <Transition name="slidefade">
            <ul v-if="managementOpen" class="mt-1 ml-5 pl-3 space-y-1 border-l border-white/10">
              <li>
                <NuxtLink to="/dashboard/management/admin" class="group flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/5 text-sm">
                  <Icon name="mdi:shield-crown-outline" class="text-white/80 group-hover:text-white" />
                  <span v-if="isExpanded" class="truncate">Admin</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/dashboard/management/staff" class="group flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/5 text-sm">
                  <Icon name="mdi:shield-account-outline" class="text-white/80 group-hover:text-white" />
                  <span v-if="isExpanded" class="truncate">Staff</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/dashboard/management/logs" class="group flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/5 text-sm">
                  <Icon name="mdi:note-text-outline" class="text-white/80 group-hover:text-white" />
                  <span v-if="isExpanded" class="truncate">Logs</span>
                </NuxtLink>
              </li>
            </ul>
          </Transition>
        </li>

        <!-- Spelers -->
        <li>
          <NuxtLink to="/dashboard/players" class="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5">
            <Icon name="mdi:account-multiple-outline" class="text-white/80 group-hover:text-white" />
            <Transition name="slidefade">
              <span v-if="isExpanded" class="truncate">Spelers</span>
            </Transition>
          </NuxtLink>
        </li>

        <!-- Geschiedenis (dropdown) -->
        <li>
          <button @click="historyOpen = !historyOpen" class="w-full group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5">
            <Icon name="mdi:history" class="text-white/80 group-hover:text-white" />
            <Transition name="slidefade">
              <span v-if="isExpanded" class="truncate flex-1 text-left">Geschiedenis</span>
            </Transition>
            <Icon :name="historyOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="ml-auto text-white/60" v-if="isExpanded" />
          </button>
          <Transition name="slidefade">
            <ul v-if="historyOpen" class="mt-1 ml-5 pl-3 space-y-1 border-l border-white/10">
              <li>
                <NuxtLink to="/dashboard/history/bans" class="group flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/5 text-sm">
                  <Icon name="mdi:gavel" class="text-white/80 group-hover:text-white" />
                  <span v-if="isExpanded" class="truncate">Bans</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/dashboard/history/warns" class="group flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/5 text-sm">
                  <Icon name="mdi:alert-circle-outline" class="text-white/80 group-hover:text-white" />
                  <span v-if="isExpanded" class="truncate">Warns</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/dashboard/history/mutes" class="group flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/5 text-sm">
                  <Icon name="mdi:microphone-off" class="text-white/80 group-hover:text-white" />
                  <span v-if="isExpanded" class="truncate">Mutes</span>
                </NuxtLink>
              </li>
            </ul>
          </Transition>
        </li>

        <!-- Staff -->
        <li>
          <NuxtLink to="/dashboard/staff" class="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5">
            <Icon name="mdi:shield-account-outline" class="text-white/80 group-hover:text-white" />
            <Transition name="slidefade">
              <span v-if="isExpanded" class="truncate">Staff</span>
            </Transition>
          </NuxtLink>
        </li>

        <!-- Settings -->
        <li>
          <NuxtLink to="/dashboard/settings" class="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5">
            <Icon name="mdi:cog-outline" class="text-white/80 group-hover:text-white" />
            <Transition name="slidefade">
              <span v-if="isExpanded" class="truncate">Settings</span>
            </Transition>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- Footer -->
    <div class="absolute bottom-0 left-0 right-0 border-t border-white/10 p-3">
      <NuxtLink
        to="/"
        class="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#bc13fe] text-white font-semibold hover:opacity-90 shadow"
      >
        <Icon name="mdi:home" />
        <span v-if="isExpanded">Naar home</span>
      </NuxtLink>
    </div>
  </aside>
</template>

<script setup lang="ts">

const { isExpanded } = useDashboardSidebar()
const historyOpen = ref(false)
const managementOpen = ref(false)
</script>

<style scoped>
.slidefade-enter-active,
.slidefade-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}
.slidefade-enter-from,
.slidefade-leave-to {
  opacity: 0;
  transform: translateX(-6px);
}
</style>


