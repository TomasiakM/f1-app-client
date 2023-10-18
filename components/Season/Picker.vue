<template>
  <div
    v-if="selectedSeason"
    class="flex gap-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300"
  >
    <button
      v-for="season in sortedSeasons"
      :key="season.id"
      @click="handleChange(season)"
      class="px-2 rounded text-white"
      :class="
        selectedSeason === season
          ? 'bg-primary text-white'
          : 'bg-secondary hover:bg-secondary-hover text-white'
      "
    >
      {{ season.year }}
    </button>
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
