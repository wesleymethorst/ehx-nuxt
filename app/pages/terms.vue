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

// Voorwaarden data
const sections = ref<Section[]>([
  {
    id: 1,
    title: '1. Acceptatie van de Voorwaarden',
    section: 'Algemeen',
    content:
      'Door toegang te verkrijgen tot of gebruik te maken van Eindhoven Combat, gaat u akkoord met deze Terms en eventuele aanvullende voorwaarden die hierin worden genoemd. Als u niet akkoord gaat, mag u niet deelnemen aan de server en dient u het spel onmiddellijk te verlaten. Eindhoven Combat is een vrijwillig project en biedt zijn diensten zonder enige garantie. Wij zijn niet verantwoordelijk voor verlies van voortgang, aankopen, of andere schade door het gebruik van de server. Door deel te nemen aan Eindhoven Combat, erkent u dat het gebruik op eigen risico is.',
    keywords: ['acceptatie', 'voorwaarden', 'garantie', 'eigen risico', 'verlies']
  },
  {
    id: 2,
    title: '2. Gebruik van de Diensten',
    section: 'Leeftijd & Deelname',
    content:
      'Eindhoven Combat is een community binnen FiveM, een modificatie van Grand Theft Auto V. GTA V heeft een officiële leeftijdsclassificatie van 18+ volgens PEGI en andere internationale standaarden. Door gebruik te maken van Eindhoven Combat, verklaart en garandeert u dat u ten minste 18 jaar oud bent, of de wettelijke leeftijd in uw rechtsgebied heeft bereikt om deze game te spelen. Wij zijn niet verantwoordelijk voor gebruikers die zich onjuist voordoen over hun leeftijd. Deelname aan Eindhoven Combat is volledig vrijwillig. Wij zijn niet verantwoordelijk voor enige sociale, psychologische of financiële gevolgen van deelname.',
    keywords: ['leeftijd', '18+', 'PEGI', 'vrijwillig', 'FiveM', 'GTA V']
  },
  {
    id: 3,
    title: '3. Beschikbaarheid van de Server',
    section: 'Server & Beschikbaarheid',
    content:
      'Eindhoven Combat kan te allen tijde offline zijn vanwege onderhoud, technische storingen of andere onvoorziene omstandigheden. Wij zijn niet aansprakelijk voor enige schade of verlies als gevolg van downtime van de server. In het geval dat Eindhoven Combat wordt beëindigd, om welke reden dan ook, wordt er geen restitutie verleend voor eerdere donaties of aankopen. Door een betaling te doen, erkent u dat de beschikbaarheid van de server niet gegarandeerd is.',
    keywords: ['downtime', 'onderhoud', 'storingen', 'beëindiging', 'restitutie', 'beschikbaarheid']
  },
  {
    id: 4,
    title: '4. Betalingen en Terugbetalingen',
    section: 'Financieel',
    content:
      'Alle aankopen van digitale producten of diensten binnen Eindhoven Combat zijn definitief. Er worden geen terugbetalingen verstrekt, tenzij wettelijk vereist. Door een aankoop te doen, erkent u dat de transactie definitief is en geen recht op terugbetaling biedt. Donaties en aankopen geven geen speciale rechten of immuniteit tegen moderatieacties. Overtreding van de regels kan leiden tot sancties, ongeacht eerdere donaties of aankopen. Het kopen van een unban of unmute geeft geen garantie op een permanente toegang tot Eindhoven Combat (server of voicechat). Indien een speler na een unban of unmute opnieuw de regels overtreedt, kan dit leiden tot een nieuwe ban of mute zonder recht op restitutie. Alle moderatieacties, inclusief bans, unbans, mutes en unmutes, zijn definitief en worden naar eigen inzicht uitgevoerd door de beheerders. Het recht om een unban of unmute te kopen kan op elk moment worden gewijzigd of ingetrokken.',
    keywords: ['aankopen', 'terugbetalingen', 'definitief', 'donaties', 'unban', 'unmute', 'moderatie']
  },
  {
    id: 5,
    title: '5. Prijswijzigingen',
    section: 'Financieel',
    content:
      'Wij behouden ons het recht voor om op elk moment prijzen te wijzigen zonder voorafgaande kennisgeving. Het is uw verantwoordelijkheid om de actuele prijzen te controleren voordat u een aankoop doet.',
    keywords: ['prijswijzigingen', 'prijzen', 'kennisgeving', 'aankoop']
  },
  {
    id: 6,
    title: '6. Wijzigingen in de Voorwaarden',
    section: 'Algemeen',
    content:
      'Wij behouden ons het recht voor om deze Terms op elk moment te wijzigen. Wijzigingen worden onmiddellijk van kracht zodra ze worden gepubliceerd. Voortgezet gebruik van Eindhoven Combat betekent dat u akkoord gaat met de gewijzigde voorwaarden. Door de server te blijven gebruiken na een update, gaat u automatisch akkoord met de gewijzigde voorwaarden, ongeacht eerdere donaties of aankopen.',
    keywords: ['wijzigingen', 'voorwaarden', 'update', 'automatisch', 'akkoord']
  },
  {
    id: 7,
    title: '7. Intellectueel Eigendom',
    section: 'Rechten',
    content:
      'Alle content, scripts en andere digitale eigendommen die via Eindhoven Combat worden aangeboden, zijn auteursrechtelijk beschermd. Het is verboden om onze inhoud te kopiëren, verspreiden, wijzigen of opnieuw te verkopen zonder onze uitdrukkelijke schriftelijke toestemming.',
    keywords: ['intellectueel eigendom', 'auteursrecht', 'content', 'scripts', 'kopiëren', 'verspreiden']
  },
  {
    id: 8,
    title: '8. Verboden Activiteiten',
    section: 'Gebruik',
    content:
      'Het is verboden om Eindhoven Combat te gebruiken voor illegale of ongeoorloofde doeleinden, waaronder maar niet beperkt tot: Het verspreiden van schadelijke software of malware. Het misbruiken van bugs of exploits. Het uitvoeren van fraude, identiteitsdiefstal of andere misleidende praktijken. Het overtreden van lokale, nationale of internationale wetten. Overtredingen kunnen leiden tot een permanente ban en juridische stappen.',
    keywords: ['verboden', 'illegale activiteiten', 'malware', 'exploits', 'fraude', 'identiteitsdiefstal', 'wetten']
  },
  {
    id: 9,
    title: '9. Aansprakelijkheidsbeperking',
    section: 'Juridisch',
    content:
      "Eindhoven Combat biedt zijn diensten 'zoals ze zijn' en zonder enige expliciete of impliciete garanties. Wij zijn niet aansprakelijk voor enige schade, verlies of kosten die voortvloeien uit het gebruik of de onmogelijkheid om onze diensten te gebruiken. Wij zijn niet aansprakelijk voor enige schade aan hardware, software, gegevensverlies, of andere indirecte schade die voortvloeit uit het gebruik van Eindhoven Combat, inclusief maar niet beperkt tot crashes, bugs, hacks of beveiligingsproblemen.",
    keywords: ['aansprakelijkheid', 'garanties', 'schade', 'verlies', 'hardware', 'software', 'gegevensverlies']
  },
  {
    id: 10,
    title: '10. Schadeloosstelling',
    section: 'Juridisch',
    content:
      'U stemt ermee in Eindhoven Combat en zijn beheerders te vrijwaren van en te verdedigen tegen alle claims, schade, verliezen, kosten en uitgaven (inclusief juridische kosten) die voortvloeien uit uw gebruik van de diensten of uw schending van deze voorwaarden.',
    keywords: ['schadeloosstelling', 'claims', 'juridische kosten', 'schending', 'verdedigen']
  },
  {
    id: 11,
    title: '11. Accountschorsing en Beëindiging',
    section: 'Account',
    content:
      'Wij behouden ons het recht voor om op elk moment en zonder voorafgaande kennisgeving accounts te schorsen of te beëindigen als wij vermoeden dat er sprake is van overtredingen van deze voorwaarden, misbruik van de diensten of ander ongewenst gedrag. Ook behouden wij ons het recht voor om accounts te schorsen of te beëindigen zonder verdere uitleg. Er wordt geen compensatie of restitutie verstrekt voor gebande accounts. Door Eindhoven Combat te gebruiken, erkent u dat alle moderatieacties definitief zijn en geen aanleiding geven tot juridische stappen, restitutie of verdere discussie.',
    keywords: ['account', 'schorsing', 'beëindiging', 'moderatieacties', 'compensatie', 'restitutie']
  },
  {
    id: 12,
    title: '12. Overmacht',
    section: 'Juridisch',
    content:
      'Wij zijn niet verantwoordelijk voor enige vertraging of tekortkoming in onze diensten als gevolg van omstandigheden buiten onze redelijke controle, zoals natuurrampen, pandemieën, serverstoringen, oorlogen of overheidsmaatregelen.',
    keywords: ['overmacht', 'natuurrampen', 'pandemieën', 'serverstoringen', 'overheidsmaatregelen']
  },
  {
    id: 13,
    title: '13. Toepasselijk Recht',
    section: 'Juridisch',
    content:
      'Deze voorwaarden worden beheerst door en geïnterpreteerd in overeenstemming met de wetgeving van Nederland. Geschillen die voortvloeien uit deze voorwaarden zullen exclusief worden behandeld door de bevoegde rechtbanken in Nederland.',
    keywords: ['toepasselijk recht', 'Nederland', 'wetgeving', 'geschillen', 'rechtbanken']
  },
  {
    id: 14,
    title: '14. Stopzetting van Eindhoven Combat',
    section: 'Server & Beschikbaarheid',
    content:
      'Wij behouden ons het recht voor om Eindhoven Combat op elk moment en om welke reden dan ook te beëindigen. In het geval van een stopzetting van de server of de diensten: Heeft u geen recht op restitutie van gedane donaties, aankopen of in-game uitgaven. Kan er geen aanspraak worden gemaakt op compensatie voor verloren speeltijd, voortgang of in-game bezittingen. Erkent u dat het gebruik van de diensten vrijwillig is en zonder enige garantie op blijvende beschikbaarheid. Door deel te nemen aan Eindhoven Combat, gaat u ermee akkoord dat wij niet aansprakelijk zijn voor enig verlies van voortgang of speeltijd als de server stopt. Na stopzetting van Eindhoven Combat is er geen garantie op toegang tot opgeslagen voortgang, backups of enige in-game gegevens. Indien Eindhoven Combat wordt overgedragen aan een andere partij, blijven deze voorwaarden van kracht totdat anders aangegeven.',
    keywords: ['stopzetting', 'beëindiging', 'restitutie', 'compensatie', 'speeltijd', 'voortgang', 'backups']
  },
  {
    id: 15,
    title: '15. Game Updates & Voortgangsverlies',
    section: 'Game & Updates',
    content:
      'Wij behouden ons het recht voor om de game, economie, balans en functionaliteiten te wijzigen of updaten. Hierdoor kan voortgang, in-game bezittingen of statistieken wijzigen of verdwijnen. Wij zijn niet aansprakelijk voor enig verlies van in-game voortgang of content als gevolg van updates, bugfixes, resets of andere wijzigingen.',
    keywords: ['updates', 'economie', 'balans', 'voortgangsverlies', 'bugfixes', 'resets', 'wijzigingen']
  },
  {
    id: 16,
    title: '16. Privacy & Gegevensbescherming',
    section: 'Privacy',
    content:
      'Wij verzamelen en verwerken alleen de minimaal benodigde gegevens voor het functioneren van onze diensten. Wij delen geen persoonlijke informatie met derden, tenzij wettelijk verplicht. Door Eindhoven Combat te gebruiken, gaat u akkoord met onze manier van gegevensverwerking. Voor meer informatie zie Privacy Policy.',
    keywords: ['privacy', 'gegevensbescherming', 'persoonlijke informatie', 'gegevensverwerking', 'derden']
  },
  {
    id: 17,
    title: '17. Gedrag van Gebruikers',
    section: 'Gebruik',
    content:
      'Eindhoven Combat is niet verantwoordelijk voor de acties, uitlatingen of gedragingen van individuele spelers. Wij modereren de server naar eigen inzicht, maar kunnen geen volledige controle uitoefenen over interacties tussen spelers. Indien u ongewenst gedrag ervaart, wordt u aangeraden dit te melden bij de beheerders.',
    keywords: ['gedrag', 'spelers', 'moderatie', 'interacties', 'ongewenst gedrag', 'melden']
  },
  {
    id: 18,
    title: '18. Gegevensverlies door Eigen Handelingen',
    section: 'Gegevens',
    content:
      'Eindhoven Combat is niet verantwoordelijk voor het verlies van voortgang, instellingen, of enige andere gegevens als gevolg van handelingen aan de zijde van de gebruiker. Dit omvat, maar is niet beperkt tot: Het resetten van uw computer of apparaat. Het kopen van een nieuwe pc, laptop of ander apparaat. Het verwijderen van lokale of cloudopgeslagen gamegegevens. Het opnieuw installeren van FiveM, GTA V of gerelateerde software. Hardware- of softwareproblemen aan de kant van de gebruiker. Door gebruik te maken van Eindhoven Combat, erkent u dat het veiligstellen en onderhouden van uw eigen gegevens en instellingen volledig uw eigen verantwoordelijkheid is.',
    keywords: ['gegevensverlies', 'eigen handelingen', 'reset', 'nieuwe pc', 'cloudopgeslagen', 'opnieuw installeren', 'hardware', 'software']
  },
  {
    id: 19,
    title: '19. Contactgegevens',
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
  if (section.includes('Juridisch')) return 'text-red-400'
  if (section.includes('Financieel')) return 'text-orange-400'
  if (section.includes('Account')) return 'text-yellow-400'
  if (section.includes('Privacy')) return 'text-pink-400'
  if (section.includes('Contact')) return 'text-purple-400'
  if (section.includes('Gebruik')) return 'text-blue-400'
  if (section.includes('Algemeen')) return 'text-green-400'
  if (section.includes('Server')) return 'text-cyan-400'
  if (section.includes('Game')) return 'text-indigo-400'
  if (section.includes('Gegevens')) return 'text-emerald-400'
  if (section.includes('Leeftijd')) return 'text-amber-400'
  if (section.includes('Rechten')) return 'text-rose-400'
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
      <PageHeader title="Eindhoven" highlight="Terms &amp; Conditions">
        <p>
          Deze voorwaarden ("Terms") zijn van toepassing op uw gebruik van Eindhoven Combat, de game server en alle gerelateerde diensten. Door toegang te verkrijgen tot onze server, communityplatformen en bijbehorende functionaliteiten, accepteert u deze voorwaarden volledig.
        </p>
        <p>
          Indien u niet akkoord gaat met deze voorwaarden, dient u geen gebruik te maken van de server of bijbehorende diensten.
        </p>
      </PageHeader>

        <!-- Secties -->
        <div class="max-w-7xl mx-auto mt-12">
          <h2 class="text-3xl font-bold mb-6 text-center">
            Eindhoven <span class="text-[#bc13fe]">Voorwaarden</span>
          </h2>
          
          <!-- Zoek & resultaten -->
          <FilterToolbar
            :search="searchQuery"
            :selected="selectedSection"
            :options="[
              { value: 'all', label: 'Alle Secties' },
              { value: 'Algemeen', label: 'Algemeen' },
              { value: 'Leeftijd', label: 'Leeftijd & Deelname' },
              { value: 'Server', label: 'Server & Beschikbaarheid' },
              { value: 'Financieel', label: 'Financieel' },
              { value: 'Rechten', label: 'Rechten' },
              { value: 'Gebruik', label: 'Gebruik' },
              { value: 'Juridisch', label: 'Juridisch' },
              { value: 'Account', label: 'Account' },
              { value: 'Privacy', label: 'Privacy' },
              { value: 'Contact', label: 'Contact' },
              { value: 'Game', label: 'Game & Updates' },
              { value: 'Gegevens', label: 'Gegevens' }
            ]"
            :total="sections.length"
            :filtered="filteredSections.length"
            result-label="voorwaarden"
            search-placeholder="Zoek naar voorwaarden..."
            :items="filteredSections.map(s => ({ id: s.id, title: s.title, meta: s.section, content: s.content, keywords: s.keywords }))"
            :get-meta-color="getSectionColor"
            :on-copy="(text: string) => copySection(text)"
            empty-title="Geen voorwaarden gevonden"
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


