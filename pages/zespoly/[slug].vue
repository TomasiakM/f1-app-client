<template>
  <div v-if="data" class="grid gap-2 md:gap-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <img
        class="rounded-full w-[50%] aspect-square object-cover mx-auto"
        :src="data.image"
        :alt="data.name"
      />
      <div class="flex flex-col h-full justify-center">
        <div class="flex gap-2 text-xl font-semibold">
          <AppFlag :code="data.countryCode" />
          <div>{{ data.name }}</div>
        </div>
      </div>
    </div>

    <div class="bg-card rounded p-2 w-full">
      <div>
        {{ data.descriptionHtml }}
      </div>
    </div>

    <TeamStatistics :team-id="data.id" />
  </div>
</template>

<script lang="ts" setup>
import { ITeam } from "@/types/services/team";

const route = useRoute();
const { data } = await useApi<ITeam>(`team/${route.params.slug}`);
</script>
