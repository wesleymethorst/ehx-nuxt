<template>
  <div class="relative min-h-screen text-white flex items-center justify-center px-4">
    <img src="~/assets/images/background.png" alt="Achtergrond" class="absolute inset-0 w-full h-full object-cover" />
    <div class="absolute inset-0 bg-black/60"></div>

    <div class="relative z-10 text-center max-w-2xl">
      <img
        src="~/assets/icons/ehc.svg"
        alt=""
        aria-hidden="true"
        class="mx-auto mb-6 h-16 md:h-20 w-auto opacity-95 drop-shadow-lg"
      />
      <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
        {{ is404 ? '404' : statusCode }}
      </h1>
      <p class="text-white/80 mt-3">
        {{ is404 ? 'Pagina niet gevonden' : (errorMessage || 'Er is iets misgegaan') }}
      </p>

      <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <NuxtLink to="/" class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#bc13fe] text-white font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-[#bc13fe]/60">
          <Icon name="mdi:home" />
          <span>Naar Home</span>
        </NuxtLink>

        <button v-if="!is404" type="button" @click="handleClear" class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 backdrop-blur text-white font-semibold hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-white/40">
          <Icon name="mdi:refresh" />
          <span>Probeer opnieuw</span>
        </button>
      </div>
    </div>
  </div>
  </template>

<script setup lang="ts">
import type { NuxtError } from '#app'
import { clearError } from '#app'

const _props = defineProps<{ error: NuxtError | null }>()

const statusCode = computed(() => (_props.error as any)?.statusCode ?? 500)
const is404 = computed(() => statusCode.value === 404)
const errorMessage = computed(() => (_props.error as any)?.message as string | undefined)

function handleClear() {
  clearError({ redirect: '/' })
}

useHead(() => ({
  title: is404.value ? '404 • Pagina niet gevonden' : `Fout ${statusCode.value}`,
}))
</script>


