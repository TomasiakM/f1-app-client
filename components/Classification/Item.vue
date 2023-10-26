<template>
  <div class="flex items-center bg-card rounded overflow-hidden">
    <div
      class="flex justify-center items-center w-12 h-full bg-primary text-white"
    >
      <span class="text-xl font-semibold">
        {{ place }}
      </span>
    </div>
    <div class="w-full p-2 flex justify-between items-center gap-1">
      <div class="font-semibold">{{ name }}</div>
      <div class="text-lg font-semibold">{{ points }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  place: number;
  name: string;
  points: number;
}

defineProps<IProps>();
</script>
