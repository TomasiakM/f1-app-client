<template>
  <div class="flex justify-center items-center gap-1">
    <NuxtLink
      v-for="p in totalPages"
      :key="p"
      :to="{ query: { page: p } }"
      class="rounded py-1 w-8 text-sm text-center"
      :class="p === page ? 'bg-primary text-white' : 'bg-secondary text-white'"
    >
      {{ p }}
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  page: number;
  totalPages: number;
}

defineProps<IProps>();
</script>
