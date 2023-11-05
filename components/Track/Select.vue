<template>
  <div class="grid">
    <label v-if="label" :for="id" class="text-sm font-semibold">
      {{ label }}
    </label>
    <select
      @change="handleChange"
      class="px-2 py-1.5 rounded border"
      :class="{ 'border-gray': !error, 'border-danger': error }"
    >
      <option value="" disabled selected>Wybierz opcję</option>
      <option
        v-for="track in sortedTracks"
        :key="track.id"
        :value="track.id"
        :selected="track.id === modelValue"
      >
        {{ track.name }}
      </option>
    </select>
    <span v-if="error" class="text-sm font-semibold text-danger">
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ITrack } from "@/types/services/track";

interface IEmits {
  (e: "update:modelValue", value: string): void;
}

interface IProps {
  id: string;
  label: string;
  error: string;
  modelValue: string;
}

const emits = defineEmits<IEmits>();
const props = defineProps<IProps>();

const { data } = await useApi<ITrack[]>("track/all");
const sortedTracks = computed(
  () => data.value?.sort((a, b) => (a.name > b.name ? 1 : -1)) || []
);

if (props.modelValue) {
  const track = sortedTracks.value.find((e) => e.id === props.modelValue);

  if (!track) {
    emits("update:modelValue", "");
  }
}

const handleChange = (e: Event) => {
  emits("update:modelValue", (e.target as HTMLSelectElement).value);
};
</script>
