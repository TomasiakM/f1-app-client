<template>
  <PrimeKnob
    :min="min"
    :max="max"
    :step="1"
    :pt="{
      value: {
        class: 'stroke-primary',
      },
      range: {
        class: 'stroke-secondary',
      },
    }"
    :model-value="modelValue"
    @change="(e) => $emit('update:modelValue', e)"
  />
</template>

<script lang="ts" setup>
interface IProps {
  min?: number;
  max?: number;
  modelValue: number;
}

withDefaults(defineProps<IProps>(), {
  min: 0,
  max: 10,
});
</script>
