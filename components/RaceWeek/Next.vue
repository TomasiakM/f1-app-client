<template>
  <div class="bg-card rounded p-2">
    <div v-if="nextRaceWeekStore.error">
      <AppButton @click="nextRaceWeekStore.fetch()">
        Coś poszło nie tak, spróbuj ponownie...</AppButton
      >
    </div>
    <div
      v-else-if="nextRaceWeekStore.raceWeek && nextRaceWeekStore.getNextSession"
    >
      <NuxtLink
        :to="`/kalendarz/${nextRaceWeekStore.raceWeek.season.year}/${nextRaceWeekStore.raceWeek.slug}`"
        class="text-primary text-center text-xl font-semibold"
      >
        <div>{{ nextRaceWeekStore.raceWeek.name }}</div>
      </NuxtLink>

      <div class="text-center text-xs font-semibold">
        ({{ nextRaceWeekStore.getNextSession.name }})
      </div>

      <pre>
        {{ nextRaceWeekStore.getNextSession }}
      </pre>
      <AppTimer :date="nextRaceWeekStore.getNextSession?.date || null" />
    </div>

    <div v-else class="text-center text-sm font-semibold">
      Brak kolejnych zawodów
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNextRaceWeekStore } from "@/stores/useNextRaceWeekStore";

const nextRaceWeekStore = useNextRaceWeekStore();
</script>
