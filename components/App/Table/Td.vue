<template>
  <td class="px-2 py-2 whitespace-nowrap" :class="{ 'sticky left-0': sticky }">
    <slot />
  </td>
</template>

<script lang="ts" setup>
interface IProps {
  sticky?: boolean;
}

defineProps<IProps>();
</script>
