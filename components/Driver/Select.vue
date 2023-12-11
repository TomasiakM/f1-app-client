<template>
  <AppSelect
    :id="id"
    :selected="modelValue"
    :options="driversOptions"
    :error="error"
    label="wybierz kierowcę"
    placeholder="Wybierz kierowcę"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
import { IDriver } from "@/types/services/driver";

interface IProps {
  id: string;
  modelValue: string;
  error?: string | null;
  drivers: IDriver[];
}

const props = defineProps<IProps>();

interface IEmits {
  (e: "update:modelValue", value: string): void;
}

const emits = defineEmits<IEmits>();

const driversOptions = computed(() =>
  props.drivers.map((e) => {
    const fullName = e.firstName + " " + e.lastName;

    return { key: e.id, value: fullName };
  }, [])
);

const handleChange = (e: string) => {
  emits("update:modelValue", e);
};
</script>
