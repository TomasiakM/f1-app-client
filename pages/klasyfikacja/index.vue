<template>
  <div class="grid gap-2 grid-cols-1">
    <SeasonPicker @season-change="handleChange" />

    <div class="grid gap-2 grid-cols-2">
      <AppButton
        :color="selectedClassification === 'driver' ? 'primary' : 'secondary'"
        @click="selectedClassification = 'driver'"
      >
        Kierowcy
      </AppButton>
      <AppButton
        :color="selectedClassification === 'team' ? 'primary' : 'secondary'"
        @click="selectedClassification = 'team'"
      >
        Drużyny
      </AppButton>
    </div>

    <div class="">
      <div v-if="!classification.length" class="text-center font-semibold">
        Brak wyników
      </div>

      <AppTable v-else>
        <AppTableTr>
          <AppTableTh>Pozycja</AppTableTh>
          <AppTableTh>
            {{ selectedClassification == "driver" ? "Kierowca" : "Zespół" }}
          </AppTableTh>
          <AppTableTh>Punkty</AppTableTh>
        </AppTableTr>

        <AppTableTr v-for="item in classification">
          <AppTableTd>{{ item.place }}</AppTableTd>
          <AppTableTd>
            {{
              isDriverClassification(item)
                ? item.driver.firstName + " " + item.driver.lastName
                : item.team.name
            }}
          </AppTableTd>
          <AppTableTd>{{ item.points }}</AppTableTd>
        </AppTableTr>
      </AppTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ISeason } from "@/types/services/season";
import {
  IDriverClassification,
  ITeamClassification,
} from "@/types/services/classification";

const selectedClassification = ref("driver" as "driver" | "team");
const selectedSeason = ref(null as ISeason | null);
const classification = ref<IDriverClassification[] | ITeamClassification[]>([]);

const handleChange = (season: ISeason) => {
  selectedSeason.value = season;

  fetchClassification();
};

watch(
  () => selectedClassification.value,
  async () => {
    await fetchClassification();
  }
);

const fetchClassification = async () => {
  if (selectedSeason.value) {
    const { data } = await useApi<IDriverClassification[]>(
      `classification/${selectedSeason.value.year}/${selectedClassification.value}`
    );

    classification.value = data.value || [];
  }
};

const isDriverClassification = (
  value: IDriverClassification | ITeamClassification
): value is IDriverClassification => {
  if ("driver" in value) {
    return true;
  }

  return false;
};
</script>
