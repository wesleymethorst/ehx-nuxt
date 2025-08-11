<template>
    <div>

        <!-- Hero Banner Section -->
        <section class="relative w-full h-[40rem] overflow-hidden">
            <img 
            src="~/assets/images/background.png" 
            alt="Eindhoven Combat Background" 
            class="absolute inset-0 w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/25 flex flex-col items-center justify-center px-4 text-center">
    
            <!-- Main Titles -->
            <h1 class="text-5xl md:text-7xl font-bold text-white mb-3 drop-shadow-2xl">Speel mee op</h1>
            <h2 class="text-6xl md:text-8xl font-extrabold mb-8 text-[#bc13fe] drop-shadow-xl">
                Eindhoven Combat
            </h2>
    
            <!-- Subtitle -->
            <p class="text-xl md:text-2xl text-gray-200 max-w-3xl mb-10 drop-shadow-lg leading-relaxed">
                Waar jij jouw aim kunt perfectioneren voor je favoriete roleplay-stad, in een gezellige en competitieve sfeer!<br />
                <span class="font-semibold text-[#bc13fe]">Grijp je kans nu!</span>
            </p>
    
            <!-- Call to action button -->
            <a 
                href="https://cfx.re/join/k7ojyv"
                target="_blank"
                rel="noopener noreferrer"
                class="px-8 py-4 text-white font-bold text-lg rounded-lg border-2 border-[#bc13fe] hover:bg-[#bc13fe] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-xl inline-block"
            >
                Speel mee!
            </a>
            </div>
        </section>
    
        <!-- Features Section -->
        <section class="bg-[#0a1020] pt-12 pb-0">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-3 gap-8 mb-0">
            <!-- Custom Minigames -->
            <div class="bg-[#0a1020] rounded-lg p-6 border border-gray-700 hover:border-[#bc13fe]/30 transition-all duration-300">
                <div class="text-center">
                <div class="text-3xl mb-3 text-[#bc13fe]">
                    <Icon name="mdi:target" class="h-12 w-12" />
                </div>
                <h3 class="text-xl font-bold text-white mb-3">Custom Minigames</h3>
                <p class="text-gray-300 text-sm">
                    Ontdek onze leuke minigames: oefen op spannende maps, verzamel loot en respawn, allemaal te starten in onze lobby systeem!
                </p>
                </div>
            </div>

            <!-- Custom Ingame Shop -->
            <div class="bg-[#0a1020] rounded-lg p-6 border border-gray-700 hover:border-[#bc13fe]/30 transition-all duration-300">
                <div class="text-center">
                <div class="text-3xl mb-3 text-[#bc13fe]">
                    <Icon name="mdi:shopping" class="h-12 w-12" />
                </div>
                <h3 class="text-xl font-bold text-white mb-3">Custom Ingame Shop</h3>
                <p class="text-gray-300 text-sm">
                    Bezoek onze in-game shop met /shop om items te kopen met coins of gems, die je zowel in-game als buiten het spel kunt verkrijgen!
                </p>
                </div>
            </div>

            <!-- Custom Wapenmenu -->
            <div class="bg-[#0a1020] rounded-lg p-6 border border-gray-700 hover:border-[#bc13fe]/30 transition-all duration-300">
                <div class="text-center">
                <div class="text-3xl mb-3 text-[#bc13fe]">
                    <Icon name="mdi:sword-cross" class="h-12 w-12" />
                </div>
                <h3 class="text-xl font-bold text-white mb-3">Custom Wapenmenu</h3>
                <p class="text-gray-300 text-sm">
                    Activeer ons unieke wapenmenu in-game met /wapens of F10 om jouw favoriete wapens te selecteren en je uitrusting te personaliseren!
                </p>
                </div>
            </div>
            </div>
        </div>
        </section>

        <!-- Discord Links Section -->
        <section class="bg-[#0a1020] pt-12 pb-0">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="mt-0 mb-0">
            <h2 class="text-3xl font-bold text-white text-center mb-8">Join <span class="text-[#bc13fe]">Community</span></h2>
            <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <!-- Eindhoven Combat Discord -->
                <div class="bg-[#0a1020] rounded-lg p-8 border border-gray-700 hover:border-[#bc13fe]/30 transition-all duration-300">
                <div class="text-center">
                    <div class="mb-4">
                    <img src="/assets/icons/ehc.svg" alt="Eindhoven Combat Logo" class="h-16 w-auto mx-auto" />
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Eindhoven Combat</h3>
                    <p class="text-gray-300 mb-2">
                    Word lid van onze Discord server voor Eindhoven Combat. Praat met andere spelers, krijg updates en neem deel aan events!
                    </p>
                    <div class="flex items-center justify-center gap-4 mb-4">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span class="text-gray-400 font-semibold">
                        {{ discordStats.length > 0 ? discordStats[0].online : '1' }} online
                        </span>
                    </div>
                    <div class="w-1 h-6 bg-gray-600"></div>
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-gray-500 rounded-full"></div>
                        <span class="text-gray-400 font-bold text-lg">
                        {{ discordStats.length > 0 ? discordStats[0].total : '10' }} leden
                        </span>
                    </div>
                    </div>
                    <p class="text-gray-500 text-sm text-center mb-6">Gemaakt op jan 2025</p>
                    <a 
                    href="https://discord.gg/ehc" 
                    target="_blank"
                    class="inline-flex items-center gap-2 px-8 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                    <Icon name="mdi:discord" class="text-lg" />
                    <span>Join Server</span>
                    </a>
                </div>
                </div>

                <!-- Eindhoven Support Discord -->
                <div class="bg-[#0a1020] rounded-lg p-8 border border-gray-700 hover:border-[#bc13fe]/30 transition-all duration-300">
                <div class="text-center">
                    <div class="mb-4">
                    <img src="/assets/icons/support.svg" alt="Support Logo" class="h-16 w-auto mx-auto" />
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Eindhoven Support</h3>
                    <p class="text-gray-300 mb-2">
                    Heb je hulp nodig? Join onze support Discord voor technische ondersteuning, vragen en hulp van ons team!
                    </p>
                    <div class="flex items-center justify-center gap-4 mb-4">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span class="text-gray-400 font-semibold">
                        {{ discordStats.length > 1 ? discordStats[1].online : '1' }} online
                        </span>
                    </div>
                    <div class="w-1 h-6 bg-gray-600"></div>
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-gray-500 rounded-full"></div>
                        <span class="text-gray-400 font-bold text-lg">
                        {{ discordStats.length > 1 ? discordStats[1].total : '10' }} leden
                        </span>
                    </div>
                    </div>
                    <p class="text-gray-500 text-sm text-center mb-6">Gemaakt op jan 2025</p>
                    <a 
                    href="https://discord.gg/wsSD6pPD6p" 
                    target="_blank"
                    class="inline-flex items-center gap-2 px-8 py-3 bg-[#5865F2] hover:bg-[#5865F2] text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                    <Icon name="mdi:discord" class="text-lg" />
                    <span>Join Support</span>
                    </a>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        
        <!-- YouTube Video Section -->
        <section class="bg-[#0a1020] pt-12 pb-12">
          <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="mt-0 text-center">
              <h2 class="text-3xl font-bold text-white mb-8">Bekijk <span class="text-[#bc13fe]">Video</span></h2>
              <div class="max-w-4xl mx-auto">
                <div class="relative w-full" style="padding-bottom: 56.25%;">
                  <iframe 
                    src="https://www.youtube.com/embed/lI1DmaoTRIs" 
                    title="Eindhoven Combat Intro"
                    class="absolute top-0 left-0 w-full h-full rounded-lg"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
</template>
  
<script setup>
const discordStats = ref([])
</script>