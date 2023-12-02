<template>
  <Item
    :session-length="form.data.length"
    @add-result="handleAddResult"
    @save-results="handleSaveResults"
  >
    <template #name>
      {{ name }}
    </template>

    <RaceItem
      v-for="(item, i) in form.data"
      :key="item.place"
      :model-value="item"
      :name="name"
      :drivers="drivers"
      :teams="teams"
      :errors="form.errors.sessionResultList[i]"
      @delete-result="handleDeleteResult"
    />
  </Item>
</template>

<script lang="ts" setup>
import { ITeam } from "@/types/services/team";
import { IDriver } from "@/types/services/driver";
import {
  IRaceResultForm,
  ISprintResultForm,
} from "@/types/services/raceWeek/forms";
import {
  ISession,
  IRaceResult,
  ISprintResult,
} from "@/types/services/raceWeek/sessions";

import RaceItem from "./RaceItem.vue";
import Item from "./Item.vue";

interface IProps {
  raceWeekId: string;
  name: "Sprint" | "Wyścig";
  session: ISession<IRaceResult> | ISession<ISprintResult>;
  drivers: IDriver[];
  teams: ITeam[];
}
const props = defineProps<IProps>();

const mapSessionResults = (): IRaceResultForm[] | ISprintResultForm[] => {
  const results = props.session.sessionResults.map((result) => ({
    place: result.place,
    laps: result.laps,
    finishTime: result.finishTime,
    finishType: result.finishType,
    fastestLap: result.fastestLap,
    points: result.points,
    startPosition: result.startPosition,
    driverId: result.driver.id,
    teamId: result.team.id,
  }));

  return results;
};

const form = reactive({
  isLoading: false,
  errors: {
    sessionResults: "",
    sessionResultList: [] as { [key: string]: string }[],
  },
  data: mapSessionResults(),
});

const resetResults = () => {
  form.data = mapSessionResults();
};

const handleAddResult = () => {
  form.data.push({
    place: form.data.length + 1,
    laps: 0,
    finishTime: "",
    finishType: "Finished",
    fastestLap: "",
    points: 0,
    startPosition: 0,
    driverId: "",
    teamId: "",
  });
};

const handleDeleteResult = (place: number) => {
  const filteredResults = form.data.filter((e) => e.place !== place);

  const results = filteredResults.map((e, i) => {
    return { ...e, place: i + 1 };
  });

  form.data = results;
};

const handleSaveResults = async () => {
  form.errors = {
    sessionResults: "",
    sessionResultList: [],
  };

  const urlEnd = props.name === "Sprint" ? "sprint" : "race";
  let url = `raceweek/${props.raceWeekId}/${urlEnd}`;

  const { data, error } = await useApi(url, {
    method: "PUT",
    body: { sessionResults: form.data },
  });

  if (error.value?.errors) {
    const { errors: err } = useListValidationErrors(
      error.value.errors,
      "sessionResults"
    );

    form.errors.sessionResults = error.value.errors.sessionResults;
    form.errors.sessionResultList = err;
  }
};

watch(
  () => props.session,
  () => {
    resetResults();
  }
);
</script>
