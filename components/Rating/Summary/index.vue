<template>
  <AppCarousel v-if="data" :value="data.drivers">
    Oceny zawodników

    <template #item="props">
      <RatingSummaryItem
        :rating="props.data.rating"
        :driver="props.data.driver"
      />
    </template>
  </AppCarousel>
</template>

<script lang="ts" setup>
import { IRatingSummary } from "@/types/services/rating";
interface IProps {
  raceWeekId: string;
}

const props = defineProps<IProps>();

const { data } = await useApi<IRatingSummary>(
  `rating/${props.raceWeekId}/summary`
);
</script>
