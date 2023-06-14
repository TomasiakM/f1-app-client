<template>
  <NuxtLink
    :to="to"
    class="block rounded bg-secondary hover:bg-secondary-hover transition-colors duration-200 text-white p-1 text-center"
  >
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
interface IProps {
  to: string;
}

defineProps<IProps>();
</script>
