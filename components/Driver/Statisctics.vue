<template>
  <div class="grid grid-cols-4 gap-2">
    <AppStatistic>
      {{ data?.races || 0 }}
      <template #name> Wyścigi </template>
    </AppStatistic>
    <AppStatistic>
      {{ data?.poles || 0 }}
      <template #name> Pole position </template>
    </AppStatistic>
    <AppStatistic>
      {{ data?.podiums || 0 }}
      <template #name> Podia </template>
    </AppStatistic>
    <AppStatistic>
      {{ data?.wins || 0 }}
      <template #name> Wygrane </template>
    </AppStatistic>
  </div>
</template>

<script lang="ts" setup>
import { IDriverStatistics } from "@/types/services/driver";

interface IProps {
  driverId: string;
}

const props = defineProps<IProps>();

const { data } = await useApi<IDriverStatistics>(
  `driver/${props.driverId}/statistics`
);
</script>
