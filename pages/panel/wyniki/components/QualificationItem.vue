<template>
  <div class="flex items-center gap-2">
    <div class="text-xl font-semibold px-2">
      {{ modelValue.place }}
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <DriverSelect
        :id="name + '-' + modelValue.place + '-driver'"
        :drivers="drivers"
        :selected="modelValue.driverId"
        :error="errors?.driverId"
        @change="(e) => (modelValue.driverId = e)"
      />

      <TeamSelect
        :id="name + '-' + modelValue.place + '-team'"
        :teams="teams"
        :selected="modelValue.teamId"
        :error="errors?.teamId"
        @change="(e) => (modelValue.teamId = e)"
      />
      <AppInput
        :id="name + '-' + modelValue.place + '-q1-time'"
        name="q1"
        placeholder="1:23:456"
        label="Q1"
        :error="errors?.q1Time"
        v-model="modelValue.q1Time"
      />
      <AppInput
        :id="name + '-' + modelValue.place + '-q2-time'"
        name="q2"
        placeholder="1:23:456"
        label="Q2"
        :error="errors?.q2Time"
        v-model="modelValue.q2Time"
      />
      <AppInput
        :id="name + '-' + modelValue.place + '-q3-time'"
        name="q3"
        placeholder="1:23:456"
        label="Q3"
        :error="errors?.q3Time"
        v-model="modelValue.q3Time"
      />
    </div>
    <button @click="emits('delete-result', modelValue.place)">
      <SvgTrash class="w-5 h-5" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import {
  IRaceQualificationResultForm,
  ISprintQualificationResultForm,
} from "@/types/services/raceWeek/forms";
import { IDriver } from "@/types/services/driver";
import { ITeam } from "@/types/services/team";

interface IProps {
  name: string;
  drivers: IDriver[];
  teams: ITeam[];
  errors?: { [key: string]: string };
  modelValue: IRaceQualificationResultForm | ISprintQualificationResultForm;
}

interface IEmits {
  (
    e: "modelValue:update",
    result: IRaceQualificationResultForm | ISprintQualificationResultForm
  ): void;
  (e: "delete-result", place: number): void;
}

defineProps<IProps>();
const emits = defineEmits<IEmits>();
</script>
