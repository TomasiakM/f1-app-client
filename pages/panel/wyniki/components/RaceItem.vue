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
        @change="(e) => (modelValue.driverId = e)"
      />

      <TeamSelect
        :id="name + '-' + modelValue.place + '-team'"
        :teams="teams"
        :selected="modelValue.teamId"
        @change="(e) => (modelValue.teamId = e)"
      />
      <AppInput
        :id="name + '-' + modelValue.place + '-finishTime'"
        name="finishTime"
        placeholder="00:01:23.456"
        label="Czas"
        v-model="modelValue.finishTime"
      />
      <AppInput
        :id="name + '-' + modelValue.place + '-fastestLap'"
        name="fastestLap"
        placeholder="00:01:23.456"
        label="Najszybsze okrążenie"
        v-model="modelValue.fastestLap"
      />
      <AppInput
        :id="name + '-' + modelValue.place + '-laps'"
        name="laps"
        placeholder="1"
        label="Przejechane okrążenia"
        v-model="modelValue.laps"
      />
      <AppInput
        :id="name + '-' + modelValue.place + '-points'"
        name="points"
        placeholder="1"
        label="Punkty"
        v-model="modelValue.points"
      />
      <AppInput
        :id="name + '-' + modelValue.place + '-startPosition'"
        name="startPosition"
        placeholder="1"
        label="Pozycja startowa"
        v-model="modelValue.startPosition"
      />
      <AppInput
        :id="name + '-' + modelValue.place + '-finishType'"
        name="startPosition"
        placeholder="Finished | DSQ | DNF | DNS"
        label="Typ zakończenia wyścigu"
        v-model="modelValue.finishType"
      />
    </div>
    <button @click="emits('delete-result', modelValue.place)">
      <SvgTrash class="w-5 h-5" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import {
  ISprintResultForm,
  IRaceResultForm,
} from "@/types/services/raceWeek/forms";
import { IDriver } from "@/types/services/driver";
import { ITeam } from "@/types/services/team";

interface IProps {
  name: string;
  drivers: IDriver[];
  teams: ITeam[];
  modelValue: ISprintResultForm | IRaceResultForm;
}

interface IEmits {
  (e: "modelValue:update", result: ISprintResultForm | IRaceResultForm): void;
  (e: "delete-result", place: number): void;
}

defineProps<IProps>();
const emits = defineEmits<IEmits>();
</script>
