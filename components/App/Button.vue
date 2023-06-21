<template>
  <button
    class="p-1 rounded bg-primary hover:bg-primary-hover transition-colors duration-200 text-white"
    :disabled="isLoading"
  >
    <div class="flex gap-2 justify-center items-center">
      <SvgLoading v-if="isLoading" class="w-5 h-5" />
      <slot />
    </div>
  </button>
</template>

<script lang="ts" setup>
interface IProps {
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
}
withDefaults(defineProps<IProps>(), {
  type: "button",
  isLoading: false,
});

defineOptions({
  inheritAttrs: false,
});
</script>
