<template>
  <div>
    <AppButtonLink to="/panel/sezony/dodaj" class="mb-2">
      Dodaj sezon
    </AppButtonLink>

    <div v-if="data" class="grid gap-2">
      <SeasonAdminItem
        v-for="season in sortedSeasons"
        :key="season.id"
        :season="season"
        @deleted="refresh"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ISeason } from "@/types/services/season";

const { data, refresh } = await useApi<ISeason[]>("season");

const sortedSeasons = computed(() => {
  return data.value?.sort((a, b) => b.year - a.year) || [];
});
</script>
