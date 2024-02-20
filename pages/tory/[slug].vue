<template>
  <div v-if="data" class="grid gap-2 md:gap-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <img
        class="rounded object-cover mx-auto"
        :src="data.image"
        :alt="data.name"
      />
      <div class="flex h-full items-center">
        <div class="grid grid-cols-1 gap-1">
          <div class="flex gap-2 text-xl font-semibold">
            <AppFlag :code="data.countryCode" />
            <div>{{ data.name }}, {{ data.city }}</div>
          </div>
          <div class="font-semibold text-sm">
            <div>Długość: {{ data.length }}m</div>
            <div>Zakręty: {{ data.corners }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-card rounded p-2 lg:p-4 w-full">
      <div v-html="data.descriptionHtml" />
    </div>

    <TrackRaceWeekList :track-id="data.id" />
  </div>
</template>

<script lang="ts" setup>
import { ITrack } from "@/types/services/track";

const route = useRoute();
const { data } = await useApi<ITrack>(`track/${route.params.slug}`);
</script>
