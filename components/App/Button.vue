<template>
  <button
    class="p-1 rounded transition-colors duration-200 text-white"
    :class="{
      'bg-primary hover:bg-primary-hover': color === 'primary',
      'bg-secondary hover:bg-secondary-hover': color === 'secondary',
    }"
    :disabled="isLoading"
    @click="$emit('click')"
  >
    <div class="flex gap-2 justify-center items-center">
      <SvgLoading v-if="isLoading" class="w-5 h-5" />
      <slot />
    </div>
  </button>
</template>

<script lang="ts" setup>
interface IProps {
  color?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
}
interface IEmits {
  (e: "click"): void;
}
defineEmits<IEmits>();
withDefaults(defineProps<IProps>(), {
  color: "primary",
  type: "button",
  isLoading: false,
});

defineOptions({
  inheritAttrs: false,
});
</script>
