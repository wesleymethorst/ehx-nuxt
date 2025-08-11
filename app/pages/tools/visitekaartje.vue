<template>
  <div class="min-h-screen bg-[#0a1020] text-white">
    <div class="max-w-4xl mx-auto py-10 px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">
          Visitekaartje <span class="text-[#bc13fe]">Generator</span>
        </h1>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">
          Vul je gegevens in en kopieer je visitekaartje met een F8 keybind voor roleplay!
        </p>
      </div>

      <!-- Input Form -->
      <div class="bg-[#0a1020] rounded-lg border border-gray-700 p-8 mb-8">
        <h2 class="text-2xl font-bold mb-6 text-center">Jouw Gegevens</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Naam -->
          <div>
            <label class="block text-sm font-semibold text-gray-300 mb-2">
              Naam <span class="text-red-400">*</span>
            </label>
            <div class="flex gap-2">
              <input 
                v-model="visitekaartje.naam"
                type="text"
                placeholder="John Doe"
                class="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#bc13fe] transition-colors"
                required
              />
              <ColorDropdown v-model="visitekaartje.naamKleur" />
            </div>
          </div>

          <!-- Telefoonnummer -->
          <div>
            <label class="block text-sm font-semibold text-gray-300 mb-2">
              Telefoonnummer <span class="text-gray-500">(optioneel)</span>
            </label>
            <div class="flex gap-2">
              <input 
                v-model="visitekaartje.telefoon"
                type="text"
                placeholder="0612345678"
                class="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#bc13fe] transition-colors"
              />
              <ColorDropdown v-model="visitekaartje.telefoonKleur" />
            </div>
          </div>

          <!-- Deepweb -->
          <div>
            <label class="block text-sm font-semibold text-gray-300 mb-2">
              Deepweb <span class="text-gray-500">(optioneel)</span>
            </label>
            <div class="flex gap-2">
              <input 
                v-model="visitekaartje.deepweb"
                type="text"
                placeholder="sonszaken"
                class="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#bc13fe] transition-colors"
              />
              <ColorDropdown v-model="visitekaartje.deepwebKleur" />
            </div>
          </div>

          <!-- Toets -->
          <div>
            <label class="block text-sm font-semibold text-gray-300 mb-2">
              Toets <span class="text-red-400">*</span>
            </label>
            <input 
              v-model="visitekaartje.toets"
              type="text"
              placeholder="F8"
              class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#bc13fe] transition-colors"
              required
            />
          </div>
        </div>

        <!-- Live Preview -->
        <div class="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-600">
          <h3 class="text-lg font-semibold text-white mb-2">Live Preview</h3>
          <div class="text-gray-300 text-lg">
            <div v-if="visitekaartje.naam || visitekaartje.telefoon || visitekaartje.deepweb" class="text-white font-mono text-xl" v-html="livePreviewText">
            </div>
            <div v-else class="text-gray-500">
              Vul je gegevens in om de preview te zien...
            </div>
          </div>
        </div>
      </div>

      <!-- F8 Keybind Output -->
      <div class="bg-[#0a1020] rounded-lg border border-gray-700 p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold">F8 Keybind</h2>
          <button 
            @click="copyF8Keybind"
            :disabled="!visitekaartje.naam || !visitekaartje.toets"
            class="text-[#bc13fe] hover:text-[#bc13fe]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Kopieer F8 Keybind"
          >
            <Icon name="material-symbols:content-copy-outline" class="text-2xl" />
          </button>
        </div>
        
        <div class="bg-gray-900 rounded-lg p-4 border border-gray-600">
          <pre v-if="f8Keybind" class="text-white text-base whitespace-pre-line font-mono">{{ f8Keybind }}</pre>
          <div v-else class="text-gray-500 text-base">
            Vul je naam en toets in om de F8 keybind te genereren...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const { showNotification } = useNotification()

// Visitekaartje data
const visitekaartje = ref({
  naam: '',
  telefoon: '',
  deepweb: '',
  toets: '',
  naamKleur: 'wit',
  telefoonKleur: 'wit',
  deepwebKleur: 'wit'
})

// Kleur code voor F8 output
function getKleurCode(kleur: string) {
  const kleuren: Record<string, string> = {
    wit: '~w~',
    rood: '~r~',
    blauw: '~b~',
    groen: '~g~',
    geel: '~y~',
    paars: '~p~',
    grijs: '~c~',
    donkergrijs: '~m~',
    zwart: '~u~',
    oranje: '~o~'
  }
  return kleuren[kleur] || '~w~'
}

// Tailwind kleur class voor preview
function getKleurClass(kleur: string) {
  const kleurClasses: Record<string, string> = {
    wit: 'text-white',
    rood: 'text-red-500',
    blauw: 'text-blue-500',
    groen: 'text-green-500',
    geel: 'text-yellow-500',
    paars: 'text-purple-500',
    grijs: 'text-gray-500',
    donkergrijs: 'text-gray-700',
    zwart: 'text-black',
    oranje: 'text-orange-500'
  }
  return kleurClasses[kleur] || 'text-white'
}

// Live preview text
const livePreviewText = computed(() => {
  const parts: string[] = []
  if (visitekaartje.value.naam) {
    parts.push(`<span class="${getKleurClass(visitekaartje.value.naamKleur)}">${visitekaartje.value.naam}</span>`)
  }
  if (visitekaartje.value.telefoon) {
    parts.push(`<span class="${getKleurClass(visitekaartje.value.telefoonKleur)}">${visitekaartje.value.telefoon}</span>`)
  }
  if (visitekaartje.value.deepweb) {
    parts.push(`<span class="${getKleurClass(visitekaartje.value.deepwebKleur)}">${visitekaartje.value.deepweb}</span>`)
  }
  return parts.join(' | ')
})

// F8 keybind
const f8Keybind = computed(() => {
  if (!visitekaartje.value.naam || !visitekaartje.value.toets) return ''

  let keybind = `bind keyboard ${visitekaartje.value.toets} "me ${getKleurCode(visitekaartje.value.naamKleur)}${visitekaartje.value.naam}~s~`
  if (visitekaartje.value.telefoon) {
    keybind += ` | ${getKleurCode(visitekaartje.value.telefoonKleur)}${visitekaartje.value.telefoon}~s~`
  }
  if (visitekaartje.value.deepweb) {
    keybind += ` | ${getKleurCode(visitekaartje.value.deepwebKleur)}${visitekaartje.value.deepweb}~s~`
  }
  keybind += `"`
  return keybind
})

// Kopieer naar klembord + notify
async function copyF8Keybind() {
  try {
    if (!f8Keybind.value) return
    await navigator.clipboard.writeText(f8Keybind.value)
    showNotification({
      message: 'Visitekaartje gekopieerd naar klembord!',
      variant: 'success'
    })
  } catch (err) {
    console.error('Kon niet kopiëren naar klembord:', err)
    showNotification({
      message: 'Kopiëren mislukt. Probeer opnieuw.',
      variant: 'error'
    })
  }
}
</script>

<style scoped>
pre { white-space: pre-line; }
</style>

