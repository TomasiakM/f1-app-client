<template>
  <div class="grid grid-cols-1">
    <label v-if="label" :for="id" class="text-sm font-semibold">
      {{ label }}
    </label>

    <PrimeDropdown
      :id="id"
      :model-value="selected"
      :placeholder="placeholder"
      :options="options"
      :pt="{
        root: { class: ['w-full border border-gray rounded bg-white'] },
        input: { class: ['p-1'] },
        trigger: {
          class: [
            'flex items-center justify-center shrink-0',
            'bg-transparent text-gray-500 w-8 rounded-tr-lg rounded-br-lg',
          ],
        },
      }"
      @change="(e) => handleChange(e.value.key)"
    >
      <template #value="data">
        <slot name="default">
          <div v-if="data.value" class="flex align-items-center">
            <div>{{ selectedOptionName }}</div>
          </div>
          <span v-else>
            {{ data.placeholder }}
          </span>
        </slot>
      </template>

      <template #option="option">
        <slot name="default">
          {{ option.option.value }}
        </slot>
      </template>
    </PrimeDropdown>

    <span v-if="error" class="text-sm font-semibold text-danger">
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  id: string;
  label?: string;
  error?: string | null;
  placeholder: string;
  selected: string;
  options: { key: string; value: string }[];
}
const props = defineProps<IProps>();

interface IEmits {
  (e: "change", value: string): void;
}
const emits = defineEmits<IEmits>();

defineOptions({
  inheritAttrs: false,
});

const selectedOptionName = computed(() => {
  const selected = props.options.find((e) => e.key === props.selected);

  return selected?.value || props.placeholder;
});

const handleChange = (e: string) => {
  emits("change", e);
};
</script>
