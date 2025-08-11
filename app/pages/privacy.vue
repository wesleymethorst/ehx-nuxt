<script setup lang="ts">

const { showNotification } = useNotification()

// Zoek & filter state
const searchQuery = ref<string>('')
const selectedSection = ref<string>('all')

type Section = {
  id: number
  title: string
  section: string
  content: string
  keywords: string[]
}

// Privacy data
const sections = ref<Section[]>([
  {
    id: 1,
    title: '1. Welke gegevens verzamelen wij?',
    section: 'Gegevensverzameling',
    content:
      'Bij deelname aan Eindhoven Combat verzamelen wij bepaalde gegevens om de functionaliteit en beveiliging van onze server te waarborgen. De volgende gegevens kunnen worden verzameld: Discord ID en gebruikersnaam: Voor verificatie en accountbeheer binnen de Discord-server en website. Steam ID: Voor toegang tot de FiveM-server en het identificeren van accounts. Rockstar ID: Om uw account in de FiveM-server te koppelen en te beheren. Serverlogs: Voor moderatie en handhaving van de regels. Wettelijke basis voor gegevensverzameling (AVG/GDPR): Wij verwerken deze gegevens op basis van: Toestemming van de gebruiker: U stemt in met deze Privacy Policy bij gebruik van onze diensten. Noodzakelijkheid voor dienstverlening: Zonder deze gegevens is het niet mogelijk Eindhoven Combat te gebruiken. Legitiem belang: Om misbruik, fraude of overtredingen van onze regels te voorkomen.',
    keywords: ['gegevensverzameling', 'Discord ID', 'Steam ID', 'Rockstar ID', 'serverlogs', 'AVG', 'GDPR', 'toestemming']
  },
  {
    id: 2,
    title: '2. Hoe gebruiken wij uw gegevens?',
    section: 'Gebruik van Gegevens',
    content:
      'De verzamelde gegevens worden uitsluitend gebruikt voor de volgende doeleinden: Authenticatie en toegang tot Eindhoven Combat. Handhaving van serverregels en moderatie. Beveiliging en preventie van misbruik. Verbetering van de gebruikerservaring binnen onze server en website. Communicatie via Discord, indien nodig. Wij gebruiken uw gegevens NIET voor marketingdoeleinden of externe advertenties.',
    keywords: ['authenticatie', 'moderatie', 'beveiliging', 'misbruik', 'gebruikerservaring', 'communicatie', 'marketing']
  },
  {
    id: 3,
    title: '3. Delen wij uw gegevens?',
    section: 'Delen van Gegevens',
    content:
      'Wij verkopen of delen uw gegevens niet met derden. Uw gegevens worden uitsluitend binnen Eindhoven Combat gebruikt voor de bovengenoemde doeleinden. Wettelijke verplichtingen: Wanneer dit verplicht is door autoriteiten of wetgeving. Fraude, misbruik of overtreding van regels: Als wij een gebruiker melden bij autoriteiten of FiveM-platformbeheerders. Beveiligingsredenen: Om de integriteit van Eindhoven Combat te beschermen tegen hackers en malafide spelers.',
    keywords: ['delen', 'derden', 'wettelijke verplichtingen', 'fraude', 'misbruik', 'beveiliging', 'hackers']
  },
  {
    id: 4,
    title: '4. Hoe beveiligen wij uw gegevens?',
    section: 'Beveiliging',
    content:
      'Wij nemen beveiligingsmaatregelen om uw gegevens te beschermen tegen ongeoorloofde toegang, wijziging of verlies. Versleuteling: Gevoelige gegevens worden versleuteld opgeslagen. Beperkte toegang: Alleen geautoriseerde beheerders hebben toegang tot deze gegevens. Regelmatige monitoring: We controleren onze beveiligingsmaatregelen en updaten deze wanneer nodig. Let op: Hoewel we beveiligingsmaatregelen nemen, kunnen we geen 100% garantie geven dat gegevens nooit in gevaar komen door bijvoorbeeld hacks of externe aanvallen.',
    keywords: ['beveiliging', 'versleuteling', 'toegang', 'monitoring', 'garantie', 'hacks', 'externe aanvallen']
  },
  {
    id: 5,
    title: '5. Hoe lang bewaren wij uw gegevens?',
    section: 'Bewaartermijn',
    content:
      'Wij bewaren uw gegevens alleen zolang dit nodig is voor de doeleinden die in deze Privacy Policy zijn beschreven. Specifiek: Discord-, Steam- en Rockstar-ID\'s: Zolang uw account actief is op Eindhoven Combat. Serverlogs: Tijdelijk bewaard voor beveiliging en moderatie. Niet langer nodig? Dan worden de gegevens veilig verwijderd.',
    keywords: ['bewaartermijn', 'actief account', 'serverlogs', 'veilig verwijderen', 'tijdelijk']
  },
  {
    id: 6,
    title: '6. Uw rechten en controle over uw gegevens',
    section: 'Gebruikersrechten',
    content:
      'U heeft de volgende rechten met betrekking tot uw gegevens: Inzage & correctie: U kunt opvragen welke gegevens wij van u hebben en incorrecte gegevens laten corrigeren. Verwijdering: U kunt een verzoek indienen om uw gegevens te laten verwijderen. Bezwaar maken: U kunt bezwaar maken tegen het gebruik van uw gegevens voor bepaalde doeleinden. Hoe? Maak een ticket aan in onze support discord. Let op: Het verwijderen van essentiële gegevens (zoals Discord, Steam of Rockstar ID) betekent dat u GEEN toegang meer heeft tot Eindhoven Combat. Wij kunnen gegevens niet verwijderen als dit strijdig is met beveiligings- of moderatiebelangen (zoals lopende onderzoeken naar fraude of misbruik).',
    keywords: ['rechten', 'inzage', 'correctie', 'verwijdering', 'bezwaar', 'ticket', 'essentiële gegevens', 'toegang']
  },
  {
    id: 7,
    title: '7. Wijzigingen in deze Privacy Policy',
    section: 'Wijzigingen',
    content:
      'Wij behouden ons het recht voor om deze Privacy Policy op elk moment te wijzigen. Hoe wordt u op de hoogte gesteld? Discord: Updates worden aangekondigd in onze server. Website: De meest recente versie is altijd te vinden op onze website. Blijft u Eindhoven Combat gebruiken na een wijziging? Dan gaat u automatisch akkoord met de aangepaste Privacy Policy.',
    keywords: ['wijzigingen', 'updates', 'discord', 'website', 'automatisch akkoord', 'aangepast']
  },
  {
    id: 8,
    title: '8. Contact',
    section: 'Contact',
    content:
      'Heeft u vragen of verzoeken over uw gegevens? Neem contact met ons op via: Discord: discord.gg/ehc Email: eindhovencombat@gmail.com Wij behouden ons het recht voor om niet te reageren op berichten die wij als onredelijk, bedreigend of herhaaldelijk ongegrond beschouwen.',
    keywords: ['contact', 'discord', 'email', 'vragen', 'verzoeken', 'reageren']
  }
])

