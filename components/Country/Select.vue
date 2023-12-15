<template>
  <AppSelect
    :id="id"
    :selected="modelValue"
    :options="countriesList"
    :error="error"
    label="Wybierz kraj"
    placeholder="Wybierz kraj"
    @change="handleChange"
  >
    <template #option="{ props }">
      <div class="flex items-center gap-2">
        <AppFlag :code="props.option.key" />
        <div>{{ props.option.value }}</div>
      </div>
    </template>
  </AppSelect>
</template>

<script lang="ts" setup>
interface IProps {
  id: string;
  modelValue: string;
  error?: string | null;
}
interface IEmits {
  (e: "update:modelValue", value: string): void;
}

defineProps<IProps>();
const emits = defineEmits<IEmits>();
const countries = useCountries();

const countriesList = Object.entries(countries).map(([key, value]) => ({
  key: value.iso,
  value: value.name,
}));

const handleChange = (e: string) => {
  emits("update:modelValue", e);
};
</script>
