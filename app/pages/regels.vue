<script setup lang="ts">

const { showNotification } = useNotification()

// Zoek & filter
const searchQuery = ref<string>('')
const selectedCategory = ref<string>('all')

// Artikelen data
type Article = {
  id: number
  title: string
  category: string
  content: string
  keywords: string[]
}

const articles = ref<Article[]>([
  {
    id: 1,
    title: 'Artikel 1 - Cheats',
    category: 'Categorie 8',
    content:
      'Iedereen die gebruikmaakt van software of hulpmiddelen (cheats) van derde partijen om voordeel te behalen in het spel, zal bestraft worden volgens de 8e categorie.',
    keywords: ['cheats', 'hacks', 'software', 'voordeel', 'derde partijen']
  },
  {
    id: 2,
    title: 'Artikel 2 - Exploits',
    category: 'Categorie 7',
    content:
      'Iedereen die bewust een bug en/of exploit misbruikt om voor zichzelf of anderen voordeel te behalen, ongeacht de methode, zal direct bestraft worden volgens de 7e categorie.',
    keywords: ['exploits', 'bugs', 'misbruik', 'voordeel', 'bug']
  },
  {
    id: 3,
    title: 'Artikel 3 - Jezelf voordoen als staff',
    category: 'Categorie 3',
    content:
      'Iedereen die zich moedwillig voordoet als staff zal worden bestraft volgens de 3e categorie.',
    keywords: ['staff', 'voordoen', 'imiteren', 'nep staff']
  },
  {
    id: 4,
    title: 'Artikel 4 - Ban omzeilen',
    category: 'Categorie 8',
    content:
      'Het bewust omzeilen van een ban, zowel op Discord als in de stad Eindhoven Combat, zal bestraft worden volgens de 8e categorie. Hieronder valt ook het aanmaken van alt-accounts.',
    keywords: ['ban', 'omzeilen', 'alt accounts', 'discord ban', 'unban']
  },
  {
    id: 5,
    title: 'Artikel 5 - Adverteren',
    category: 'Categorie 1',
    content:
      "Het is verboden om in Eindhoven Combat op welke manier dan ook te adverteren. Uitzondering: Inwoners met de content-rol mogen hun eigen content adverteren. Daarnaast is het verboden om in de stad te adverteren, bijvoorbeeld door '/me'-teksten te gebruiken. Bij overtreding zal een straf volgen volgens de 1e categorie. In Discord kan een time-out of zelfs een ban worden opgelegd.",
    keywords: ['adverteren', 'reclame', 'content', 'me teksten', 'promotie']
  },
  {
    id: 6,
    title: 'Artikel 6 - Bedreigen/Intimideren of Leaken',
    category: 'Categorie 8',
    content:
      'Het is ten strengste verboden om een speler en/of stafflid te bedreigen of te intimideren op welke manier dan ook. Daarnaast is het niet toegestaan om privégegevens of geheime informatie van andere spelers te verspreiden. Iedereen die dit moedwillig doet, zal worden bestraft volgens de 8e categorie.',
    keywords: ['bedreigen', 'intimideren', 'leaken', 'privégegevens', 'geheime informatie', 'doxxing']
  },
  {
    id: 7,
    title: 'Artikel 7 - Earrapen',
    category: 'Categorie 2',
    content:
      'Iedereen die moedwillig schreeuwt, harde muziek afspeelt of andere storende geluiden via de microfoon laat horen, zal worden bestraft volgens de 2e categorie.',
    keywords: ['earrapen', 'schreeuwen', 'muziek', 'storende geluiden', 'microfoon', 'voice chat']
  },
  {
    id: 8,
    title: 'Artikel 8 - Staff Abusen',
    category: 'Categorie 7',
    content:
      'Een stafflid mag niet zijn/haar eigen zaken behandelen als hij/zij direct betrokken is. Uitzondering: Dit mag alleen met toestemming van hogerop indien directe actie vereist is. Een stafflid mag zijn/haar TX-permissies niet misbruiken tijdens het spelen. Permissies mogen alleen worden gebruikt voor staffzaken. Een stafflid is in de eerste plaats een gewone speler, behalve bij staffzaken. Overtredingen kunnen leiden tot een strike, ontslag of zelfs een ban.',
    keywords: ['staff abuse', 'eigen zaken', 'permissies', 'misbruik', 'tx permissies']
  },
  {
    id: 9,
    title: 'Artikel 9 - Schelden/beledigen',
    category: 'Categorie 4 & 5',
    content:
      'Het is niet toegestaan om spelers of staffleden uit te schelden of te beledigen. Dit omvat onder andere: Het gebruik van ziektes als scheldwoord, racistische opmerkingen, beledigingen in voicechat, tekstchat of party-namen. Overtredingen worden bestraft volgens de 4e categorie, en racisme wordt bestraft volgens de 5e categorie.',
    keywords: ['schelden', 'beledigen', 'racisme', 'ziektes', 'voicechat', 'tekstchat', 'party namen']
  },
  {
    id: 10,
    title: 'Artikel 10 - Reporting',
    category: 'Categorie 1',
    content:
      "Het wordt verwacht dat spelers op een nette manier gebruikmaken van '/report'. Een inwoner hoeft niet voor elk klein probleem een report aan te maken. Als je bewijs hebt (zoals een clip), kun je in de wachtkamer zitten of een ticket aanmaken. Wanneer er misbruik van gemaakt word. Wanneer je zit te spammen in de reports. Bij overtreding zal er een straf volgens de 1e categorie uitgedeeld worden.",
    keywords: ['reporting', 'report', 'misbruik', 'spammen', 'ticket', 'bewijs', 'clip']
  },
  {
    id: 11,
    title: 'Artikel 11 - VDM',
    category: 'Categorie 4',
    content:
      'VDM (Vehicle Deathmatch) is niet toegestaan en omvat het volgende: Hij/zij die moedwillig op iemand inrijdt met de intentie deze persoon te vermoorden of zijn voertuig als wapen te gebruiken. Het pitten boven de 130 wordt gezien als VDM. Er wordt verwacht dat er gepit wordt t/m 100 waarbij uitgelopen mag worden tot de 130. Wanneer je opzettelijk crashed met een vliegtuig of helikopter. Bij overtreding zal er een straf volgens de 4e categorie uitgedeeld worden.',
    keywords: ['vdm', 'vehicle deathmatch', 'inrijden', 'voertuig', 'wapen', 'pitten', 'vliegtuig', 'helikopter', 'crash']
  },
  {
    id: 12,
    title: 'Artikel 12 - Liegen tegen staff',
    category: 'Categorie 3',
    content:
      'Liegen tegen een stafflid, ongeacht de situatie, is niet toegestaan en wordt bestraft met een ban volgens de 3e categorie.',
    keywords: ['liegen', 'staff', 'waarheid', 'onwaarheid', 'bedriegen']
  },
  {
    id: 13,
    title: 'Artikel 13 - Coinsfarmen',
    category: 'Categorie 4',
    content:
      'Het is niet toegestaan om te coinfarmen, wat houdt dit in?: Wanneer je steeds dezelfde persoon na elkaar dood schiet. Wanneer je AFK online bent voor een lange periode. Bij de eerste overtreding kan er een straf volgens de 4e categorie uitgedeeld worden.',
    keywords: ['coinsfarmen', 'farming', 'afk', 'dood schieten', 'grinden', 'coins']
  },
  {
    id: 14,
    title: 'Artikel 14 - Spawnkillen',
    category: 'Categorie 2',
    content:
      'Het is niet toegestaan om spelers bij hun spawnplek op te wachten en direct te vermoorden. Bij de eerste overtreding volgt een straf volgens de 2e categorie.',
    keywords: ['spawnkillen', 'spawn', 'spawnplek', 'opwachten', 'dood schieten']
  },
  {
    id: 15,
    title: 'Artikel 15 - Teamen',
    category: 'Categorie 4',
    content:
      'Het is niet toegestaan om te teamen in minigames. Bij de eerste overtreding volgt een straf volgens de 4e categorie.',
    keywords: ['teamen', 'minigames', 'samenwerken', 'alliantie', 'team']
  },
  {
    id: 16,
    title: 'Artikel 16 - IRL Trade',
    category: 'Categorie 8',
    content:
      'Het is niet toegestaan om in-game spullen te verkopen voor echt geld. Bij de eerste overtreding volgt een straf volgens de 8e categorie.',
    keywords: ['irl trade', 'echt geld', 'verkopen', 'kopen', 'real money', 'in-game spullen']
  },
  {
    id: 17,
    title: 'Artikel 17 - Niet luisteren naar staff',
    category: 'Categorie 2',
    content:
      'Als een stafflid aangeeft dat iets niet is toegestaan, moet je dit opvolgen. Bij weigering volgt een straf volgens de 2e categorie.',
    keywords: ['niet luisteren', 'staff', 'weigeren', 'opvolgen', 'instructies']
  },
  {
    id: 18,
    title: 'Artikel 18 - Schieten in een staffzaak',
    category: 'Categorie 2',
    content:
      'Het is niet toegestaan om te schieten tijdens een staffzaak. Bij overtreding volgt een straf volgens de 2e categorie.',
    keywords: ['schieten', 'staffzaak', 'staff', 'gevecht', 'wapen']
  }
])

