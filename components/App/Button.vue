<template>
  <button
    class="rounded transition-colors duration-200 text-white"
    :class="{
      'bg-primary hover:bg-primary-hover': color === 'primary',
      'bg-secondary hover:bg-secondary-hover': color === 'secondary',
      'px-2 py-0.5 text-sm': small,
      'px-2 py-1 font-semibold': !small,
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
  small?: boolean;
}
interface IEmits {
  (e: "click"): void;
}
defineEmits<IEmits>();
withDefaults(defineProps<IProps>(), {
  color: "primary",
  type: "button",
  isLoading: false,
  small: false,
});

defineOptions({
  inheritAttrs: false,
});
</script>
