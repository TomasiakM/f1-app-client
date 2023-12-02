<template>
  <AppSelect
    :id="id"
    label="Wybierz drużynę"
    :selected="selected"
    :options="teamOptions"
    :error="error"
    @change="(e) => emits('change', e)"
  />
</template>

<script lang="ts" setup>
import { ITeam } from "@/types/services/team";

interface IProps {
  id: string;
  teams: ITeam[];
  error?: string | null;
  selected: string;
}
const props = defineProps<IProps>();

interface IEmits {
  (e: "change", value: string): void;
}
const emits = defineEmits<IEmits>();

const teamOptions = computed(() => {
  return props.teams.reduce((prev, cur) => {
    return { ...prev, [cur.id]: cur.name };
  }, {});
});
</script>
