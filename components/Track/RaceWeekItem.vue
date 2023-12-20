<template>
  <NuxtLink :to="`/kalendarz/${raceWeek.season.year}/${raceWeek.slug}`">
    <div class="bg-card rounded flex items-center">
      <div class="bg-primary text-white rounded-l p-2 font-semibold">
        {{ raceWeek.season.year }}
      </div>

      <div class="p-2 text-sm font-semibold">
        {{ raceWeek.name }}
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { IRaceWeek } from "~/types/services/raceWeek";

interface IProps {
  raceWeek: IRaceWeek;
}

defineProps<IProps>();
</script>