const filteredSections = computed(() => {
  let filtered = sections.value
  if (selectedSection.value !== 'all') {
    filtered = filtered.filter(s => s.section.includes(selectedSection.value))
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    filtered = filtered.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.content.toLowerCase().includes(q) ||
      s.keywords.some(k => k.toLowerCase().includes(q))
    )
  }
  return filtered
})

function getSectionColor(section: string) {
  if (section.includes('Gegevensverzameling')) return 'text-red-400'
  if (section.includes('Gebruik van Gegevens')) return 'text-orange-400'
  if (section.includes('Delen van Gegevens')) return 'text-yellow-400'
  if (section.includes('Beveiliging')) return 'text-pink-400'
  if (section.includes('Bewaartermijn')) return 'text-purple-400'
  if (section.includes('Gebruikersrechten')) return 'text-blue-400'
  if (section.includes('Wijzigingen')) return 'text-green-400'
  if (section.includes('Contact')) return 'text-cyan-400'
  return 'text-gray-400'
}

async function copySection(sectionText: string) {
  try {
    await navigator.clipboard.writeText(sectionText)
    showNotification({ message: 'Sectie gekopieerd naar klembord!', variant: 'success' })
  } catch {
    showNotification({ message: 'Kopiëren mislukt. Probeer opnieuw.', variant: 'error' })
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#0a1020] text-white">
    <div class="container mx-auto px-4 py-16">
      <!-- Header -->
      <PageHeader title="Eindhoven" highlight="Privacy Policy">
        <p>
          Wij hechten veel waarde aan de privacy en bescherming van onze gebruikers. In deze Privacy Policy leggen we uit welke gegevens we verzamelen, hoe we deze gebruiken en beveiligen.
        </p>
        <p>
          Door gebruik te maken van onze server en bijbehorende diensten, stemt u in met deze Privacy Policy.
        </p>
      </PageHeader>

        <!-- Secties -->
        <div class="max-w-7xl mx-auto mt-12">
          <h2 class="text-3xl font-bold mb-6 text-center">
            Eindhoven <span class="text-[#bc13fe]">Privacy</span>
          </h2>
          
          <!-- Zoek & resultaten -->
          <FilterToolbar
            :search="searchQuery"
            :selected="selectedSection"
            :options="[
              { value: 'all', label: 'Alle Secties' },
              { value: 'Gegevensverzameling', label: 'Gegevensverzameling' },
              { value: 'Gebruik van Gegevens', label: 'Gebruik van Gegevens' },
              { value: 'Delen van Gegevens', label: 'Delen van Gegevens' },
              { value: 'Beveiliging', label: 'Beveiliging' },
              { value: 'Bewaartermijn', label: 'Bewaartermijn' },
              { value: 'Gebruikersrechten', label: 'Gebruikersrechten' },
              { value: 'Wijzigingen', label: 'Wijzigingen' },
              { value: 'Contact', label: 'Contact' }
            ]"
            :total="sections.length"
            :filtered="filteredSections.length"
            result-label="privacy onderwerpen"
            search-placeholder="Zoek naar privacy onderwerpen..."
            :items="filteredSections.map(s => ({ id: s.id, title: s.title, meta: s.section, content: s.content, keywords: s.keywords }))"
            :get-meta-color="getSectionColor"
            :on-copy="(text: string) => copySection(text)"
            empty-title="Geen privacy onderwerpen gevonden"
            empty-subtitle="Probeer andere zoektermen of selecteer een andere sectie"
            :show-reset="true"
            @update:search="(val: string) => (searchQuery = val)"
            @update:selected="(val: string) => (selectedSection = val)"
            @reset="() => { searchQuery = ''; selectedSection = 'all' }"
          />
          
          
        </div>
      </div>
    </div>
</template>
