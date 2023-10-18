<template>
  <th class="px-2 py-2" :class="{ 'sticky left-0': sticky }">
    <slot />
  </th>
</template>

<script lang="ts" setup>
interface IProps {
  sticky?: boolean;
}

defineProps<IProps>();
</script>
