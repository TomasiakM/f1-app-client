<template>
  <NuxtLink :to="`/tory/${track.slug}`" class="bg-card p-2 rouunded block">
    <img
      class="rounded-full w-[75%] aspect-square mx-auto object-cover"
      :src="track.image"
      :alt="track.name"
    />
    <div class="text-center font-semibold mt-2">{{ track.name }}</div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { ITrack } from "@/types/services/track";

interface IProps {
  track: ITrack;
}

defineProps<IProps>();
</script>
