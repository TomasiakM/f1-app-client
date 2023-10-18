<template>
  <div class="p-2 rounded bg-card grid gap-2">
    <div class="flex justify-between gap-2">
      <div>{{ name === "Race" ? "Wyścig" : "Sprint" }}</div>
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
          <AppTableTh>Pozycja startowa</AppTableTh>
          <AppTableTh>Kierowca</AppTableTh>
          <AppTableTh>Zespół</AppTableTh>
          <AppTableTh>Punkty</AppTableTh>
          <AppTableTh>Okrążenia</AppTableTh>
          <AppTableTh>Najszybsze okrążenie</AppTableTh>
          <AppTableTh>Czas</AppTableTh>
        </tr>
      </template>

      <AppTableTr v-for="result in session.sessionResults" :key="result.place">
        <AppTableTd sticky>
          {{ result.place }}
        </AppTableTd>
        <AppTableTd>
          {{ result.startPosition }}
          <span
            v-if="result.startPosition"
            :class="{
              'text-danger': result.startPosition - result.place < 0,
              'text-success': result.startPosition - result.place > 0,
            }"
          >
            ({{
              result.startPosition - result.place > 0
                ? `+${result.startPosition - result.place}`
                : result.startPosition - result.place
            }})
          </span>
        </AppTableTd>
        <AppTableTd>
          {{ result.driver.firstName + " " + result.driver.lastName }}
        </AppTableTd>
        <AppTableTd>{{ result.team.name }}</AppTableTd>
        <AppTableTd>{{ result.points }}</AppTableTd>
        <AppTableTd>{{ result.laps }}</AppTableTd>
        <AppTableTd>{{ result.fastestLap }}</AppTableTd>
        <AppTableTd>
          {{
            result.finishType === "Finished"
              ? result.finishTime
              : result.finishType
          }}
        </AppTableTd>
      </AppTableTr>
    </AppTable>
  </div>
</template>

<script lang="ts" setup>
import {
  IRaceResult,
  ISession,
  ISprintResult,
} from "@/types/services/raceWeek/sessions";

interface IProps {
  name: "Sprint" | "Race";
  session: ISession<ISprintResult> | ISession<IRaceResult>;
}

const props = defineProps<IProps>();

const isOpen = ref(false);
</script>
