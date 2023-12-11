<template>
  <AppMultiSelect
    :id="id"
    label="Wybierz tagi"
    :placeholder="placeholder"
    :model-value="selected"
    :options="options"
    @update:model-value="handleChange"
  />
</template>

<script lang="ts" setup>
import { ITag } from "~/types/services/tag";

interface IEmits {
  (e: "update:modelValue", value: string[]): void;
}

interface IProps {
  id: string;
  label: string;
  placeholder: string;
  modelValue: string[];
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();

const selected = ref([] as { key: string; value: string }[]);
const { data } = await useApi<ITag[]>("tag");

if (data.value) {
  const tags = props.modelValue.reduce((prev, cur, i, arr) => {
    const tag = data.value!.find((e) => e.id === cur);
    if (!tag) return prev;

    return [...prev, { key: tag.id, value: tag.name }];
  }, [] as { key: string; value: string }[]);

  selected.value = tags;
}

const options = computed(
  () => data.value?.map((e) => ({ key: e.id, value: e.name })) || []
);

const handleChange = (e: { key: string; value: string }[]) => {
  selected.value = e;
  emits(
    "update:modelValue",
    selected.value.map((e) => e.key)
  );
};
</script>
