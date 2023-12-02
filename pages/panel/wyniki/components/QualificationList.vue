<template>
  <Item
    :session-length="form.data.length"
    @add-result="handleAddResult"
    @save-results="handleSaveResults"
  >
    <template #name>
      {{ name }}
    </template>

    <QualificationItem
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
  IRaceQualificationResultForm,
  ISprintQualificationResultForm,
} from "@/types/services/raceWeek/forms";
import {
  ISession,
  IRaceQualificationResult,
  ISprintQualificationResult,
} from "@/types/services/raceWeek/sessions";

import QualificationItem from "./QualificationItem.vue";
import Item from "./Item.vue";

interface IProps {
  raceWeekId: string;
  name: "Kwalifikacje do sprintu" | "Kwalifikacje do wyścigu";
  session:
    | ISession<IRaceQualificationResult>
    | ISession<ISprintQualificationResult>;
  drivers: IDriver[];
  teams: ITeam[];
}
const props = defineProps<IProps>();

const mapSessionResults = ():
  | IRaceQualificationResultForm[]
  | ISprintQualificationResultForm[] => {
  const results = props.session.sessionResults.map((result) => ({
    place: result.place,
    q1Time: result.q1Time,
    q2Time: result.q2Time,
    q3Time: result.q3Time,
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
    q1Time: "",
    q2Time: "",
    q3Time: "",
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

  const urlEnd =
    props.name === "Kwalifikacje do sprintu"
      ? "sprintqualification"
      : "racequalification";

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