const filteredArticles = computed(() => {
  let filtered = articles.value
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(a => a.category.includes(selectedCategory.value))
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q) ||
      a.keywords.some(k => k.toLowerCase().includes(q))
    )
  }
  return filtered
})

function getCategoryColor(category: string) {
  if (category.includes('8')) return 'text-red-400'
  if (category.includes('7')) return 'text-orange-400'
  if (category.includes('5')) return 'text-yellow-400'
  if (category.includes('4')) return 'text-pink-400'
  if (category.includes('3')) return 'text-purple-400'
  if (category.includes('2')) return 'text-blue-400'
  if (category.includes('1')) return 'text-green-400'
  return 'text-gray-400'
}

async function copyArticle(articleText: string) {
  try {
    await navigator.clipboard.writeText(articleText)
    showNotification({ message: 'Artikel gekopieerd naar klembord!', variant: 'success' })
  } catch {
    showNotification({ message: 'Kopiëren mislukt. Probeer opnieuw.', variant: 'error' })
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#0a1020] text-white">
    <div class="container mx-auto px-4 py-16">
      <!-- Header -->
      <PageHeader title="Eindhoven" highlight="Regels">
        <p>
          Welkom op de pagina voor regelgeving (Algemene Plaatselijke Verordening, verder aangeduid als 'APV') in Eindhoven Combat.
        </p>
        <p>
          Zorg ervoor dat je de regels goed kent voordat je in de server komt. Dit zal anders resulteren in onnodige bans. Lees de regels dus goed! Alle regels zijn van toepassing in Eindhoven Combat.
        </p>
        <p>
          Verandering in regelgeving zal van tevoren duidelijk worden gemaakt in de Discord. Een staff is bedoeld om u als speler te helpen in de server. Het zal staff-zaken behandelen kijkend naar de regels van de server.
        </p>
        <p>
          Een staff zal op basis van feiten, discord logs en/of eigen perspectief staff zaken behandelen. Op geen enkele wijze mag een staff een staff-zaak behandelen waar de desbetreffende staff in is betrokken.
        </p>
        <p>
          Hier is wel een uitzondering van toepassing: Hogerop (Hoofd Staff+) mag dit wel behandelen in samenwerking met een ander lid van Hogerop.
        </p>
      </PageHeader>

      <!-- Straffen Section -->
        <div class="max-w-7xl mx-auto mt-12">
          <h2 class="text-3xl font-bold mb-6 text-center">
            Eindhoven <span class="text-[#bc13fe]">Straffen</span>
          </h2>
          <div class="bg-[#0a1020] rounded-lg p-8 border border-gray-700">
            <p class="text-lg text-gray-300 mb-8 leading-relaxed">
              Straffen in Eindhoven Combat worden opgedeeld over verschillende categorieën, zodat staff sneller kan handelen. 
              Hieronder vind je een overzicht van alle straf categorieën:
            </p>
            
            <div class="overflow-x-auto">
              <table class="w-full border-collapse">
                <thead>
                  <tr class="border-b-2 border-[#bc13fe]/30">
                    <th class="text-center py-4 px-6 text-xl font-bold text-[#bc13fe] uppercase tracking-wide">Straf</th>
                    <th class="text-center py-4 px-6 text-xl font-bold text-[#bc13fe] uppercase tracking-wide">Categorie</th>
                  </tr>
                </thead>
                <tbody class="text-gray-300">
                  <tr class="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                    <td class="py-4 px-6">Warning, tijdelijke mute of ban tot 8 uur</td>
                    <td class="py-4 px-6 font-semibold">Categorie 1</td>
                  </tr>
                  <tr class="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                    <td class="py-4 px-6">Ban van 1 dag</td>
                    <td class="py-4 px-6 font-semibold">Categorie 2</td>
                  </tr>
                  <tr class="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                    <td class="py-4 px-6">Ban van 2 dagen</td>
                    <td class="py-4 px-6 font-semibold">Categorie 3</td>
                  </tr>
                  <tr class="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                    <td class="py-4 px-6">Ban van 3 dagen</td>
                    <td class="py-4 px-6 font-semibold">Categorie 4</td>
                  </tr>
                  <tr class="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                    <td class="py-4 px-6">Ban van 1 week</td>
                    <td class="py-4 px-6 font-semibold">Categorie 5</td>
                  </tr>
                  <tr class="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                    <td class="py-4 px-6">Ban van 2 weken</td>
                    <td class="py-4 px-6 font-semibold">Categorie 6</td>
                  </tr>
                  <tr class="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                    <td class="py-4 px-6">Permanente ban met account wipe</td>
                    <td class="py-4 px-6 font-semibold">Categorie 7</td>
                  </tr>
                  <tr class="hover:bg-gray-800/50 transition-colors">
                    <td class="py-4 px-6">Geen unban mogelijk (GUM) inclusief Discord ban</td>
                    <td class="py-4 px-6 font-semibold">Categorie 8</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Artikels Sectie -->
        <div class="max-w-7xl mx-auto mt-12">
          <h2 class="text-3xl font-bold mb-6 text-center">
            Eindhoven <span class="text-[#bc13fe]">Artikelen</span>
          </h2>
          
          <!-- Zoek + resultaten -->
          <FilterToolbar
            :search="searchQuery"
            :selected="selectedCategory"
            :options="[
              { value: 'all', label: 'Alle Categorieën' },
              { value: '1', label: 'Categorie 1 (Warning/Tijdelijke mute)' },
              { value: '2', label: 'Categorie 2 (1 dag ban)' },
              { value: '3', label: 'Categorie 3 (2 dagen ban)' },
              { value: '4', label: 'Categorie 4 (3 dagen ban)' },
              { value: '5', label: 'Categorie 5 (1 week ban)' },
              { value: '6', label: 'Categorie 6 (2 weken ban)' },
              { value: '7', label: 'Categorie 7 (Permanente ban)' },
              { value: '8', label: 'Categorie 8 (GUM)' }
            ]"
            :total="articles.length"
            :filtered="filteredArticles.length"
            result-label="artikelen"
            search-placeholder="Zoek naar artikelen..."
            :items="filteredArticles.map(a => ({ id: a.id, title: a.title, meta: a.category, content: a.content, keywords: a.keywords }))"
            :get-meta-color="getCategoryColor"
            :on-copy="(text: string) => copyArticle(text)"
            empty-title="Geen artikelen gevonden"
            empty-subtitle="Probeer andere zoektermen of selecteer een andere categorie"
            :show-reset="true"
            @update:search="(val: string) => (searchQuery = val)"
            @update:selected="(val: string) => (selectedCategory = val)"
            @reset="() => { searchQuery = ''; selectedCategory = 'all' }"
          />
          
          
        </div>
      </div>
    </div>
</template>
