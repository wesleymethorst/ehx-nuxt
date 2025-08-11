<script setup lang="ts">
const route = useRoute()
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const isAccountOpen = ref(false)
const showLogoutConfirm = ref(false)

function navLinkClass(path: string) {
  const isActive = route.path === path
  return [
    'transition-colors',
    'hover:text-[#b78df1]',
    isActive ? 'text-[#bc13fd]' : 'text-white/90'
  ]
}

async function signInWithDiscord() {
  await supabase.auth.signInWithOAuth({ provider: 'discord', options: { redirectTo: `${window.location.origin}/auth/callback` } })
}

async function signOut() {
  await supabase.auth.signOut()
  isAccountOpen.value = false
}

function toggleAccountDropdown() {
  isAccountOpen.value = !isAccountOpen.value
}

function onClickOutside(event: MouseEvent) {
  const root = document.getElementById('account-dropdown')
  if (isAccountOpen.value && root && event.target instanceof Node && !root.contains(event.target)) {
    isAccountOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-[#0a1020] text-white border-b border-white/10">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="h-20 grid grid-cols-3 items-center">
        <!-- Left: Logo -->
        <div class="flex items-center gap-3 justify-start">
            <NuxtLink to="/" aria-label="Ga naar home" class="inline-flex">
              <img src="/assets/icons/ehc.svg" alt="EHC logo" class="h-12 w-12 md:h-14 md:w-14" />
            </NuxtLink>
        </div>

        <!-- Center: Navigation -->
        <nav class="hidden md:flex items-center justify-center gap-8 text-lg font-semibold">
          <NuxtLink to="/regels" :class="navLinkClass('/regels')">Regels</NuxtLink>
          <NuxtLink to="/leaderboard" :class="navLinkClass('/leaderboard')">Leaderboard</NuxtLink>
          <NuxtLink to="/tools" :class="navLinkClass('/tools')">Tools</NuxtLink>
          <a href="https://shop.eindhovencombat.nl/" target="_blank" rel="noopener noreferrer" :class="navLinkClass('/shop')">Shop</a>
        </nav>

        <!-- Right: Auth -->
        <div class="flex items-center justify-end gap-3">
          <template v-if="user">
            <div id="account-dropdown" class="relative">
              <button @click="toggleAccountDropdown" class="flex items-center gap-2 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                <img :src="user.user_metadata?.avatar_url || '/assets/images/defaultavatar.png'" class="h-8 w-8 rounded-full border border-white/20" alt="avatar" />
                <span class="hidden sm:inline text-white/80 max-w-[160px] truncate">{{ user.user_metadata?.name || user.email }}</span>
                <Icon name="mdi:chevron-down" class="text-white/70" />
              </button>
              <Transition name="slidefade">
                <div v-if="isAccountOpen" class="absolute right-0 mt-2 w-56 bg-[#0a1020] border border-white/10 rounded-lg shadow-lg py-2 z-50">
                  <NuxtLink to="/dashboard" class="flex items-center gap-2 px-4 py-2 hover:bg-white/10">
                    <Icon name="mdi:view-dashboard" />
                    <span>Dashboard</span>
                  </NuxtLink>
                  <NuxtLink to="/profiel" class="flex items-center gap-2 px-4 py-2 hover:bg-white/10">
                    <Icon name="mdi:account" />
                    <span>Profiel</span>
                  </NuxtLink>
                  <div class="my-1 border-t border-white/10"></div>
                  <button @click="showLogoutConfirm = true" class="w-full text-left flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10">
                    <Icon name="mdi:logout" />
                    <span>Uitloggen</span>
                  </button>
                </div>
              </Transition>
            </div>
          </template>
          <template v-else>
            <button
              type="button"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
              title="Discord"
              @click="signInWithDiscord"
            >
              <Icon name="ic:baseline-discord" class="h-5 w-5" />
              <span>Inloggen</span>
            </button>
          </template>
        </div>
      </div>
    </div>
  </header>

  <ConfirmDialog
    :is-open="showLogoutConfirm"
    title="Uitloggen"
    message="Weet je zeker dat je wilt uitloggen?"
    confirm-text="Uitloggen"
    cancel-text="Annuleren"
    confirm-button-class="bg-red-600 hover:bg-red-700 text-white"
    @confirm="signOut"
    @close="showLogoutConfirm = false"
  />

</template>
