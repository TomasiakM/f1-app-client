<template>
  <div class="grid grid-cols-3 gap-2">
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
import { ITeamStatistics } from "@/types/services/team";

interface IProps {
  teamId: string;
}

const props = defineProps<IProps>();

const { data } = await useApi<ITeamStatistics>(
  `team/${props.teamId}/statistics`
);
</script>
