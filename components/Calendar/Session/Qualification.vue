<template>
  <div class="p-2 rounded bg-card grid gap-2">
    <div class="flex justify-between gap-2">
      <div>{{ name === "Q" ? "Kwalifikacje" : "Kwalifikacje sprintu" }}</div>
      <button v-if="session.sessionResults.length">
        <SvgChevron
          class="w-5 h-5"
          :class="isOpen ? '' : 'rotate-180'"
          @click="isOpen = !isOpen"
        />
      </button>
    </div>
    <table v-if="isOpen">
      <tr v-for="result in session.sessionResults" :key="result.place">
        <td></td>
        <td>{{ result.driver.lastName + " " + result.driver.lastName }}</td>
        <td></td>
        <td>{{ result.q1Time || "-" }}</td>
        <td>{{ result.q2Time || "-" }}</td>
        <td>{{ result.q3Time || "-" }}</td>
      </tr>
    </table>

    <AppTable v-if="isOpen">
      <template #header>
        <tr>
          <AppTableTh sticky>Nr</AppTableTh>
          <AppTableTh>Kierowca</AppTableTh>
          <AppTableTh>Zespół</AppTableTh>
          <AppTableTh>Q1</AppTableTh>
          <AppTableTh>Q2</AppTableTh>
          <AppTableTh>Q3</AppTableTh>
        </tr>
      </template>

      <AppTableTr v-for="result in session.sessionResults" :key="result.place">
        <AppTableTd sticky>{{ result.place }}</AppTableTd>
        <AppTableTd>
          {{ result.driver.firstName + " " + result.driver.lastName }}
        </AppTableTd>
        <AppTableTd>{{ result.team.name }}</AppTableTd>
        <AppTableTd>{{ result.q1Time || "-" }}</AppTableTd>
        <AppTableTd>{{ result.q2Time || "-" }}</AppTableTd>
        <AppTableTd>{{ result.q3Time || "-" }}</AppTableTd>
      </AppTableTr>
    </AppTable>
  </div>
</template>

<script lang="ts" setup>
import {
  IRaceQualificationResult,
  ISession,
  ISprintQualificationResult,
} from "@/types/services/raceWeek/sessions";

interface IProps {
  name: "QS" | "Q";
  session:
    | ISession<ISprintQualificationResult>
    | ISession<IRaceQualificationResult>;
}

defineProps<IProps>();

const isOpen = ref(false);
</script>
