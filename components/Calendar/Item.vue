<template>
  <div class="flex items-center gap-2 bg-card rounded overflow-hidden">
    <div
      class="flex justify-center items-center w-12 h-full bg-primary text-white"
    >
      <span class="text-xl font-semibold">
        {{ index }}
      </span>
    </div>
    <div class="grid w-full p-2 pl-0">
      <div class="w-full flex justify-between items-center gap-1">
        <div class="grid">
          <NuxtLink
            :to="`/kalendarz/${raceWeek.season.year}/${raceWeek.slug}`"
            class="text-primary font-semibold text-lg"
          >
            {{ raceWeek.name }}
          </NuxtLink>
          <span class="text-xs -mt-1">
            {{ raceWeek.track.countryCode }} - {{ raceWeek.track.name }}
          </span>
        </div>

        <div class="text-sm">{{ useRaceWeekDate(raceWeek) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IRaceWeek } from "@/types/services/raceWeek";

interface IProps {
  index: number;
  raceWeek: IRaceWeek;
}

defineProps<IProps>();
</script>
