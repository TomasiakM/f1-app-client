<template>
  <div class="grid grid-cols-1">
    <label v-if="label" :for="id" class="text-sm font-semibold">
      {{ label }}
    </label>
    <PrimeCalendar
      :id="id"
      show-time
      :pt="{
        input: { class: ['border border-gray p-1 rounded'] },
        panel: {
          class: [
            'border border-gray rounded bg-white !min-w-[350px] !max-w-[450px] !w-full',
          ],
        },
      }"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
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
