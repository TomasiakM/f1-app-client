<template>
  <div class="absolute top-0 left-0 w-full bg-card border-b border-b-gray p-2">
    <div class="container mx-auto">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-semibold">
          {{ brand }}
        </NuxtLink>
        <div class="hidden md:flex items-center gap-2">
          <NuxtLink to="/" class="nav-link">Kalendarz</NuxtLink>
          <NuxtLink to="/" class="nav-link">Kierowcy</NuxtLink>
          <NuxtLink to="/" class="nav-link">Zespoły</NuxtLink>
          <NuxtLink to="/" class="nav-link">Tory</NuxtLink>
          <div class="flex items-center gap-1 ml-2">
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
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const { brand } = config.public;
</script>

<style lang="postcss" scoped>
.nav-link {
  @apply px-2 font-semibold hover:text-primary transition-colors duration-200;
}

.nav-button-link {
  @apply px-3 py-1 font-semibold rounded-full transition-colors duration-200;
}
</style>
