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
        v-model="modelValue.driverId"
      />

      <TeamSelect
        :id="name + '-' + modelValue.place + '-team'"
        :teams="teams"
        :selected="modelValue.teamId"
        :error="errors?.teamId"
        v-model="modelValue.teamId"
      />

      <AppInput
        :id="name + '-' + modelValue.place + '-laps'"
        name="laps"
        placeholder="1"
        label="Przejechane okrążenia"
        :error="errors?.laps"
        v-model="modelValue.laps"
      />

      <AppInput
        :id="name + '-' + modelValue.place + '-fastestLap'"
        name="fastestLap"
        placeholder="1:23:456"
        label="Najszybsze okrążenie"
        :error="errors?.fastestLap"
        v-model="modelValue.fastestLap"
      />
    </div>
    <button @click="emits('delete-result', modelValue.place)">
      <SvgTrash class="w-5 h-5" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { IFreePracticeResultForm } from "@/types/services/raceWeek/forms";
import { IDriver } from "@/types/services/driver";
import { ITeam } from "@/types/services/team";

interface IProps {
  name: string;
  drivers: IDriver[];
  teams: ITeam[];
  errors?: { [key: string]: string };
  modelValue: IFreePracticeResultForm;
}

interface IEmits {
  (e: "modelValue:update", result: IFreePracticeResultForm): void;
  (e: "delete-result", place: number): void;
}

defineProps<IProps>();
const emits = defineEmits<IEmits>();
</script>
