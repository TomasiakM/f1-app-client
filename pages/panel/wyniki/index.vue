<template>
  <div class="grid gap-2">
    <SeasonPicker @season-change="(e) => (selectedSeason = e)" />

    <div class="flex gap-1">
      <button
        v-for="raceWeek in raceWeekList"
        :key="raceWeek.id"
        @click="selectedRaceWeek = raceWeek"
        class="rounded px-2 text-white"
        :class="
          selectedRaceWeek?.id === raceWeek.id ? 'bg-primary' : 'bg-secondary'
        "
      >
        {{ raceWeek.name }}
      </button>
    </div>

    <div v-if="raceWeek" class="grid gap-2 grid-cols-1">
      <div class="flex justify-between items-center">
        <div class="text-xl font-semibold">
          {{ raceWeek.season.year }} {{ raceWeek.name }}
        </div>
        <AppButton @click="openRating">Otwórz ocenianie</AppButton>
      </div>
      <div class="grid gap-2">
        <FreePracticeList
          v-if="raceWeek.fP1"
          name="FP1"
          :race-week-id="raceWeek.id"
          :session="raceWeek.fP1"
          :drivers="drivers || []"
          :teams="teams || []"
        />
        <FreePracticeList
          v-if="raceWeek.fP2"
          name="FP2"
          :race-week-id="raceWeek.id"
          :session="raceWeek.fP2"
          :drivers="drivers || []"
          :teams="teams || []"
        />
        <FreePracticeList
          v-if="raceWeek.fP3"
          name="FP3"
          :race-week-id="raceWeek.id"
          :session="raceWeek.fP3"
          :drivers="drivers || []"
          :teams="teams || []"
        />

        <QualificationList
          v-if="raceWeek.sprintQualification"
          name="Kwalifikacje do sprintu"
          :race-week-id="raceWeek.id"
          :session="raceWeek.sprintQualification"
          :drivers="drivers || []"
          :teams="teams || []"
        />

        <RaceList
          v-if="raceWeek.sprint"
          name="Sprint"
          :race-week-id="raceWeek.id"
          :session="raceWeek.sprint"
          :drivers="drivers || []"
          :teams="teams || []"
        />

        <QualificationList
          v-if="raceWeek.raceQualification"
          name="Kwalifikacje do wyścigu"
          :race-week-id="raceWeek.id"
          :session="raceWeek.raceQualification"
          :drivers="drivers || []"
          :teams="teams || []"
        />

        <RaceList
          v-if="raceWeek.race"
          name="Wyścig"
          :race-week-id="raceWeek.id"
          :session="raceWeek.race"
          :drivers="drivers || []"
          :teams="teams || []"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IRaceWeek, IRaceWeekDetail } from "@/types/services/raceWeek";
import { ISeason } from "@/types/services/season";

import FreePracticeList from "./components/FreePracticeList.vue";
import QualificationList from "./components/QualificationList.vue";
import RaceList from "./components/RaceList.vue";

const toast = useAppToast();

const selectedSeason = ref(null as ISeason | null);
const selectedRaceWeek = ref(null as IRaceWeek | null);
const raceWeekList = ref([] as IRaceWeek[]);

const raceWeek = ref(null as IRaceWeekDetail | null);

const { drivers } = await useDriverList();
const { teams } = await useTeamList();

watch(
  () => selectedSeason.value,
  async () => {
    selectedRaceWeek.value = null;
    raceWeek.value = null;

    await fetchRaceWeeks();
    selectedRaceWeek.value = raceWeekList.value[0] || null;
  }
);

watch(
  () => selectedRaceWeek.value,
  async () => {
    await fetchRaceWeek();
  }
);

const fetchRaceWeeks = async () => {
  if (!selectedSeason.value) {
    return;
  }

  const { data } = await useApi<IRaceWeek[]>(
    `raceweek/${selectedSeason.value.id}`
  );

  if (data.value) {
    raceWeekList.value = data.value;
  }
};

const fetchRaceWeek = async () => {
  if (!selectedRaceWeek.value) {
    return;
  }

  const { data } = await useApi<IRaceWeekDetail>(
    `raceweek/${selectedSeason.value!.year}/${selectedRaceWeek.value.slug}`
  );

  if (data.value) {
    raceWeek.value = data.value;
  }
};

const openRating = async () => {
  if (!raceWeek.value) return;

  const { error } = await useApi(`rating/${raceWeek.value.id}`, {
    method: "POST",
  });

  if (error.value) {
    if (error.value.status === 400) {
      toast.error(error.value.message);
      return;
    }

    if (error.value.status === 404) {
      toast.error("Nie można utworzyć oceniania dla tego wydarzenia");
      return;
    }

    toast.error();
    return;
  }
};
</script>
