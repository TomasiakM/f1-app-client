<template>
  <div v-if="data" class="grid gap-2 grid-cols-1 max-w-[100%]">
    <div class="grid grid-cols-2 gap-2">
      <img :src="data.track.image" :alt="data.track.name" class="rounded" />

      <div>
        <div class="text-xl font-semibold">
          {{ data.season.year }} - {{ data.name }}
        </div>
        <div class="flex items-center gap-2">
          <AppFlag :code="data.track.countryCode" />
          <div>{{ data.track.name }}</div>
        </div>
      </div>
    </div>

    <CalendarSessionFreePractice
      v-if="data.fP1"
      name="FP1"
      :session="data.fP1"
    />
    <CalendarSessionFreePractice
      v-if="data.fP2"
      name="FP2"
      :session="data.fP2"
    />
    <CalendarSessionFreePractice
      v-if="data.fP3"
      name="FP3"
      :session="data.fP3"
    />
    <CalendarSessionQualification
      v-if="data.sprintQualification"
      name="QS"
      :session="data.sprintQualification"
    />
    <CalendarSessionRace
      v-if="data.sprint"
      name="Sprint"
      :session="data.sprint"
    />
    <CalendarSessionQualification
      v-if="data.raceQualification"
      name="Q"
      :session="data.raceQualification"
    />
    <CalendarSessionRace v-if="data.race" name="Race" :session="data.race" />

    <RatingSummary :race-week-id="data.id" />
  </div>
</template>

<script lang="ts" setup>
import { IRaceWeekDetail } from "~/types/services/raceWeek";

const route = useRoute();

const { year, slug } = route.params;
const { data } = await useApi<IRaceWeekDetail>(`raceweek/${year}/${slug}`);
</script>
