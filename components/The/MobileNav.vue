<template>
  <div class="fixed top-0 left-0 w-full h-full bg-background p-2 overflow-auto">
    <div class="container mx-auto">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-semibold">
          {{ brand }}
        </NuxtLink>

        <button @click="$emit('close')">
          <SvgClose class="w-6 h-6" />
        </button>
      </div>
    </div>

    <div class="container mx-auto mt-6">
      <div class="grid grid-cols-1 gap-2">
        <div
          v-if="userStore.isAuthorized"
          class="flex items-center justify-end gap-1"
        >
          <div class="font-semibold">
            {{ userStore.getUser?.username }}
          </div>

          <button @click="userStore.logout()">
            <SvgLogout class="w-6 h-6" />
          </button>
        </div>
        <div v-else class="grid grid-cols-2 gap-1">
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

        <RaceWeekNext class="my-4" />
        <RaceWeekRating class="mb-4" />

        <NuxtLink to="/klasyfikacja" class="nav-link">Klasyfikacja</NuxtLink>
        <NuxtLink to="/kalendarz" class="nav-link">Kalendarz</NuxtLink>
        <NuxtLink to="/kierowcy" class="nav-link">Kierowcy</NuxtLink>
        <NuxtLink to="/zespoly" class="nav-link">Zespoły</NuxtLink>
        <NuxtLink to="/tory" class="nav-link">Tory</NuxtLink>
        <NuxtLink
          v-if="userStore.user?.isAdmin"
          to="/panel"
          class="nav-link !bg-primary hover:bg-primary-hover text-white duration-200 transition-colors rounded px-2"
        >
          Panel
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore";

interface IEmits {
  (e: "close"): void;
}

const emits = defineEmits<IEmits>();

const userStore = useUserStore();
const config = useRuntimeConfig();
const route = useRoute();

const { brand } = config.public;

watch(
  () => route.fullPath,
  () => {
    emits("close");
  }
);
</script>

<style lang="postcss">
.nav-link {
  @apply rounded bg-card font-semibold text-center p-1;
}

.nav-button-link {
  @apply rounded text-center font-semibold transition-colors duration-200 p-1;
}
</style>
