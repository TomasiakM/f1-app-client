<template>
  <AppErrorHandler
    :error="error"
    :is-loading="isLoading"
    :data="classification"
  >
    <template #static>
      <h3 class="text-xl font-semibold text-primary">Klasyfikacja</h3>

      <SeasonPicker
        :selectedSeason="selectedSeason"
        @season-change="handleChange"
      />
    </template>

    <div class="grid gap-2 grid-cols-1">
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
          Zespoły
        </AppButton>
      </div>

      <div v-if="selectedSeason">
        <h3 class="text-lg font-semibold text-primary">
          Sezon {{ selectedSeason.year }}
        </h3>

        <div class="grid grid-cols-1 gap-1">
          <ClassificationItem
            v-for="item in classification"
            :key="isDriverClassification(item) ? item.driver.id : item.team.id"
            :place="item.place"
            :name="
              isDriverClassification(item)
                ? item.driver.firstName + ' ' + item.driver.lastName
                : item.team.name
            "
            :points="item.points"
          />

          <div v-if="!classification.length" class="text-center font-semibold">
            Brak wyników
          </div>
        </div>
      </div>
    </div>
  </AppErrorHandler>
</template>

<script lang="ts" setup>
import { ISeason } from "@/types/services/season";
import {
  IDriverClassification,
  ITeamClassification,
} from "@/types/services/classification";

const isLoading = ref(true);
const error = ref(null as any);

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
    isLoading.value = true;
    error.value = null;

    const { data, error: fetchError } = await useApi<IDriverClassification[]>(
      `classification/${selectedSeason.value.year}/${selectedClassification.value}`
    );

    isLoading.value = false;

    if (fetchError.value) {
      error.value = fetchError.value;
      classification.value = [];

      return;
    }

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
