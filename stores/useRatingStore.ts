import { defineStore } from "pinia";
import { IRating, IUserRatingSummary } from "@/types/services/rating";
import useApi from "@/composables/useApi";
import { useTimeoutFn } from "@vueuse/core";

interface IRatingStoreState {
  error: boolean;
  isLoading: boolean;
  lastUpdated: Date;
  rating: IRating | null;
  isRated: boolean;
}

export const useRatingStore = defineStore("ratingStore", {
  state: () => {
    return {
      error: false,
      isLoading: true,
      lastUpdated: new Date(),
      rating: null,
      isRated: false,
    } as IRatingStoreState;
  },
  actions: {
    async fetch() {
      this.isLoading = true;
      this.error = false;

      const { data, error } = await useApi<IRating>("rating");

      if (data.value) {
        this.rating = data.value;

        const { data: userRatings, error: userRatingsError } =
          await useApi<IUserRatingSummary>(`rating/${this.rating.id}`);

        if (userRatings.value && userRatings.value.ratings.length) {
          this.isRated = true;
        }

        if (userRatingsError.value && userRatingsError.value.status !== 404) {
          this.error = true;
        }
      }

      if (error.value && error.value.status !== 404) {
        this.error = true;
      }

      this.isLoading = false;

      useTimeoutFn(() => {
        this.fetch();
      }, 1000 * 60 * 60);
    },
    rateRating() {
      this.isRated = true;
    },
  },
});
