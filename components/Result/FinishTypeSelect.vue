<template>
  <AppSelect
    :id="id"
    :label="label"
    :error="error"
    :placeholder="placeholder"
    :selected="modelValue"
    :options="finishTypes"
    @change="e => handleChange(e as IFinishType)"
  />
</template>

<script lang="ts" setup>
import { IFinishType } from "~/types/services/raceWeek/sessions";

interface IProps {
  id: string;
  label: string;
  error?: string | null;
  placeholder: string;
  modelValue: IFinishType;
}

interface IEmits {
  (e: "update:modelValue", value: IFinishType): void;
}

defineProps<IProps>();
const emits = defineEmits<IEmits>();

const finishTypes = ref([
  { key: "Finished", value: "Finished" },
  { key: "DSQ", value: "DSQ" },
  { key: "DNF", value: "DNF" },
  { key: "DNS", value: "DNS" },
] as { key: IFinishType; value: IFinishType }[]);

const handleChange = (e: IFinishType) => {
  emits("update:modelValue", e);
};
</script>
