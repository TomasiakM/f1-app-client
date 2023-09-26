<template>
  <div class="grid gap-2">
    <h3 class="text-xl font-semibold text-primary">Kalendarz</h3>

    <div
      class="flex gap-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300"
    >
      <SeasonPicker
        :selectedSeason="selectedSeason"
        @seasonChange="handleChange"
      />
    </div>
    <div v-if="selectedSeason" class="grid gap-2">
      <h3 class="font-semibold text-primary text-lg">
        Sezon {{ selectedSeason.year }}
      </h3>

      <CalendarItem
        v-for="(raceWeek, i) in raceWeeks"
        :key="raceWeek.id"
        :race-week="raceWeek"
        :index="i + 1"
      />

      <div v-if="!raceWeeks.length">Brak zaplanowanych wydarzeń</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ISeason } from "@/types/services/season";
import { IRaceWeek } from "@/types/services/raceWeek";

const selectedSeason = ref(null as ISeason | null);

const handleChange = (season: ISeason) => {
  selectedSeason.value = season;
};

const raceWeeks = ref([] as IRaceWeek[]);

watch(
  () => selectedSeason.value,
  async () => {
    const { data } = await useApi<IRaceWeek[]>(
      `raceweek/${selectedSeason.value?.id}`
    );

    if (data.value) {
      raceWeeks.value = data.value;
    }
  }
);
</script>
