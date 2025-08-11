<template>
    <Transition name="slide-up" @after-leave="onLeave">
      <div v-if="isVisible" class="fixed inset-0 z-[9999] bg-[#0a1020] flex items-center justify-center">
        <!-- Background image -->
        <img 
          src="~/assets/images/background.png" 
          alt="Background" 
          class="absolute inset-0 w-full h-full object-cover"
        />
        
        <!-- Gradient overlay for better readability -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>
  
        <!-- Main content - logo in center -->
        <div class="relative z-10 flex flex-col items-center justify-center">
          <img src="~/assets/icons/ehc.svg" alt="Eindhoven Combat" class="h-24 w-24 md:h-32 md:w-32" />
        </div>
  
        <!-- Bottom branding -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <p class="text-sm">
                <span class="text-gray-400">Powered by </span>
                <span class="bg-gradient-to-r from-[#6a00ff] to-[#ff00ff] bg-clip-text text-transparent font-semibold">Eindhoven Combat</span>
            </p>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup lang="ts">
  const isVisible = ref(false)

  // Globale state per sessie (tot een pagina refresh). Gedeeld tussen routes.
  const splashShown = useState<boolean>('ehc-splash-shown', () => false)

  onMounted(() => {
    if (!splashShown.value) {
      isVisible.value = true
      setTimeout(() => {
        isVisible.value = false
      }, 3000)
      splashShown.value = true
    } else {
      isVisible.value = false
    }
  })

  const onLeave = () => {
    // Transition afgerond
  }
  </script>
  
  <style scoped>
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.5s ease;
  }
  
  .slide-up-enter-from {
    opacity: 0;
    transform: translateY(20px);
  }
  
  .slide-up-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
  </style>