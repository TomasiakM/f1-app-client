<template>
  <AppSelect
    :id="id"
    label="Wybierz kierowcę"
    :selected="selected"
    :options="driversOptions"
    :error="error"
    @change="(e) => emits('change', e)"
  />
</template>

<script lang="ts" setup>
import { IDriver } from "@/types/services/driver";

interface IProps {
  id: string;
  drivers: IDriver[];
  selected: string;
  error?: string | null;
}
const props = defineProps<IProps>();

interface IEmits {
  (e: "change", value: string): void;
}
const emits = defineEmits<IEmits>();

const driversOptions = computed(() => {
  return props.drivers.reduce((prev, cur) => {
    const fullName = cur.firstName + " " + cur.lastName;
    return { ...prev, [cur.id]: fullName };
  }, {});
});
</script>
