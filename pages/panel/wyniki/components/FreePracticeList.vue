<template>
  <Item
    :session-length="form.data.length"
    @add-result="handleAddResult"
    @save-results="handleSaveResults"
  >
    <template #name>
      {{ name }}
    </template>

    <div
      v-if="form.errors.sessionResults"
      class="px-2 py-1.5 bg-danger rounded text-white"
    >
      {{ form.errors.sessionResults }}
    </div>

    <FreePracticeItem
      v-for="(result, i) in form.data"
      :key="result.place"
      :model-value="result"
      :name="name"
      :errors="form.errors.sessionResultList[i]"
      :drivers="drivers"
      :teams="teams"
      @delete-result="handleDeleteResult"
    />
  </Item>
</template>

<script lang="ts" setup>
import { ITeam } from "@/types/services/team";
import { IDriver } from "@/types/services/driver";
import { IFreePracticeResultForm } from "@/types/services/raceWeek/forms";
import {
  ISession,
  IFreePracticeResult,
} from "@/types/services/raceWeek/sessions";

import FreePracticeItem from "./FreePracticeItem.vue";
import Item from "./Item.vue";

interface IProps {
  raceWeekId: string;
  name: "FP1" | "FP2" | "FP3";
  session: ISession<IFreePracticeResult>;
  drivers: IDriver[];
  teams: ITeam[];
}
const props = defineProps<IProps>();

const mapSessionResults = (): IFreePracticeResultForm[] => {
  const results = props.session.sessionResults.map((result) => ({
    place: result.place,
    laps: result.laps,
    fastestLap: result.fastestLap,
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
    fastestLap: "",
    laps: 0,
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

  let url = `raceweek/${props.raceWeekId}/${props.name}`;

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
