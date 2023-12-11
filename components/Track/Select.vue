<template>
  <AppSelect
    :id="id"
    :selected="modelValue"
    :options="sortedTracks"
    :error="error"
    placeholder="Wybierz tor"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
import { ITrack } from "@/types/services/track";

interface IEmits {
  (e: "update:modelValue", value: string): void;
}

interface IProps {
  id: string;
  label: string;
  error?: string;
  modelValue: string;
}

const emits = defineEmits<IEmits>();
defineProps<IProps>();

const { data } = await useApi<ITrack[]>("track/all");
const sortedTracks = computed(
  () =>
    data.value
      ?.sort((a, b) => (a.name > b.name ? 1 : -1))
      .map((e) => ({ key: e.id, value: e.name })) || []
);

const handleChange = (e: string) => {
  emits("update:modelValue", e);
};
</script>
