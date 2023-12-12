<template>
  <div class="bg-card rounded p-2">
    <div v-if="data && nextSession">
      <NuxtLink
        :to="`/kalendarz/${data.season.year}/${data.slug}`"
        class="text-primary text-center text-xl font-semibold"
      >
        <div>{{ data.name }}</div>
      </NuxtLink>

      <div class="text-center text-xs font-semibold">
        ({{ nextSession.name }})
      </div>

      <AppTimer :date="nextSession?.date || null" />
    </div>

    <div v-else class="text-center text-sm font-semibold">
      Brak kolejnych zawodów
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IRaceWeek } from "~/types/services/raceWeek";
import { useTimeoutFn } from "@vueuse/core";

const { data } = await useApi<IRaceWeek>("raceweek/next");
const time = ref(new Date());

const nextSession = computed(() => {
  if (!data.value) return null;

  const now = time.value;
  const times = [] as { date: Date; name: string }[];
  if (data.value?.race) {
    const race = new Date(data.value.race);

    if (race.getTime() - now.getTime() > 0) {
      times.push({ date: race, name: "Wyścig" });
    }
  }

  if (data.value?.raceQualification) {
    const raceQuali = new Date(data.value.raceQualification);

    if (raceQuali.getTime() - now.getTime() > 0) {
      times.push({ date: raceQuali, name: "Kwalifikacje do wyścigu" });
    }
  }

  if (data.value?.sprint) {
    const sprint = new Date(data.value.sprint);

    if (sprint.getTime() - now.getTime() > 0) {
      times.push({ date: sprint, name: "Sprint" });
    }
  }

  if (data.value?.sprintQualification) {
    const sprintQuali = new Date(data.value.sprintQualification);

    if (sprintQuali.getTime() - now.getTime() > 0) {
      times.push({ date: sprintQuali, name: "Kwalifikacje do sprintu" });
    }
  }

  if (data.value?.fP3) {
    const fP3 = new Date(data.value.fP3);

    if (fP3.getTime() - now.getTime() > 0) {
      times.push({ date: fP3, name: "FP3" });
    }
  }

  if (data.value?.fP2) {
    const fP2 = new Date(data.value.fP2);

    if (fP2.getTime() - now.getTime() > 0) {
      times.push({ date: fP2, name: "FP2" });
    }
  }

  if (data.value?.fP1) {
    const fP1 = new Date(data.value.fP1);

    if (fP1.getTime() - now.getTime() > 0) {
      times.push({ date: fP1, name: "FP1" });
    }
  }

  const sortedTimes = times.sort((a, b) => {
    const d1 = new Date(a.date);
    const d2 = new Date(b.date);

    return d1.getTime() - d2.getTime();
  });

  if (sortedTimes[0]) {
    const nextUpdate = sortedTimes[0].date.getTime() - now.getTime();

    useTimeoutFn(() => {
      time.value = new Date();
    }, nextUpdate);
  }

  return sortedTimes[0];
});
</script>
