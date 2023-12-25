import { defineStore } from "pinia";
import { IRaceWeek } from "~/types/services/raceWeek";
import { useTimeoutFn } from "@vueuse/core";

interface INextRaceWeeekState {
  error: boolean;
  isLoading: boolean;
  nextSession: { name: string; date: Date } | null;
  raceWeek: IRaceWeek | null;
}

export const useNextRaceWeekStore = defineStore("nextRaceWeekStore", {
  state: () => {
    return {
      error: false,
      isLoading: true,
      raceWeek: null,
      nextSession: null,
    } as INextRaceWeeekState;
  },
  actions: {
    async fetch() {
      this.error = false;
      this.isLoading = true;

      const { data, error } = await useApi<IRaceWeek>("raceWeek/next");

      if (error.value && error.value.status !== 404) {
        this.error = true;
      }

      if (data.value) {
        this.raceWeek = data.value;
        this.setNextSession();
      }

      if (error.value?.status === 404) {
        this.raceWeek = null;
        this.nextSession = null;
      }

      if (error.value && error.value.status !== 404) {
        this.error = true;
      }

      this.isLoading = false;
    },

    setNextSession() {
      if (!this.raceWeek) {
        this.nextSession = null;

        return;
      }

      const now = new Date();
      const sessions = [] as { date: Date; name: string }[];

      if (this.raceWeek.race) {
        const race = new Date(this.raceWeek.race);

        if (race.getTime() - now.getTime() > 0) {
          sessions.push({ date: race, name: "Wyścig" });
        }
      }

      if (this.raceWeek.raceQualification) {
        const raceQuali = new Date(this.raceWeek.raceQualification);

        if (raceQuali.getTime() - now.getTime() > 0) {
          sessions.push({ date: raceQuali, name: "Kwalifikacje do wyścigu" });
        }
      }

      if (this.raceWeek.sprint) {
        const sprint = new Date(this.raceWeek.sprint);

        if (sprint.getTime() - now.getTime() > 0) {
          sessions.push({ date: sprint, name: "Sprint" });
        }
      }

      if (this.raceWeek.sprintQualification) {
        const sprintQuali = new Date(this.raceWeek.sprintQualification);

        if (sprintQuali.getTime() - now.getTime() > 0) {
          sessions.push({ date: sprintQuali, name: "Kwalifikacje do sprintu" });
        }
      }

      if (this.raceWeek.fP3) {
        const fP3 = new Date(this.raceWeek.fP3);

        if (fP3.getTime() - now.getTime() > 0) {
          sessions.push({ date: fP3, name: "FP3" });
        }
      }

      if (this.raceWeek.fP2) {
        const fP2 = new Date(this.raceWeek.fP2);

        if (fP2.getTime() - now.getTime() > 0) {
          sessions.push({ date: fP2, name: "FP2" });
        }
      }

      if (this.raceWeek.fP1) {
        const fP1 = new Date(this.raceWeek.fP1);

        if (fP1.getTime() - now.getTime() > 0) {
          sessions.push({ date: fP1, name: "FP1" });
        }
      }

      const sortedSessions = sessions.sort((a, b) => {
        const d1 = new Date(a.date);
        const d2 = new Date(b.date);

        return d1.getTime() - d2.getTime();
      });

      if (sortedSessions[0]) {
        this.nextSession = sortedSessions[0];

        const now = new Date();
        let nextUpdate = sortedSessions[0].date.getTime() - now.getTime();
        console.log(nextUpdate);
        if (nextUpdate > 0) {
          useTimeoutFn(() => {
            this.setNextSession();
          }, nextUpdate);
        }
      } else {
        this.fetch();
      }
    },
  },
  getters: {
    getNextSession: (state) => state.nextSession,
  },
});
