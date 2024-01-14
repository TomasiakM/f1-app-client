<template>
  <div>
    <div
      class="sticky top-0 left-0 w-full bg-card border-b border-b-gray p-2 z-40"
    >
      <div class="container mx-auto">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-xl font-semibold">
            {{ brand }}
          </NuxtLink>

          <button @click="isOpen = !isOpen" class="md:hidden">
            <SvgHamburger class="w-6 h-6" />
          </button>

          <div class="hidden md:flex items-center gap-2">
            <NuxtLink to="/klasyfikacja" class="nav-link">
              Klasyfikacja
            </NuxtLink>
            <NuxtLink to="/kalendarz" class="nav-link">Kalendarz</NuxtLink>
            <NuxtLink to="/kierowcy" class="nav-link">Kierowcy</NuxtLink>
            <NuxtLink to="/zespoly" class="nav-link">Zespoły</NuxtLink>
            <NuxtLink to="/tory" class="nav-link">Tory</NuxtLink>
            <NuxtLink
              v-if="userStore.user?.isAdmin"
              to="/panel"
              class="bg-primary hover:bg-primary-hover text-white duration-200 transition-colors rounded px-2"
            >
              Panel
            </NuxtLink>

            <div class="flex items-center pl-4 border-l border-l-gray">
              <div
                v-if="userStore.isAuthorized"
                class="flex items-center gap-1"
              >
                <NuxtLink to="/ustawienia/haslo" class="font-semibold">
                  {{ userStore.getUser?.username }}
                </NuxtLink>

                <button @click="userStore.logout()">
                  <SvgLogout class="w-5 h-5" />
                </button>
              </div>
              <div v-else class="flex items-center gap-1">
                <NuxtLink
                  to="/logowanie"
                  class="nav-button-link bg-primary hover:bg-primary-hover text-white"
                >
                  Logowanie
                </NuxtLink>
                <NuxtLink
                  to="/rejestracja"
                  class="nav-button-link bg-secondary hover:bg-secondary-hover text-white"
                >
                  Rejestracja
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheMobileNav
      v-if="isOpen"
      class="md:hidden z-40"
      @close="isOpen = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore";

const config = useRuntimeConfig();
const userStore = useUserStore();

const { brand } = config.public;

const isOpen = ref(false);
</script>

<style lang="postcss" scoped>
.nav-link {
  @apply px-2 font-semibold hover:text-primary transition-colors duration-200;
}

.nav-button-link {
  @apply px-3 py-1 font-semibold rounded-full transition-colors duration-200;
}
</style>
