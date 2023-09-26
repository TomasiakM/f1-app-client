<template>
  <NuxtLink :to="`/zespoly/${team.slug}`" class="bg-card p-2 rouunded block">
    <img
      class="rounded-full w-[75%] aspect-square mx-auto object-cover"
      :src="team.image"
      :alt="team.name"
    />
    <div class="text-center font-semibold mt-2">{{ team.name }}</div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { ITeam } from "@/types/services/team";

interface IProps {
  team: ITeam;
}

defineProps<IProps>();
</script>
