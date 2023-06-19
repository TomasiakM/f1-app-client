<template>
  <div class="grid">
    <label v-if="label" :for="id" class="text-sm font-semibold">
      {{ label }}
    </label>
    <date-picker
      :id="id"
      label="XDD"
      v-bind="$attrs"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :class="{ 'border-gray': !error, 'border-danger': error }"
    />
    <span v-if="error" class="text-sm font-semibold text-danger">
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  id: string;
  label?: string;
  modelValue: Date | null;
  error?: string | null;
}

defineProps<IProps>();
defineEmits(["update:modelValue"]);

defineOptions({
  inheritAttrs: false,
});
</script>
