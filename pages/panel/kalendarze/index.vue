<template>
  <div class="grid gap-2">
    <h3 class="text-xl font-semibold text-primary">Kalendarz</h3>

    <SeasonPicker @seasonChange="handleChange" />
    <div v-if="selectedSeason" class="grid gap-2">
      <div class="flex justify-between items-center gap-2">
        <h3 class="font-semibold text-primary text-lg">
          Sezon {{ selectedSeason.year }}
        </h3>
        <AppButtonLink :to="`/panel/kalendarze/${selectedSeason.year}/dodaj`">
          Dodaj wydarzenie
        </AppButtonLink>
      </div>

      <CalendarAdminItem
        v-for="(raceWeek, i) in raceWeeks"
        :key="raceWeek.id"
        :index="i + 1"
        :race-week="raceWeek"
        @race-week-deleted="refreshData"
      />

      <div v-if="!raceWeeks.length">Brak zaplanowanych wydarzeń</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ISeason } from "@/types/services/season";
import { IRaceWeek } from "@/types/services/raceWeek";

const selectedSeason = ref(null as ISeason | null);
const raceWeeks = ref([] as IRaceWeek[]);

const handleChange = async (season: ISeason) => {
  if (selectedSeason.value?.id === season?.id) {
    return;
  }

  selectedSeason.value = season;

  refreshData();
};

const refreshData = async () => {
  const { data } = await useApi<IRaceWeek[]>(
    `raceweek/${selectedSeason.value?.id}`
  );

  if (data.value) {
    raceWeeks.value = data.value;
  }
};
</script>
