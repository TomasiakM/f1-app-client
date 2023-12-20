<template>
  <div v-if="data?.length" class="grid grid-cols-1 gap-2">
    <h3 class="text-lg font-semibold text-primary">Wydarzenia na tym torze</h3>

    <TrackRaceWeekItem
      v-for="raceWeek in data"
      :key="raceWeek.id"
      :race-week="raceWeek"
    />
  </div>
</template>

<script lang="ts" setup>
import { IRaceWeek } from "@/types/services/raceWeek";

interface IProps {
  trackId: string;
}

const props = defineProps<IProps>();

const { data } = await useApi<IRaceWeek[]>(`/raceweek/track/${props.trackId}`);
</script>
