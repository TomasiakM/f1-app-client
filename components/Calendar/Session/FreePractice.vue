<template>
  <div class="p-2 rounded bg-card grid gap-2">
    <div class="flex justify-between gap-2">
      <div>{{ name }}</div>
      <button v-if="session.sessionResults.length">
        <SvgChevron
          class="w-5 h-5"
          :class="isOpen ? '' : 'rotate-180'"
          @click="isOpen = !isOpen"
        />
      </button>
    </div>
    <AppTable v-if="isOpen">
      <template #header>
        <tr>
          <AppTableTh sticky>Nr</AppTableTh>
          <AppTableTh>Kierowca</AppTableTh>
          <AppTableTh>Zespół</AppTableTh>
          <AppTableTh>Okrążenia</AppTableTh>
          <AppTableTh>Najszybsze okrążenie</AppTableTh>
        </tr>
      </template>

      <AppTableTr v-for="result in session.sessionResults" :key="result.place">
        <AppTableTd sticky>{{ result.place }}</AppTableTd>
        <AppTableTd>
          {{ result.driver.firstName + " " + result.driver.lastName }}
        </AppTableTd>
        <AppTableTd>{{ result.team.name }}</AppTableTd>
        <AppTableTd>{{ result.laps }}</AppTableTd>
        <AppTableTd>{{ result.fastestLap }}</AppTableTd>
      </AppTableTr>
    </AppTable>
  </div>
</template>

<script lang="ts" setup>
import {
  IFreePracticeResult,
  ISession,
} from "@/types/services/raceWeek/sessions";

interface IProps {
  name: "FP1" | "FP2" | "FP3";
  session: ISession<IFreePracticeResult>;
}

defineProps<IProps>();

const isOpen = ref(false);
</script>
