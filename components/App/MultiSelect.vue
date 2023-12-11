<template>
  <div class="grid grid-cols-1">
    <label v-if="label" :for="id" class="text-sm font-semibold">
      {{ label }}
    </label>

    <PrimeMultiSelect
      :id="id"
      optionLabel="value"
      :model-value="modelValue"
      :show-toggle-all="false"
      :options="options"
      :placeholder="placeholder"
      @change="(e) => handleChange(e.value)"
      :pt="{
        root: { class: ['w-full border border-gray rounded bg-white'] },
        label: { class: ['p-1'] },
        trigger: {
          class: [
            'flex items-center justify-center shrink-0',
            'bg-transparent text-gray-500 w-8 rounded-tr rounded-br',
          ],
        },
        item: ({ context }) => ({
          class: [
            'cursor-pointer font-normal overflow-hidden relative whitespace-nowrap',
            'm-0 p-2 border-0  transition-shadow duration-200 rounded-none',
            {
              'hover:bg-primary/50': !context.focused && !context.selected,
              'bg-primary/30 ': context.focused,
              'bg-primary/20': !context.focused && context.selected,
            },
          ],
        }),
        checkbox: ({ context }) => ({
          class: [
            'flex items-center justify-center',
            'border-2 w-6 h-6 text-gray-600 dark:text-white/80 rounded transition-colors duration-200',
            'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]',
            {
              'border-gray bg-white ': !context?.selected,
              'border-primary bg-primary': context?.selected,
            },
          ],
        }),
      }"
    />

    <span v-if="error" class="text-sm font-semibold text-danger">
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts" setup>
interface IEmits {
  (e: "update:modelValue", value: { key: string; value: string }[]): void;
}

interface IProps {
  id: string;
  label: string;
  placeholder: string;
  error?: string;
  options: { key: string; value: string }[];
  modelValue: { key: string; value: string }[];
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();

const handleChange = (e: { key: string; value: string }[]) => {
  emits("update:modelValue", e);
};
</script>
