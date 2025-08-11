<template>
  <footer class="bg-[#0a1020] text-white border-t border-white/10 mt-0">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <!-- Brand Section -->
        <section class="lg:col-span-1">
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <img src="/assets/icons/ehc.svg" alt="EHC logo" class="h-10 w-10" />
              <span class="text-lg font-semibold">Eindhoven Combat</span>
            </div>
            <p class="text-sm text-white/80 leading-relaxed">
              Waar jij jouw aim kunt perfectioneren voor je favoriete roleplay-stad, in een gezellige en competitieve sfeer! Grijp je kans nu!
            </p>
          </div>
        </section>

        <!-- Links Section -->
        <section class="lg:col-span-2">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Partners -->
            <div>
              <h3 class="text-base font-semibold mb-3">Partners</h3>
              <ul class="space-y-3 text-white/80 leading-6">
                <li>
                  <a href="https://electron-services.com" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 whitespace-nowrap transition-colors duration-200 hover:text-[#b78df1]">
                    <img src="/assets/icons/electron.svg" alt="Electron Services logo" class="h-6 w-6 object-contain transition-transform duration-200 group-hover:scale-110" />
                    <span>Electron Services</span>
                  </a>
                </li>
                <li>
                  <a href="https://mc-node.net" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 whitespace-nowrap transition-colors duration-200 hover:text-[#b78df1]">
                    <img src="/assets/icons/mcnode.svg" alt="MC-NODE logo" class="h-6 w-6 object-contain transition-transform duration-200 group-hover:scale-110" />
                    <span>MC-Node</span>
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/zuiderveen" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 whitespace-nowrap transition-colors duration-200 hover:text-[#b78df1]">
                    <img src="/assets/icons/zuiderveen.svg" alt="ZuiderVeen logo" class="h-6 w-6 object-contain transition-transform duration-200 group-hover:scale-110" />
                    <span>ZuiderVeen</span>
                  </a>
                </li>
              </ul>
            </div>

            <!-- Discord -->
            <div>
              <h3 class="text-base font-semibold mb-3">Discord</h3>
              <ul class="space-y-2 text-white/80 leading-6">
                <li>
                  <a href="#" class="group flex items-center gap-2 whitespace-nowrap transition-colors duration-200 hover:text-[#b78df1]">
                    <img src="/assets/icons/ehc.svg" alt="EHC" class="h-6 w-6 object-contain transition-transform duration-200 group-hover:scale-110" />
                    <span>Eindhoven Combat</span>
                  </a>
                </li>
                <li>
                  <a href="#" class="group flex items-center gap-2 whitespace-nowrap transition-colors duration-200 hover:text-[#b78df1]">
                    <img src="/assets/icons/support.svg" alt="Support" class="h-6 w-6 object-contain transition-transform duration-200 group-hover:scale-110" />
                    <span>Eindhoven Support</span>
                  </a>
                </li>
              </ul>
            </div>

            <!-- Legal -->
            <div>
              <h3 class="text-base font-semibold mb-3">Legal</h3>
              <ul class="space-y-2 text-white/80 leading-6">
                <li>
                  <NuxtLink to="/terms" class="group flex items-center gap-2 whitespace-nowrap transition-colors duration-200 hover:text-[#b78df1]">
                    <Icon name="mdi:file-document-outline" class="h-6 w-6 text-white/70 transition-colors duration-200 group-hover:text-[#b78df1]" />
                    <span>Terms &amp; Conditions</span>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/privacy" class="group flex items-center gap-2 whitespace-nowrap transition-colors duration-200 hover:text-[#b78df1]">
                    <Icon name="material-symbols:shield-outline" class="h-6 w-6 text-white/70 transition-colors duration-200 group-hover:text-[#b78df1]" />
                    <span>Privacy Policy</span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div class="mt-10 pt-6 border-t border-white/10 text-xs text-white/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {{ new Date().getFullYear() }} Eindhoven Combat. All rights reserved.</p>
        <div>
          <span class="text-gray-400">Powered by </span>
          <span class="bg-gradient-to-r from-[#6a00ff] to-[#ff00ff] bg-clip-text text-transparent font-semibold">Eindhoven Combat</span>
        </div>
      </div>
    </div>
  </footer>
</template>


