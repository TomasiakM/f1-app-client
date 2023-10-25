<template>
  <AppErrorHandler :error="error" :is-loading="isLoading" :data="raceWeeks">
    <template #static>
      <h3 class="text-xl font-semibold text-primary">Kalendarz</h3>

      <SeasonPicker
        :selectedSeason="selectedSeason"
        @seasonChange="handleChange"
      />
    </template>

    <div v-if="selectedSeason" class="grid grid-cols-1 gap-2">
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
  </AppErrorHandler>
</template>

<script lang="ts" setup>
import { ISeason } from "@/types/services/season";
import { IRaceWeek } from "@/types/services/raceWeek";

const selectedSeason = ref(null as ISeason | null);

const handleChange = (season: ISeason) => {
  selectedSeason.value = season;
};

const isLoading = ref(true);
const error = ref(null as any);
const raceWeeks = ref([] as IRaceWeek[]);

watch(
  () => selectedSeason.value,
  async () => {
    isLoading.value = true;
    error.value = null;

    const { data, error: fetchError } = await useApi<IRaceWeek[]>(
      `raceweek/${selectedSeason.value?.id}`
    );

    isLoading.value = false;

    if (fetchError.value) {
      error.value = fetchError.value;
      raceWeeks.value = [];

      return;
    }

    raceWeeks.value = data.value || [];
  }
);
</script>
