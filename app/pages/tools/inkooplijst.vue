<template>
  <div class="min-h-screen bg-[#0a1020] text-white">
    <div class="container mx-auto px-4 py-16">
      <PageHeader title="Eindhoven" highlight="Inkooplijst">
        <p>
          Stel eenvoudig een inkooplijst samen met alle items die je nodig hebt voor jouw stad, compleet met inkoopprijzen en een automatisch berekend totaalbedrag.
        </p>
        <p>
          Voeg naar wens ook attachments, upgrades of andere roleplay-benodigdheden toe—van wapens tot voertuigen, kleding, decoratie of welke IC-spullen dan ook waarvan je de uiteindelijke kosten wilt weten.
        </p>
      </PageHeader>

      <div class="max-w-5xl mx-auto grid grid-cols-1 gap-6">
        <!-- Notitieblok -->
        <div class="relative rounded-2xl border border-[#bc13fe]/30 shadow-xl overflow-hidden notepad text-white">
          <!-- Ring/perforatie links -->
          <div class="absolute left-3 top-8 bottom-8 flex flex-col justify-between">
            <span v-for="i in 10" :key="'hole'+i" class="w-2.5 h-2.5 rounded-full bg-[#0a1020] border border-[#0a1020]/40 shadow-inner"></span>
          </div>
          <div class="relative z-10 p-6 sm:p-8">
            <div class="flex items-center gap-3 mb-6">
              <img src="~/assets/icons/ehc.svg" alt="EHC" class="h-7 w-7" />
              <div>
                <p class="text-white font-semibold leading-tight">EHC Notitieblok</p>
                <p class="text-white/60 text-xs">Inkooplijst</p>
              </div>
            </div>
            <form @submit.prevent="addItem" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input v-model="newItemName" type="text" placeholder="Item of wapen" class="bg-transparent border-b border-white/20 px-2 py-2 placeholder-white/50 focus:outline-none focus:border-[#bc13fe]" />
              <input v-model.number="newItemPrice" type="number" min="0" step="0.01" placeholder="Inkoopprijs (€)" class="bg-transparent border-b border-white/20 px-2 py-2 placeholder-white/50 focus:outline-none focus:border-[#bc13fe]" />
              <button type="submit" class="rounded-lg bg-[#bc13fe] text-white font-semibold px-4 py-2 hover:opacity-90">Toevoegen</button>
            </form>

            <div class="mt-6">
              <div v-for="(item, idx) in items" :key="idx" class="py-3 flex items-center justify-between">
                <div>
                  <p class="font-medium">{{ item.name }}</p>
                  <p class="text-sm text-white/70">{{ formatPrice(item.price) }}</p>
                </div>
                <button @click="removeItem(idx)" class="text-red-500 hover:text-red-400">Verwijderen</button>
              </div>
            </div>
            <img src="~/assets/icons/ehc.svg" alt="EHC" class="absolute right-4 bottom-4 w-20 md:w-28 opacity-10 pointer-events-none select-none" />
          </div>
        </div>

        <div class="relative -mt-2 px-6 sm:px-8 pb-6">
          <div class="border-t border-white/15 pt-4 flex items-center justify-between text-white/80">
            <span>Aantal items: {{ formatInt(items.length) }}</span>
            <span class="font-semibold text-white">Totaal: {{ formatPrice(subtotal) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

type PurchaseItem = { name: string; price: number }

const items = ref<PurchaseItem[]>([])
const newItemName = ref<string>('')
const newItemPrice = ref<number | null>(null)

function addItem() {
  if (!newItemName.value || newItemPrice.value == null || isNaN(newItemPrice.value)) return
  items.value.push({ name: newItemName.value, price: Number(newItemPrice.value) })
  newItemName.value = ''
  newItemPrice.value = null
}

function removeItem(index: number) {
  items.value.splice(index, 1)
}

const subtotal = computed(() => items.value.reduce((sum, i) => sum + i.price, 0))

function formatPrice(value: number | { valueOf(): number }) {
  const amount = typeof value === 'number' ? value : Number(value)
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(amount)
}

function formatInt(value: number) {
  return new Intl.NumberFormat('nl-NL').format(value)
}
</script>

<style scoped>
.notepad {
  background-color: #0f1836; /* EHC donkerblauw tint passend bij site */
  background-image:
    linear-gradient(to right, rgba(188, 19, 254, 0.35) 64px, transparent 64px),
    repeating-linear-gradient(to bottom, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 31px, rgba(255,255,255,0.12) 32px);
}
</style>


