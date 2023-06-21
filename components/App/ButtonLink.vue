<template>
  <NuxtLink
    :to="to"
    class="inline-block rounded bg-primary hover:bg-primary-hover transition-colors duration-200 text-white py-0.5 px-2 text-center"
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
