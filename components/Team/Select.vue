<template>
  <AppSelect
    :id="id"
    :selected="modelValue"
    :options="teamOptions"
    :error="error"
    label="Wybierz zespół"
    placeholder="Wybierz zespół"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
import { ITeam } from "@/types/services/team";

interface IProps {
  id: string;
  modelValue: string;
  error?: string | null;
  teams: ITeam[];
}
const props = defineProps<IProps>();

interface IEmits {
  (e: "update:modelValue", value: string): void;
}
const emits = defineEmits<IEmits>();

const teamOptions = computed(() =>
  props.teams.map((e) => ({ key: e.id, value: e.name }))
);

const handleChange = (e: string) => {
  emits("update:modelValue", e);
};
</script>
