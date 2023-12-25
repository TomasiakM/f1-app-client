<template>
  <div
    class="bg-card rounded p-2"
    v-if="!ratingStore.isLoading && ratingStore.rating && !ratingStore.isRated"
  >
    <div class="grid grid-cols-1 gap-2">
      <div>
        <div class="text-lg text-center font-semibold">
          Zakończono
          <NuxtLink
            :to="`/kalendarz/${ratingStore.rating.raceWeek.season.year}/${ratingStore.rating.raceWeek.slug}`"
            class="text-primary"
          >
            {{ ratingStore.rating.raceWeek.name }}
          </NuxtLink>
        </div>
        <div class="text-center">Oceń kierowców z zeszłych zawodów!</div>

        <div class="text-center text-xs">
          Masz czas do
          <span class="font-semibold">
            {{ useDate(ratingStore.rating.finish).dateWithTime }}
          </span>
        </div>
      </div>

      <AppButtonLink to="/oceny" class="mt-2">Oceń</AppButtonLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRatingStore } from "@/stores/useRatingStore";

const ratingStore = useRatingStore();
</script>
