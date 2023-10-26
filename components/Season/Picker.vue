<template>
  <div
    v-if="selectedSeason"
    class="flex gap-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300"
  >
    <AppButton
      v-for="season in sortedSeasons"
      :key="season.id"
      @click="handleChange(season)"
      :color="selectedSeason === season ? 'primary' : 'secondary'"
      small
    >
      {{ season.year }}
    </AppButton>
  </div>
</template>

<script lang="ts" setup>
import { ISeason } from "@/types/services/season";

interface IEmits {
  (e: "seasonChange", value: ISeason): void;
}
const emits = defineEmits<IEmits>();
const { data } = await useApi<ISeason[]>("season");

const sortedSeasons = computed(
  () => data.value?.sort((a, b) => b.year - a.year) || []
);
const selectedSeason = ref(sortedSeasons.value[0] || null);
emits("seasonChange", selectedSeason.value);

const handleChange = (season: ISeason) => {
  emits("seasonChange", season);
  selectedSeason.value = season;
};
</script>
