<template>
  <div>
    <PrimeToast />
    <TheLoader />
  </div>
</template>

<script lang="ts" setup>
import { useNextRaceWeekStore } from "@/stores/useNextRaceWeekStore";
import { useRatingStore } from "@/stores/useRatingStore";

const nextRaceWeekStore = useNextRaceWeekStore();
const ratingStore = useRatingStore();

await nextRaceWeekStore.fetch();

onMounted(async () => {
  await ratingStore.fetch();
});
</script>

<style lang="postcss">
body {
  @apply bg-background;
}
</style>
